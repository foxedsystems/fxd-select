import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FxdSelect } from '../src/index.js';
import { initFxdSelects } from '../src/auto.js';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

function buildSelect(html) {
  container.innerHTML = html;
  return container.querySelector('select');
}

describe('FxdSelect', () => {
  it('wraps and hides the original select', () => {
    const select = buildSelect(`
      <select>
        <option value="">Choose</option>
        <option value="a">A</option>
      </select>
    `);

    new FxdSelect(select);

    expect(select.classList.contains('d-none')).toBe(true);
    const wrapper = select.nextElementSibling;
    expect(wrapper).not.toBeNull();
    expect(wrapper.classList.contains('fxd-select')).toBe(true);
  });

  it('renders optgroup headers', () => {
    const select = buildSelect(`
      <select>
        <optgroup label="Group A">
          <option value="a1">A1</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="b1">B1</option>
        </optgroup>
      </select>
    `);

    const fxd = new FxdSelect(select);
    const headers = fxd.ui.list.querySelectorAll('.dropdown-header');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe('Group A');
  });

  it('respects disabled options', () => {
    const select = buildSelect(`
      <select>
        <option value="a" disabled>Disabled A</option>
        <option value="b">B</option>
      </select>
    `);

    const fxd = new FxdSelect(select);
    const items = fxd.ui.list.querySelectorAll('button.dropdown-item');
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(false);
  });

  it('opens and closes with aria updates', () => {
    const select = buildSelect(`
      <select>
        <option value="a">A</option>
      </select>
    `);

    const fxd = new FxdSelect(select);
    fxd.open();
    expect(fxd.ui.button.getAttribute('aria-expanded')).toBe('true');
    expect(fxd.ui.menu.classList.contains('show')).toBe(true);

    fxd.close();
    expect(fxd.ui.button.getAttribute('aria-expanded')).toBe('false');
    expect(fxd.ui.menu.classList.contains('show')).toBe(false);
  });

  it('filters options by query', () => {
    const select = buildSelect(`
      <select>
        <option value="a">Apple</option>
        <option value="b">Banana</option>
        <option value="c">Cherry</option>
      </select>
    `);

    const fxd = new FxdSelect(select);
    const input = fxd.ui.searchInput;
    input.value = 'ba';
    input.dispatchEvent(new Event('input'));

    const items = Array.from(fxd.ui.list.querySelectorAll('button.dropdown-item'));
    const hidden = items.filter((item) => item.classList.contains('d-none'));
    expect(hidden.length).toBe(2);
  });

  it('clears selection when clear() is called', () => {
    const select = buildSelect(`
      <select>
        <option value="">Choose</option>
        <option value="a" selected>A</option>
      </select>
    `);

    const fxd = new FxdSelect(select, { clearable: true });
    fxd.clear();

    expect(select.value).toBe('');
  });

  it('toggles selection in multi-select', () => {
    const select = buildSelect(`
      <select multiple>
        <option value="a">A</option>
        <option value="b">B</option>
      </select>
    `);

    const fxd = new FxdSelect(select);
    const items = fxd.ui.list.querySelectorAll('button.dropdown-item');
    items[0].click();

    expect(select.options[0].selected).toBe(true);
  });

  it('does not show checkmark on empty value option', () => {
    const select = buildSelect(`
      <select>
        <option value="">Choose</option>
        <option value="a">A</option>
      </select>
    `);

    const fxd = new FxdSelect(select, { showCheckmark: true });
    const items = fxd.ui.list.querySelectorAll('button.dropdown-item');
    const firstCheck = items[0].querySelector('.fxd-checkmark');
    const secondCheck = items[1].querySelector('.fxd-checkmark');
    expect(firstCheck).toBeNull();
    expect(secondCheck).not.toBeNull();
  });

  it('clears search input via search clear button', () => {
    const select = buildSelect(`
      <select>
        <option value="a">Alpha</option>
        <option value="b">Beta</option>
      </select>
    `);

    const fxd = new FxdSelect(select, { searchClearable: true });
    const input = fxd.ui.searchInput;
    const clearBtn = fxd.ui.searchClearButton;
    input.value = 'al';
    input.dispatchEvent(new Event('input'));
    clearBtn.click();
    expect(input.value).toBe('');
  });

  it('does not open when select is disabled', () => {
    const select = buildSelect(`
      <select disabled>
        <option value="a">A</option>
      </select>
    `);

    const fxd = new FxdSelect(select);
    fxd.ui.button.click();
    expect(fxd.ui.menu.classList.contains('show')).toBe(false);
  });

  it('auto-init reads dataset options', () => {
    container.innerHTML = `
      <select data-fxd-select data-fxdsel-max-height="5" data-fxdsel-clearable="true">
        <option value="a">A</option>
      </select>
    `;
    initFxdSelects(container);
    const wrapper = container.querySelector('.fxd-select');
    expect(wrapper).not.toBeNull();
  });
});
