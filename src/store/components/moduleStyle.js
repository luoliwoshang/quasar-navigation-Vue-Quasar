import { defaultStyle } from "../../default/default.js";
export default {
  namespaced: true,
  state: {
    background: "",
    opacity: 0,
  },
  mutations: {
    set_background(state, { url }) {
      state.background = url;
      localStorage.v_background = url;
    },
    set_opacity(state, val) {
      state.opacity = val;
      localStorage.v_opacity = val;
    },
    init_style(state) {
      localStorage.v_background = localStorage.v_background
        ? localStorage.v_background
        : defaultStyle.background;
      localStorage.v_opacity = localStorage.v_opacity
        ? localStorage.v_opacity
        : defaultStyle.opacity;
      state.background = localStorage.v_background;
      state.opacity = localStorage.v_opacity;
    },
  },
};
