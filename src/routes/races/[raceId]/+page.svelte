<!-- src/routes/races/[raceId]/+page.svelte -->
<script runes>
  export let data;
  const { race, results } = data;
</script>

<h1 class="race-heading">{race.name} ({race.season})</h1>
<p class="race-meta">
  <strong>Circuit:</strong> {race.circuit.name}, {race.circuit.location} ({race.circuit.country})<br />
  <strong>Runde:</strong> {race.round} &nbsp;·&nbsp; 
  <strong>Datum:</strong> {new Date(race.date).toLocaleDateString("de-CH")}
</p>

<table>
  <thead>
    <tr>
      <th>Pos.</th>
      <th>Fahrer</th>
      <th>Team</th>
      <th>Zeit</th>
      <th>Punkte</th>
      <th>Fastest Lap</th>
    </tr>
  </thead>
  <tbody>
    {#each results as r}
      <tr>
        <td>{r.position}</td>
        <td>{r.driverInfo.firstName} {r.driverInfo.lastName}</td>
        <td>{r.constructorInfo.name}</td>
        <td>{r.time}</td>
        <td>{r.points}</td>
        <td class="fl-cell">
          {#if r.fastestLap.lap}
            Runde {r.fastestLap.lap} · {r.fastestLap.time}
          {:else}
            <span class="no-fl">–</span>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

