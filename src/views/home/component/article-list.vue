<template>
  <div>
    <van-pull-refresh v-model="isRefreshLoading" 
     :success-duration="1500"
    @refresh="onRefresh">
      <van-list
        class="article-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
         v-for="(article, index) in articles"
         :article='article'
          :key="index"
          :title="article.title"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticeList } from "@/api/article";
export default {
  name: "articleIndex",
  components:{ArticleItem},
  data() {
    return {
      articles: [], //文章列表
      loading: false, //上拉下页
      finished: false,
      timestamp: null,
      isRefreshLoading : false, //下拉刷新
    };
  },
  created() {},
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      const { data } = await getArticeList({
        channel_id: this.channel.id, // 频道 ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      });
      //   console.log(data);
      // 2. 把数据放到 list 数组中
      const { results } = data.data;
      this.articles.push(...results);
      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false;

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp;
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true;
      }
    },
    async onRefresh() {
      const { data } = await getArticeList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      const { results } = data.data;
      this.articles.unshift(...results);
      this.isRefreshLoading  = false;
    //   console.log(results);
    },
    
  },
};
</script>

<style scopde lang='less'>
.article-list {
  position: fixed;
  bottom: 50px;
  top: 90px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>