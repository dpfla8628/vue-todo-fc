import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  // render (createElement) {
  //     // 최상위 컴포넌트
  //     return createElement(App)
  // },
  router,
  render: h => h(App)
})
