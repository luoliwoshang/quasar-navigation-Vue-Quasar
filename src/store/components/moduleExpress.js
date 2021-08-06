import * as types from "../mutation-types.js";
import { setExpressLocalstorage, getExpressLocalstorage } from "../../util/localStorage.js";

// 默认数据
export default {
    namespaced: true,
    state: {
        carriers: [
            { courier_code: "sf-express", name_cn: "顺丰速运" },
            { courier_code: "zto", name_cn: "中通快递" },
            { courier_code: "sto", name_cn: "申通快递" },
            { courier_code: "bestex", name_cn: "百世快递" },
            { courier_code: "jtexpress", name_cn: "极兔快递" },
            { courier_code: "china-post", name_cn: "中国邮政" },
            { courier_code: "zjs-express", name_cn: "宅急送" },
            { courier_code: "wndirect", name_cn: "wndirect快递送" },
        ],
        tracking_info: []
    },
    mutations: {
        [types.SET_NEW_TRACKING_INFO](state, { courier_code, tracking_number }) {
            state.tracking_info.push({ courier_code, tracking_number })
            setExpressLocalstorage(state.tracking_info)
        },
        [types.INIT_TRACKING_INFO](state) {
            if (!localStorage.v_express) {
                // 如果未初始化
                setExpressLocalstorage([])
                state.tracking_info = []
            } else {
                state.tracking_info = getExpressLocalstorage()
            }
        },
    },
};
