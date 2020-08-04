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
            <img v-lazy="item.album.picUrl" class="songPic">
            <div class="songBlock" @click="showMusic(item.id, item.album.blurPicUrl)">
              <p class="songTitle">{{item.name}}</p>
              <br/>
              <div class="songInfo">{{item.artist}} - {{item.album.name}}</div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-popup v-model="songShow" position="bottom" round close-icon="close" closeable :style="{height: '88%'}">
      <div :style="{ backgroundImage: 'url('+ this.blurImgUrl +')'}" class="blurBG">
      </div>

      <audio :src="mp3Url" autoplay controls="controls" class="audio"></audio>

    </van-popup>
  </div>
</template>

<script>
  import home from "../../../../api/home";
  import {mapState} from 'vuex'

  export default {
    name: "NewSongTab",
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
        mp3Url: '',
        blurImgUrl: '',
        active: 0,
        type: 0,
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

          this.loading = false
          for (let i = 0; i < this.songList.length; i++) {
            if (this.songList[i].artists.length > 1) {
              let a = []
              for (let j = 0; j < this.songList[i].artists.length; j++) {
                a.push(this.songList[i].artists[j].name)
                this.songList[i].artist = a.join('/')
              }
            } else {
              this.songList[i].artist = this.songList[i].artists[0].name
            }
          }
        } else {
          this.finished = true
        }
      },
      showMusic(id, imgUrl) {
        console.log(id);
        this.blurImgUrl = imgUrl
        this.songShow = true
        home.getMusicRealUrl(id).then(res => {
          if (res.data.code === 200) {
            this.mp3Url = res.data.data[0].url
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
  }

  .blurBG {
    background-attachment: fixed;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
    box-sizing: border-box;
    filter: blur(10px);
    position: absolute;
    background-position: center center;
  }
</style>