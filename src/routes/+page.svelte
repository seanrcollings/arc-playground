<script lang="ts">
  import Playground from "../lib/components/Playground.svelte";
  import { fade } from "svelte/transition";
  import { pyodide } from "$lib/stores";
</script>

<div in:fade={{ duration: 500 }} class="h-full">
  <Playground
    pyodide={$pyodide}
    example={{
      code: "",
      description: "",
      name: "",
      slug: "",
      file: "example.py",
      suggestions: [],
    }}
  />
</div>
