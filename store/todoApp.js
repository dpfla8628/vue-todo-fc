import Vue from 'vue'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import _cloneDeep from 'lodash/cloneDeep'
import cryptoRandomString from 'crypto-random-string'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'
import _forEachRight from 'lodash/forEachRight'

export default {
  namespaced: true, // 독립적으로 관리하기 위해 설정 / 'todoApp'으로 호출하면 된다
  state: () => ({ // data 처럼 반드시 함수여야 한다
    db: null,
    todo: []
  }),
  getters: {
    total (state) {
      return state.todo.length
    },
    activeCount (state) {
      return state.todo.filter(todo => !todo.done).length
    },
    completedCount (state, getters) {
    //   return this.todo.filter(todo => todo.done).length
      return (getters.total - getters.activeCount)
    }
  },
  mutations: {
    assignDB (state, db) {
      state.db = db
    },
    assignTodos (state, todos) {
      state.todo = todos
    },
    createDB (state, newTodo) {
      // Create DB
      state.db
        .get('todo') // lodash
        .push(newTodo) // lodash
        .write() // lowdb
    },
    pushTodo (state, newTodo) {
      // Create client
      state.todo.push(newTodo)
    },
    updateDB (state, { todo, value }) {
      state.db
        .get('todo')
        .find({ id: todo.id })
        .assign(value)// 특정한 객체에 값을 갱신
        .write() // 갱신
    },
    assignTodo (state, { foundTodo, value }) {
      _assign(foundTodo, value)
    },
    deleteDB (state, todo) {
      state.db
        .get('todo')
        .remove({ id: todo.id })
        .write() // 갱신
    },
    deleteTodo (state, foundIndex) {
      Vue.delete(state.todo, foundIndex)
    },
    updateTodo (state, { todo, key, value }) {
      // todo.done = checked
      todo[key] = value
    }
  },
  actions: {
    initDB ({ state, commit }) { // state 가져와서 여기서 쓸래
      const adapter = new LocalStorage('todo-app')
      // state.db = low(adapter)
      this.$store.commit('assignDB', low(adapter))

      const hasTodo = state.db.has('todo').value()

      if (hasTodo) {
        commit('assignTodos', _cloneDeep(state.db.getState().todo)) // 깊은 복사
      } else {
        // db 초기화
        state.db.defaults({
          todo: []
        }).write()
      }
    },
    createTodo ({ state, commit }, title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }), // 고유한 값으로 설정 npm i crypto-random-string
        title, // = title: title
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }
      // Create DB
      commit('createDB', newTodo)

      // Create client
      commit('pushTodo', newTodo)
    },
    updateTodo ({ state, commit }, { todo, value }) { // 호출 시 매개변수는 두개만 가능하기 때문에 Object로 보낸다
      commit('updateDB', { todo, value })
      const foundTodo = _find(this.todo, { id: todo.id })
      commit('assignTodo', { foundTodo, value })
    },
    deleteTodo ({ state, commit }, todo) {
      commit('deleteDB', todo)
      //   _remove(this.todo, { id: todo.id }) // 반응성 x => _remove 대신 Vue의 $delete를 사용한다
      const foundIndex = _findIndex(state.todo, { id: todo.id })
      // this.$delete(this.todo, foundIndex)
      commit('deleteTodo', foundIndex)
    },
    completeAll ({ state, commit }, checked) {
      // commit은 반환값을 만들어 낼 수 없다.

      // DB 갱신 return
      const newTodos = this.db
        .get('todo')
        .forEach(todo => {
          commit('updateTodo', { todo, key: 'done', value: checked })
        })
        .write()
      // Local 갱신
      commit('assignTodos', _cloneDeep(newTodos))
    },
    clearCompleted ({ state, dispatch }) {
      // 앞에서부터 삭제한 경우에는 비정상적으로 발생
      //   this.todo.forEach(todo => {
      //     if (todo.done) {
      //       this.deleteTodo(todo)
      //     }
      //   })

      // 뒤에서부터 제거하는 코드
      _forEachRight(state.todo, todo => {
        if (todo.done) {
          dispatch('deleteTodo', todo) // actions은 dispatch로 호출
        }
      })
    }
  }
}
