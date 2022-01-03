<template>
    <div class="todo-app">
        <div class="todo-app__actions">
            <div class="filters">
                <button :class="{active: filter==='all'}" @click="changeFilter('all')">모든 항목 ({{total}})</button>
                <button :class="{active: filter==='active'}" @click="changeFilter('active')">해야 할 항목 ({{activeCount}})</button>
                <button :class="{active: filter==='completed'}" @click="changeFilter('completed')">완료 항목 ({{completedCount}})</button>
            </div>
            <div class="actions clearfix">
                <label class="float--left">
                    <input v-model="allDone" type="checkbox" />
                    <span class="icon"><i class="material-icons">done_all</i></span>
                </label>
                <div class="float--right clearfix">
                    <button class="btn float--left" @click="scrollToTop">
                        <i class="material-icons">expand_less</i>
                    </button>
                    <button class="btn float--left" @click="scrollToBottom">
                        <i class="material-icons">expand_more</i>
                    </button>
                    <button class="btn btn--danger float--left" @click="clearCompleted">
                        <i class="material-icons">delete_sweep</i>
                    </button>
                </div>
            </div>
        </div>
        <div class="todo-app__list">
            <todo-item v-for="todo in filterdTodos" :key="todo.id" :todo="todo"
                       @update-todo="updateTodo" @delete-todo="deleteTodo"/>
        </div>
        <todo-creator @create-todo="createTodo" class="todo-app__creator" />
    </div>
</template>

<script>
import lowDb from 'lowdb'
import cryptoRandomString from 'crypto-random-string'
import scrollTo from 'scroll-to'
// import _ from 'lodash' => 이처럼 가져와서 _.cloneDeep 으로 사용해도 되지만 너무 많이 가져와서 용량차지 많음
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
// import _remove from 'lodash/remove'
import _findIndex from 'lodash/findIndex'
import _forEachRight from 'lodash/forEachRight'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import TodoCreator from './TodoCreator.vue'
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      db: null,
      todo: [],
      filter: 'all'
    }
  },
  computed: {
    filterdTodos () {
      switch (this.filter) {
        case 'all':
        default:
          return this.todo
        case 'active':
          return this.todo.filter(todo => !todo.done)
        case 'completed':
          return this.todo.filter(todo => todo.done)
      }
    },
    total () {
      return this.todo.length
    },
    activeCount () {
      return this.todo.filter(todo => !todo.done).length
    },
    completedCount () {
    //   return this.todo.filter(todo => todo.done).length
      return (this.total - this.activeCount)
    },
    allDone: {
      get () {
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    initDB () {
      const adapter = new LocalStorage('todo-app')
      this.db = lowDb(adapter)

      const hasTodo = this.db.has('todo').value()

      if (hasTodo) {
        this.todo = _cloneDeep(this.db.getState().todo) // 깊은 복사
      } else {
        // db 초기화
        this.db.defaults({
          todo: []
        }).write()
      }
    },
    createTodo (title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }), // 고유한 값으로 설정 npm i crypto-random-string
        title, // = title: title
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }
      // Create DB
      this.db
        .get('todo') // lodash
        .push(newTodo) // lodash
        .write() // lowdb

      // Create client
      this.todo.push(newTodo)
    },
    updateTodo (todo, value) {
      this.db
        .get('todo')
        .find({ id: todo.id })
        .assign(value)// 특정한 객체에 값을 갱신
        .write() // 갱신

      const foundTodo = _find(this.todo, { id: todo.id })
      _assign(foundTodo, value)
    },
    deleteTodo (todo) {
      this.db
        .get('todo')
        .remove({ id: todo.id })
        .write() // 갱신

      //   _remove(this.todo, { id: todo.id }) // 반응성 x => _remove 대신 Vue의 $delete를 사용한다

      const foundIndex = _findIndex(this.todo, { id: todo.id })
      this.$delete(this.todo, foundIndex)
    },
    changeFilter (filter) {
      this.filter = filter
    },
    completeAll (checked) {
      // DB 갱신 return
      const newTodos = this.db
        .get('todo')
        .forEach(todo => {
          todo.done = checked
        })
        .write()
      // Local 갱신
      this.todo = _cloneDeep(newTodos)
      this.todo.forEach(todo => {
        todo.done = checked
      })
    },
    clearCompleted () {
    // 앞에서부터 삭제한 경우에는 비정상적으로 발생
    //   this.todo.forEach(todo => {
    //     if (todo.done) {
    //       this.deleteTodo(todo)
    //     }
    //   })

      // 뒤에서부터 제거하는 코드
      _forEachRight(this.todo, todo => {
        if (todo.done) {
          this.deleteTodo(todo)
        }
      })
    },
    scrollToTop () {
      scrollTo(0, 0, {
        ease: 'linear'
        // duration: 3000
      })
    },
    scrollToBottom () {
      scrollTo(0, document.body.scrollHeight)
    }
  }
}
</script>
<style lang="scss">
  @import "scss/style";
</style>
