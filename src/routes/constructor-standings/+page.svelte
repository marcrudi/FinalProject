<!-- src/routes/constructor-standings/+page.svelte -->
<script runes>
  // `data.seasons` kommt von +page.server.js
  export let data;
  const { seasons } = data;
</script>


<main>
  <h1 class="page-heading">Constructor-Standings: Saison wählen</h1>

  {#if seasons.length === 0}
    <p>Keine Saisons gefunden.</p>
  {:else}
    <div class="grid-container">
      {#each seasons as s}
        <!-- Link auf /constructor-standings/{s} -->
        <a href={`/constructor-standings/${s}`} class="season-card">
          <span class="season-text">{s}</span>
        </a>
      {/each}
    </div>
  {/if}
</main>
