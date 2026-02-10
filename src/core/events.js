import { defaultFilter, applyFilter } from './filter.js';
import { normalizeOptions, syncSelectWithModel } from './model.js';
import { dispatchEvent } from './utils.js';

export function bindEvents(fxd) {
  const { selectEl, ui, options, state } = fxd;

  const getVisibleOptions = () => (
    Array.from(ui.list.querySelectorAll('button.dropdown-item')).filter(
      (item) => !item.classList.contains('d-none') && !item.disabled
    )
  );

  const setFocusedIndex = (index) => {
    const optionsList = getVisibleOptions();
    if (optionsList.length === 0) {
      state.focusedIndex = -1;
      ui.button.removeAttribute('aria-activedescendant');
      return;
    }

    const clamped = Math.max(0, Math.min(index, optionsList.length - 1));
    optionsList.forEach((item) => item.classList.remove('active'));

    const focused = optionsList[clamped];
    focused.classList.add('active');
    focused.scrollIntoView({ block: 'nearest' });

    state.focusedIndex = clamped;
    ui.button.setAttribute('aria-activedescendant', focused.id);
  };

  const focusSelectedOrFirst = () => {
    const optionsList = getVisibleOptions();
    if (optionsList.length === 0) return;

    const selectedIndex = optionsList.findIndex(
      (item) => item.getAttribute('aria-selected') === 'true'
    );

    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const onButtonClick = (e) => {
    if (selectEl.disabled) return;
    e.preventDefault();
    fxd.toggle();
    if (fxd.state.open) {
      focusSelectedOrFirst();
      ui.searchInput?.select();
    }
  };

  const onDocumentClick = (e) => {
    if (!ui.wrapper.contains(e.target)) {
      fxd.close();
    }
  };

  const onItemClick = (e) => {
    const item = e.target.closest('button.dropdown-item');
    if (!item) return;
    if (selectEl.disabled || item.disabled) return;
    if (selectEl.multiple) {
      e.preventDefault();
      e.stopPropagation();
      const option = Array.from(selectEl.options).find((opt) => opt.value === item.dataset.value);
      if (option) {
        option.selected = !option.selected;
      }
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      requestAnimationFrame(() => fxd.open());
    } else {
      selectEl.value = item.dataset.value;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      fxd.close();
      ui.button.focus();
    }
  };

  const onItemHover = (e) => {
    const item = e.target.closest('button.dropdown-item');
    if (!item) return;

    const optionsList = getVisibleOptions();
    const idx = optionsList.indexOf(item);
    if (idx >= 0) setFocusedIndex(idx);
  };

  const onSelectChange = () => {
    fxd.refresh();
    dispatchEvent(selectEl, 'fxd:change');
  };

  let loadTimer = null;
  const runLoad = async (query) => {
    const data = await options.load?.(query);
    if (!Array.isArray(data)) return;
    const model = normalizeOptions(data, selectEl);
    syncSelectWithModel(selectEl, model);
    fxd.model = model;
    fxd.refresh();
    if (fxd.ui.searchInput) {
      fxd.ui.searchInput.value = query;
    }
  };

  const onFilterInput = (e) => {
    const query = e.target.value;
    fxd.state.query = query;

    if (options.load) {
      if (loadTimer) clearTimeout(loadTimer);
      loadTimer = setTimeout(() => runLoad(query), options.loadDebounce);
      return;
    }

    const filterFn = options.filter || defaultFilter;
    const result = applyFilter(ui.list, query, filterFn);

    if (ui.noResults) {
      ui.noResults.classList.toggle('d-none', result.visible > 0);
    }

    focusSelectedOrFirst();
  };

  const onKeyDown = (e) => {
    if (selectEl.disabled) return;
    const key = e.key;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
    const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

    if (!fxd.state.open && openKeys.includes(key)) {
      e.preventDefault();
      fxd.open();
      focusSelectedOrFirst();
      ui.searchInput?.select();
      return;
    }

    if (!fxd.state.open) return;

    if (key === 'Escape') {
      e.preventDefault();
      fxd.close();
      ui.button.focus();
      return;
    }

    if (key === 'Enter') {
      e.preventDefault();
      const optionsList = getVisibleOptions();
      const focused = optionsList[state.focusedIndex];
      if (focused) {
        focused.click();
      }
      return;
    }

    if (key === ' ') {
      e.preventDefault();
      const optionsList = getVisibleOptions();
      const focused = optionsList[state.focusedIndex];
      if (focused) {
        focused.click();
      }
      return;
    }

    if (navKeys.includes(key)) {
      e.preventDefault();
      const optionsList = getVisibleOptions();
      if (optionsList.length === 0) return;

      if (key === 'Home') {
        setFocusedIndex(0);
        return;
      }

      if (key === 'End') {
        setFocusedIndex(optionsList.length - 1);
        return;
      }

      const delta = key === 'ArrowDown' ? 1 : -1;
      setFocusedIndex(state.focusedIndex + delta);
    }
  };

  const onClearClick = (e) => {
    e.preventDefault();
    fxd.clear();
  };

  const onSearchClearClick = () => {
    if (!ui.searchInput) return;
    ui.searchInput.value = '';
    ui.searchInput.dispatchEvent(new Event('input'));
    ui.searchInput.select();
  };

  ui.button.addEventListener('click', onButtonClick);
  ui.list.addEventListener('click', onItemClick);
  ui.list.addEventListener('mousemove', onItemHover);
  document.addEventListener('click', onDocumentClick);
  selectEl.addEventListener('change', onSelectChange);
  ui.searchInput?.addEventListener('input', onFilterInput);
  ui.searchClearButton?.addEventListener('click', onSearchClearClick);
  ui.wrapper.addEventListener('keydown', onKeyDown);
  ui.clearButton?.addEventListener('click', onClearClick);

  return () => {
    ui.button.removeEventListener('click', onButtonClick);
    ui.list.removeEventListener('click', onItemClick);
    ui.list.removeEventListener('mousemove', onItemHover);
    document.removeEventListener('click', onDocumentClick);
    selectEl.removeEventListener('change', onSelectChange);
    ui.searchInput?.removeEventListener('input', onFilterInput);
    ui.searchClearButton?.removeEventListener('click', onSearchClearClick);
    ui.wrapper.removeEventListener('keydown', onKeyDown);
    ui.clearButton?.removeEventListener('click', onClearClick);
  };
}
