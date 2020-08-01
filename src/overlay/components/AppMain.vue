<template>
  <section class="app-main">
    <router-view :key="key"/>
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
    min-height: calc(100vh - 100px);
    width: 93.7%;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    min-width: 100px;
    padding: 10px 10px 0 10px;
  }
</style>