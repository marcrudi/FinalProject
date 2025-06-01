<!-- src/routes/constructor-standings/+page.svelte -->
<script runes>
  // `data.seasons` kommt von +page.server.js
  export let data;
  const { seasons } = data;
</script>

<style>
  .page-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .grid-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
  }
  .season-card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 2rem;
    text-decoration: none;
    color: inherit;
    background-color: #f0f8ff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease-in-out;
  }
  .season-card:hover {
    transform: scale(1.03);
  }
  .season-text {
    font-size: 1.25rem;
    font-weight: bold;
  }
</style>

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
