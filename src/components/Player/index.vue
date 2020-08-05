<template>
  <div style="height: 100%;overflow: hidden">
    <div :style="{ backgroundImage: 'url('+ this.blurImgUrl +')'}" class="blurBG"/>

    <div class="headInfo">
      <p class="pName">{{playerHeadInfo.name}}</p>
      <p class="pArtist">{{playerHeadInfo.artists}}</p>
    </div>

    <div class="songPicBlock">
      <img :src="blurImgUrl + '?param=150y150'">
    </div>

    <lyric :id="id" ref="songLyric" :currentTime="lrcTime.currentTime" :duration="lrcTime.duration"/>

    <player-controller :currentTime="lrcTime.currentTime" :duration="lrcTime.duration" :audioInfo="audioInfo"
                       @playController="controller"/>

    <audio :src="mp3Url" autoplay class="audio" ref="audio"/>

  </div>

</template>

<script>
  import song from "../../api/song";
  import Lyric from "./components/Lyric/Lyric";
  import PlayerController from "./components/PlayerControl/PlayerController";

  export default {
    name: "Player",
    components: {
      Lyric,
      PlayerController
    },
    props: {
      playerInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        id: '',
        mp3Url: '',  //歌曲Url
        blurImgUrl: '',  //背景以及播放页面图片
        playerHeadInfo: {
          name: '',  //歌曲名
          artists: ''  //歌手
        },
        lrcTime: {
          currentTime: 0,  //当前播放时间
          duration: 0  //总时长
        },
        audioInfo: {
          paused: true  //暂停状态
        }
      }
    },
    created() {
      this.getSongUrl()
      this.id = this.playerInfo.id
    },
    methods: {
      getSongUrl() {
        song.getMusicRealUrl(this.playerInfo.id).then(res => {
          if (res.data.code === 200) {
            this.blurImgUrl = this.playerInfo.album.blurPicUrl
            this.playerHeadInfo.name = this.playerInfo.name
            this.playerHeadInfo.artists = this.playerInfo.artist
            this.mp3Url = res.data.data[0].url
            this.$nextTick(() => {
              this.$refs.songLyric.getLyric(this.playerInfo.id)
              setTimeout(() => {
                this.audioInfo.paused = this.$refs.audio.paused
              }, 500)
            })
            this.getMusicTime()
          }
        })
      },
      getMusicTime() {
        this.$nextTick(() => {
          this.$refs.audio.addEventListener('timeupdate', () => {
            this.lrcTime.currentTime = this.$refs.audio.currentTime
          })
          this.$refs.audio.addEventListener('canplay', () => {
            this.lrcTime.duration = this.$refs.audio.duration
          })
        })
      },
      refreshData(id) {
        if (this.id !== id) {
          this.id = id
          this.getSongUrl()
        }
      },
      //播放控件操作
      controller() {
        if (this.$refs.audio.paused === false) {
          this.$refs.audio.pause()
          this.audioInfo.paused = true
        } else {
          this.$refs.audio.play()
          this.audioInfo.paused = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "playerStyle";
</style>