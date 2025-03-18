// 引入axiox
import axios from 'axios'
// 创建axios实例
const service = axios.create()

// 请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (result) {
    // 判断成功
    const { status, data } = result
    // 判断接口返回状态
    if (status === 200) {
        // 如果接口正常则返回接口给的数据
        return data
    } else {
        // 如果不正常则返回一个错误信息
        return Promise.reject('系统未知错误，请反馈给管理员')
    }
}, function (error) {
    // 返回错误信息
    return Promise.reject(error)
})


export default service
