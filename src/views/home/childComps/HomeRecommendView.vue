<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends:{
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    /*上 左右 下间距*/
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    /*图片下方留空白*/
    margin-bottom: 10px;
  }

</style>