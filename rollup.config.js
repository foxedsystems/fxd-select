import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/fxd-select.esm.js', format: 'esm', sourcemap: true },
    { file: 'dist/fxd-select.umd.js', format: 'umd', name: 'FxdSelect', exports: 'named', sourcemap: true },
    { file: 'dist/fxd-select.esm.min.js', format: 'esm', sourcemap: true, plugins: [terser()] },
    { file: 'dist/fxd-select.umd.min.js', format: 'umd', name: 'FxdSelect', exports: 'named', sourcemap: true, plugins: [terser()] }
  ]
};
