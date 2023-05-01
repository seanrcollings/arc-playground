<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  export let examples: ArcExample[];

  let search = "";
  let open = true;

  $: filteredExamples = search
    ? examples.filter((example) =>
        example.name.toLowerCase().includes(search.toLowerCase())
      )
    : examples;
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
  <div
    class="w-full h-20 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 transition-colors"
  >
    <a
      href="https://arc.seancollings.dev"
      class="p-2 text-white font-bold"
      title="Arc Documentation"
      target="_blank"
      rel="noreferrer noopener"
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
        <div
          class="flex items-center mb-1 bg-black opacity-40 focus-within:opacity-60 p-1 gap-1 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 transition-opacity"
        >
          <i class="material-symbols-outlined">search</i>
          <input
            type="text"
            placeholder="Search..."
            bind:value={search}
            class="bg-transparent w-full outline-none"
          />
        </div>
        <ul class="max-h-[68vh] overflow-y-auto p-1">
          {#each filteredExamples as example}
            <li
              class="p-1 my-2 hover:bg-slate-600 transition-colors rounded-sm"
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
    <div class="">
      <a
        href="https://arc.seancollings.dev"
        class="h-20 p-2 text-white font-bold flex items-center text-md gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i class="material-symbols-outlined">description</i>
        Arc Documentation
      </a>
      <a
        href="https://github.com/seanrcollings/arc"
        class="h-20 p-2 text-white font-bold flex items-center text-md gap-2 bg-orange-500 hover:bg-orange-400 transition-colors"
        target="_blank"
      >
        <i class="material-symbols-outlined">code</i>
        Arc Sourcecode
      </a>
      <a
        href="https://github.com/seanrcollings/arc-playground"
        class="h-20 p-2 text-white font-bold flex items-center text-md gap-2 bg-orange-700 hover:bg-orange-600 transition-colors"
        target="_blank"
      >
        <i class="material-symbols-outlined">code</i>
        Playground Sourcecode
      </a>
    </div>
  </div>
{/if}
