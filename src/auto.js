import { FxdSelect } from './core/FxdSelect.js';

const instanceMap = new WeakMap();

function toCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function parseValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  if (value !== '' && !Number.isNaN(Number(value))) return Number(value);
  if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function optionsFromDataset(dataset) {
  const options = {};
  Object.entries(dataset).forEach(([key, value]) => {
    if (!key.startsWith('fxdsel')) return;
    const raw = key.replace(/^fxdsel/, '');
    const prop = toCamel(raw.charAt(0).toLowerCase() + raw.slice(1));
    options[prop] = parseValue(value);
  });
  return options;
}

export function initFxdSelects(root = document) {
  const nodes = root.querySelectorAll('select[data-fxd-select], select.fxd-init-select');
  nodes.forEach((selectEl) => {
    if (instanceMap.has(selectEl)) return;
    const options = optionsFromDataset(selectEl.dataset);
    const instance = new FxdSelect(selectEl, options);
    instanceMap.set(selectEl, instance);
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initFxdSelects();
  });
}

export { FxdSelect };
