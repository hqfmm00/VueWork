import Vue from 'vue'
import App from './App' // 引入自定义组件
import 'lib-flexible/flexible'//taobao 的库
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import i18n from './i18n'
import './validate'
Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Star',Star)

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