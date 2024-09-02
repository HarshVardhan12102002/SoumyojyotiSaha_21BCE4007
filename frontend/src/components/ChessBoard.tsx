import { useState } from "react";

export const ChessBoard = ({
    board,
    socket,
    currentPlayer,
}: {
    board: (string | null)[][];
    socket: WebSocket;
    currentPlayer: 'A' | 'B';
}) => {
    const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);

    const handleSquareClick = (x: number, y: number) => {
        if (selected) {
            const from = selected;
            const to = { x, y };

            console.log(`Move from ${from.x},${from.y} to ${to.x},${to.y}`);

            socket.send(
                JSON.stringify({
                    type: "move",
                    payload: {
                        move: { from, to },
                    },
                })
            );

            setSelected(null);
        } else if (board[y][x]?.startsWith(currentPlayer)) {
            console.log(`Selected square: ${x},${y} (${board[y][x]})`);
            setSelected({ x, y });
        }
    };

    return (
        <div className="text-white-200">
            {board.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((square, x) => (
                        <div
                            key={x}
                            onClick={() => handleSquareClick(x, y)}
                            className={`w-16 h-16 ${
                                (x + y) % 2 === 0 ? 'bg-green-500' : 'bg-slate-500'
                            } ${selected && selected.x === x && selected.y === y ? 'bg-blue-500' : ''}`}
                        >
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                                    {square ? (
                                        <div className="text-center text-lg font-bold">
                                            {square}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
