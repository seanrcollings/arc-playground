import { FALLBACK_EXAMPLE, getExampleIndex } from "$lib/examples";

export async function load({ fetch }) {
  let examples;

  try {
    examples = await getExampleIndex(fetch);
  } catch (e) {
    console.error(e);
    examples = [FALLBACK_EXAMPLE];
  }

  return {
    examples: await getExampleIndex(fetch),
  };
}
