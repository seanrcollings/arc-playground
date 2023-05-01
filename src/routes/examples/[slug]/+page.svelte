<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import { pyodide } from "$lib/stores";
  import Playground from "$lib/components/Playground.svelte";

  export let data: PageData;
</script>

<div in:fade={{ duration: 500 }} class="h-full">
  <Playground pyodide={$pyodide} example={data.example} />
</div>
