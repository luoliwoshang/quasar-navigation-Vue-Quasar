import axios from 'axios';
const server = axios.create({     //创建axios实例
    timeout: 80000,
})
server.interceptors.request.use(function (config) {
    config.baseURL=config.url
    return config;
}, function (error) {
    return Promise.reject(error);
});
server.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, function (error) {
    return Promise.reject(error.response);
});
export default server