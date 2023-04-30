<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Convert from "ansi-to-html";

  export let prefix: string = "python example.py";
  export let executions: ArcExecution[];

  const convert = new Convert();

  let commandline = "";
  let wrapper: HTMLElement | null = null;

  const dispatch = createEventDispatcher();

  $: {
    if (executions.length > 0) {
      setTimeout(() => {
        wrapper?.scrollIntoView();
      }, 0);
    }
  }

  function onEnter() {
    dispatch("execute", {
      input: commandline,
    });
  }

  function formatOutput(output: string) {
    console.log(output);
    return convert.toHtml(output).replace(/(\r\n|\n|\r)/gm, "<br>");
  }
</script>

<label
  class="bg-gray-900 text-gray-300 font-mono h-1/4 border-t border-t-gray-500 overflow-y-auto whitespace-pre"
  for="terminal"
>
  {#each executions as exececution (exececution.id)}
    <div>
      <span class="text-gray-400">$ {prefix}</span>
      {exececution.input}
      <div>
        {@html formatOutput(exececution.output)}
      </div>
      <!-- <pre>
{exececution.output}
      </pre> -->
    </div>
  {/each}

  <div class="flex gap-2" bind:this={wrapper}>
    <span class="whitespace-nowrap text-gray-400">$ {prefix}</span>
    <input
      type="text"
      class="bg-transparent outline-none w-full"
      id="terminal"
      bind:value={commandline}
      on:keypress={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
    />
  </div>
</label>
