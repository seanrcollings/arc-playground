<script lang="ts">
  import { onMount } from "svelte";
  import { editor } from "$lib/stores";
  import Spinner from "./Spinner.svelte";
  import { fade } from "svelte/transition";

  let loading = true;

  onMount(async () => {
    const monaco = await import("monaco-editor");
    self.MonacoEnvironment = {
      getWorker: (workerId, label) => {
        const getWorkerModule = (moduleUrl: string, label: string) => {
          // @ts-ignore
          return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
            name: label,
            type: "module",
          });
        };

        switch (label) {
          case "json":
            return getWorkerModule(
              "/monaco-editor/esm/vs/language/json/json.worker?worker",
              label
            );
          case "css":
          case "scss":
          case "less":
            return getWorkerModule(
              "/monaco-editor/esm/vs/language/css/css.worker?worker",
              label
            );
          case "html":
          case "handlebars":
          case "razor":
            return getWorkerModule(
              "/monaco-editor/esm/vs/language/html/html.worker?worker",
              label
            );
          case "typescript":
          case "javascript":
            return getWorkerModule(
              "/monaco-editor/esm/vs/language/typescript/ts.worker?worker",
              label
            );
          default:
            return getWorkerModule(
              "/monaco-editor/esm/vs/editor/editor.worker?worker",
              label
            );
        }
      },
    };

    monaco.editor.onDidCreateEditor(() => {
      loading = false;
    });

    $editor = monaco.editor.create(
      document.getElementById("editor-container")!,
      {
        value: `
import arc

@arc.command
def command():
    print("Hello, world!")

command()
            `,
        language: "python",
        theme: "vs-dark",
      }
    );
  });
</script>

<svelte:window on:resize={() => $editor && $editor.layout()} />

<div id="editor-container" class="flex-grow bg-slate-700">
  {#if loading}
    <h1 class="flex items-center justify-center h-full text-white text-2xl">
      <Spinner />
      <span> Loading editor... </span>
    </h1>
  {/if}
</div>

<style>
  h1 {
    background-color: #1e1e1e;
  }
</style>
