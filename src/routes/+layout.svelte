<!-- src/routes/+layout.svelte -->
<script runes>
  import { onMount } from "svelte";
  
  // Default auf "dark" setzen
  let theme = "dark";

  // Beim ersten Laden ins localStorage schauen, 
  // falls schon mal ausgewählt --> setzen, ansonsten standard "light".
  onMount(() => {
    const saved = localStorage.getItem("theme");
    theme = saved === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  });

  // Toggle-Funktion, wechselt zwischen light ↔ dark
  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
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

   <!-- Theme-Toggle Button -->
  <button class="theme-toggle" on:click={toggleTheme}>
    {#if theme === "light"}
      <!-- Mond-Symbol bei Light Mode -->
      🌙
    {:else}
      <!-- Sonne-Symbol bei Dark Mode -->
      ☀️
    {/if}
  </button>
  
</nav>

<main>
  <slot />
</main>