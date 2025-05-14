<script>
  let { data, form } = $props();
</script>

<h1>Artist (ID: {data.artist._id})</h1>
<a href="/artists">Back</a>
<form class="mt-3" method="POST" action="?/update">
  <input type="hidden" name="_id" value={data.artist._id} />
  <div class="mb-3">
    <label class="form-label" for="">Name</label>
    <input
      name="name"
      bind:value={data.artist.name}
      class="form-control"
      type="text"
    />
  </div>
  <div class="mb-3">
    <label class="form-label" for="">Origin</label>
    <input
      name="origin"
      bind:value={data.artist.origin}
      class="form-control"
      type="text"
    />
  </div>
  <button class="btn btn-primary">Save</button>
</form>

{#if form?.success}
  <p>Artist updated</p>
{/if}
