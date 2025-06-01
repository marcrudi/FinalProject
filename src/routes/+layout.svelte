<!-- src/routes/+layout.svelte -->
<script runes>
  // Im Layout brauchen wir aktuell keine weitere Logik.
</script>

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