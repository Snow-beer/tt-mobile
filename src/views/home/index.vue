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
        to="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs v-model="active">
      <van-tab
        :title="item.name"
        v-for="(item, index) in channels"
        :key="index"
      >
        <Articlelist :channel="item"></Articlelist>
      </van-tab>
      <!-- 占位 -->
      <div class="wap-nav-placehodle" slot="nav-right"></div>
      <div slot="nav-right" @click="isShow = true" class="wapnav">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      get-container="body"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 我的频道展示 -->
      <ChannelEdit
        :channellist="channels"
        @close="isShow = false"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import Articlelist from "./component/article-list";
import ChannelEdit from "./component/channel-edit";
import { getUserChannels } from "@/api/user.js";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  components: { Articlelist, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannels();
        channels = data.data.channels;
      }else{
        const localChannels = getItem('user-channels')
        if(localChannels){
          channels = localChannels
        }else{
          const { data } = await getUserChannels();
        channels = data.data.channels;
        }
      }

      this.channels = channels
    },
    onUpdateActive(index) {
      this.active = index;
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
  .wap-nav-placehodle {
    width: 33px;
    flex-shrink: 0;
  }
  .wapnav {
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.8;
  }
}
</style>