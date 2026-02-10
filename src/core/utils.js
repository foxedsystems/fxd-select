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

let bootstrapChecked = false;
let bootstrapCheckScheduled = false;

export function warnIfMissingBootstrap(major = 5) {
  if (bootstrapChecked || bootstrapCheckScheduled) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const runCheck = () => {
    bootstrapCheckScheduled = false;
    if (bootstrapChecked) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const bsBodyColor = rootStyles.getPropertyValue('--bs-body-color').trim();
    const bsBodyBg = rootStyles.getPropertyValue('--bs-body-bg').trim();
    const hasBootstrap = bsBodyColor.length > 0 || bsBodyBg.length > 0;

    if (!hasBootstrap) {
      // eslint-disable-next-line no-console
      console.warn(
        `fxd-select: Bootstrap ${major}.x styles not detected. ` +
        'The component will still work, but you should provide your own styles.'
      );
    }

    bootstrapChecked = true;
  };

  bootstrapCheckScheduled = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(runCheck), { once: true });
  } else {
    requestAnimationFrame(runCheck);
  }
}
