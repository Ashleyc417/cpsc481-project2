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

	let fallingDiscY = $state(0);
	$effect(() => {
		const fallingDisc = gameState.fallingDisc;
		if (fallingDisc) {
			fallingDiscY = -CELL_SIZE;
			requestAnimationFrame(() => {
				fallingDiscY = cy(fallingDisc.row);
			});
		}
	});
</script>

<svg viewBox={`0 0 ${W} ${H}`} class="max-w-100 sm:max-w-125 cursor-pointer">
	<defs>
		<mask id="board-mask">
			<rect width={W} height={H} fill="white" />
			{#each gameState.board as row, r (`boardMaskRow-${r}`)}
				{#each [...Array(row.length).keys()] as c (`boardMaskCell-${r}-${c}`)}
					<circle cx={cx(c)} cy={cy(r)} r={CELL_SIZE * 0.42} fill="black" />
				{/each}
			{/each}
		</mask>
	</defs>

	{#if gameState.fallingDisc}
		<circle
			cx={cx(gameState.fallingDisc.column)}
			cy={fallingDiscY}
			r={CELL_SIZE * 0.42}
			fill={gameState.player === PLAYER_1 ? '#facc15' : '#ef4444'}
			style="transition: cy 300ms cubic-bezier(0.175, 1.1, 0.32, 1.07)"
		/>
	{/if}

	<rect x="0" y="0" width={W} height={H} rx="20" ry="20" fill="#4f66a8" mask="url(#board-mask)" />

	{#each gameState.board as row, r (`boardRow-${r}`)}
		{#each row as cell, c (`boardCell-${r}-${c}`)}
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
			fill={gameState.player === PLAYER_1 ? '#facc15' : '#ef4444'}
			opacity="0.35"
			style="pointer-events: none;"
		/>
	{/if}

	{#each [...Array(COLUMNS).keys()] as col (`clickableColumn-${col}`)}
		<rect
			x={CELL_PADDING + col * CELL_SIZE}
			y={0}
			width={CELL_SIZE}
			height={H}
			onclick={() => handleCellClick(col)}
			fill="transparent"
			class="outline-none"
			tabindex={0}
			role="button"
			aria-label={`Drop in column ${col + 1}`}
			onkeydown={() => {}}
		/>
	{/each}
</svg>
