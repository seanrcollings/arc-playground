<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { onMount } from "svelte";
  import { loadPyodide } from "pyodide";
  import type { PyodideInterface } from "pyodide";
  import Playground from "../lib/components/Playground.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { fade } from "svelte/transition";

  let pyodide: PyodideInterface | null = null;

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

    pyodide = localPyodide;
  });
</script>

{#if pyodide}
  <div in:fade={{ duration: 500 }} class="h-full">
    <Playground {pyodide} />
  </div>
{:else}
  <div class="flex items-center justify-center h-full text-white text-2xl">
    <Spinner />
    <p>Loading Application...</p>
  </div>
{/if}
