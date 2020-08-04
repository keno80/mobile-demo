<template>
  <div class="lrcContainer">
    <div class="lrcBlock" ref="lrcBlock">
      <p v-for="(item, name, index) in lrcs" :key="index"
         :class="{'active' : currentTime > timeIndex[index] && currentTime < timeIndex[index+1]}">
        {{item}}{{scrollLrc(index)}}</p>
    </div>
  </div>
</template>

<script>
  import song from "../../../api/song";

  export default {
    name: "Lyric",
    props: {
      id: Number,
      currentTime: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        lrcs: [],
        timeIndex: []
      }
    },
    methods: {
      getLyric(id) {
        this.$refs.lrcBlock.style.top = 0 + 'px'
        song.getMusicLyric(id).then(res => {
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
            this.getTimeIndex(lrc)
          }
        })
      },
      getTimeIndex(lrcArr) {
        for (let key in lrcArr) {
          this.timeIndex.push(key)
        }
      },
      scrollLrc(index) {
        if (this.currentTime > this.timeIndex[index] && this.currentTime < this.timeIndex[index + 1]) {
          this.$refs.lrcBlock.style.top = -30 * index + 'px'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "lrcStyle";
</style>