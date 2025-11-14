import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
// Note: No asset or SVG imports are used; keep config lean

import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'cornerstone-core': 'cornerstone',
  'cornerstone-math': 'cornerstoneMath',
  '@altis-labs/cornerstone-tools': 'cornerstoneTools',
  'cornerstone-wado-image-loader': 'cornerstoneWADOImageLoader',
  'dicom-parser': 'dicomParser',
  hammerjs: 'Hammer',
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      globals,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'react-cornerstone-viewport',
      sourcemap: true,
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: false,
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/transform-runtime'],
      runtimeHelpers: true,
    }),
    resolve(),
    commonjs(),
  ],
};
