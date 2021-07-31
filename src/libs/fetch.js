import axios from 'axios'

const service = axios.create({
    baseURL: '/api',//vue.config.js 设置跨域
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Tracking-Api-Key": "33659c30-f818-4553-9844-9e34f79c8cfd"
    },
    validateStatus(status) {
        return status === 200
    }
})

service.interceptors.response.use(
    config => {
        if (config) {
            switch (config.data.code) {
                case 10010:
                    Message.error('服务内部未知错误')
                    break;
                case 10002:
                    Message.error('Body 参数校验错误')
                    break;
                case 0:
                    break;
                default:
                    // Message.error(config.data.message)
                    break;
            }
            return config.data
        } else {
            return Message.error(config.data.message)
        }
    },
    error => {
        if (error.message.includes('timeout')) {
            Message.error('API 超时')
        }
        return Promise.reject(error)
    }
);

export default service
