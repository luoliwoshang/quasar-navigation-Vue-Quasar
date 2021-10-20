import { defaultStyle } from "../../default/default.js";
import { set_overall_style } from "../../util/theme.js";
import * as types from "../mutation-types.js";
const themes = {
  'main-color-1': ['#0088ff', '#000066'],//主要颜色
  'main-color-2': ['#72b9ff', '#000099'],//次级主要颜色
  'main-color-3': ['#e3d3fa','#464692'],//三级主要颜色
  'font-color-1': ['#303133', '#33FFFF'],//主要文字颜色
  'font-color-2': ['#606266', '#000000'],//一般文字颜色
  'font-color-3': ['#909399', '#000000'],//次要文字颜色
  'font-color-light': ['#ffffff', '#dddddd'],//明亮文字颜色
  'font-color-active':['#ff8ce4','white'],//激活文字颜色
  'mask-color': ['rgba(0,0,0,0)', 'rgba(0,0,0,.6)'],//背景遮罩
  'input-border': ['1px solid #909399', '1px solid cadetblue'],//输入框边框
  'input-background-color': ['aliceblue', '#445360'],//输入框背景颜色
  'input-font-color': ['#999999', 'white'],//输入框文字
  'default-background-color': ['white', 'lightslategrey']//默认背景颜色,
}

const get_theme = ({ type }) => {
  let properties = {}
  Object.keys(themes).forEach(_property => {
    properties[_property] = themes[_property][type === "light" ? 0 : 1]
  })
  return properties
}

export default {
  namespaced: true,
  state: {
    background: "",
    opacity: 0,
    theme: {
      light: {
        ...get_theme({ type: 'light' })
      },
      dark: {
        ...get_theme({ type: 'dark' })
      }
    }
  },
  mutations: {
    set_background(state, { url }) {
      state.background = url;
      localStorage.v_background = url;
    },
    set_opacity(state, val) {
      set_overall_style({ property: 'main-opacity', value: val })
      state.opacity = val;
      localStorage.v_opacity = val;
    },
    [types.INIT_STYLE](state) {
      localStorage.v_background = localStorage.v_background
        ? localStorage.v_background
        : defaultStyle.background;
      localStorage.v_opacity = localStorage.v_opacity
        ? localStorage.v_opacity
        : defaultStyle.opacity;
      state.background = localStorage.v_background;
      state.opacity = localStorage.v_opacity;
      set_overall_style({ property: 'main-opacity', value: state.opacity })
    },
  },
};
