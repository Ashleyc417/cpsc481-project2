import { canDrop, checkBoardState, clearBoard, rowToDrop, Winner } from '$lib/connect4/logic';
import { getBestMove } from '$lib/recommender/getBestMove';

type FallingDisc = {
	column: number;
	row: number;
};

type GameState = {
	board: number[][];
	player: number;
	isGameOver: boolean;
	winner: number;
	recommendedMove: [number, number] | null;
	fallingDisc: FallingDisc | null;
};

function createInitialGameState(): GameState {
	return {
		board: clearBoard(),
		player: 1,
		isGameOver: false,
		winner: Winner.NONE,
		recommendedMove: null,
		fallingDisc: null
	};
}

export const gameState = $state<GameState>(createInitialGameState());

export function handleCellClick(column: number) {
	if (gameState.isGameOver || gameState.fallingDisc) return;
	if (canDrop(gameState.board, column)) return;

	const row = rowToDrop(gameState.board, column);
	gameState.recommendedMove = null;
	gameState.fallingDisc = { row, column };

	setTimeout(() => {
		gameState.board[row][column] = gameState.player;
		gameState.fallingDisc = null;

		const [isGameOver, winner] = checkBoardState(gameState.board);
		if (isGameOver) {
			gameState.isGameOver = isGameOver;
			gameState.winner = winner;
			return;
		}
		gameState.player = 3 - gameState.player;
	}, 300);
}

export function recommendMove() {
	if (gameState.isGameOver || gameState.fallingDisc) return;
	gameState.recommendedMove = getBestMove(gameState.board, gameState.player);
}

export function resetGame() {
	Object.assign(gameState, createInitialGameState());
}
