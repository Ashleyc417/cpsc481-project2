import { checkBoardState } from '$lib/connect4/logic';
import { evaluateBoard } from './evaluate';
import { getValidMoves, simulateMove } from './utils';

export function minimax(
	board: number[][],
	depth: number,
	alpha: number,
	beta: number,
	maximizingPlayer: boolean,
	player: number
): [number, number | null] {
	const [isOver, winner] = checkBoardState(board);
	const opponent = 3 - player;

	// Terminal state scoring
	if (isOver) {
		if (winner === player) return [Infinity, null];
		if (winner === opponent) return [-Infinity, null];
		return [0, null]; // tie
	}

	// Depth reached: evaluate
	if (depth === 0) {
		return [evaluateBoard(board, player), null];
	}

	const validMoves = getValidMoves(board);

	if (maximizingPlayer) {
		let bestScore = -Infinity;
		let bestCol = null;

		for (const col of validMoves) {
			const child = simulateMove(board, col, player);
			const [score] = minimax(child, depth - 1, alpha, beta, false, player);

			if (score > bestScore) {
				bestScore = score;
				bestCol = col;
			}

			alpha = Math.max(alpha, score);
			if (alpha >= beta) break;
		}

		return [bestScore, bestCol];
	} else {
		let bestScore = Infinity;
		let bestCol = null;

		for (const col of validMoves) {
			const child = simulateMove(board, col, opponent);
			const [score] = minimax(child, depth - 1, alpha, beta, true, player);

			if (score < bestScore) {
				bestScore = score;
				bestCol = col;
			}

			beta = Math.min(beta, score);
			if (alpha >= beta) break;
		}

		return [bestScore, bestCol];
	}
}
