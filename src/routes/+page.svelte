<script lang="ts">
	import '../styles.css';
	import { gameState, recommendMove, resetGame } from '$lib/connect4/state.svelte';
	import { Winner } from '$lib/connect4/logic';
	import Board from '$lib/components/Board.svelte';
</script>

<main class="max-w-150 mx-auto flex flex-col items-center gap-8 p-6 pt-16">
	<Board />
	<div
		class="w-full max-w-100 sm:max-w-125 flex flex-col sm:flex-row gap-2 items-center justify-between"
	>
		{#if gameState.isGameOver}
			<span class="text-xl font-semibold">
				{#if gameState.winner === Winner.TIE}
					It's a tie!
				{:else}
					Player {gameState.winner} won!
				{/if}
			</span>
			<button
				onclick={resetGame}
				class="cursor-pointer rounded-xl min-w-60 py-2 px-4 bg-[#4f66a8]/80 text-white hover:brightness-110 transition-all"
			>
				Play Again!
			</button>
		{:else}
			<span class="text-xl font-light">Player {gameState.player}'s turn</span>
			<button
				onclick={recommendMove}
				class="cursor-pointer rounded-xl min-w-60 py-2 px-4 bg-[#4f66a8]/80 text-white hover:brightness-110 transition-all"
			>
				Recommend Move
			</button>
		{/if}
	</div>
	<h1 class="text-3xl sm:text-5xl flex flex-col">
		<span class="font-light">Connect4 Recommender</span>
		<span class="font-bold">move recommender</span>
	</h1>
</main>
