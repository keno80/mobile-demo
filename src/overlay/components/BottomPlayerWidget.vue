<template>
  <div class="playerWidgetBlock" v-if="playWidgetShow">
    <div class="widgetImg" @click="showPlayer">
      <img :src="playWidgetInfo.songImg + '?param=46y46'">
    </div>
    <div class="widgetInfo" @click="showPlayer">
      <p class="name">{{playWidgetInfo.songName}}</p>
      <p class="singer">{{playWidgetInfo.singer}}</p>
    </div>
    <div class="widgetOperator">
      <img src="../../assets/images/player/play_widget.png" v-if="playWidgetIcon" @click="switchPlayStatus('play')"/>
      <img src="../../assets/images/player/pause_widget.png" v-else @click="switchPlayStatus('pause')"/>
      <img src="../../assets/images/player/list_widget.png" class="list_icon"/>
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
        playWidgetIcon: state => state.playerWidget.isPaused
      })
    },
    methods: {
      showPlayer() {
        this.$store.dispatch('playerWidget/toggleOpenPlayer', 'widget')
      },
      switchPlayStatus(type) {
        this.$store.dispatch('playerWidget/changePlayStatus', type)
      }
    }
  }
</script>

<style scoped lang="scss">
  .playerWidgetBlock {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 52px;
    background: #ffffff;
    box-shadow: 0 -2px 10px -1px #c9edff;

    .widgetImg {
      height: 100%;
      width: 13.6%;
      margin-left: 4.4%;
      float: left;

      img {
        margin-top: 6.6px;
        border-radius: 4px;
      }
    }

    .widgetInfo {
      float: left;
      width: 52%;
      margin: 10px 0 10px 6px;

      .name {
        line-height: 1;
        color: #525252;
        font-size: 14px;
        margin: 0;
      }

      .singer {
        margin: 0;
        font-size: 10px;
        color: #939393;
        line-height: 3;
      }
    }

    .widgetOperator {
      img {
        width: 34px;
        padding: 10px 0;
      }

      .list_icon {
        margin-left: 12px;
        width: 32px;
        vertical-align: top;
        margin-top: 0.2px;
      }
    }
  }
</style>