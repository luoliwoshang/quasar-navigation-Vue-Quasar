import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueParticles from 'vue-particles'

Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.prototype.axios = axios;
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


import '@/icon/iconfont.css'
import '@/icon/iconfont.js'
import '/src/assets/style/common.css'
import './quasar'

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
