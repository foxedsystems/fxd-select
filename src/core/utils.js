let idCounter = 0;

export function createId(prefix) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function addClasses(el, classString) {
  if (!classString) return;
  classString.split(' ').forEach((c) => {
    if (c) el.classList.add(c);
  });
}

export function dispatchEvent(el, name, detail = {}) {
  el.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
}
