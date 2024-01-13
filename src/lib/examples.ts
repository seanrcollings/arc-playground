import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";

const url =
  "https://gist.githubusercontent.com/seanrcollings/091312f9198166487398d7a0a1b2b44c/raw/arc-examples.json";
let exampleCache: ArcExampleIndex[] | null = null;

export async function getExampleIndex(
  http: typeof fetch
): Promise<ArcExampleIndex[]> {
  if (exampleCache !== null && !dev) {
    return exampleCache;
  }

  const res = await http(url);

  if (!res.ok) {
    throw error(res.status, `Could not fetch examples`);
  }

  const json = await res.json();
  exampleCache = json;
  return json;
}

export async function getExample(
  http: typeof fetch,
  slug: string
): Promise<ArcExample> {
  const examples = await getExampleIndex(http);
  const example = examples.find((example) => example.slug === slug);

  if (!example) {
    throw error(404, `Could not find example "${slug}"`);
  }

  const codeRes = await http(
    `https://raw.githubusercontent.com/seanrcollings/arc/main/docs/examples/${example.file}`
  );
  const code = await codeRes.text();

  return { ...example, code };
}

export const FALLBACK_EXAMPLE: ArcExample = {
  slug: "hello-world",
  name: "Hello World",
  description: "A simple example",
  file: "hello_world.py",
  code: `import arc

  @arc.command
  def hello(name: str):
      print(f"Hello, {name}!")

  hello()
  `,
  suggestions: ["--help"],
};
