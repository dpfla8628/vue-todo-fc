<template>
    <div class="todo-app">
        <div class="todo-app__actions">
            <div class="filters">
                <!-- <button :class="{active: filter==='all'}" @click="changeFilter('all')">모든 항목 ({{total}})</button> -->
                <router-link to="all" tag="button">모든 항목 ({{total}})</router-link>
                <router-link to="active" tag="button">해야 할 항목 ({{activeCount}})</router-link>
                <router-link to="completed" tag="button">완료 항목 ({{completedCount}})</router-link>
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
import scrollTo from 'scroll-to'
// import _ from 'lodash' => 이처럼 가져와서 _.cloneDeep 으로 사용해도 되지만 너무 많이 가져와서 용량차지 많음
// import _remove from 'lodash/remove'
import TodoCreator from '~/components/TodoCreator.vue'
import TodoItem from '~/components/TodoItem.vue'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      // filter: 'all'
    }
  },
  computed: {
    filterdTodos () {
      switch (this.$route.params.id) {
        case 'all':
        default:
          return this.todo
        case 'active':
          return this.todo.filter(todo => !todo.done)
        case 'completed':
          return this.todo.filter(todo => todo.done)
      }
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
    console.log(this.$route)
  },
  methods: {
    // changeFilter (filter) {
    //   this.filter = filter
    // },
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
  @import "scss/style"; // 절대 경로
.filters button.router-link-exact-active{
  background: royalblue;
  color: white;
}
</style>
