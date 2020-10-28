<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请修改名称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/user";
export default {
  name: "updateNameIndex",
  data() {
    return {
      localName: this.value,
    };
  },
  props: {
    value: {
      type: [String, Array, Object],
      required: true,
    },
  },
  methods: {
    async onClickRight() {
      this.$toast({
        message: "保存中",
        forbidclick: true,
      });
      try {
        const { data } = await updateUser({
          name: this.localName,
        });
        this.localName = data.data.name;
        this.$emit("close");
        this.$emit("input", this.localName);
        this.$toast.success("保存成功");
      } catch (error) {
        if (error && error.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>

<style scoped lang='less'>
.name-field-wrap {
  padding: 10px;
}
</style>