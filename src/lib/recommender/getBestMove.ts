import { ROWS } from '$lib/connect4/logic';
import { minimax } from './minimax';

export function getBestMove(board: number[][], player: number): [number, number] | null {
	const depth = 6;
	const [, move] = minimax(board, depth, -Infinity, Infinity, true, player);
	if (!move) return null;
	for (let r = ROWS - 1; r >= 0; r--) {
		if (board[r][move] === 0) {
			return [r, move];
		}
	}
	throw new Error('Attempting to recommend an invalid move.');
}
