<template>
  <van-nav-bar :title="title" :left-text="leftText" :left-arrow="leftArrow" @click-left="onClickLeft"
               @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {}
    },
    computed: {
      title() {
        return this.$route.meta.title
      },
      leftText() {
        let text = '返回'
        if (this.$route.path === '/home') {
          text = ''
        }
        return text
      },
      leftArrow() {
        let arrow = true
        if (this.$route.path === '/home') {
          arrow = false
        }
        return arrow
      }
    },
    methods: {
      onClickLeft() {

      },
      onClickRight() {
        this.$toast('点击了搜索')
      }
    }
  }
</script>

<style scoped>

</style>