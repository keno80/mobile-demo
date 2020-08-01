<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item name="profile" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "TabBar",
    data() {
      return {
        active: 'home'
      }
    },
    methods: {
      onChange(index) {
        console.log(index);
      }
    }
  }
</script>

<style scoped>

</style>