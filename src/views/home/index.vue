<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs v-model="active">
      <van-tab 
      :title="item.name" 
      v-for="(item, index) in channels" 
      :key="index">
      <Articlelist :channel='item'></Articlelist>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Articlelist from './component/article-list'
import { getUserChannels } from "@/api/user.js";
export default {
  name: "HomeIndex",
  components: {Articlelist},
  data() {
    return {
      active: 2,
      channels: [],
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      const { data } = await getUserChannels();
      this.channels = data.data.channels;
    },
  },
};
</script >

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .app-nav-bar {
    background-color: #2794ff;
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
  }
}
</style>