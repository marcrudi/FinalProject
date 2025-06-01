<!-- src/routes/+page.svelte -->
<script runes>
  // reiner statischer Content, keine Logik erforderlich
</script>

<section class="welcome-container">
  <h1 class="welcome-title">Willkommen bei F1 Results</h1>

  <img
    src="/images/welcome.jpeg"
    alt="Formel 1 Rennszene"
    class="welcome-image"
  />

  <p class="welcome-text">
    Tauche ein in die Welt der Formel 1! Hier findest du alle wichtigen Statistiken, 
    Tabellen und Renninformationen auf einen Blick. Diese Seite bietet 
    dir umfassende Daten, anschaulich aufbereitet.
  </p>

  <h2 class="welcome-subtitle">So geht’s weiter</h2>
  <p class="welcome-text">
    Wähle in der Navigation :
  </p>
  <ol class="welcome-list-numbered">
    <li><a href="/races" class="link-highlight">Races</a> – für die komplette Liste aller Grand-Prix-Rennen.</li>
    <li><a href="/driver-standings" class="link-highlight">Driver Standings</a> – zur Übersicht der Fahrerplatzierungen pro Saison.</li>
    <li><a href="/constructor-standings" class="link-highlight">Constructor Standings</a> – um die Team-Wertungen einzusehen.</li>
  </ol>

  <p class="welcome-note">
    Viel Spass beim Stöbern und Verfolgen der Formel-1-Saison! 🏁
  </p>
</section>