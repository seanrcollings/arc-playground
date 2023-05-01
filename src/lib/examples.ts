import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import { GITHUB_API_TOKEN } from "$env/static/private";

const url = "https://api.github.com/gists/c314336f9ddf2c95144412121203a17c";
let exampleCache: ArcExampleIndex[] | null = null;

export async function getExampleIndex(
  http: typeof fetch
): Promise<ArcExampleIndex[]> {
  if (exampleCache !== null && !dev) {
    return exampleCache;
  }

  const res = await http(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    },
  });
  const json = await res.json();
  const index = JSON.parse(json.files["arc-examples.json"].content);
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
    `https://raw.githubusercontent.com/seanrcollings/arc/master/docs/examples/${example.file}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    }
  );
  const code = await codeRes.text();

  return { ...example, code };
}
