<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import Terminal from "../Terminal.svelte";
  import Editor from "./Editor.svelte";
  import { editor } from "$lib/stores";
  import { ExecutionHandler } from "$lib/executionHandler";

  export let pyodide: PyodideInterface;

  let id = 1;
  let executions: ArcExecution[] = [];

  const handler = new ExecutionHandler(pyodide);

  async function execute(code: string, input: string = "") {
    executions = [...executions, { id: id++, input, output: "" }];

    await handler.execute({
      code,
      input,
      onOutput: (output) => {
        const execution = executions.pop();
        if (!execution) return;
        execution.output += output + "\n";
        executions = [...executions, execution];
      },
    });
  }
</script>

<div class="flex flex-col h-full">
  <Editor />

  <Terminal
    on:execute={(e) => {
      execute($editor?.getValue() || "", e.detail.input);
    }}
    {executions}
  />
</div>
