import { describe, expect, it } from 'vitest';
import boardData from './board-data.json';
import { minimax } from '../src/lib/recommender/minimax';

const SEARCH_DEPTH = 6;

describe('Connect 4 AI minimax evaluation', () => {
	for (const test of boardData.tests) {
		it(test.name, () => {
			const start = performance.now();
			const [score, move] = minimax(
				test.board,
				SEARCH_DEPTH,
				-Infinity,
				Infinity,
				true,
				test.player
			);
			const end = performance.now();
			const time = (end - start).toFixed(2);

			console.log(`Name: ${test.name}`);
			console.log(`Description: ${test.description}`);
			console.log(`Player's Turn: ${test.player}`);
			console.log(`Selected Move: ${move}`);
			console.log(`Score: ${score}`);
			console.log(`Time: ${time}ms`);

			expect(move).not.toBeNull();
			expect(move).toBeGreaterThanOrEqual(0);
			expect(move).toBeLessThan(7);
		});
	}
});
