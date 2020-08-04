<template>
  <div style="height: 100%">
    <div :style="{ backgroundImage: 'url('+ this.blurImgUrl +')'}" class="blurBG"/>

    <div class="headInfo">
      <p class="pName">{{playerHeadInfo.name}}</p>
      <p class="pArtist">{{playerHeadInfo.artists}}</p>
    </div>

    <div class="songPicBlock">
      <img :src="blurImgUrl">
      <div class="lrcBlock">
        <p v-for="(item, index) in lrcs" :key="index">{{item}}</p>
      </div>
    </div>

    <audio :src="mp3Url" autoplay controls="controls" class="audio"/>

  </div>

</template>

<script>
  import song from "../../api/song";

  export default {
    name: "Player",
    props: {
      playerInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        id: '',
        mp3Url: '',
        blurImgUrl: '',
        lrcs: [],
        playerHeadInfo: {
          name: '',
          artists: ''
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
            if (res.data.data[0].url !== null) {
              this.blurImgUrl = this.playerInfo.album.blurPicUrl
              this.playerHeadInfo.name = this.playerInfo.name
              this.playerHeadInfo.artists = this.playerInfo.artist
              this.getLyric(this.playerInfo)
              this.mp3Url = res.data.data[0].url
            } else {
              this.$Toast.baseToast("fail", `这首歌曲暂时不能播放哦(●'◡'●)`)
            }
          }
        })
      },
      getLyric(item) {
        song.getMusicLyric(item.id).then(res => {
          if (res.data.code === 200) {
            let lrc = {}
            let l = res.data.lrc.lyric
            //分割歌词为数组
            let lyrics = l.split("\n")
            //创建歌词时间reg
            const reg = /\[\d*:\d*(\.|:)\d*]/g
            for (let i = 0; i < lyrics.length; i++) {
              //歌词时间处理
              let timeRegArr = lyrics[i].match(reg)
              if (!timeRegArr) continue
              //获取时间
              let t = timeRegArr[0]
              //正则匹配获取分和秒
              let min = parseInt(t.match(/\[\d*/i).toString().slice(1))
              let sec = parseInt(t.match(/\:\d*/i).toString().slice(1))
              //完整时间
              let time = min * 60 + sec
              //获取歌词内容
              let content = lyrics[i].replace(timeRegArr, "")
              lrc[time] = content
            }
            this.lrcs = lrc
            console.log(this.lrcs);
          }
        })
      },
      refreshData(id) {
        if (this.id !== id) {
          this.id = id
          this.getSongUrl()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "style";
</style>