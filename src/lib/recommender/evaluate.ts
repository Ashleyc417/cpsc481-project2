import { COLUMNS, EMPTY, PLAYER_1, PLAYER_2, ROWS } from '$lib/connect4/logic';

function scoreWindow(window: number[], player: number) {
    const opponent = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    const countP = window.filter((v) => v === player).length;
    const countO = window.filter((v) => v === opponent).length;
    const countE = window.filter((v) => v === EMPTY).length;

    // If window contains opponent tokens, it's worse
    if (countO === 3 && countE === 1) return -40;
    if (countP === 3 && countE === 1) return +40;

    if (countP === 2 && countE === 2) return +10;
    if (countO === 2 && countE === 2) return -10;

    return 0;
}

export function evaluateBoard(board: number[][], player: number): number {
    let score = 0;

    // Center column preference
    const centerCol = Math.floor(COLUMNS / 2);
    for (let r = 0; r < ROWS; r++) {
        if (board[r][centerCol] === player) score += 4;
    }

    // Check all windows of length 4
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {
            if (c + 3 < COLUMNS)
                score += scoreWindow(
                    [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]],
                    player
                );
            if (r + 3 < ROWS)
                score += scoreWindow(
                    [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]],
                    player
                );
            if (r + 3 < ROWS && c + 3 < COLUMNS)
                score += scoreWindow(
                    [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]],
                    player
                );
            if (r - 3 >= 0 && c + 3 < COLUMNS)
                score += scoreWindow(
                    [board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3]],
                    player
                );
        }
    }

    return score;
}