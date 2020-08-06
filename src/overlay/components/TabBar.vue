<template>
  <div class="playerWidgetBlock" v-if="playWidgetShow">
    <div class="widgetImg">
      <img :src="playWidgetInfo.songImg + '?param=50y50'">
    </div>
    <div class="widgetInfo">
      <p class="name">{{playWidgetInfo.songName}}</p>
      <p class="singer">{{playWidgetInfo.singer}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "TabBar",
    computed: {
      ...mapState({
        playWidgetInfo: state => state.playerWidget.info,
        playWidgetShow: state => state.playerWidget.isShow,
      })
    },
    mounted() {
      console.log(this.playWidgetInfo);
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .playerWidgetBlock {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 60px;
    background: #ffffff;
    box-shadow: 0 -2px 10px -1px #c9edff;

    .widgetImg {
      height: 100%;
      width: 13.6%;
      margin-left: 4.4%;
      float: left;

      img {
        margin-top: 10px;
        border-radius: 4px;
      }
    }

    .widgetInfo {
      margin: 10px 0 10px 65px;

      .name {
        line-height: 0.7;
        color: #282828;
        font-size: 14px;
      }

      .singer {
        margin: 0;
        font-size: 12px;
        color: #939393;
        line-height: 0.6;
      }
    }
  }
</style>