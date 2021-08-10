import * as types from "../mutation-types.js";
import { setExpressLocalstorage, getExpressLocalstorage } from "../../util/localStorage.js";

// 默认数据
export default {
    namespaced: true,
    state: {
        carriers: [
            { courier_code: "sf-express", courier_name_cn: "顺丰速运" },
            { courier_code: "zto", courier_name_cn: "中通快递" },
            { courier_code: "sto", courier_name_cn: "申通快递" },
            { courier_code: "bestex", courier_name_cn: "百世快递" },
            { courier_code: "jtexpress", courier_name_cn: "极兔快递" },
            { courier_code: "china-post", courier_name_cn: "中国邮政" },
            { courier_code: "zjs-express", courier_name_cn: "宅急送" },
            { courier_code: "wndirect", courier_name_cn: "wndirect快递送" },
        ],
        tracking_info: []
    },
    mutations: {
        // ! 红色的高亮注释
        // ? 蓝色的高亮注释
        // * 绿色的高亮注释
        // todo 橙色的高亮注释
        // // 灰色带删除线的注释
        /**
        *
        * @description 添加新的物流信息
        * @param data 物流信息
        * ?courier_code 物流商简码
        * ?tracking_number 物流商单号
        * ?courier_name_cn 物流商中文名
        * todo 物流商icon
        * 
        */
        [types.SET_NEW_TRACKING_INFO](state, { courier_code, tracking_number, courier_name_cn }) {

            console.log({ courier_code, tracking_number, courier_name_cn })
            state.tracking_info.push({ courier_code, tracking_number, courier_name_cn })
            console.log(state.tracking_info)
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
