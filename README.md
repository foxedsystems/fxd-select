# fxd-select

A lightweight, Bootstrap-friendly select enhancer with local search and keyboard navigation.

## Install

Use the compiled files in `dist/` or import from `src/` in your build.

## Usage

```html
<select id="city">
  <option value="">Choose...</option>
  <option value="nyc">New York</option>
  <option value="la">Los Angeles</option>
</select>
```

```html
<link rel="stylesheet" href="./dist/fxd-select.css" />
<script type="module">
  import { FxdSelect } from './dist/fxd-select.esm.js';

  const el = document.querySelector('#city');
  new FxdSelect(el, {
    searchable: true,
    maxHeight: '12em',
    placeholder: 'Choose a city',
  });
</script>
```

## API

- `new FxdSelect(selectEl, options)`
- `open()`
- `close()`
- `toggle()`
- `refresh()`
- `destroy()`
- `getValue()`
- `setValue(value)`
- `clear()`

## Options

- `searchable` (boolean)
- `clearable` (boolean)
- `maxHeight` (string)
- `placeholder` (string)
- `noResultsText` (string)
- `buttonClass` (string)
- `wrapperClass` (string)
- `menuClass` (string)
- `filterPlaceholder` (string)
- `showDivider` (boolean)
- `renderOption` (function)
- `renderValue` (function)
- `data` (array)
- `load` (async function)
- `loadDebounce` (number)
- `maxDisplayItems` (number)
- `clearButtonClass` (string)
- `clearButtonLabel` (string)
- `filter` (function)

For a full list with defaults and detailed behavior, see `docs/options.md`.

## Events

- `fxd:init`
- `fxd:open`
- `fxd:close`
- `fxd:change`
- `fxd:refresh`
- `fxd:destroy`

## Accessibility

- Uses `role="combobox"`, `role="listbox"`, and `role="option"`.
- Keyboard: `ArrowUp/ArrowDown`, `Home/End`, `Enter`, `Escape`.

## Data Sources

Static data array:

```js
new FxdSelect(el, {
  data: [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta', disabled: true, group: 'Group 1' },
  ],
});
```

Remote load (called on search input):

```js
new FxdSelect(el, {
  load: async (query) => {
    const res = await fetch(`/api/options?q=${encodeURIComponent(query)}`);
    return res.json();
  },
});
```

## Feature Status

Implemented:
- Single select enhancement
- Local search filter
- Optgroup headers
- Disabled options
- Keyboard navigation
- Imperative API (`open`, `close`, `refresh`, `destroy`)
- Clearable selection
- Custom item renderer
- Remote data loading
- Multi-select (basic toggle)

Planned:
- Multi-select with pills/tokens
- Selection count styling options

## Browser Support

- Modern evergreen browsers (latest 2 versions of Chrome, Edge, Firefox, Safari).
- No Internet Explorer support.

## Demo

1. `npm run build`
2. Open `demo/index.html` with a local static server to allow ES module imports.

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Notes

- No jQuery dependency.
- Bootstrap JS is optional. Styles follow Bootstrap class names.
