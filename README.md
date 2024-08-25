# Multiplayer Chess with WebSocket

A real-time, browser-based chess game that utilizes WebSocket technology to enable interactive gameplay between two players. The project features a TypeScript backend that manages WebSocket communication and game logic using the `chess.js` library. The frontend offers an intuitive user interface for players to engage in chess matches.

## Features

- **Real-time Gameplay:** Players can make moves and see updates in real-time.
- **WebSocket Communication:** Ensures smooth and live interaction between players.
- **Chess Game Logic:** Managed using the `chess.js` library to enforce rules and game state.
- **Interactive UI:** Built with React for an engaging user experience.

## Screenshots

![Chessboard](assets/images/chessboard.png)  
*Interactive Chessboard*

![Gameplay](assets/images/gameplay.png)  
*In-game Moves*

## Installation

### Clone the Repository
git clone https://github.com/Soumyojyotisaha/Multi_player-chess-using-Websocket.git
cd Multi_player-chess-using-Websocket


###Install Dependencies
# Install backend dependencies
cd $BACKEND_DIR
npm install

# Install frontend dependencies
cd ../$FRONTEND_DIR
npm install

#Compile TypeScript and Start Servers
# Compile TypeScript and start the backend server
cd ../$BACKEND_DIR
tsc -b
node dist/index.js &

# Start the frontend development server
cd ../$FRONTEND_DIR
npm run dev

# Print a message indicating the application is running
echo "Chess game running at http://localhost:$PORT"

#License
This project is licensed under the MIT License. See the LICENSE file for details.

#Contact
For any questions or feedback, please reach out to soumyojyotisaha2001offic@gmail.com.

