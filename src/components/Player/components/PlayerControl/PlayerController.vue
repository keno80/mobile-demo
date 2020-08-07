<template>
  <div>
    <div class="sliderBlock">
      <p class="progress_time">{{curTime}}</p>
      <van-slider v-model="progress" bar-height="4px" active-color="#ee0a24"/>
      <p class="progress_time">{{totalTime}}</p>
    </div>

    <div class="controllerBlock">
      <img src="../../../../assets/images/player/previous.png" class="next_previous_img"
           @click="switchMusicController('pre')">
      <img src="../../../../assets/images/player/play.png" class="play_pause__img" v-if="isPaused"
           @click="playController">
      <img src="../../../../assets/images/player/pause.png" class="play_pause__img" v-else @click="playController">
      <img src="../../../../assets/images/player/next.png" class="next_previous_img"
           @click="switchMusicController('next')">
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "PlayerController",
    props: {
      audioInfo: {
        type: Object,
        required: true
      },
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
        value: 0
      }
    },
    computed: {
      ...mapState({
        isPaused: state => state.playerWidget.isPaused
      }),
      curTime() {
        return this.timeToMinute(this.currentTime)
      },
      totalTime() {
        return this.timeToMinute(this.duration)
      },
      progress: {
        get() {
          return (this.currentTime / this.duration) * 100
        },
        set(val) {
          this.value = val
        }
      }
    },
    methods: {
      playController() {
        this.$emit('playController')
      },
      switchMusicController(type) {
        this.$emit('switchMusicController', type)
      },
      // 秒转换分钟00:00:00格式
      timeToMinute(times) {
        let t = ''
        if (times > -1) {
          const min = Math.floor(times / 60) % 60;
          const sec = times % 60;

          if (min < 10) {
            t += "0";
          }
          t += min + ":";
          if (sec < 10) {
            t += "0";
          }
          t += sec.toFixed(2);
        }
        t = t.substring(0, t.length - 3);
        return t;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./PCStyle";
</style>