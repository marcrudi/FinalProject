<!-- src/routes/driver-standings/[season]/+page.svelte -->
<script runes>
  export let data;
  const { season, driverStandings } = data;
</script>

<style>
  .page-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .no-data {
    font-style: italic;
    color: #666;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }
  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: left;
  }
  th {
    background-color: #f5f5f5;
  }
</style>

<main>
  <h1 class="page-heading">Fahrer-Standings {season}</h1>

  {#if driverStandings.length === 0}
    <p class="no-data">Keine Fahrer-Punkte für Saison {season} gefunden.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Platz</th>
          <th>Fahrer</th>
          <th>Kürzel</th>
          <th>Nationalität</th>
          <th>Punkte</th>
        </tr>
      </thead>
      <tbody>
        {#each driverStandings as ds, i}
          <tr>
            <td>{i + 1}</td>
            <td>{ds.name}</td>
            <td>{ds.code}</td>
            <td>{ds.nationality}</td>
            <td>{ds.totalPoints}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
