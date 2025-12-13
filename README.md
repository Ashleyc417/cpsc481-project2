# CPSC 481 – Project 2: Connect Four AI

This project implements a Connect Four game with an AI opponent using the Minimax algorithm with Alpha-Beta pruning. The purpose of this project is to apply adversarial search concepts learned in class and integrate them into a playable web-based application.

The frontend is built using Svelte, and the game logic and AI decision-making are written in TypeScript.

---

## How to Run the Program

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation and Running
1. Clone the repository:
   ```bash
   git clone https://github.com/Ashleyc417/cpsc481-project2.git

2. Navigate into the project directory:
   ```bash
   cd cpsc481-project2

3. Install Dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev

5. Open browser and go to:
   ```bash
   http://localhost:5173

   
   
   
### Project Structure
src/
│
├── components/
│   └── Board.svelte
│
├── connect4/
│   ├── logic.ts
│   └── state.svelte.ts
│
├── recommender/
│   ├── evaluate.ts
│   ├── getBestMove.ts
│   ├── minimax.ts
│   └── utils.ts
│
└── routes/
    └── +page.svelte

## File Folder and Descriptions

### components/
### Board.svelte
- Renders the Connect Four board and handles user interactions such as placing pieces and updating the UI.

### connect4/
### logic.ts
- Contains the core Connect Four game logic, including validating moves, placing pieces, and checking for wins or draws.
### state.svelte.ts
- Manages the reactive game state using Svelte stores, such as the board state and current player.

### recommender/
### minimax.ts
- Implements the Minimax algorithm with Alpha-Beta pruning to efficiently search possible game states.
### evaluate.ts
- Defines the heuristic evaluation function used to score non-terminal board states.
### getBestMove.ts
- Serves as the entry point for the AI, calling Minimax to determine the best move.
### utils.ts
- Provides helper functions such as board cloning and valid move generation.

### routes/
### +page.svelte
- The main application page that connects the UI with the game and AI logic.

## Dependencies
Svelte / SvelteKit
TypeScript
Node.js and npm

All dependencies are listed in the package.json file and can be installed using npm install.