<script>
  let { data } = $props();
</script>

<h1>List of all Albums</h1>
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Released</th>
      <th>Label</th>
    </tr>
  </thead>
  <tbody>
    {#each data.albums as album}
      <tr>
        <td>
          <a href={"/albums/" + album._id}>
            {album._id}
          </a>
        </td>
        <td>
          {album.title}
        </td>
        <td>
          {album.released}
        </td>
        <td>
          {album.label}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
