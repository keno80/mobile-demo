<template>
  <section class="app-main">
    <transition name="van-fade">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
  export default {
    name: "AppMain",
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 120px);
    width: 93.7%;
    position: relative;
    overflow-x: hidden;
    min-width: 100px;
    padding: 0 10px 0 10px;
  }
</style>