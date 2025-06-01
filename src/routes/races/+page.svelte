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

</script>

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
