# Options Reference

This document lists every option, its default value, and behavior.

## Core

- `searchable` (boolean, default: `true`)
  - Shows the search input at the top of the dropdown.

- `clearable` (boolean, default: `false`)
  - Adds a clear button next to the trigger that calls `clear()`.

- `maxHeight` (string, default: `"12em"`)
  - Sets the max height for the list scroll area. Use `"auto"` for no limit.

- `placeholder` (string, default: `"Select..."`)
  - Text shown when there is no selection.

- `noResultsText` (string, default: `"No entries found"`)
  - Text shown when the search filter hides all options.

## Classes and Layout

- `buttonClass` (string, default: `"form-select text-start"`)
  - Classes applied to the trigger button.

- `wrapperClass` (string, default: `""`)
  - Extra classes for the outer wrapper.

- `menuClass` (string, default: `"dropdown-menu p-0"`)
  - Classes applied to the menu container.

- `clearButtonClass` (string, default: `"btn btn-outline-secondary btn-sm"`)
  - Classes applied to the clear button.

- `clearButtonLabel` (string, default: `"Clear selection"`)
  - `aria-label` for the clear button.

## Search

- `filterPlaceholder` (string, default: `"Search"`)
  - Placeholder for the search input.

- `showDivider` (boolean, default: `true`)
  - Inserts a divider between the search input and the list.

- `filter` (function, default: built-in)
  - Signature: `(query, option) => boolean`
  - If provided, controls which options are visible during search.

## Rendering Hooks

- `renderOption` (function, default: `null`)
  - Signature: `(option, state) => string | HTMLElement`
  - Called for each option render. `state` contains `{ selected, disabled }`.

- `renderValue` (function, default: `null`)
  - Signature: `(model, selectEl) => string | HTMLElement`
  - Customizes the trigger content based on the current model.

## Data Sources

- `data` (array, default: `null`)
  - Static data source. Each item supports:
    - `value` (string)
    - `label` (string)
    - `disabled` (boolean)
    - `group` (string)
    - `selected` (boolean)

- `load` (async function, default: `null`)
  - Signature: `(query) => Promise<Array>`
  - Called on search input (debounced). Must return an array of data items.

- `loadDebounce` (number, default: `250`)
  - Debounce delay in milliseconds for `load`.

## Multi-select Behavior

- If the `<select>` has the `multiple` attribute, clicks toggle selection.
- For multi-select, the trigger label shows up to `maxDisplayItems` labels.
  - If more are selected, it displays `"{n} selected"`.

