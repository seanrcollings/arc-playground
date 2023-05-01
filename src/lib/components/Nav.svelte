<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  export let examples: ArcExample[];

  let open = false;
</script>

<nav class="w-10 flex flex-col justify-between bg-slate-800 text-white">
  <div class="text-xl">
    <button
      on:click={() => (open = !open)}
      class="hover:bg-slate-600 transition-colors p-2"
    >
      <i class="material-symbols-outlined">menu</i>
    </button>
  </div>
  <div class="w-full h-20 flex items-center justify-center bg-blue">
    <a
      href="https://arc.seancollings.dev"
      class="p-2 text-white font-bold"
      title="Arc Documentation"
    >
      <i class="material-symbols-outlined">description</i>
    </a>
  </div>
</nav>

{#if open}
  <div
    class="absolute left-0 top-0 h-screen text-white bg-slate-800 w-60 z-10 flex flex-col justify-between"
    transition:fly={{ x: -200 }}
  >
    <div class="p-2">
      <button
        on:click={() => (open = !open)}
        class="flex items-center gap-2 font-bold hover:bg-slate-600 w-full p-2 transition-colors rounded-sm"
      >
        <i class="material-symbols-outlined">menu</i>
        Arc Playground
      </button>

      <div class="border-t border-t-slate-500 pt-2 mt-2">
        <h1 class="text-xl font-bold mb-2">Examples</h1>
        <ul>
          {#each examples as example}
            <li
              class="p-2 my-2 hover:bg-slate-600 transition-colors rounded-sm"
              class:bg-blue={$page.params.slug === example.slug}
            >
              <a
                href="/examples/{example.slug}"
                on:click={() => (open = !open)}
              >
                <h3>{example.name}</h3>
                <p
                  class:text-gray-200={$page.params.slug === example.slug}
                  class:text-gray-500={$page.params.slug !== example.slug}
                  class="text-sm"
                >
                  {example.description}
                </p>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="w-full h-20 flex items-center justify-center bg-blue">
      <a
        href="https://arc.seancollings.dev"
        class="p-2 text-white font-bold flex items-center text-md gap-2"
        target="_blank"
      >
        <i class="material-symbols-outlined">description</i>
        Arc Documentation
      </a>
    </div>
  </div>
{/if}
