import Vue from "vue";
import Vuex from "vuex";
import moduleNav from "./components/moduleNav.js";
import moduleExpress from "./components/moduleExpress.js";
import moduleStyle from "./components/moduleStyle.js";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moduleNav,
    moduleStyle,
    moduleExpress
  },
});
