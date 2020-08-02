<template>
  <div class="main-container">
    <app-main/>
    <tab-bar/>
  </div>
</template>

<script>
  import {NavBar, TabBar, AppMain} from "./components";

  export default {
    name: "index",
    components: {
      AppMain,
      NavBar,
      TabBar
    }
  }
</script>

<style scoped>

</style>