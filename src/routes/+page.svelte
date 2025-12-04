<script lang="ts">
	import './styles.css';
	import { gameState, recommendMove, resetGame } from '$lib/connect4/state.svelte';
	import { Winner } from '$lib/connect4/logic';
	import Board from '$lib/components/Board.svelte';
</script>

<main class="max-w-3xl mx-auto flex flex-col items-center gap-8 p-6 pt-24">
	<h1 class="text-xl md:text-3xl font-bold">Connect 4 Recommender</h1>
	<Board />
	{#if gameState.isGameOver}
		<p class="text-lg md:text-xl font-semibold">
			{#if gameState.winner === Winner.TIE}
				It's a tie!
			{:else}
				Player {gameState.winner} won!
			{/if}
		</p>
		<button
			onclick={resetGame}
			class="cursor-pointer max-w-80 rounded-xl w-full py-2 px-4 bg-[#899dd2]
      text-white hover:brightness-110 transition-all"
		>
			Play Again!
		</button>
	{:else}
		<button
			onclick={recommendMove}
			class="cursor-pointer max-w-80 rounded-xl w-full py-2 px-4 bg-[#899dd2]
      text-white hover:brightness-110 transition-all"
		>
			Recommend Next Move
		</button>
	{/if}
</main>
