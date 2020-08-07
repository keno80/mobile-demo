<template>
  <div class="music_list_block">
    <h1>正在播放</h1>
    <van-list>
      <van-cell v-for="item in nowList" :key="item.id">
        <img v-lazy="item.album.picUrl + '?param=50y50'" class="songPic">
        <div class="songBlock" @click="showMusic(item)">
          <p class="songTitle" :class="{'now_play': item.id === NowPlay.id}">{{item.name}}</p>
          <br/>
          <div class="songInfo" :class="{'now_play_singer': item.id === NowPlay.id}">{{item.artist}} -
            {{item.album.name}}
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import song from "../../../../api/song";

  export default {
    name: "MusicList",
    data() {
      return {
        loading: false,
        finished: true,
        songList: [],
        playInfo: {}
      }
    },
    computed: {
      ...mapState({
        nowList: state => state.playerWidget.nowList,
        NowPlay: state => state.newSongList.NowPlay
      }),
    },
    methods: {
      // showMusic(item) {
      //   song.getMusicRealUrl(item.id).then(res => {
      //     if (res.data.data[0].url !== null) {
      //       this.playerInfo = item
      //       this.$store.dispatch('playerWidget/toggleOpenPlayer', 'close')
      //       //vuex保存当前播放的音乐列表
      //       this.$store.dispatch('playerWidget/saveNowMusicList', this.songList)
      //       //vuex保存当前正在播放的音乐信息
      //       this.$store.dispatch('newSongList/setNowPlay', this.playerInfo)
      //       //为播放小部件赋值
      //       this.$store.dispatch('playerWidget/setInfo', {
      //         info: this.NowPlay,
      //         songShow: true
      //       })
      //       this.$nextTick(() => {
      //         this.$store.dispatch('playerWidget/fillPlayerPageData', item.id)
      //       })
      //     } else {
      //       this.$Toast.baseToast("fail", `这首歌曲暂时不能播放哦(●'◡'●)`)
      //     }
      //   })
      // },
    }
  }
</script>

<style scoped lang="scss">
  @import "MusicList";
</style>