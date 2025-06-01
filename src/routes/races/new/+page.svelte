<!-- src/routes/races/new/+page.svelte -->
<script runes>
  // Die Action („default“) aus +page.server.js stellt uns 
  // ggf. ein `data`-Objekt mit Fehlern zur Verfügung.
  export let data;
</script>


<main>
  <h1>Neues Rennen anlegen</h1>

  <!-- Falls es vom Server Validation-Errors gab, hier anzeigen -->
  {#if data?.error}
    <p class="error">{data.error}</p>
  {/if}

  <form method="POST">
    <!-- saison (number) -->
    <label>
      Saison :
      <input name="season" type="number" required min="1900" placeholder="2025" />
    </label>

    <!-- runde (number) -->
    <label>
      Runde :
      <input name="round" type="number" required min="1" placeholder="1" />
    </label>

    <!-- rennname -->
    <label>
      Name des Rennens:
      <input name="name" type="text" required placeholder="Grand Prix von Deutschland" />
    </label>

    <!-- datum -->
    <label>
      Datum (TT-MM-JJJJ):
      <input name="date" type="date" required />
    </label>

    <!-- circuit name -->
    <label>
      Circuit-Name:
      <input name="circuitName" type="text" required placeholder="Hockenheimring" />
    </label>

    <!-- circuit location -->
    <label>
      Circuit-Location:
      <input name="circuitLocation" type="text" required placeholder="Hockenheim" />
    </label>

    <!-- circuit country -->
    <label>
      Circuit-Land:
      <input name="circuitCountry" type="text" required placeholder="Deutschland" />
    </label>

    <button type="submit">Rennen speichern</button>
  </form>
</main>
