# API

## Constructor

```js
new FxdSelect(selectEl, options)
```

- `selectEl`: A `<select>` element.
- `options`: See `docs/options.md`.

## Methods

### `open()`
Opens the dropdown menu.

### `close()`
Closes the dropdown menu.

### `toggle()`
Toggles menu open/close.

### `refresh()`
Re-reads the `<select>` options or `data` source, re-renders, and rebinds events.
Use after you update the underlying `<select>` or after async `load()` results.

### `destroy()`
Removes the custom UI and restores the original `<select>`.

### `getValue()`
Returns the current value (single-select).

### `setValue(value)`
Sets the value and dispatches a `change` event.

### `clear()`
Clears selection. For multi-select, unselects all options.

## Examples

```js
const fxd = new FxdSelect(selectEl, { clearable: true });
fxd.open();
fxd.clear();
```

### Multi-select with pills

```js
new FxdSelect(selectEl, {
  maxDisplayItems: 2,
  multiValueStyle: 'pills',
  clearable: true,
});
```

### Custom option rendering

```js
new FxdSelect(selectEl, {
  renderOption: (opt) => {
    const el = document.createElement('span');
    el.textContent = `${opt.label} (${opt.value})`;
    return el;
  },
});
```

### Remote data

```js
new FxdSelect(selectEl, {
  load: async (query) => {
    const res = await fetch(`/api/options?q=${encodeURIComponent(query)}`);
    return res.json();
  },
});
```
