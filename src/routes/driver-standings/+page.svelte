<!-- src/routes/driver-standings/+page.svelte -->
<script runes>
  // `data` enthält das, was load() zurückgibt: { seasons: number[] }
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
    /* minmax(200px, 1fr) → Kachel mindestens 200px breit */
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
    background-color: #fafafa;
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
