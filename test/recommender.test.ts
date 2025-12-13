import { describe, expect, it } from 'vitest';
import boardData from './board-data.json';
import { minimax } from '../src/lib/recommender/minimax';

const SEARCH_DEPTH = 6;
const NUM_ITERATIONS = 100;
const TEST_RUNNING_TIME = 10 * 1000;

describe('Connect 4 AI minimax evaluation', () => {
	for (const test of boardData.tests) {
		it(
			test.name,
			() => {
				let totalTime = 0;
				let score = null;
				let move = null;

				for (let i = 0; i < NUM_ITERATIONS; i++) {
					const start = performance.now();
					const [s, m] = minimax(test.board, SEARCH_DEPTH, -Infinity, Infinity, true, test.player);
					const end = performance.now();
					expect(m).not.toBeNull();
					expect(m).toBeGreaterThanOrEqual(0);
					expect(m).toBeLessThan(7);
					if (score === null || move === null) {
						score = s;
						move = m;
					} else {
						expect(m).toEqual(move);
						expect(s).toEqual(score);
					}
					totalTime += end - start;
				}
				const avgTime = (totalTime / NUM_ITERATIONS).toFixed(2);

				console.log(`Name: ${test.name}`);
				console.log(`Description: ${test.description}`);
				console.log(`Player's Turn: ${test.player}`);
				console.log(`Selected Move: ${move}`);
				console.log(`Score: ${score}`);
				console.log(`Time: ${avgTime}ms`);
			},
			TEST_RUNNING_TIME
		);
	}
});
