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
          <van-cell v-for="item in songList" :key="item.id" :title="item.name"/>
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
        active: 0
      }
    },
    created() {
      home.getNewSong().then(res => {
        this.songList = res.data.data
        console.log(this.songList);
      })
    },
    methods: {
      onLoad() {

      },
      tabChange(name, title) {
        console.log(name);
        console.log(title);
      }
    }
  }
</script>

<style scoped lang="scss">
  .newSongTitle {
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 700;
  }

  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 34px;
  }

  /deep/ .van-tabs--line {
    .van-tabs__line {
      background-color: #1989fa;
    }
  }

  /deep/ .van-list {
    height: 440px;
    overflow-x: hidden;
    min-height: 300px;
  }
</style>