<template>
<div>
  <router-link to="/" class="to-home">
    <i class="material-icons">home</i>
  </router-link>
  <router-view />
</div>
</template>

<script>
// index.js에서 제어함
// import TodoApp from './views/TodoApp.vue'
// export default ({
//   components: {
//     'todo-app': TodoApp
//   }
// })
</script>
<style lang="scss">
/* router-link의 to 경로 위치(메인)에서는 class "router-link-exact-active"가 붙는다 */
.to-home.router-link-exact-active.router-link-active {
  display: none; /* 메인에서는 Home 버튼이 안보이게 */
}
</style>
