// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引用iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 插件引用
// import './../node_modules/moment/moment'

// css重置样式
import './plugins/reset.css'
import './plugins/font-awesome-4.6.3/css/font-awesome.css'

// 组件引用
import Account from './components/views/Account.vue'
import Carousel from './components/views/Carousel.vue'
import Introduction from './components/views/Introduction.vue'

Vue.config.productionTip = false

Vue.use(iView)

Vue.component('xAccount', Account)
Vue.component('xCarousel', Carousel)
Vue.component('xIntroduction', Introduction)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
