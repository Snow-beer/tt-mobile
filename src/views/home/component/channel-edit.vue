<template>
  <div class="edit-container">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        plain
        round
        type="danger"
        size="mini"
        @click="isClear = !isClear"
        >{{ isClear ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="gtid-item"
        :icon="(isClear && index !==0) ? 'clear' : ''"
        v-for="(value, index) in channellist"
        :key="index"
        :text="value.name"
        @click="onUserChannelClick(value,index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="gtid-item"
        v-for="value in recommendChannels"
        :key="value.id"
        :text="value.name"
        @click="onAdd(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannel, addUserChannel, deteleUserChannel } from "@/api/channel.js";
import {setItem} from '@/utils/storage'
import {mapState} from 'vuex'
export default {
  name: "ChanneslEditIndex",
  data() {
    return {
      allChannels: [], //全部频道
      isClear: false,
    };
  },
  props: {
    channellist: {
      //我的频道
      type: Array,
      requried: true,
    },
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.channellist.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getChannel();
        this.allChannels = data.data.channels;
       
      } catch (error) {
        console.log(error);
      }
    },
    // 添加频道
    async onAdd(channel) {
      this.channellist.push(channel);
      // 数据持久化 
      if(this.user){
        console.log(channel.id, this.channellist.length)
        //有token
        await addUserChannel([{
        id: channel.id, // 频道 id
        seq: this.channellist.length // 频道的 序号
      }])
      }else{
        //没有touken
        setItem('user-channel', this.channellist)
      }
    },
    //修改频道
    onUserChannelClick(value,index){
      if(this.isClear){
        this.deleteChannel(value,index)
      }else{
        this.switchChannel(index)
      }
    },
    // 删除方法
    async deleteChannel(value,index){
      this.channellist.splice(index,1)
      if(this.user){
        await deteleUserChannel(value.id)
      }else{
        etItem('channles', this.channellist)
      }
    },
    switchChannel(index){
      this.$emit('close')
      this.$emit('update-active', index)
    }
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
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
}
</style>