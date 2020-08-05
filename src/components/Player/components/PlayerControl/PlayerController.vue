<template>
  <div class="sliderBlock">
    <p class="progress_time">{{curTime}}</p>
    <van-slider v-model="progress" @change="onChange" bar-height="4px" active-color="#ee0a24"/>
    <p class="progress_time">{{totalTime}}</p>
  </div>
</template>

<script>

  export default {
    name: "PlayerController",
    props: {
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
      onChange() {

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
  .sliderBlock {
    width: 88%;

    .progress_time {
      margin: 0 10px;
      display: inline-block;
      font-size: 12px;
      color: #ffffff;
    }

    .van-slider {
      width: 60%;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
    }

    /deep/ .van-slider__button {
      width: 8px;
      height: 8px;
    }
  }


</style>