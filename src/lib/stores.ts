import { writable } from "svelte/store";
import type { editor as monacoEditor } from "monaco-editor";

export const editor = writable<monacoEditor.IStandaloneCodeEditor | null>(null);
