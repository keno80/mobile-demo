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
            <div class="songBlock" @click="showMusic(item.id)">
              <p class="songTitle">{{item.name}}</p>
              <br/>
              <div class="songInfo">{{item.artist}} - {{item.album.name}}</div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-popup v-model="songShow" position="bottom" :style="{ height: '30%' }">
      <audio :src="mp3Url" autoplay controls="controls"></audio>
      <!--      <audio src="http://m7.music.126.net/20200802211449/844efce3ea72d29d58210e4da7cfc656/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3421542178/739d/ef69/ffec/e05905e04d3d2a2a0f9ee169e3f23e44.flac"-->
      <!--             autoplay controls="controls"></audio>-->
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
      showMusic(id) {
        console.log(id);
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
            if (this.AllNew.length > 0) {
              this.songList = this.AllNew
            } else {
              this.type = 0
              this.onLoad()
            }
            break
          case 1:
            if (this.NewCN.length > 0) {
              this.songList = this.NewCN
            } else {
              this.type = 7
              this.onLoad()
            }
            break
          case 2:
            if (this.NewJP.length > 0) {
              this.songList = this.NewJP
            } else {
              this.type = 8
              this.onLoad()
            }
            break
          case 3:
            if (this.NewKR.length > 0) {
              this.songList = this.NewKR
            } else {
              this.type = 16
              this.onLoad()
            }
            break
          case 4:
            if (this.NewEU.length > 0) {
              this.songList = this.NewEU
            } else {
              this.type = 96
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
</style>