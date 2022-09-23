import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupOptions = {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [typescript(), nodeResolve(), commonjs(), json(), terser()],
};
export default rollupOptions;
