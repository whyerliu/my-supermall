<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   class="home-tab-control"
                   @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import {getHomeMultidata,
          getHomeGoods} from "network/home";


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop' : {page: 0, list : []},
          'new' : {page: 0, list : []},
          'sell' : {page: 0, list : []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res); // 函数执行结束res就会被回收，所以我们要保存下来
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then( res => {
          // console.log(res)
          // 返回的是pop的第一页的30行数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 上拉加载结束后继续调用，不然只能拉一次
          this.$refs.scroll.finishPullUp()
          // 图片加载完后要刷新，因为它已经帮你计算好高度了
          this.$refs.scroll.scroll.refresh()
        })
      },
      // 事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: sticky;*/
    /*top: 0px;*/
    /*z-index: 9;*/
  }
  .home-tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
