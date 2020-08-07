<template>
  <div class="music_list_block">
    <h1>正在播放</h1>
    <van-list>
      <van-cell v-for="item in nowList" :key="item.id">
        <img v-lazy="item.album.picUrl + '?param=50y50'" class="songPic">
        <div class="songBlock" @click="showMusic(item)">
          <p class="songTitle" :class="{'now_play': item.id === NowPlay.id}">{{item.name}}</p>
          <br/>
          <div class="songInfo" :class="{'now_play_singer': item.id === NowPlay.id}">{{item.artist}} - {{item.album.name}}
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "MusicList",
    data() {
      return {
        loading: false,
        finished: true,
        songList: []
      }
    },
    computed: {
      ...mapState({
        nowList: state => state.playerWidget.nowList,
        NowPlay: state => state.newSongList.NowPlay
      }),
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "MusicList";
</style>