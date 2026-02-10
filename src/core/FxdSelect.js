import { buildModel } from './model.js';
import { render } from './render.js';
import { bindEvents } from './events.js';
import { dispatchEvent, warnIfMissingBootstrap } from './utils.js';

export class FxdSelect {
  constructor(selectEl, options = {}) {
    if (!selectEl || selectEl.tagName !== 'SELECT') {
      throw new Error('FxdSelect requires a <select> element');
    }

    this.selectEl = selectEl;
    this.options = { ...FxdSelect.defaults, ...options };
    this.state = {
      open: false,
      query: '',
      focusedIndex: -1,
    };

    this.model = buildModel(this.selectEl, this.options);
    this.ui = render(this.selectEl, this.model, this.options);
    this.cleanup = bindEvents(this);

    this.selectEl.classList.add('d-none');

    if (this.options.warnOnMissingBootstrap) {
      warnIfMissingBootstrap(this.options.bootstrapMajor);
    }

    dispatchEvent(this.selectEl, 'fxd:init');
  }

  _syncOpenState(open) {
    this.state.open = open;
    if (open) {
      this.ui.wrapper.classList.add('show');
      this.ui.menu.classList.add('show');
      this.ui.button.setAttribute('aria-expanded', 'true');
    } else {
      this.ui.wrapper.classList.remove('show');
      this.ui.menu.classList.remove('show');
      this.ui.button.setAttribute('aria-expanded', 'false');
      this.ui.button.removeAttribute('aria-activedescendant');
      this.state.focusedIndex = -1;
    }
  }

  open() {
    if (this.state.open) return;
    this._syncOpenState(true);
    dispatchEvent(this.selectEl, 'fxd:open');
  }

  close() {
    if (!this.state.open) return;
    this._syncOpenState(false);
    dispatchEvent(this.selectEl, 'fxd:close');
  }

  toggle() {
    if (this.state.open) this.close();
    else this.open();
  }

  refresh() {
    const wasOpen = this.state.open;
    this.cleanup?.();
    this.model = buildModel(this.selectEl, this.options);
    this.ui = render(this.selectEl, this.model, this.options, this.ui);
    this.cleanup = bindEvents(this);
    this._syncOpenState(wasOpen);
    if (this.ui.searchInput && this.state.query) {
      this.ui.searchInput.value = this.state.query;
      this.ui.searchInput.dispatchEvent(new Event('input'));
    }
    dispatchEvent(this.selectEl, 'fxd:refresh');
  }

  destroy() {
    this.cleanup?.();
    this.ui.wrapper.remove();
    this.selectEl.classList.remove('d-none');
    dispatchEvent(this.selectEl, 'fxd:destroy');
  }

  getValue() {
    return this.selectEl.value;
  }

  setValue(value) {
    this.selectEl.value = value;
    this.selectEl.dispatchEvent(new Event('change', { bubbles: true }));
  }

  clear() {
    if (this.selectEl.multiple) {
      Array.from(this.selectEl.options).forEach((opt) => {
        opt.selected = false;
      });
    } else {
      this.selectEl.value = '';
    }
    this.selectEl.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

FxdSelect.defaults = {
  searchable: true,
  clearable: false,
  maxHeight: '12em',
  placeholder: 'Select...',
  noResultsText: 'No entries found',
  buttonClass: 'form-select text-start',
  wrapperClass: '',
  menuClass: 'dropdown-menu p-0',
  filterPlaceholder: 'Search',
  showDivider: true,
  renderOption: null,
  renderValue: null,
  data: null,
  load: null,
  loadDebounce: 250,
  maxDisplayItems: 3,
  multiValueStyle: 'pills',
  selectionCountClass: 'badge bg-secondary',
  selectionCountTemplate: (count) => `${count} selected`,
  pillClass: 'badge text-bg-light border',
  pillContainerClass: 'fxd-pills',
  clearButtonClass: 'btn btn-outline-secondary btn-sm',
  clearButtonLabel: 'Clear selection',
  clearButtonText: '×',
  searchClearable: true,
  searchClearButtonClass: 'btn btn-link btn-sm text-decoration-none',
  searchClearIcon: '×',
  searchClearAriaLabel: 'Clear search',
  warnOnMissingBootstrap: true,
  bootstrapMajor: 5,
  showCheckmark: true,
  checkmarkText: '✓',
  checkmarkClass: 'fxd-checkmark',
  filter: null,
};
