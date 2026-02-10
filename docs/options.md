# Options

All options are optional; defaults are shown below.

## Core

- `searchable` (boolean, default: `true`)
  - Enables the search input.

- `clearable` (boolean, default: `false`)
  - Adds a clear button and enables `clear()` behavior.
  - Note: not shown for multi-select.

- `maxHeight` (string, default: `"12em"`)
  - Max height for the list container. Use `"auto"` for no limit.

- `placeholder` (string, default: `"Select..."`)
  - Text shown when no selection is made.

- `noResultsText` (string, default: `"No entries found"`)
  - Text shown when filter yields no items.

## Classes and Layout

- `buttonClass` (string, default: `"form-select text-start"`)
  - Classes applied to the trigger.

- `wrapperClass` (string, default: `""`)
  - Extra classes for the wrapper.

- `menuClass` (string, default: `"dropdown-menu p-0"`)
  - Classes applied to the dropdown menu.

- `clearButtonClass` (string, default: `"btn btn-outline-secondary btn-sm"`)
  - Classes applied to the clear button.

- `clearButtonLabel` (string, default: `"Clear selection"`)
  - ARIA label for the clear button.

- `clearButtonText` (string, default: `"×"`)
  - Visible clear button text.

- `searchClearable` (boolean, default: `true`)
  - Shows a clear button inside the search input.

- `searchClearButtonClass` (string, default: `"btn btn-link btn-sm text-decoration-none"`)
  - Classes applied to the search clear button.

- `searchClearIcon` (string, default: `"×"`)
  - Visible icon/text for the search clear button.

- `searchClearAriaLabel` (string, default: `"Clear search"`)
  - ARIA label for the search clear button.

- `showCheckmark` (boolean, default: `true`)
  - Shows a right-aligned checkmark for selected items.

- `checkmarkText` (string, default: `"✓"`)
  - Checkmark text.

- `checkmarkClass` (string, default: `"fxd-checkmark"`)
  - CSS class for the checkmark element.

- `pillClass` (string, default: `"badge text-bg-light border"`)
  - Classes applied to each selected pill.

- `pillContainerClass` (string, default: `"fxd-pills"`)
  - Classes applied to the pill container.

- `selectionCountClass` (string, default: `"badge bg-secondary"`)
  - Classes applied to the count badge.

## Search

- `filterPlaceholder` (string, default: `"Search"`)
  - Placeholder for the search input.

- `showDivider` (boolean, default: `true`)
  - Inserts a divider between search input and list.

- `filter` (function, default: built-in)
  - Signature: `(query, option) => boolean`
  - Controls which items remain visible.

## Rendering Hooks

- `renderOption` (function, default: `null`)
  - Signature: `(option, state) => string | HTMLElement`
  - `state` contains `{ selected, disabled }`.

- `renderValue` (function, default: `null`)
  - Signature: `(model, selectEl) => string | HTMLElement`
  - Customizes the trigger content.

## Data Sources

- `data` (array, default: `null`)
  - Static data source. Items: `{ value, label, disabled, group, selected }`.

- `load` (async function, default: `null`)
  - Signature: `(query) => Promise<Array>`
  - Called on input (debounced) and must return an array.

- `loadDebounce` (number, default: `250`)
  - Debounce delay in milliseconds for `load`.

## Multi-select Display

- `maxDisplayItems` (number, default: `3`)
  - Maximum labels shown before showing a count.

- `multiValueStyle` (string, default: `"pills"`)
  - `"pills"` shows selected values as pills.
  - `"count"` shows a count badge only.
  - `"text"` shows a comma-separated label list.

- `selectionCountTemplate` (function, default: `(count) => \`\${count} selected\``)
  - Customize count text.

## Bootstrap Detection

- `warnOnMissingBootstrap` (boolean, default: `true`)
  - Logs a console warning if Bootstrap 5 styles are not detected.

- `bootstrapMajor` (number, default: `5`)
  - Version hint for the warning message.

## Localization

All visible strings are configurable:

- `placeholder`
- `filterPlaceholder`
- `noResultsText`
- `selectionCountTemplate`
- `clearButtonLabel`
- `clearButtonText`
