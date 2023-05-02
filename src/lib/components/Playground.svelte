<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import Terminal from "./terminal/Terminal.svelte";
  import Editor from "./Editor.svelte";
  import { editor } from "$lib/stores";
  import { ExecutionHandler } from "$lib/executionHandler";
  import NotificationTrough from "./NotificationTrough.svelte";

  export let pyodide: PyodideInterface;
  export let example: ArcExample;

  let id = 1;
  let executions: ArcExecution[] = [];
  let notifications: AppNotification[] = [];

  const handler = new ExecutionHandler(pyodide);

  function addNotification(
    type: "info" | "error",
    message: string,
    timeout: number = 3000
  ) {
    const notifId = id++;
    notifications = [
      ...notifications,
      {
        id: notifId,
        type,
        message,
      },
    ];

    setTimeout(() => {
      notifications = notifications.filter((n) => n.id !== notifId);
    }, timeout);
  }

  async function execute(code: string, input: string = "") {
    executions = [
      ...executions,
      { id: id++, input, output: "", file: example.file },
    ];

    try {
      await handler.execute({
        file: example.file,
        code,
        input,
        onOutput: (output) => {
          const execution = executions.pop();
          if (!execution) return;
          execution.output += output + "\n";
          executions = [...executions, execution];
        },
      });
    } catch (e: any) {
      addNotification("error", e.toString());
    }
  }
</script>

<svelte:head>
  <title>Arc Playground</title>
</svelte:head>

<div class="flex flex-col h-full">
  <Editor code={example.code} />

  <Terminal
    on:execute={(e) => {
      execute($editor?.getValue() || "", e.detail.input);
    }}
    on:clear={() => {
      executions = [];
    }}
    on:share={() => {
      const value = $editor?.getValue() || "";
      let encoded = btoa(value);
      if (encoded.length >= 2000) {
        addNotification("error", "Code too long to share!");
      } else {
        navigator.clipboard.writeText(
          `${window.location.origin}/share/${encoded}`
        );
        addNotification("info", "📋 Copied link to clipboard!");
      }
    }}
    {example}
    {executions}
  />
</div>

<NotificationTrough bind:notifications />
