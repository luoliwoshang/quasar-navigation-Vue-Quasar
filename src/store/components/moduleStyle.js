import { 默认样式 } from "../../default/default.js";
export default {
  namespaced: true,
  state: {
    背景图片: "",
    透明度: 0,
  },
  mutations: {
    设置_背景图片(状态, { 链接 }) {
      状态.背景图片 = 链接;
      localStorage.诺_背景图片 = 链接;
    },
    设置_透明度(状态, 值) {
      状态.透明度 = 值;
      localStorage.诺_透明度 = 值;
    },
    初始化_样式(状态) {
      localStorage.诺_背景图片 = localStorage.诺_背景图片
        ? localStorage.诺_背景图片
        : 默认样式.背景图片;
      localStorage.诺_透明度 = localStorage.透明度
        ? localStorage.诺_透明度
        : 默认样式.透明度;
      状态.背景图片 = localStorage.诺_背景图片;
      状态.透明度 = localStorage.诺_透明度;
    },
  },
};
