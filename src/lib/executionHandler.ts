import type { PyodideInterface } from "pyodide";

interface ExecutionOptions {
  code: string;
  input: string;
  onOutput: (output: string) => void;
}

export class ExecutionHandler {
  constructor(private pyodide: PyodideInterface) {
    this.pyodide = pyodide;
  }

  public async execute({
    code,
    input,
    onOutput,
  }: ExecutionOptions): Promise<void> {
    let buffer = "";

    const update = (n: number) => {
      const char = String.fromCharCode(n);
      if (char === "\n") {
        onOutput(buffer);
        buffer = "";
      } else {
        buffer += char;
      }
    };
    this.pyodide.setStdout({
      raw: update,
      isatty: true,
    });
    this.pyodide.setStderr({
      raw: update,
      isatty: true,
    });

    try {
      await this.pyodide.runPython(this.preprocess(code, input));
    } catch (e: any) {
      if (e.name === "PythonError") {
        if (e.type !== "Exit") {
          onOutput(e.message);
        }
      } else {
        throw e;
      }
    }
  }

  private preprocess(code: string, input: string): string {
    return `
import sys
import shlex
sys.argv = ["example.py", *shlex.split("${input}")]

${code}
`;
  }
}
