import server from '../libs/server'
import jsonpAdapter from 'axios-jsonp'
export default class Api {
    static translate(params) {
        return server({
            url: '/translate',
            method: 'get',
            params
        })
    }
    static searchBaidu({ wd, callback_name, callback_method }) {
        return server({
            url: `https://suggestion.baidu.com/su?`,
            method: 'get',
            jsonp: true,
            callbackParamName: callback_name,//成功的方法名
            callback_method,//成功后的方法
            params: {
                callback: callback_name,
                wd,
                _: new Date().getTime(),
                cb: callback_name
            }
        })
    }
    static searchTaobao({ q, callback_name, callback_method }) {
        return server({
            url: `https://suggestion.baidu.com/su?`,
            method: 'get',
            jsonp: true,
            callbackParamName: callback_name,//成功的方法名
            callback_method,//成功后的方法
            params: {
                q
            }
        })
    }
}