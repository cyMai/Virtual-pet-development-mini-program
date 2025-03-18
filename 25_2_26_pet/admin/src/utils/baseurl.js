// 封装公共的请求api
const apiConfig = {
    // 开发环境
    dev: {
        fayongApi: "http://192.168.60.78:8083"
    },
    // 生产环境
    production: {
        fayongApi: "https://appsh.yikongenomics.com"
    },
};

// 根据全局全局变量自动切换请求地址前缀
export default apiConfig[process.env.VUE_APP_ENV];