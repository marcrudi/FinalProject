<!-- src/routes/races/+page.svelte -->
<script runes>
  // `data` kommt von +page.server.js → { races }
  export let data;
  const { races } = data;

  // Nur zu Debug‐Zwecken: 
  console.log("Races aus DB:", races);
</script>

<style>
  .page-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .grid-wrapper {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    padding: 1rem;
  }
  .race-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
    text-decoration: none;
    color: inherit;
  }
  .race-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  .race-sub {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }
</style>

<main>
  <h1 class="page-heading">Übersicht aller Rennen</h1>

  {#if races.length === 0}
    <p>Momentan sind keine Rennen verfügbar.</p>
  {:else}
    <div class="grid-wrapper">
      {#each races as race}
        <a href={`/races/${race._id}`} class="race-card">
          <!-- Rennname -->
          <h2 class="race-title">{race.name}</h2>
          <!-- Datum und Runde -->
          <p class="race-sub">
            Datum: {new Date(race.date).toLocaleDateString("de-CH")}<br />
            Runde {race.round}
          </p>
          <!-- Circuit (optional, falls du das anzeigen willst) -->
          <p class="race-sub">
            {race.circuit.name} ({race.circuit.location}, {race.circuit.country})
          </p>
        </a>
      {/each}
    </div>
  {/if}
</main>
