
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {

    publicPath: '/',
    devServer: {
        port: 8888,
        disableHostCheck: true, //禁用主机检查
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                "@http": resolve("src/utils/http.js"),
                "@api": resolve("src/utils/baseurl.js")
            }
        }
    }
};
