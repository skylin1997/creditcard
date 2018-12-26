// vue.config.js
module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        lintOnSave: false
    },
    baseUrl: '/',
    outputDir: 'dist', // 打包的目录
    lintOnSave: false, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
      open: true, // 启动服务后是否打开浏览器
      host: '0.0.0.0',
      port: 8082, // 服务端口
      https: false,
      hotOnly: false,
      proxy: null, // 设置代理
      before: app => {}

    },
  }