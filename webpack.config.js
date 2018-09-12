const config = {
  entry: "./src/index.js",
  output: {
      filename: 'rich-text-editor.js',
      path: __dirname + '/',
      library: 'RTE',
      libraryTarget: 'var'
  },
  mode: 'production'
  // mode: 'development'
};
module.exports = config;