// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface ArcExecution {
    id: number;
    input: string;
    output: string;
    file: string;
  }

  interface ArcExample {
    slug: string;
    name: string;
    description: string;
    code: string;
    file: string;
    suggestions: string[];
  }

  interface AppNotification {
    id: number;
    type: "info" | "error";
    message: string;
  }

  type ArcExampleIndex = Omit<ArcExample, "code">;
}

export {};
