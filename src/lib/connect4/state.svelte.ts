import { checkBoardState, clearBoard, ROWS, Winner } from '$lib/connect4/logic';

export type GameState = {
	board: number[][];
	playerTurn: number;
	isGameOver: boolean;
	winner: number;
};

function createInitialGameState(): GameState {
	return {
		board: clearBoard(),
		isGameOver: false,
		playerTurn: 1,
		winner: Winner.NONE
	};
}

export const gameState = $state<GameState>(createInitialGameState());

export function handleCellClick(c: number) {
	if (gameState.isGameOver) return;

	for (let r = ROWS - 1; r >= 0; r--) {
		if (gameState.board[r][c] === 0) {
			gameState.board[r][c] = gameState.playerTurn;
			break;
		}
	}
	const [isGameOver, winner] = checkBoardState(gameState.board);
	if (isGameOver) {
		gameState.isGameOver = isGameOver;
		gameState.winner = winner;
		return;
	}
	gameState.playerTurn = 3 - gameState.playerTurn;
}

export function resetGame() {
	Object.assign(gameState, createInitialGameState());
}
