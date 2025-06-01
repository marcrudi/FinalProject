<!-- src/routes/+layout.svelte -->
<script runes>
  // Im Layout brauchen wir aktuell keine weitere Logik.
</script>

<style>
  /* --------------------------------------------------------
     Navigation - dunkelgrauer Hintergrund, weiße Schrift
     -------------------------------------------------------- */
  nav {
    background-color: #1f2937; /* dunkles Grau/Blau */
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Der Link zur Mainpage (links) - etwas größer */
  .nav-logo {
    font-size: 1.25rem;
    font-weight: 600;
    text-decoration: none;
    color: white;
  }

  /* Container für die Navigations-Links (rechts) */
  .nav-links a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
    font-weight: 500;
  }

  .nav-links a:hover {
    text-decoration: underline;
  }

  /* Hauptbereich unterhalb der Navigation */
  main {
    padding: 1rem;
  }
</style>

<nav>
  <!-- Ganz links: Title/Logo, das auf "/" zeigt -->
  <a href="/" class="nav-logo">F1 Results</a>

  <!-- Rechts: Links zu den Haupt-Seiten -->
  <div class="nav-links">
    <a href="/races">Races</a>
    <a href="/driver-standings">Driver Standings</a>
    <a href="/constructor-standings">Constructor Standings</a>
  </div>
</nav>

<main>
  <slot />
</main>