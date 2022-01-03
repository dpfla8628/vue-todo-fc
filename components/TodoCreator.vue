<template>
    <div>
        <button @click="createTodo">
            <i class="material-icons">add</i>
        </button>
        <input type="text" v-model="title" :placeholder="placeholder" @keypress.enter="createTodo"/>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      placeholder: '할 일을 추가하세요'
    }
  },
  methods: {
    createTodo () {
      const validatedTitle = this.title && this.title.trim()
      if (!validatedTitle) {
        alert('값을 입력하세요')
        this.title = this.title.trim()
        return
      }
      this.$emit('create-todo', this.title)
      this.title = ''

      // 위에꺼 다 처리하고 나서 스크롤 포커스 설정
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  }
}
</script>
