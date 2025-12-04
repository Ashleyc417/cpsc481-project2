import { COLUMNS, ROWS } from '$lib/connect4/logic';

export function getValidMoves(board: number[][]): number[] {
	const moves = [];
	for (let c = 0; c < COLUMNS; c++) {
		if (board[0][c] === 0) moves.push(c);
	}
	return moves;
}

export function simulateMove(board: number[][], col: number, player: number): number[][] | null {
	const newBoard = board.map((row) => [...row]);
	for (let r = ROWS - 1; r >= 0; r--) {
		if (newBoard[r][col] === 0) {
			newBoard[r][col] = player;
			return newBoard;
		}
	}
	return null;
}
