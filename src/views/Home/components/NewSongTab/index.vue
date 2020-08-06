<template>
  <div>
    <div class="newSongTitle">新歌速递</div>
    <van-tabs v-model="active" @change="tabChange">
      <van-tab v-for="(item, index) in typeList" :key="item.value" :title="item.type">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
          <van-cell v-for="item in songList" :key="item.id">
            <img v-lazy="item.album.picUrl + '?param=50y50'" class="songPic">
            <div class="songBlock" @click="showMusic(item)">
              <p class="songTitle">{{item.name}}</p>
              <br/>
              <div class="songInfo">{{item.artist}} - {{item.album.name}}</div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-popup v-model="songShow" position="bottom" round close-icon="close" closeable :style="{height: '88%'}"
               align="center">
      <player :playerInfo="playerInfo" ref="player"/>
    </van-popup>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import handleArtistName from "../../../../utils/SongsHandle/handleArtistName";
  import song from "../../../../api/song";
  import Player from '../../../../components/Player'

  export default {
    name: "NewSongTab",
    components: {
      Player
    },
    data() {
      return {
        loading: false,
        finished: false,
        songShow: false,
        typeList: [
          {
            type: '全部',
            value: 0
          },
          {
            type: '华语',
            value: 7
          },
          {
            type: '日本',
            value: 8
          },
          {
            type: '韩国',
            value: 16
          },
          {
            type: '欧美',
            value: 96
          }
        ],
        songList: [],
        active: 0,
        type: 0,
        playerInfo: {} //播放器所需信息
      }
    },
    computed: {
      ...mapState({
        AllNew: state => state.newSongList.AllNew,
        NewCN: state => state.newSongList.NewCN,
        NewJP: state => state.newSongList.NewJP,
        NewKR: state => state.newSongList.NewKR,
        NewEU: state => state.newSongList.NewEU,
      })
    },
    methods: {
      async onLoad() {
        if (this.songList.length < 100) {

          this.songList = await this.$store.dispatch('newSongList/getListData', this.type)
          this.songList = handleArtistName(this.songList)
          this.loading = false
        } else {
          this.finished = true
        }
      },
      showMusic(item) {
        song.getMusicRealUrl(item.id).then(res => {
          if (res.data.data[0].url !== null) {
            this.playerInfo = item
            this.songShow = true
            this.$nextTick(() => {
              this.$refs.player.refreshData(item.id)
            })
          } else {
            this.$Toast.baseToast("fail", `这首歌曲暂时不能播放哦(●'◡'●)`)
          }
        })
      },
      tabChange(name) {
        this.songList = []
        switch (name) {
          case 0:
            this.type = 0
            if (this.AllNew.length > 0) {
              this.songList = this.AllNew
            } else {
              this.onLoad()
            }
            break
          case 1:
            this.type = 7
            if (this.NewCN.length > 0) {
              this.songList = this.NewCN
            } else {
              this.onLoad()
            }
            break
          case 2:
            this.type = 8
            if (this.NewJP.length > 0) {
              this.songList = this.NewJP
            } else {
              this.onLoad()
            }
            break
          case 3:
            this.type = 16
            if (this.NewKR.length > 0) {
              this.songList = this.NewKR
            } else {
              this.onLoad()
            }
            break
          case 4:
            this.type = 96
            if (this.NewEU.length > 0) {
              this.songList = this.NewEU
            } else {
              this.onLoad()
            }
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "NewSongTab";

  /ddep/ .van-popup {
    position: relative;
    overflow: hidden;
  }

  /deep/ .van-popup--bottom {
    overflow: hidden;
  }

</style>