import { ROWS } from '$lib/connect4/logic';
import { minimax } from './minimax';

export function getBestMove(board: number[][], player: number): [number, number] {
    const depth = 6;
    const [, move] = minimax(board, depth, -Infinity, Infinity, true, player);
    if (!move) return [-1, -1];
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][move] === 0) {
            return [r, move];
        }
    }
    return [-1, -1];
}