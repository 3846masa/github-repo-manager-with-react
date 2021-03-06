const {
  FuseBox,
  CSSModules,
  CSSPlugin,
  JSONPlugin,
  TypeScriptHelpers,
  WebIndexPlugin,
  UglifyESPlugin,
  EnvPlugin,
} = require('fuse-box');
const isProduction = process.env['NODE_ENV'] === 'production';

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/scripts/$name.js',
  tsConfig: 'tsconfig.json',
  plugins: [
    TypeScriptHelpers(),
    JSONPlugin(),
    EnvPlugin({
      GITHUB_TOKEN: process.env['GITHUB_TOKEN'],
    }),
    [
      CSSModules({
        useDefault: false,
      }),
      CSSPlugin(),
    ],
    WebIndexPlugin({
      path: './scripts',
      target: '../index.html',
      template: 'src/index.html',
      async: true,
    }),
    isProduction && UglifyESPlugin(),
  ],
  alias: {
    'redux-saga/effects': 'redux-saga/lib/effects',
  },
});

const app = fuse.bundle('app').target('browser').instructions('> index.tsx');

if (!isProduction) {
  fuse.dev({
    root: 'dist',
    port: 8000,
  });
  app.watch().hmr();
}

fuse.run();
