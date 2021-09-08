import axios from 'axios';
import jsonpAdapter from 'axios-jsonp'
import address from './address'
const server = axios.create({     //创建axios实例
    timeout: 80000,
})

server.interceptors.request.use(function (config) {
    if (config.jsonp) {
        window.callback_method = config.callback_method//挂载在window上，jsonp返回时调用
        config.adapter = jsonpAdapter// 如果有回调函数，则为jsonp形式发送请求
    }
    config.baseURL = config.url
    return config;
}, function (error) {
    return Promise.reject(error);
});
server.interceptors.response.use(function (response) {
    // console.log(response)
    // 结束时销毁jsonp回调函数
    delete window.callback_method
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, function (error) {
    return Promise.reject(error.response);
});
export default server