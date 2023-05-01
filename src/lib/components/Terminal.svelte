<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Convert from "ansi-to-html";

  export let example: ArcExample;
  export let executions: ArcExecution[];

  const convert = new Convert();

  let commandline = "";
  let wrapper: HTMLElement | null = null;
  let history: string[] = [];
  $: historyIndex = history.length;

  const dispatch = createEventDispatcher();

  $: {
    if (executions.length > 0) {
      setTimeout(() => {
        wrapper?.scrollIntoView();
      }, 0);
    }
  }

  function execute() {
    if (commandline !== "") {
      history.push(commandline);
      history = history;
    }
    dispatch("execute", {
      input: commandline,
    });
    commandline = "";
  }

  function formatOutput(output: string) {
    return convert.toHtml(output).replace(/(\r\n|\n|\r)/gm, "<br>");
  }
</script>

<div class="bg-zinc-900 text-gray-300 max-h-1/4 flex flex-col">
  <div class="border-y border-y-gray-700 flex p-1 gap-2">
    <button
      on:click={() => execute()}
      class="hover:bg-black opacity-40 p-1 pr-2 transition-colors flex items-center gap-1 rounded-sm"
    >
      <i class="material-symbols-outlined">play_arrow</i>
      run
    </button>
    <button
      on:click={() => dispatch("clear")}
      class="hover:bg-black opacity-40 p-1 pr-2 transition-colors flex items-center gap-1 rounded-sm"
    >
      <i class="material-symbols-outlined">delete</i>
      clear
    </button>

    <button
      on:click={() => dispatch("share")}
      class="hover:bg-black opacity-40 p-1 pr-2 transition-colors flex items-center gap-1 rounded-sm ml-auto"
    >
      <i class="material-symbols-outlined">share</i>
      share
    </button>
  </div>
  <label
    for="terminal"
    class="block overflow-y-auto whitespace-pre px-2 h-64 font-mono"
  >
    {#each executions as execution (execution.id)}
      <div>
        <span class="text-gray-400">$ python {execution.file}</span>
        {execution.input}
        <div>
          {@html formatOutput(execution.output)}
        </div>
      </div>
      <br />
    {/each}

    <div class="flex gap-2" bind:this={wrapper}>
      <span class="whitespace-nowrap text-gray-400"
        >$ python {example.file}</span
      >
      <input
        type="text"
        class="bg-transparent outline-none w-full"
        id="terminal"
        bind:value={commandline}
        on:keyup={(e) => {
          if (e.key === "Enter") {
            execute();
          } else if (e.key === "ArrowUp") {
            if (historyIndex > 0) {
              historyIndex--;
              commandline = history[historyIndex];
            }
          } else if (e.key === "ArrowDown") {
            if (historyIndex < history.length - 1) {
              historyIndex++;
              commandline = history[historyIndex];
            }
          }
        }}
      />
    </div>
    <br />
  </label>
</div>
