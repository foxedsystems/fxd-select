import { addClasses, createId } from './utils.js';

function updateButtonLabel(ui, model, options, selectEl) {
  if (typeof options.renderValue === 'function') {
    const rendered = options.renderValue(model, selectEl);
    if (rendered instanceof HTMLElement) {
      ui.button.innerHTML = '';
      ui.button.appendChild(rendered);
      return;
    }
    ui.button.innerHTML = rendered ?? '';
    return;
  }

  const selected = model.filter((opt) => opt.selected);
  if (selected.length === 0) {
    ui.button.textContent = options.placeholder;
    return;
  }

  if (selectEl.multiple) {
    if (options.multiValueStyle === 'pills') {
      const container = document.createElement('span');
      container.className = options.pillContainerClass;

      const max = Math.max(0, options.maxDisplayItems);
      const visibleLimit = max + 1;
      const visibleLabels = selected.slice(0, Math.min(selected.length, visibleLimit));
      visibleLabels.forEach((opt) => {
        const pill = document.createElement('span');
        pill.className = options.pillClass;
        pill.textContent = opt.label;
        container.appendChild(pill);
      });

      const remaining = selected.length - visibleLabels.length;
      if (remaining > 0) {
        const count = document.createElement('span');
        count.className = options.selectionCountClass;
        const tpl = options.selectionCountTemplate;
        count.textContent = typeof tpl === 'function' ? tpl(remaining) : `${remaining} selected`;
        container.appendChild(count);
      }

      ui.button.innerHTML = '';
      ui.button.appendChild(container);
      return;
    }

    if (options.multiValueStyle === 'count') {
      const tpl = options.selectionCountTemplate;
      const text = typeof tpl === 'function' ? tpl(selected.length) : `${selected.length} selected`;
      ui.button.innerHTML = `<span class="${options.selectionCountClass}">${text}</span>`;
      return;
    }

    const max = Math.max(0, options.maxDisplayItems);
    const visibleLimit = max + 1;
    if (selected.length > visibleLimit) {
      const remaining = selected.length - visibleLimit;
      const tpl = options.selectionCountTemplate;
      ui.button.textContent = typeof tpl === 'function' ? tpl(remaining) : `${remaining} selected`;
      return;
    }
    ui.button.textContent = selected.map((opt) => opt.label).join(', ');
    return;
  }

  ui.button.textContent = selected[0].label;
}

export function render(selectEl, model, options, existingUi = null) {
  const ui = existingUi || {};

  if (!existingUi) {
    ui.wrapper = document.createElement('div');
    ui.wrapper.className = 'dropdown fxd-select';
    addClasses(ui.wrapper, options.wrapperClass);

    ui.control = document.createElement('div');
    ui.control.className = 'd-flex align-items-center gap-1';

    ui.button = document.createElement('button');
    ui.button.type = 'button';
    ui.button.className = options.buttonClass;
    ui.button.setAttribute('role', 'combobox');
    ui.button.setAttribute('aria-haspopup', 'listbox');
    ui.button.setAttribute('aria-expanded', 'false');

    ui.control.appendChild(ui.button);

    if (options.clearable && !selectEl.multiple) {
      ui.clearButton = document.createElement('button');
      ui.clearButton.type = 'button';
      ui.clearButton.className = options.clearButtonClass;
      ui.clearButton.setAttribute('aria-label', options.clearButtonLabel);
      ui.clearButton.textContent = options.clearButtonText;
      ui.control.appendChild(ui.clearButton);
    }

    ui.menu = document.createElement('div');
    ui.menu.className = options.menuClass;

    ui.wrapper.appendChild(ui.control);
    ui.wrapper.appendChild(ui.menu);

    selectEl.parentNode.insertBefore(ui.wrapper, selectEl.nextSibling);
  } else {
    ui.menu.innerHTML = '';
  }

  ui.list = document.createElement('div');
  ui.list.id = ui.list.id || createId('fxd-list');
  ui.list.setAttribute('role', 'listbox');

  ui.button.setAttribute('aria-controls', ui.list.id);

  if (options.searchable) {
    const searchWrapper = document.createElement('div');
    const searchContainer = document.createElement('div');
    const searchInput = document.createElement('input');

    searchContainer.className = 'form-control form-control-sm w-auto d-flex flex-fill align-items-center p-1 m-1';
    searchInput.className = 'form-control p-0 border-0 rounded-0 shadow-none';
    searchInput.placeholder = options.filterPlaceholder;
    searchInput.setAttribute('aria-label', options.filterPlaceholder);

    searchContainer.appendChild(searchInput);

    if (options.searchClearable) {
      const searchClear = document.createElement('button');
      searchClear.type = 'button';
      searchClear.className = `fxd-search-clear ${options.searchClearButtonClass}`;
      searchClear.setAttribute('aria-label', options.searchClearAriaLabel);
      searchClear.textContent = options.searchClearIcon;
      searchContainer.appendChild(searchClear);
      ui.searchClearButton = searchClear;
    }

    if (ui.clearButton && ui.clearButton.parentNode && ui.clearButton.parentNode !== ui.control) {
      ui.clearButton.parentNode.removeChild(ui.clearButton);
      ui.control.appendChild(ui.clearButton);
    }

    searchWrapper.appendChild(searchContainer);
    ui.menu.appendChild(searchWrapper);

    ui.searchInput = searchInput;

    if (options.showDivider) {
      const divider = document.createElement('hr');
      divider.className = 'm-0';
      ui.menu.appendChild(divider);
    }

    ui.noResults = document.createElement('div');
    ui.noResults.className = 'no-result text-muted px-2 small d-none';
    ui.noResults.textContent = options.noResultsText;
    ui.menu.appendChild(ui.noResults);
  }

  if (options.maxHeight && options.maxHeight !== 'auto') {
    ui.list.style.overflowY = 'auto';
    ui.list.style.maxHeight = options.maxHeight;
  }

  ui.menu.appendChild(ui.list);

  ui.optionButtons = [];

  let currentGroup = null;
  model.forEach((opt) => {
    if (opt.group && opt.group !== currentGroup) {
      const header = document.createElement('div');
      header.className = 'dropdown-header';
      header.textContent = opt.group;
      header.dataset.group = opt.group;
      ui.list.appendChild(header);
      currentGroup = opt.group;
    }

    if (!opt.group) {
      currentGroup = null;
    }

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'dropdown-item fxd-item';
    item.textContent = opt.label;
    item.dataset.value = opt.value;
    item.dataset.group = opt.group || '';
    item.disabled = opt.disabled;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', opt.selected ? 'true' : 'false');
    item.id = createId('fxd-opt');

    if (options.renderOption) {
      const rendered = options.renderOption(opt, { selected: opt.selected, disabled: opt.disabled });
      if (rendered instanceof HTMLElement) {
        item.innerHTML = '';
        item.appendChild(rendered);
      } else if (typeof rendered === 'string') {
        item.innerHTML = rendered;
      }
    }

    if (opt.selected) {
      item.classList.add('is-selected');
    }

    if (options.showCheckmark && opt.value !== '') {
      const check = document.createElement('span');
      check.className = options.checkmarkClass;
      check.setAttribute('aria-hidden', 'true');
      check.textContent = options.checkmarkText;
      item.appendChild(check);
    }

    ui.optionButtons.push(item);
    ui.list.appendChild(item);
  });

  updateButtonLabel(ui, model, options, selectEl);

  const isDisabled = selectEl.disabled;
  ui.button.disabled = isDisabled;
  if (ui.clearButton) ui.clearButton.disabled = isDisabled;
  if (ui.searchInput) ui.searchInput.disabled = isDisabled;
  if (ui.searchClearButton) ui.searchClearButton.disabled = isDisabled;

  return ui;
}
