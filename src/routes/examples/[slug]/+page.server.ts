import { getExample } from "$lib/examples.js";

export async function load({ params, fetch }) {
  const { slug } = params;

  const example = getExample(fetch, slug);

  return { example };
}
