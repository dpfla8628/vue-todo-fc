export default {
  namespaced: true,
  state: () => ({
    a: 123,
    b: []
  }),
  getters: {
    someGetter1 (state, getters) {
      return state.a + 1
    },
    someGetter2 (state, getters) {
      return state.a + getters.someGetter1
    }
  },
  mutations: {
    // payload ? data param
    someMutation (state, payload) {
      state.a = 789
      state.b.push(payload)
    }
  },
  actions: {
    // context === { state, getters, commit, dispatch }
    someAction1 ({ state, getters, commit, dispatch }, payload) {
      state.a = 1 // Error
      state.b.push(payload) // Error
      commit('someMutation', payload) // mutation 실행 함수? commit
    },
    someAction2 (context, payload) {
      context.commit('someMutation') // mutations 실행 시 commit
      context.dispatch('someAction1', payload) // actions 실행 시 dispatch
    }
  }
}
