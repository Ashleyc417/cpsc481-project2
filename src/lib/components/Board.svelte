<script lang="ts">
	import { PLAYER_1, EMPTY, ROWS, COLUMNS } from '$lib/connect4/logic';
	import { gameState, handleCellClick } from '$lib/connect4/state.svelte';

	const CELL_SIZE = 60;
	const CELL_PADDING = 16;

	const W = COLUMNS * CELL_SIZE + CELL_PADDING * 2;
	const H = ROWS * CELL_SIZE + CELL_PADDING * 2;

	function cx(col: number): number {
		return CELL_PADDING + col * CELL_SIZE + CELL_SIZE / 2;
	}

	function cy(row: number): number {
		return CELL_PADDING + row * CELL_SIZE + CELL_SIZE / 2;
	}
</script>

<svg width="90%" viewBox={`0 0 ${W} ${H}`} style="max-width: 500px; cursor: pointer;">
	<defs>
		<mask id="board-mask">
			<rect width={W} height={H} fill="white" />
			{#each gameState.board as row, r}
				{#each row as _cell, c}
					<circle cx={cx(c)} cy={cy(r)} r={CELL_SIZE * 0.42} fill="black" />
				{/each}
			{/each}
		</mask>
	</defs>

	<rect x="0" y="0" width={W} height={H} rx="20" ry="20" fill="#4f66a8" mask="url(#board-mask)" />

	{#each gameState.board as row, r}
		{#each row as cell, c}
			{#if cell !== EMPTY}
				<circle
					cx={cx(c)}
					cy={cy(r)}
					r={CELL_SIZE * 0.42}
					fill={cell === PLAYER_1 ? '#facc15' : '#ef4444'}
					style="transition: cy 200ms ease;"
				/>
			{/if}
		{/each}
	{/each}

	{#if gameState.recommendedMove}
		<circle
			cx={cx(gameState.recommendedMove[1])}
			cy={cy(gameState.recommendedMove[0])}
			r={CELL_SIZE * 0.42}
			fill={gameState.playerTurn === PLAYER_1 ? 'rgba(250,204,21,0.35)' : 'rgba(239,68,68,0.35)'}
			style="pointer-events: none;"
		/>
	{/if}

	{#each Array(COLUMNS) as _, col}
		<rect
			x={CELL_PADDING + col * CELL_SIZE}
			y={0}
			width={CELL_SIZE}
			height={H}
			fill="transparent"
			onclick={() => handleCellClick(col)}
			class="outline-none"
			onkeydown={(e) => {}}
			tabindex={0}
			role="button"
			aria-label={`Drop in column ${col + 1}`}
		/>
	{/each}
</svg>
