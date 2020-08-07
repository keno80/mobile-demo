<template>
  <div>
    <van-tabs v-model="activeName">
      <van-tab title="新歌" name="newSong">
        <swipe/>
        <new-song-tab/>
      </van-tab>
      <van-tab title="歌单" name="album">内容 2</van-tab>
      <van-tab title="歌手" name="singer">内容 3</van-tab>
      <van-tab title="搜索" name="search">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Swipe from './components/Swipe'
  import NewSongTab from './components/NewSongTab'

  export default {
    name: "index",
    components: {
      Swipe,
      NewSongTab,
    },
    data() {
      return {
        activeName: 'newSong'
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  /deep/ .van-tabs__wrap {
    height: 36px;
    margin-bottom: 10px;
  }

  /deep/ .van-tabs--line {
    .van-tabs__line {
      background-color: #1989fa;
      z-index: 0;
    }
  }
</style>