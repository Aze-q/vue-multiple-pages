module.exports = {
  publicPath: './',
  lintOnSave: true,
  // 生成环境禁止生成map文件
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    https: false,
    open: true,
    // proxy: {
    //   //跨域
    //   '/api': {
    //     target: 'http://10.10.10.251:8001', // target host
    //     ws: true, // proxy websockets
    //     changeOrigin: true, // needed for virtual hosted sites
    //     pathRewrite: {
    //       '^/api': '/', // rewrite path
    //     },
    //   },
    // },
    proxy: {
      //跨域
      '/api': {
        target: 'http://192.168.32.76:8077', // -谭海亮
        // target: 'http://192.168.32.28:8087',
        // target: 'http://192.168.32.96:8055/webapp',
        // target: '',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      // '/api': {
      //   target: 'http://192.168.32.28:8087', // -陈婷
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '',
      //   },
      // },
    },
  },
};