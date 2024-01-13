import { FALLBACK_EXAMPLE, getExampleIndex } from "$lib/examples";

export async function load({ fetch }) {
  let examples;

  try {
    examples = await getExampleIndex(fetch);
  } catch (e) {
    // In case of error, we don't want to crash the app, so we'll just
    // return a single example
    console.error(e);
    examples = [FALLBACK_EXAMPLE];
  }

  return { examples };
}
