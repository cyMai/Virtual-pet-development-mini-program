import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:9999',
    timeout: 10000, // 设置请求超时时间
    // 你可以在这里配置其他 Axios 实例的设置
});

export default request;
