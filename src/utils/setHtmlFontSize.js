export function setHtmlFontSize() {
  const html = document.documentElement;
  const htmlWidth = html.clientWidth;
  html.style.fontSize = `${(htmlWidth / 1366) * 12}px`;
  console.log('watch');
}

export function resetHtmlFontSize() {
  const html = document.documentElement;
  html.style.fontSize = 'inherit';
  console.log('解除');
}
