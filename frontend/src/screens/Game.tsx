import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    // Using placeholder data for initial testing
    const placeholderBoard = [
        ["A-P1", "A-P2", "A-H1", "A-H2", "A-P3"],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        ["B-P1", "B-P2", "B-H1", "B-H2", "B-P3"]
    ];

    const [board, setBoard] = useState<(string | null)[][]>(placeholderBoard);
    const [started, setStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<'A' | 'B'>('A');

    useEffect(() => {
        if (!socket) {
            console.error("Socket is not available");
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Message received from server:", message);

            switch (message.type) {
                case INIT_GAME:
                    setBoard(message.payload.board);
                    setStarted(true);
                    break;
                case MOVE:
                    setBoard(message.payload.board);
                    setCurrentPlayer((prev) => (prev === 'A' ? 'B' : 'A'));
                    break;
                case GAME_OVER:
                    alert(`Game over! Winner: Player ${message.payload.winner}`);
                    setStarted(false);
                    break;
                default:
                    console.warn("Unknown message type:", message.type);
            }
        };
    }, [socket]);

    if (!socket) return <div>Connecting...</div>;

    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard board={board} socket={socket} currentPlayer={currentPlayer} />
                    </div>
                    <div className="col-span-2 bg-slate-900 w-full flex justify-center">
                        <div className="pt-8">
                            {!started && (
                                <Button onClick={() => {
                                    console.log("Sending INIT_GAME message");
                                    socket.send(JSON.stringify({ type: INIT_GAME }));
                                }}>
                                    Play
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
