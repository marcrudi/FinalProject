<!-- src/routes/driver-standings/[season]/+page.svelte -->
<script runes>
  export let data;
  const { season, driverStandings } = data;
</script>

<main>
  <h1 class="page-heading">Driver-Standings {season}</h1>

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
