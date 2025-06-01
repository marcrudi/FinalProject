<!-- src/routes/races/new/+page.svelte -->
<script runes>
  // Die Action („default“) aus +page.server.js stellt uns 
  // ggf. ein `data`-Objekt mit Fehlern zur Verfügung.
  export let data;
</script>

<style>
  form {
    max-width: 500px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .error {
    color: #b00020;
    font-size: 0.9rem;
  }
  button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007acc;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #005fa3;
  }
</style>

<main>
  <h1>Neues Rennen anlegen</h1>

  <!-- Falls es vom Server Validation-Errors gab, hier anzeigen -->
  {#if data?.error}
    <p class="error">{data.error}</p>
  {/if}

  <form method="POST">
    <!-- saison (number) -->
    <label>
      Saison (z. B. 2025):
      <input name="season" type="number" required min="1900" placeholder="2025" />
    </label>

    <!-- runde (number) -->
    <label>
      Runde (z. B. 5):
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
