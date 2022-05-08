/**
 * @typedef Paragraph
 * @property {string} id
 * @property {"bullet" | "evidence" | "dialogue"} kind
 * @property {string} text
 * @property {string | null} image
 */

export function newParagraph(kind, text = "", image = null) {
  const id = Math.random().toString(16).slice(2, 10);
  return { id, kind, text, image };
}

export function isValidParagraph(p) {
  if (p.kind == "bullet") return p.text.trim();
  if (p.kind == "dialogue") return !!p.image || p.text.trim();
  if (p.kind == "evidence") return p.image;
  return false;
}

const markdownConverters = {
  bullet: p => `[${p.text}](#bullet)`,

  evidence: p => `[${p.text}](${p.image}#evidence)`,

  dialogue: p => {
    if (!p.image) {
      return p.text;
    }
    const text = p.text.split(' ');
    return `[${text.splice(0, 1)}](${p.image}) ${text.join(' ')}`;
  }
};

export function toMarkdown(p) {
  const converter = markdownConverters[p.kind] || markdownConverters.dialogue;
  return converter(p);
}

const PARAGRAPH_STORAGE_KEY = 'composer:paragraphs';

export function getStoredParagraphs() {
  const defaultItems = [newParagraph("dialogue")];
  try {
    const storage = localStorage.getItem(PARAGRAPH_STORAGE_KEY);
    const storedItems = JSON.parse(storage);
    return storedItems ? storedItems : defaultItems;
  }
  catch {
    return defaultItems;
  }
}

export function storeParagraphs(items) {
  localStorage.setItem(PARAGRAPH_STORAGE_KEY, JSON.stringify(items));
}
