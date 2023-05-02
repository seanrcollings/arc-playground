<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Convert from "ansi-to-html";
  import ActionButton from "./ActionButton.svelte";
  import InputSuggestions from "./InputSuggestions.svelte";

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
    <ActionButton icon="play_arrow" on:click={execute}>run</ActionButton>
    <ActionButton icon="delete" on:click={() => dispatch("clear")}>
      clear
    </ActionButton>
    {#if example.suggestions.length > 0}
      <InputSuggestions
        file={example.file}
        suggestions={example.suggestions}
        on:choose={(e) => (commandline = e.detail)}
      />
    {/if}

    <ActionButton
      icon="share"
      on:click={() => dispatch("share")}
      class="ml-auto"
    >
      share
    </ActionButton>
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
