<template>
  <div class="main-container">
    <app-main/>
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