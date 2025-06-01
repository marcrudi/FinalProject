<!-- src/routes/races/[raceId]/+page.svelte -->
<script runes>
  export let data;
  const { race, results } = data;
</script>

<style>
  /* ---------------------------------------------------------------------------------
     Überschrift und Metadaten oben
     --------------------------------------------------------------------------------- */
  .race-heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .race-meta {
    margin-bottom: 1rem;
    font-size: 0.9375rem; /* 15px */
    color: #374151;       /* dunkles Grau */
  }

  /* ---------------------------------------------------------------------------------
     Tabelle für Ergebnisse
     --------------------------------------------------------------------------------- */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #d1d5db; /* sehr helles Grau */
  }
  thead {
    background-color: #f3f4f6; /* hellgrau */
  }
  tr:hover {
    background-color: #fafafa;
  }
  .fl-cell {
    font-size: 0.875rem;
    color: #6b7280;
  }
  .no-fl {
    color: #9ca3af;
  }
</style>

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
      <th>FL*</th>
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

<p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
  * schnellste Runde
</p>
