"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Gamemanager_1 = require("./Gamemanager");

const wss = new ws_1.WebSocketServer({ port: 8080 });

wss.on('listening', () => {
    console.log('WebSocket server is listening on port 8080');
});

const gameManager = new Gamemanager_1.GameManager();

wss.on('connection', function connection(ws) {
    console.log('New client connected');
    gameManager.addUser(ws);
    
    ws.on('close', () => {
        console.log('Client disconnected');
        gameManager.removeUser(ws);
    });
    
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });
});
