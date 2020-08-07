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
      <img src="../../../assets/images/player/play_widget.png" v-if="playWidgetIcon" @click="switchPlayStatus('play')"/>
      <img src="../../../assets/images/player/pause_widget.png" v-else @click="switchPlayStatus('pause')"/>
      <img src="../../../assets/images/player/list_widget.png" class="list_icon" @click="showMusicListPop"/>
    </div>

    <van-popup v-model="showMusicList" position="top" close-icon="close" closeable :style="{height: '88%'}"
               align="center">
      <music-list/>
    </van-popup>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MusicList from "./component/MusicList";

  export default {
    name: "TabBar",
    components: {
      MusicList
    },
    computed: {
      ...mapState({
        playWidgetInfo: state => state.playerWidget.info,
        playWidgetShow: state => state.playerWidget.isShow,
        playWidgetIcon: state => state.playerWidget.isPaused
      })
    },
    data() {
      return {
        showMusicList: false
      }
    },
    methods: {
      showPlayer() {
        this.$store.dispatch('playerWidget/toggleOpenPlayer', 'widget')
      },
      switchPlayStatus(type) {
        this.$store.dispatch('playerWidget/changePlayStatus', type)
      },
      showMusicListPop() {
        this.showMusicList = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "BottomPlayerWidget";
</style>