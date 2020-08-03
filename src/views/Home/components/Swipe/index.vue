<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in picList" :key="item.bannerId">
      <img v-lazy="item.pic">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  import home from "../../../../api/home";

  export default {
    name: "Swipe",
    data() {
      return {
        picList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        let type = 1
        const agent = window.navigator.userAgent
        if (agent.indexOf('iPhone') !== -1) {
          type = 2
        } else if (agent.indexOf('iPad') !== -1) {
          type = 3
        }
        home.getBanner(type).then(res => {
          this.picList = res.data.banners
          // console.log(this.picList);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-swipe {
    border-radius: 10px;

    .van-swipe-item {
      text-align: center;

      img {
        width: 300px;
        height: 130px;
        vertical-align: middle;
      }
    }
  }
</style>