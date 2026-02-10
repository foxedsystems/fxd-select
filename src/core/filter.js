export function defaultFilter(query, option) {
  if (!query) return true;
  return option.label.toLowerCase().includes(query.toLowerCase());
}

export function applyFilter(listEl, query, filterFn) {
  const groupState = new Map();
  let hidden = 0;
  let visible = 0;

  Array.from(listEl.children).forEach((item) => {
    if (item.classList.contains('dropdown-header')) {
      groupState.set(item.dataset.group || '', { header: item, visible: 0 });
      return;
    }

    if (!item.matches('button.dropdown-item')) return;

    const option = { label: item.textContent };
    const show = filterFn(query, option);
    item.classList.toggle('d-none', !show);
    if (!show) hidden += 1;
    if (show) visible += 1;

    const groupKey = item.dataset.group || '';
    if (groupState.has(groupKey) && show) {
      groupState.get(groupKey).visible += 1;
    }
  });

  groupState.forEach(({ header, visible }) => {
    header.classList.toggle('d-none', visible === 0);
  });

  return { hidden, visible };
}
