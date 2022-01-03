import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  // render (createElement) {
  //     // 최상위 컴포넌트
  //     return createElement(App)
  // },
  render: h => h(App)
})
