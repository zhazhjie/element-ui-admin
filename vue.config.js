module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    },
  },
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    proxy: process.env.VUE_APP_REMOTE_URL
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch-index');
  }
};
