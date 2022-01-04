<template>
    <section class="home">
        <div>
            <h1>
                YERIM's Home Page!
            </h1>
            <h2 @click="$router.push('/about')">
                About
            </h2>
            <!-- <h2 @click="toTodoApp"> -->
            <router-link to="todos" tag="h2"> <!--tag : router-link 가 어떤 태그로 설정이 될지-->
                Todo
            </router-link>
            <!-- </h2> -->
        </div>
    </section>
</template>
<script>
export default ({
  methods: {
    // toAbout () {
    //   this.$router.push('/about')
    // },
    // toTodoApp () {
    //   this.$router.push('/todos')
    // }
  }
})
</script>
