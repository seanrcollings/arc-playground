import { error } from "@sveltejs/kit";

const url = "https://api.github.com/gists/c314336f9ddf2c95144412121203a17c";
let exampleCache: ArcExampleIndex[] | null = null;

export async function getExampleIndex(
  http: typeof fetch
): Promise<ArcExampleIndex[]> {
  if (exampleCache !== null) {
    return exampleCache;
  }

  const res = await http(url);
  const index = JSON.parse(
    (await res.json()).files["arc-examples.json"].content
  );
  exampleCache = index;
  return index;
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
    `https://raw.githubusercontent.com/seanrcollings/arc/master/docs/examples/${example.file}`
  );
  const code = await codeRes.text();

  return { ...example, code };
}
