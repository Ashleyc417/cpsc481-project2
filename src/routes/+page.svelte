<script lang="ts">
	import './styles.css';
	import { gameState, handleCellClick, resetGame } from '$lib/connect4/state.svelte';
	import { Winner } from '$lib/connect4/logic';
</script>

<main class="max-w-3xl mx-auto flex flex-col items-center gap-8 p-6 pt-24">
	<h1 class="text-xl md:text-3xl font-bold">Connect 4 Recommender</h1>
	<div class="flex flex-col items-center justify-center gap-2">
		{#each gameState.board as row}
			<div class="flex items-center justify-center gap-8">
				{#each row as cell, c}
					<button class="cursor-pointer" onclick={() => handleCellClick(c)}>
						{cell}
					</button>
				{/each}
			</div>
		{/each}
	</div>
	{#if gameState.isGameOver}
		{#if gameState.winner === Winner.TIE}
			<p>It's a tie!</p>
		{:else}
			<p>Player {gameState.winner} won!</p>
		{/if}
		<button onclick={resetGame}>Play Again!</button>
	{/if}
</main>
