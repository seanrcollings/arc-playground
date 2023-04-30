<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { loadPyodide } from "pyodide";
  import { pyodide } from "$lib/stores";
  import Spinner from "$lib/components/Spinner.svelte";

  onMount(async () => {
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
  });
</script>

{#if $pyodide}
  <div class="h-full flex">
    <nav class="w-20">test</nav>
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
