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
            <img :src="item.album.picUrl" class="songPic">
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
<!--      <audio src="http://m7.music.126.net/20200802211449/844efce3ea72d29d58210e4da7cfc656/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3421542178/739d/ef69/ffec/e05905e04d3d2a2a0f9ee169e3f23e44.flac" autoplay controls="controls"></audio>-->
    </van-popup>
  </div>
</template>

<script>
  import home from "../../../../api/home";

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
        allSong: [],
        chSong: [],
        jpSong: [],
        krSong: [],
        EuSong: [],
        mp3Url: '',
        active: 0,
        songLength: 0,
        type: 0,
      }
    },
    methods: {
      onLoad() {
        this.songLength = this.songLength + 20
        if (this.songList.length < 100) {
          home.getNewSong(this.type).then(res => {
            this.songList = res.data.data
            this.songList.length = this.songLength
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
          })
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
        switch (name) {
          case 0:
            this.type = 0
            break;
          case 1:
            this.type = 7
            break
          case 2:
            this.type = 8
            break
          case 3:
            this.type = 16
            break
          case 4:
            this.type = 96
            break
          default:
            this.type = 0
        }
        this.songList = []
        this.onLoad()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "NewSongTab";
</style>