import { checkBoardState, clearBoard, ROWS, Winner } from '$lib/connect4/logic';
import { getBestMove } from '$lib/recommender/getBestMove';

export type GameState = {
	board: number[][];
	playerTurn: number;
	isGameOver: boolean;
	recommendedMove: [number, number] | null;
	winner: number;
};

type FallingDisc = {
	falling: boolean;
	column: number;
	playerTurn: number;
	finalRow: number;
};

function createInitialGameState(): GameState {
	return {
		board: clearBoard(),
		playerTurn: 1,
		isGameOver: false,
		recommendedMove: null,
		winner: Winner.NONE
	};
}

export const gameState = $state<GameState>(createInitialGameState());
export const fallingDisc = $state<FallingDisc>({
	falling: false,
	column: -1,
	finalRow: -1,
	playerTurn: -1
});

export function handleCellClick(c: number) {
	if (gameState.isGameOver) return;
	if (gameState.board[0][c]) return; // Ignore if column is already full

	gameState.recommendedMove = null;
	let dropRow = -1;

	for (let r = ROWS - 1; r >= 0; r--) {
		if (gameState.board[r][c] === 0) {
			dropRow = r;
			break;
		}
	}

	Object.assign(fallingDisc, {
		falling: true,
		column: c,
		finalRow: dropRow,
		playerTurn: gameState.playerTurn
	});

	setTimeout(() => {
		gameState.board[dropRow][c] = gameState.playerTurn;
		Object.assign(fallingDisc, { falling: false });
		const [isGameOver, winner] = checkBoardState(gameState.board);
		if (isGameOver) {
			gameState.isGameOver = isGameOver;
			gameState.winner = winner;
			return;
		}
		gameState.playerTurn = 3 - gameState.playerTurn;
	}, 750);
}

export function recommendMove() {
	if (gameState.isGameOver) return;
	gameState.recommendedMove = getBestMove(gameState.board, gameState.playerTurn);
}

export function resetGame() {
	Object.assign(gameState, createInitialGameState());
}
