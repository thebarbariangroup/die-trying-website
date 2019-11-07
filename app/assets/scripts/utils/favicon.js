export default function generateInlineFavicon () {
  const favicon = `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`;
  
  const faviconTag = document.createElement('link');
  faviconTag.rel = 'shortcut icon';
  faviconTag.type = 'image/x-icon';
  faviconTag.href = `data:image/png;base64,${ favicon }`;

  document.head.appendChild(faviconTag);
}