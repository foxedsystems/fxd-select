import terser from '@rollup/plugin-terser';

const baseOutputs = (baseName, umdName) => ([
  { file: `dist/${baseName}.esm.js`, format: 'esm', sourcemap: true },
  { file: `dist/${baseName}.umd.js`, format: 'umd', name: umdName, exports: 'named', sourcemap: true },
  { file: `dist/${baseName}.esm.min.js`, format: 'esm', sourcemap: true, plugins: [terser()] },
  { file: `dist/${baseName}.umd.min.js`, format: 'umd', name: umdName, exports: 'named', sourcemap: true, plugins: [terser()] }
]);

export default [
  {
    input: 'src/index.js',
    output: baseOutputs('fxd-select', 'FxdSelect'),
  },
  {
    input: 'src/auto.js',
    output: baseOutputs('fxd-select.auto', 'FxdSelectAuto'),
  },
];
