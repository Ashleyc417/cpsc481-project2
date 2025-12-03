<script lang="ts">
	import './styles.css';
	import { gameState, handleCellClick, recommendMove, resetGame } from '$lib/connect4/state.svelte';
	import { EMPTY, PLAYER_1, PLAYER_2, Winner } from '$lib/connect4/logic';
</script>

<main class="max-w-3xl mx-auto flex flex-col items-center gap-4 p-6 pt-24">
	<h1 class="text-xl md:text-3xl font-bold">Connect 4 Recommender</h1>
	<div class="my-6 flex flex-col items-center justify-center gap-2 bg-[#4f66a8] p-4 rounded-xl">
		{#each gameState.board as row, r (`row-${r}`)}
			<div class="flex items-center justify-center gap-4 md:gap-8">
				{#each row as cell, c (`cell-${r}-${c}`)}
					<div
						role="button"
						tabindex={0}
						onclick={() => handleCellClick(c)}
						class="cursor-pointer aspect-square w-6 md:w-8 rounded-full"
						class:bg-white={cell === EMPTY &&
							!(
								gameState.recommendedMove &&
								gameState.recommendedMove[0] === r &&
								gameState.recommendedMove[1] === c
							)}
						class:bg-yellow-300={cell === PLAYER_1}
						class:bg-red-400={cell === PLAYER_2}
						class:bg-yellow-100={gameState.recommendedMove &&
							gameState.recommendedMove[0] === r &&
							gameState.recommendedMove[1] === c &&
							gameState.playerTurn === PLAYER_1}
						class:bg-red-200={gameState.recommendedMove &&
							gameState.recommendedMove[0] === r &&
							gameState.recommendedMove[1] === c &&
							gameState.playerTurn !== PLAYER_1}
						onkeydown={() => {}}
					></div>
				{/each}
			</div>
		{/each}
	</div>
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
	{/if}
	<button
		onclick={() => {
			recommendMove();
		}}
		class="cursor-pointer max-w-80 rounded-xl w-full py-2 px-4 bg-[#899dd2]
      text-white hover:brightness-110 transition-all"
	>
		Recommend Next Move
	</button>
</main>