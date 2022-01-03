<template>
    <div>
        <button @click="createTodo">추가</button>
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
      }
      this.$emit('create-todo', this.title)
      this.title = ''
    }
  }
}
</script>
