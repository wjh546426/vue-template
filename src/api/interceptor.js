import axios from 'axios';
import router from "../router";
import {getToken} from "../utils/func.js";

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api base_url
    timeout: 10000 // 请求超时时间
})

/* 请求拦截器 */
service.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['TOKEN'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        return config;
    },
    error => {
        // 请求错误
        return Promise.reject(error);
    }
);

/* 响应拦截器 */
service.interceptors.response.use(
    response => {
        const code = response.data.code
        // token失效/为空
        if (code === 10015 || code === 10006) {
            localStorage.removeItem('userInfo')
            router.replace({path: '/login'})
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    },
)
export {
    service as axios
}
