"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const GRID_SIZE = 5;
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
        this.initializeGame();
    }
    initializeGame() {
        // Send initial game setup message to both players
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: { player: "A", gridSize: GRID_SIZE }
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: { player: "B", gridSize: GRID_SIZE }
        }));
    }
    isMoveValid(character, move) {
        const { type, position } = character;
        const { x, y } = position;
        switch (type) {
            case "P":
                return this.isValidPawnMove(x, y, move);
            case "H1":
                return this.isValidHero1Move(x, y, move);
            case "H2":
                return this.isValidHero2Move(x, y, move);
            default:
                return false;
        }
    }
    isValidPawnMove(x, y, move) {
        switch (move) {
            case 'L': return y > 0;
            case 'R': return y < GRID_SIZE - 1;
            case 'F': return x > 0;
            case 'B': return x < GRID_SIZE - 1;
            default: return false;
        }
    }
    isValidHero1Move(x, y, move) {
        switch (move) {
            case 'L': return y > 1;
            case 'R': return y < GRID_SIZE - 2;
            case 'F': return x > 1;
            case 'B': return x < GRID_SIZE - 2;
            default: return false;
        }
    }
    isValidHero2Move(x, y, move) {
        switch (move) {
            case 'FL': return x > 1 && y > 1;
            case 'FR': return x > 1 && y < GRID_SIZE - 2;
            case 'BL': return x < GRID_SIZE - 2 && y > 1;
            case 'BR': return x < GRID_SIZE - 2 && y < GRID_SIZE - 2;
            default: return false;
        }
    }
    executeMove(character, move) {
        const { position } = character;
        const { x, y } = position;
        switch (move) {
            case 'L':
                position.y -= character.type === 'H1' ? 2 : 1;
                break;
            case 'R':
                position.y += character.type === 'H1' ? 2 : 1;
                break;
            case 'F':
                position.x -= character.type === 'H1' ? 2 : 1;
                break;
            case 'B':
                position.x += character.type === 'H1' ? 2 : 1;
                break;
            case 'FL':
                position.x -= 2;
                position.y -= 2;
                break;
            case 'FR':
                position.x -= 2;
                position.y += 2;
                break;
            case 'BL':
                position.x += 2;
                position.y -= 2;
                break;
            case 'BR':
                position.x += 2;
                position.y += 2;
                break;
        }
        this.handleCombat(character);
    }
    handleCombat(character) {
        const { x, y } = character.position;
        const opponent = this.grid[x][y];
        if (opponent && opponent.player !== character.player) {
            this.grid[x][y] = character;
        }
    }
    isGameOver() {
        const playerA = this.grid.flat().filter(c => c && c.player === 'A').length;
        const playerB = this.grid.flat().filter(c => c && c.player === 'B').length;
        return playerA === 0 || playerB === 0;
    }
    makeMove(socket, characterType, move) {
        const player = socket === this.player1 ? 'A' : 'B';
        const character = this.grid.flat().find(c => c && c.type === characterType && c.player === player);
        if (!character || !this.isMoveValid(character, move)) {
            // Handle invalid move
            return;
        }
        this.executeMove(character, move);
        if (this.isGameOver()) {
            const winner = this.grid.flat().find(c => c && c.player === 'A') ? 'A' : 'B';
            this.player1.send(JSON.stringify({
                type: "game_over",
                payload: { winner }
            }));
            this.player2.send(JSON.stringify({
                type: "game_over",
                payload: { winner }
            }));
        }
        else {
            // Send move to the other player
            const otherPlayer = socket === this.player1 ? this.player2 : this.player1;
            otherPlayer.send(JSON.stringify({
                type: "move",
                payload: { characterType, move }
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
