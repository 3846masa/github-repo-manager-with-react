const {
  FuseBox,
  CSSModules,
  CSSPlugin,
  JSONPlugin,
  TypeScriptHelpers,
  WebIndexPlugin,
  UglifyESPlugin,
} = require('fuse-box');
const isProduction = process.env['NODE_ENV'] === 'production';

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/scripts/$name.js',
  tsConfig: 'tsconfig.json',
  plugins: [
    TypeScriptHelpers(),
    JSONPlugin(),
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
});

const app = fuse.bundle('app').instructions('> index.tsx');

if (!isProduction) {
  fuse.dev({
    root: 'dist',
    port: 8000,
  });
  app.watch().hmr();
}

fuse.run();
