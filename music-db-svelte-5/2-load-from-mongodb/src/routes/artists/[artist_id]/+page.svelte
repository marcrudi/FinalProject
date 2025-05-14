<script>
  let { data } = $props();
</script>

<h1>Artist (ID: {data.artist._id})</h1>
<a href="/artists">Back</a>
<div class="mt-3">
  <p>Name: {data.artist.name}</p>
  <p>Origin: {data.artist.origin}</p>
</div>
