import server from '../libs/server'
import { jsonp } from 'vue-jsonp'
export default class Api {
    static translate(params) {
        return jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate', params)
    }
    static searchBaidu({ wd, callback_method }) {
        return server({
            url: `https://suggestion.baidu.com/su?callback=callback_method&cb=callback_method`,
            method: 'get',
            jsonp: true,
            callback_method,//成功后的方法
            params: {
                wd,
                _: new Date().getTime(),
            }
        })
    }
    static searchTaobao({ q, callback_method }) {
        return server({
            url: `https://suggest.taobao.com/sug?code=utf-8&callback=callback_method`,
            method: 'get',
            jsonp: true,
            callback_method,//成功后的方法
            params: {
                q
            }
        })
    }
}