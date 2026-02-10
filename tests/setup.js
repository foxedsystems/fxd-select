if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

const originalWarn = console.warn;
console.warn = (msg, ...rest) => {
  if (typeof msg === 'string' && msg.startsWith('fxd-select: Bootstrap')) {
    return;
  }
  originalWarn(msg, ...rest);
};
