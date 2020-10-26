<template>
  <div class="search-suggestion">
    <van-cell :title="item" 
    v-for="(item, index) in suggestions"
    :key="index"
    icon="search"></van-cell>
   
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash"
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: []
    };
  },
  computed: {},
  watch: {
    // 该回调将会在侦听开始之后被立即调用
    searchText: {
      handler: debounce(async function(){
        const { data} = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 300),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less"></style>