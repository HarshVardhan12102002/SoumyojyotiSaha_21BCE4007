# Multiplayer Chess with WebSocket

A real-time, browser-based chess game leveraging WebSocket technology for interactive gameplay between two players. This project features a TypeScript backend for managing WebSocket communication and game logic with the `chess.js` library. The frontend is built with React, offering an intuitive user interface for a seamless chess experience.

## Features

- **Real-time Gameplay:** Players can make moves and see updates instantaneously.
- **WebSocket Communication:** Ensures smooth, live interactions between players.
- **Chess Game Logic:** Managed with the `chess.js` library to enforce rules and track game state.
- **Interactive UI:** Designed with React for an engaging and responsive user experience.

## Screenshots

![Interactive Chessboard](assets/images/chessboard.png)  
*Interactive Chessboard*

![In-game Moves](assets/images/gameplay.png)  
*In-game Moves*

## Installation

### Clone the Repository

git clone https://github.com/Soumyojyotisaha/Multi_player-chess-using-Websocket.git
cd Multi_player-chess-using-Websocket

# Compile TypeScript and start the backend server
cd ../backend
tsc -b
node dist/index.js &

# Start the frontend development server
cd ../frontend
npm run dev
