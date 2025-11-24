<script lang="ts">
	const ROWS = 6;
	const COLUMNS = 7;
	let board: number[][] = $state(Array.from({ length: ROWS }, () => new Array(COLUMNS).fill(0)));
	let playerTurn = $state(1);
	let isGameOver = $state(false);

	function checkDirection(r: number, c: number, dr: number, dc: number) {
		const player = board[r][c];
		if (player === 0) return false;

		for (let i = 1; i < 4; i++) {
			const nr = r + i * dr;
			const nc = c + i * dc;
			if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLUMNS || board[nr][nc] !== player) {
				return false;
			}
		}
		return true;
	}

	function checkWinner(): number {
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLUMNS; c++) {
				if (checkDirection(r, c, 0, 1)) return board[r][c];
				if (checkDirection(r, c, 1, 0)) return board[r][c];
				if (checkDirection(r, c, 1, 1)) return board[r][c];
				if (checkDirection(r, c, 1, -1)) return board[r][c];
			}
		}
		return 0;
	}

	function checkBoardState() {
		if (checkWinner() || board.flat().every((cell) => cell !== 0)) {
			alert(`END. Winner is ${playerTurn}`);
			isGameOver = true;
			return;
		}
	}

	function handleCellClick(c: number) {
		for (let r = ROWS - 1; r >= 0; r--) {
			if (board[r][c] === 0) {
				board[r][c] = playerTurn;
				break;
			}
		}
		checkBoardState();
		playerTurn = 3 - playerTurn;
	}
</script>

<main class="max-w-3xl mx-auto flex flex-col items-center gap-8 p-6 pt-24">
	<h1 class="text-xl md:text-3xl font-bold">Connect 4 Recommender</h1>
	<div class="flex flex-col items-center justify-center gap-2">
		{#each board as row}
			<div class="flex items-center justify-center gap-8">
				{#each row as cell, c}
					<button class="cursor-pointer" onclick={() => handleCellClick(c)}>
						{cell}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</main>
