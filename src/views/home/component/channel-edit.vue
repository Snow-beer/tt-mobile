<template>
  <div class="edit-container">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button plain round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="gtid-item"
        v-for="value in channellist"
        :key="value.id"
        :text="value.name"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="gtid-item"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannel } from "@/api/channel.js";
export default {
  name: "ChanneslEditIndex",
  data() {
    return {
      allChannels: [],
    };
  },
  props: {
    channellist: {
      type: Array,
      requried: true,
    },
  },
  computed: {},
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getChannel();
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.edit-container {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .gtid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
    }
  }
}
</style>