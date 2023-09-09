export const getColorFromValue = (value: number) => {
  return `rgba(255, 255, 0, ${value > 0.1 ? value + 0.2 : 0})`;
};

export const getEntriesFromText = (html: string = '') => {
  let copiedHtml = html;
  const matches = Array.from(html.matchAll(/<span[^>]+>(.*?)<\/span>/gi));

  matches.forEach((match) => {
    const entry = match[0];
    const text = match[1];
    const value = Number(Array.from(entry.matchAll(/data-value=\\?"?([.\d]+)\\?"?/gi))[0]?.[1]) || 0;

    copiedHtml = copiedHtml.replace(
      match[0],
      `<span class="hintText" data-value="${value}" style="background-color: ${getColorFromValue(
        value
      )}; /*padding: 0 2px; margin: 0 -2px;*/">${text}</span>`
    );
  });

  return copiedHtml;
};
