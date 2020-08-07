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
                       @playController="playController" @switchMusicController="switchMusicController"/>

    <audio :src="mp3Url" autoplay class="audio" ref="audio"/>

  </div>

</template>

<script>
  import song from "../../api/song";
  import {mapState} from 'vuex'
  import Lyric from "./components/Lyric/Lyric";
  import PlayerController from "./components/PlayerControl/PlayerController";
  import handleArtistName from "../../utils/SongsHandle/handleArtistName";

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
        },
        switchList: [] //播放控制切换音乐时保存的列表
      }
    },
    computed: {
      ...mapState({
        type: state => state.newSongList.type,
        AllNew: state => state.newSongList.AllNew,
        NewCN: state => state.newSongList.NewCN,
        NewJP: state => state.newSongList.NewJP,
        NewKR: state => state.newSongList.NewKR,
        NewEU: state => state.newSongList.NewEU,
        NowPlay: state => state.newSongList.NowPlay
      })
    },
    created() {
      this.id = this.playerInfo.id
      this.getSongUrl('component', this.id)
    },
    methods: {
      getSongUrl(type, id) {
        song.getMusicRealUrl(id).then(res => {
          if (res.data.code === 200) {
            if (type === 'component') {
              this.fillData(type, res)
            } else if (type === 'controller') {
              this.fillData(type, res)
            }
            this.$nextTick(() => {
              this.$refs.songLyric.getLyric(id)
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
      //播放控件操作
      playController() {
        if (this.$refs.audio.paused === false) {
          this.$refs.audio.pause()
          this.audioInfo.paused = true
        } else {
          this.$refs.audio.play()
          this.audioInfo.paused = false
        }
      },
      //上一首下一首
      switchMusicController(type) {
        let info = this.handleCurrentIndex()
        if (type === 'pre') {
          if (info.index === 0) {
            this.id = info.list[info.list.length - 1].id
            this.getSongUrl('controller', this.id)
          } else if (info.index > 0) {
            for (let i = 0; i < info.list.length; i++) {
              if (info.index === i) {
                this.id = info.list[i - 1].id
                this.getSongUrl('controller', this.id)
              }
            }
          }
        } else if (type === 'next') {
          if (info.index === info.list.length - 1) {
            this.id = info.list[0].id
            this.getSongUrl('controller', this.id)
          } else if (info.index < info.list.length) {
            for (let i = 0; i < info.list.length; i++) {
              if (info.index === i) {
                this.id = info.list[i + 1].id
                this.getSongUrl('controller', this.id)
              }
            }
          }
        }
      },
      //获取当前播放的音乐列表
      handleCurrentType() {
        let type = this.type
        let songList = []
        switch (type) {
          case 0:
            songList = this.AllNew
            break
          case 7:
            songList = this.NewCN
            break
          case 8:
            songList = this.NewJP
            break
          case 16:
            songList = this.NewKR
            break
          case 96:
            songList = this.NewEU
            break
        }
        return songList
      },
      //获取当前音乐所在列表的index
      handleCurrentIndex() {
        let list = this.handleCurrentType()
        let index = 0
        for (let i = 0; i < list.length; i++) {
          if (this.id === list[i].id) {
            index = i
          }
        }
        return {
          index,
          list
        }
      },
      //为页面元素赋值
      fillData(type, res) {
        if (type === 'component') {
          this.blurImgUrl = this.playerInfo.album.blurPicUrl
          this.playerHeadInfo.name = this.playerInfo.name
          this.playerHeadInfo.artists = this.playerInfo.artist
          this.$store.dispatch('newSongList/setNowPlay', this.playerInfo)
          this.$store.dispatch('playerWidget/setInfo', {
            info: this.NowPlay,
            songShow: true
          })
        } else if (type === 'controller') {
          let list = this.handleCurrentIndex()
          this.playerHeadInfo.name = list.list[list.index].name
          this.playerHeadInfo.artists = handleArtistName(list.list)[list.index].artist
          this.blurImgUrl = list.list[list.index].album.blurPicUrl
          //保存正在播放的音乐信息
          this.$store.dispatch('newSongList/setNowPlay', handleArtistName(list.list[list.index]))
          this.$store.dispatch('playerWidget/setInfo', {
            info: this.NowPlay,
            songShow: true
          })
        }
        if (res.data.data[0].url === null) {
          this.$Toast.baseToast('fail', `这首歌曲暂时不能播放哦(●\'◡\'●)`)
          this.mp3Url = ''
        } else {
          this.mp3Url = res.data.data[0].url
        }
      },
      refreshData(id) {
        if (this.id !== id) {
          this.id = id
          this.getSongUrl('component', id)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "playerStyle";
</style>