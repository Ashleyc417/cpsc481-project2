export const ROWS = 6;
export const COLUMNS = 7;

export const EMPTY = 0;
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export enum Winner {
	NONE = -1,
	TIE = 0,
	P1 = PLAYER_1,
	P2 = PLAYER_2
}

function checkDirection(board: number[][], r: number, c: number, dr: number, dc: number): boolean {
	const player = board[r][c];
	if (player === EMPTY) return false;

	for (let i = 1; i < 4; i++) {
		const nr = r + i * dr;
		const nc = c + i * dc;
		if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLUMNS || board[nr][nc] !== player) {
			return false;
		}
	}
	return true;
}

function checkWinner(board: number[][]): number {
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLUMNS; c++) {
			if (checkDirection(board, r, c, 0, 1)) return board[r][c];
			if (checkDirection(board, r, c, 1, 0)) return board[r][c];
			if (checkDirection(board, r, c, 1, 1)) return board[r][c];
			if (checkDirection(board, r, c, 1, -1)) return board[r][c];
		}
	}
	return 0;
}

export function canDrop(board: number[][], c: number): boolean {
	return board[0][c] !== 0;
}

export function rowToDrop(board: number[][], c: number): number {
	for (let r = ROWS - 1; r >= 0; r--) {
		if (board[r][c] === 0) {
			return r;
		}
	}
	throw new Error('Trying to drop a disc with full column.');
}

export function checkBoardState(board: number[][]): [boolean, number] {
	const winner = checkWinner(board);
	if (winner) return [true, winner];
	if (board.flat().every((cell) => cell !== 0)) {
		return [true, Winner.TIE];
	}
	return [false, Winner.NONE];
}

export function clearBoard(): number[][] {
	return Array.from({ length: ROWS }, () => new Array(COLUMNS).fill(0));
}
