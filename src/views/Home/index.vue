<template>
  <div>
    <swipe/>
    <new-song-tab/>
  </div>
</template>

<script>
  import Swipe from './components/Swipe'
  import NewSongTab from './components/NewSongTab'

  export default {
    name: "index",
    components: {
      Swipe,
      NewSongTab
    },

    methods: {}
  }
</script>

<style scoped lang="scss">

</style>