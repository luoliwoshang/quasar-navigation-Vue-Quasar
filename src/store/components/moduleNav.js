import * as types from "../mutation-types.js";
import { setNavLocalstorage } from "../../util/localStorage"; //自动转为json格式
import { defaultNav } from "@/default/default.js";
// 默认数据
export default {
  namespaced: true,
  state: {
    navs: [],
    defaultName: "新导航卡片",
    defaultUrl: "https://www.baidu.com",
    defaultBackgroundColor: "#31ccec",
    defaultColor: "#ffffff",
    默认值: {
      名称: "新导航",
      链接: "https://www.baidu.com",
      背景颜色: "#31ccec",
      文字颜色: "#ffffff",
    },
  },
  mutations: {
    [types.CHANGE_NAV_FEATURE](state, { v_id, feature, value }) {
      // 设置指定卡片指定的特征为指定的值
      state.navs[v_id][feature] = value;
      setNavLocalstorage(state.navs); //设置存入本地
    },
    [types.DELETE_NAV](state, index) {
      state.navs.splice(index, 1);
      setNavLocalstorage(state.navs); //设置存入本地
    },
    [types.SET_NAVS](state, navs) {
      state.navs = navs; //设置navs
      setNavLocalstorage(state.navs); //设置存入本地
    },
    添加新导航(
      // 是上面的中文版
      状态,
      {
        网站名称 = 状态.默认值.名称,
        网站链接 = 状态.默认值.链接,
        网站背景颜色 = 状态.默认值.背景颜色,
        网站文字颜色 = 状态.默认值.文字颜色,
      }
    ) {
      状态.navs.push({
        name: 网站名称,
        url: 网站链接,
        backgroundColor: 网站背景颜色,
        color: 网站文字颜色,
      });
      setNavLocalstorage(状态.navs); //设置存入本地
    },
    初始化_导航(state) {
      if (!localStorage.v_navs) {
        // 如果未初始化
        localStorage.v_navs = JSON.stringify(defaultNav);
        state.navs = JSON.parse(localStorage.v_navs);
      } else {
        state.navs = JSON.parse(localStorage.v_navs);
        state.navs.forEach((item, index) => {
          if (!state.navs[index].backgroundColor) {
            state.navs[index].backgroundColor = state.defaultBackgroundColor;
          }
          if (!state.navs[index].color) {
            state.navs[index].color = state.defaultColor;
          }
        });
        setNavLocalstorage(state.navs); //设置存入本地
      }
    },
  },
};
