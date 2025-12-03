import { checkBoardState, clearBoard, ROWS, Winner } from '$lib/connect4/logic';
import { getBestMove } from '$lib/recommender/getBestMove';

export type GameState = {
    board: number[][];
    playerTurn: number;
    isGameOver: boolean;
    recommendedMove: [number, number] | null;
    winner: number;
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

export function handleCellClick(c: number) {
    if (gameState.isGameOver) return;
    if (gameState.board[0][c]) return; // Ignore if column is already full

    gameState.recommendedMove = null;

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

export function recommendMove() {
    if (gameState.isGameOver) return;
    gameState.recommendedMove = getBestMove(gameState.board, gameState.playerTurn);
}

export function resetGame() {
    Object.assign(gameState, createInitialGameState());
}