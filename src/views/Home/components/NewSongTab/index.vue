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
            <div class="songBlock">
              <p class="songTitle">{{item.name}}</p>
              <br/>
              <div class="songInfo">{{item.artist}} - {{item.album.name}}</div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
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
        songLength: 0,
      }
    },
    methods: {
      onLoad() {
        this.songLength = this.songLength + 20
        if (this.songList.length < 100) {
          home.getNewSong().then(res => {
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
      tabChange(name, title) {
        console.log(name);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "NewSongTab";
</style>