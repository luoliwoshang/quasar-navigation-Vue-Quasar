import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false


import VueParticles from 'vue-particles'
Vue.use(VueParticles)
// 背景动态线条

import '/src/assets/style/common.css'
import './quasar'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
