<!-- src/routes/constructor-standings/[season]/+page.svelte -->
<script runes>
  export let data;
  const { season, constructorStandings } = data;
</script>

<main>
  <h1 class="page-heading">Constructor-Standings {season}</h1>

  {#if constructorStandings.length === 0}
    <p class="no-data">Keine Konstrukteurs-Punkte für Saison {season} gefunden.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Platz</th>
          <th>Konstrukteur</th>
          <th>Nationalität</th>
          <th>Punkte</th>
        </tr>
      </thead>
      <tbody>
        {#each constructorStandings as cs, i}
          <tr>
            <td>{i + 1}</td>
            <td>{cs.name}</td>
            <td>{cs.nationality}</td>
            <td>{cs.totalPoints}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
