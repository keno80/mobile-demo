<template>
  <div class="main-container">
    <app-main/>
    <bottom-player-widget/>
  </div>
</template>

<script>
  import {NavBar, BottomPlayerWidget, AppMain} from "./components";

  export default {
    name: "index",
    components: {
      AppMain,
      NavBar,
      BottomPlayerWidget
    }
  }
</script>

<style scoped>

</style>