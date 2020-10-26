<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult v-if="isResultShow"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText"></SearchSuggestion>
    <SearchHistory v-else></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  components: { SearchHistory, SearchSuggestion, SearchResult },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      console.log("取消");
    },
  },
};
</script>

<style>
</style>