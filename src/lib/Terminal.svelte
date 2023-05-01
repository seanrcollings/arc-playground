<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Convert from "ansi-to-html";

  export let prefix: string = "python example.py";
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
  }

  function formatOutput(output: string) {
    return convert.toHtml(output).replace(/(\r\n|\n|\r)/gm, "<br>");
  }
</script>

<div class="bg-zinc-900 text-gray-300 max-h-1/4 font-mono flex flex-col">
  <div class="border-y border-y-gray-700 px-2">
    <button
      on:click={() => execute()}
      class="hover:bg-slate-800 p-1 transition-colors"
    >
      run
    </button>
    <button
      on:click={() => dispatch("clear")}
      class="hover:bg-slate-800 p-1 transition-colors"
    >
      clear
    </button>
  </div>
  <label for="terminal" class="block overflow-y-auto whitespace-pre px-2 h-64">
    {#each executions as exececution (exececution.id)}
      <div>
        <span class="text-gray-400">$ {prefix}</span>
        {exececution.input}
        <div>
          {@html formatOutput(exececution.output)}
        </div>
      </div>
      <br />
    {/each}

    <div class="flex gap-2" bind:this={wrapper}>
      <span class="whitespace-nowrap text-gray-400">$ {prefix}</span>
      <input
        type="text"
        class="bg-transparent outline-none w-full"
        id="terminal"
        bind:value={commandline}
        on:keyup={(e) => {
          if (e.key === "Enter") {
            execute();
            commandline = "";
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
