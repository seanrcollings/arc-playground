<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let file: string;
  export let suggestions: string[];

  const dispatcher = createEventDispatcher();

  let open = false;
</script>

<div class="relative h-full">
  <button
    class="bg-transparent hover:bg-zinc-800 px-2 text-gray-500 h-full flex items-center gap-1 rounded-sm"
    on:click={() => (open = !open)}
  >
    <span class="material-symbols-outlined"> assistant </span>
    Input Suggestions
  </button>

  <div
    class="absolute bg-zinc-800 top-11 p-2 rounded-md border border-zinc-600 max-w-3xl overflow-x-auto"
    class:hidden={!open}
  >
    {#each suggestions as suggestion}
      <button
        class="font-mono hover:bg-zinc-700 w-full text-left p-2 rounded-md whitespace-nowrap text-ellipsis block"
        on:click={() => {
          dispatcher("choose", suggestion);
          open = false;
        }}
      >
        <span class="text-gray-500"> python {file} </span>
        {suggestion}
      </button>
    {/each}
  </div>
</div>
