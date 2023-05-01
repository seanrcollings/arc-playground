<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { loadPyodide } from "pyodide";
  import { pyodide } from "$lib/stores";
  import Spinner from "$lib/components/Spinner.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  export let data: PageData;
  let loading = true;

  onMount(async () => {
    if ($page.status !== 200) {
      loading = false;
      return;
    }

    const localPyodide = await loadPyodide({ indexURL: "/pyodide/" });
    await localPyodide.loadPackage("micropip");
    const micropip = localPyodide.pyimport("micropip");
    await micropip.install("arc-cli>=8.1.4-a2");
    if (dev) {
      await localPyodide.runPython(`
      import micropip
      print(micropip.list())
    `);
    }

    $pyodide = localPyodide;
    loading = false;
  });
</script>

{#if !loading}
  <div class="h-full flex">
    <Nav examples={data.examples} />
    <main class="h-full w-full">
      <slot />
    </main>
  </div>
{:else}
  <div class="flex items-center justify-center h-full text-white text-2xl">
    <Spinner />
    <p>Loading Application...</p>
  </div>
{/if}

<style lang="postcss">
  :global(html),
  :global(body) {
    height: 100%;
    background-color: theme(colors.slate.700);
  }
</style>
