export function load({ params }) {
  const { blob } = params;
  const code = atob(blob);
  return { code };
}
