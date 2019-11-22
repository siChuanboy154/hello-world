/**
 * axios规范
 * 2019-10-22 by 小貂蝉
 */
// 引入库
import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

// 设置默认请求的接口地址
axios.defaults.baseURL = "http://172.16.11.55:5000"
// 请求拦截器
axios.interceptors.request.use(config => {
    // 在请求发送出去之前 带上一些东西 config是请求的配置对象， 如果直接返回 就等于什么都不带
    // 所有的ajax请求都要带上token令牌
    let token = localStorage.getItem("token")
    config.headers.Authorization = 'Bearer ' + token // 给请求头带上了令牌
    return config;
}, error => {
    return Promise.reject(error); // 请求错误处理
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // response就是后端响应回来的东西 如果你想做什么统一的处理 可以在这里写
    let { code, msg } = response.data
    //成功
    if (code === 0) {
        Message({
            type: "success",
            message: msg
        });
    }
    // 失败
    else if (code === 1) { Message.error(msg) }
    return response;
}, error => {
    Message.error("网络请求发生错误，请稍后再试")
    return Promise.reject(error); // 响应错误处理
});
// 导出两个方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params }) // 这里你还必须写大括号 默认用法就是大括号里再传个对象
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, Qs.stringify(params)) // 这里你还就不能写大括号
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}