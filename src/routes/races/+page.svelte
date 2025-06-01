<!-- src/routes/races/+page.svelte -->
<script runes>
  // `data` kommt von +page.server.js → { races }
  export let data;
  const { races } = data;

  // Funktion, um den Pfad zur Flag-Datei zu ermitteln.
  // Ersetzt Leerzeichen durch Unterstrich und hängt ".png" an.
  function getFlagSrc(country) {
    if (!country) return "/images/placeholder.jpg";
    const fileName = country.replace(/ /g, "_") + ".png";
    return `/flags/${fileName}`;
  }

  // Nur zu Debug‐Zwecken:
  console.log("Races aus DB:", races);
</script>

<style>
  .page-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .new-link {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .new-link:hover {
    background-color: #218838;
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
    overflow: hidden;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  .race-flag {
    width: 100%;
    height: 120px;
    object-fit: cover;    /* Bild füllt die obere Fläche, zentriert und gegebenenfalls beschnitten */
    background-color: #eee; /* Falls Bild fehlt, grauer Hintergrund */
  }
  .race-content {
    padding: 0.75rem;
    flex: 1;              /* der restliche Bereich für Text */
    display: flex;
    flex-direction: column;
  }
  .race-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  .race-sub {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #555;
  }
</style>

<main>
  <h1 class="page-heading">Übersicht aller Rennen</h1>
  <a href="/races/new" class="new-link">+ Rennen anlegen</a>

  {#if races.length === 0}
    <p>Momentan sind keine Rennen verfügbar.</p>
  {:else}
    <div class="grid-wrapper">
      {#each races as race}
        <a href={`/races/${race._id}`} class="race-card">
          <!-- Flagge: berechne src anhand race.circuit.country -->
          <img
            src={getFlagSrc(race.circuit.country)}
            alt={`Flagge von ${race.circuit.country}`}
            on:error={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
            class="race-flag"
          />

          <!-- Inhalt der Card -->
          <div class="race-content">
            <!-- Rennname -->
            <h2 class="race-title">{race.name}</h2>
            <!-- Datum und Runde -->
            <p class="race-sub">
              Datum: {new Date(race.date).toLocaleDateString("de-CH")}
            </p>
            <p class="race-sub">
              Runde {race.round}
            </p>
            <!-- Circuit-Details -->
            <p class="race-sub">
              {race.circuit.name} ({race.circuit.location}, {race.circuit.country})
            </p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</main>
