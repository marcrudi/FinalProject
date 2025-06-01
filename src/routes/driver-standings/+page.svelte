<!-- src/routes/driver-standings/+page.svelte -->
<script runes>
  // `data` enthält das, was load() zurückgibt: { seasons: number[] }
  export let data;
  const { seasons } = data;
</script>


<main>
  <h1 class="page-heading">Driver-Standings: Saison wählen</h1>

  {#if seasons.length === 0}
    <p>Keine Saisons gefunden.</p>
  {:else}
    <div class="grid-container">
      {#each seasons as s}
        <!-- Jede Karte verlinkt zu /driver-standings/{s} -->
        <a href={`/driver-standings/${s}`} class="season-card">
          <span class="season-text">{s}</span>
        </a>
      {/each}
    </div>
  {/if}
</main>
