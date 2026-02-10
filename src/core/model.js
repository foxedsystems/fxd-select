export function parseSelect(selectEl) {
  const options = [];

  selectEl.querySelectorAll('option').forEach((opt) => {
    options.push({
      value: opt.value,
      label: opt.textContent,
      selected: opt.selected,
      disabled: opt.disabled,
      group: opt.parentElement?.tagName === 'OPTGROUP' ? opt.parentElement.label : null,
      element: opt,
    });
  });

  return options;
}

export function normalizeOptions(data, selectEl) {
  if (!Array.isArray(data)) return [];

  const selectedValues = selectEl?.multiple
    ? new Set(Array.from(selectEl.selectedOptions).map((opt) => opt.value))
    : new Set([selectEl?.value]);

  return data.map((item) => {
    const value = item.value ?? '';
    const label = item.label ?? String(value);
    const selected = typeof item.selected === 'boolean'
      ? item.selected
      : selectedValues.has(value);

    return {
      value,
      label,
      selected,
      disabled: Boolean(item.disabled),
      group: item.group ?? null,
      element: null,
    };
  });
}

export function buildModel(selectEl, options = {}) {
  if (Array.isArray(options.data)) {
    return normalizeOptions(options.data, selectEl);
  }
  return parseSelect(selectEl);
}

export function syncSelectWithModel(selectEl, model) {
  const currentGroups = new Map();
  selectEl.innerHTML = '';

  model.forEach((opt) => {
    let parent = selectEl;
    if (opt.group) {
      if (!currentGroups.has(opt.group)) {
        const groupEl = document.createElement('optgroup');
        groupEl.label = opt.group;
        currentGroups.set(opt.group, groupEl);
        selectEl.appendChild(groupEl);
      }
      parent = currentGroups.get(opt.group);
    }

    const optionEl = document.createElement('option');
    optionEl.value = opt.value;
    optionEl.textContent = opt.label;
    optionEl.disabled = Boolean(opt.disabled);
    optionEl.selected = Boolean(opt.selected);
    parent.appendChild(optionEl);
  });
}
