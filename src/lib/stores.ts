import { writable } from "svelte/store";
import type { editor as monacoEditor } from "monaco-editor";
import type { PyodideInterface } from "pyodide";

export const editor = writable<monacoEditor.IStandaloneCodeEditor | null>(null);
export const pyodide = writable<PyodideInterface>(null as any);
