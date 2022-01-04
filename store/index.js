import Vue from 'vue'
import Vuex from 'vuex'

import todoApp from './todoApp'

Vue.use(Vuex)

export default new Vuex.Store({
  // 개발시에는 true 배포시에는 false
  strict: process.env.NODE_ENV !== 'production',
  modules: { // 아래처럼 작성하면 보기 어려우므로 모듈을 생성해 독립적으로 관리한다
    todoApp
  }
//   // data
//   state: {
//   },
//   // computed
//   getters: {
//   },
//   // methods
//   // 실제 값을 변경 - state 처리 ( 비동기 x )
//   mutations: {
//   },
//   // methods
//   // 일반 로직 ( 비동기 o )
//   actions: {
//   }
})
