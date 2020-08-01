import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../rem.js'
import './utils/vant'

Vue.config.productionTip = false

//Toast提示
import toast from './utils/toast'
Vue.prototype.$Toast = toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
