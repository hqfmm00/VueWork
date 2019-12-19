import Vue from 'vue'
import App from './App' // 引入自定义组件
import 'lib-flexible/flexible'//taobao 的库
import {Button} from 'mint-ui'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import i18n from './i18n'
import './validate'
import * as API from '@/api'
import '@/mock/mock-serve.js'

Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component(Button.name,Button)

new Vue({
  // 注册局部组件
  // components: { // 注册组件(后面才能写组件标签)
  //   App: App
  // },
  // template: '<App/>',
  render: h => h(App),

  router,
  i18n,
  store
}).$mount('#app')