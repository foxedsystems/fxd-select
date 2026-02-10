# Auto-Init

For no-code or CMS environments, you can enable auto-initialization using
`data-*` attributes or a CSS class.

## Markup

```html
<select
  class="fxd-init-select"
  data-fxd-select
  data-fxdsel-max-height="8rem"
  data-fxdsel-clearable="true"
  data-fxdsel-filter-placeholder="Search..."
>
  <option value="">Choose...</option>
  <option value="a">Alpha</option>
</select>
```

## Script

```html
<script type="module">
  import './dist/fxd-select.auto.esm.js';
</script>
```

## Dataset Mapping

- Attributes use the `data-fxdsel-*` prefix.
- Kebab-case converts to camelCase:
  - `data-fxdsel-max-height` → `maxHeight`
  - `data-fxdsel-selection-count-class` → `selectionCountClass`
- Values are type-coerced:
  - `"true"` / `"false"` → boolean
  - numeric strings → number
  - JSON strings (`{}` / `[]`) → parsed

## Notes

- Auto-init runs on `DOMContentLoaded`.
- Importing the auto module is optional; the standard module does not auto-init.
