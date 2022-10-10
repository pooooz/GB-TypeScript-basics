export function renderBlock(elementId: string, html: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
}
