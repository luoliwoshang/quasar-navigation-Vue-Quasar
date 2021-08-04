import Vue from "vue";
import Vuex from "vuex";
import moduleNav from "./components/moduleNav.js";
import moduleExpress from "./components/moduleExpress.js";
import 样式模组 from "./components/moduleStyle.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moduleNav,
    样式模组,
    moduleExpress
  },
});
