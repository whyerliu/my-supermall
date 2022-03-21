<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props :{
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
      // observeDOM: true
    })
    // 2.监听滚动事件
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })
    // 3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      // console.log('上拉加载更多');
      // 发送网络请求, 请求更多页的数据
      // 等数据请求完成, 并且将新的数据展示出来后
      // setTimeout(() => {
      //   this.scroll.finishPullUp()
      // }, 2000)
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>