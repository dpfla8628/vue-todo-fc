<template>
    <div :class="{ done }" class="todo-item">
        <div v-if="isEditMode" class="item__inner item--edit">
            <input ref="titleInput" type="text" v-model="editedTitle" @keypress.enter="editedTodo" @keypress.esc="offEditMode" />
            <div class="item__actions">
                <button class="btn btn--primary" key="complete" @click="editedTodo"><i class="material-icons">done</i></button>
                <button class="btn" key="cancel" @click="offEditMode"><i class="material-icons">clear</i></button>
            </div>
        </div>
        <div v-else class="item__inner item--normal">
            <label>
                <input type="checkbox" v-model="done" />
                <span class="icon">
                    <i class="material-icons">check</i>
                </span>
            </label>
            <div class="item__title-wrap">
                <div class="item__title">
                    {{ todo.title }}
                </div>
                <div class="item__date">
                    {{ date }}
                </div>
            </div>
            <div class="item__actions">
                <!-- 위의 item__actions와 형식이 같기 때문에 key로 구분해준다-->
                <button class="btn" key="update" @click="onEditMode"><i class="material-icons">edit</i></button>
                <button class="btn btn--danger" key="delete" @click="onDeleteMode"><i class="material-icons">delete</i></button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    todo: Object
  },
  data () {
    return {
      isEditMode: false,
      editedTitle: ''
    }
  },
  computed: {
    done: {
      get () {
        return this.todo.done
      },
      set (done) {
        this.updateTodo({
          done
        })
      }
    },
    date () {
      const date = dayjs(this.todo.createdAt)
      const update = dayjs(this.todo.updatedAt)
      const isSame = date.isSame(update)
      if (isSame) {
        return date.format('YYYY-MM-DD hh:mm:ss')
      } else {
        return `${date.format('YYYY-MM-DD hh:mm:ss')}(edited)`
      }
    }
  },
  methods: {
    editedTodo () {
      // 수정한 값이 없다면? db update X
      if (this.todo.title !== this.editedTitle) {
        // db update
        this.updateTodo({
          title: this.editedTitle,
          updatedAt: new Date()
        })
        this.offEditMode()
      }
    },
    onEditMode () {
      this.isEditMode = true
      this.editedTitle = this.todo.title

      this.$nextTick(() => { // 랜더링 보장 , 위의 코드들이 적용되고 나서 실행
        this.$refs.titleInput.focus()
      })
    },
    offEditMode () {
      this.isEditMode = false
    },
    updateTodo (value) {
      this.$emit('update-todo', this.todo, value)
    },
    onDeleteMode () {
      this.$emit('delete-todo', this.todo)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
