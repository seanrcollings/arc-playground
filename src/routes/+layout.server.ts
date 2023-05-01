import { getExampleIndex } from "$lib/examples";

export async function load({ fetch }) {
  return {
    examples: await getExampleIndex(fetch),
  };
}
