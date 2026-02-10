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

export function warnIfMissingBootstrap(major = 5) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const rootStyles = getComputedStyle(document.documentElement);
  const bsBodyColor = rootStyles.getPropertyValue('--bs-body-color').trim();

  const probeMenu = document.createElement('div');
  probeMenu.className = 'dropdown-menu';
  probeMenu.style.position = 'absolute';
  probeMenu.style.visibility = 'hidden';
  document.body.appendChild(probeMenu);
  const menuStyles = getComputedStyle(probeMenu);
  document.body.removeChild(probeMenu);

  const hasBootstrap = bsBodyColor.length > 0 && menuStyles.position === 'absolute';
  if (!hasBootstrap) {
    // eslint-disable-next-line no-console
    console.warn(
      `fxd-select: Bootstrap ${major}.x styles not detected. ` +
      'The component will still work, but you should provide your own styles.'
    );
  }
}
