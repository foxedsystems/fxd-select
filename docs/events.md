# Events

[API](./api.md) | [Options](./options.md) | [Events](./events.md) | [Auto-init](./auto-init.md) | [Demo](./index.html)

All events are dispatched on the original `<select>` element.

## List

- `fxd:init`
- `fxd:open`
- `fxd:close`
- `fxd:change`
- `fxd:refresh`
- `fxd:destroy`

## Usage

```js
selectEl.addEventListener('fxd:open', () => {
  console.log('opened');
});

selectEl.addEventListener('fxd:change', () => {
  console.log('selection changed');
});
```

## Styling Hooks

- The wrapper always has `fxd-select`.
- Selected items get `is-selected`.
- Active (focused) items get `active` (Bootstrap convention).
- Checkmark uses `fxd-checkmark` and is shown via `is-selected`.

## Styling Example

```css
.fxd-select .dropdown-item.is-selected {
  font-weight: 700;
}

.fxd-select .dropdown-item.active {
  background: #e0e7ff;
}

.fxd-select .fxd-pills .badge {
  border-radius: 999px;
}
```
