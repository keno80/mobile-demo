module.exports = {
  configureWebpack: {},
  devServer: {
    public: '192.168.2.106:8080',
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
  }
}