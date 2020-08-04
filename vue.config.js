const os = require('os')

const interfaceStatus = os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]]

module.exports = {
  configureWebpack: {},
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    public: interfaceStatus[1].address + ':8080',
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: `http://110.43.44.58:3000/`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  },
  productionSourceMap: false
}