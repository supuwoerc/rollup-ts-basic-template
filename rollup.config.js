import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import tscAlias from 'rollup-plugin-tsc-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import cleaner from 'rollup-plugin-cleaner'
import replace from '@rollup/plugin-replace'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const entries = ['src/index.ts']
const envConfig = config({ path: `./.env.${process.env.NODE_ENV}` }).parsed

const plugins = [
    eslint(),
    babel({
        babelrc: false,
        babelHelpers: 'bundled',
        presets: [['env', { modules: false }]],
    }),
    resolve({
        preferBuiltins: true,
    }),
    alias({
        entries: [
            {
                find: '@',
                replacement: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
            },
        ],
    }),
    json(),
    typescript({
        clean: true, // https://github.com/ezolenko/rollup-plugin-typescript2/issues/443
    }),
    commonjs(),
    esbuild(),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(envConfig.NODE_ENV),
    }),
    terser(),
    cleaner({ targets: ['./dist/'], silent: false }),
    tscAlias(),
]

export default [
    ...entries.map((input) => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.umd.js'),
                format: 'umd',
                name: 'pluginName',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.esm.js'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.common.js'),
                format: 'cjs',
            },
        ],
        external: [],
        plugins,
    })),
]
