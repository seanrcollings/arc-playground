<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="w-full h-full flex items-center justify-center text-white">
  <h1 class="text-2xl font-bold">
    {$page.status}:
    {$page?.error?.message}
  </h1>
</div>
