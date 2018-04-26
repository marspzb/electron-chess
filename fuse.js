const {
  FuseBox,
  CSSPlugin,
  CSSResourcePlugin,
  SassPlugin,
  WebIndexPlugin,
  QuantumPlugin,
  Sparky,
  LESSPlugin,
  CopyPlugin,
  EnvPlugin
} = require('fuse-box');

const isProduction = true;
let fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  experimentalFeatures: true,
  hash: false,
  sourceMaps: !isProduction,
  target: 'electron',
  serverBundle: true,
  shim: {
    electron: { exports: "global.require('electron')" }
  }
});

// out main bundle
let main = fuse
  .bundle('main')
  .target('server')
  .plugin(EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }))
  .instructions('> main.ts');
fuse.run();

fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  experimentalFeatures: true,
  log: true,
  debug: true,
  hash: false,
  sourceMaps: !isProduction,
  plugins: [
    EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
    [
      LESSPlugin({}),
      CSSResourcePlugin({
        dist: 'dist/images',
        resolve: f => `./dist/images/${f}`
      }),
      CSSPlugin()
    ],
    CopyPlugin({ files: ['*.jpg', '*.png'] })
    /*
    isProduction &&
      QuantumPlugin({
        uglify: {es6:true},
        target: 'electron',
        bakeApiIntoBundle: 'chess',
        ensureES5 :false
        
      })*/
  ],
  shim: {
    electron: { exports: "global.require('electron')" }
  },
  target: 'browser'
});

let app = fuse
  .bundle('chess')
  .target('electron')
  .instructions('> chess.tsx');


fuse.run();
//fuse.dev();