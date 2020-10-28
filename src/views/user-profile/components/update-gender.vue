<template>
  <div>
    <van-picker
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @cancel="$emit('closegender')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUser } from "@/api/user";
export default {
  name: "UpdateGenderIndex",
  data() {
    return {
      columns: ["男生", "女生"],
      defaultIndex: this.value,
     
    };
  },
  props: {
    value: {
      type: Number,
    },
  },
  methods: {
    onGenderChange(picker, value, index) {
      this.defaultIndex = index;
    },
    async onConfirm() {
      const { data } = await updateUser({
        gender: this.defaultIndex,
      });
      this.localGender = data.data.gender;
      this.$emit("input", this.defaultIndex);
      this.$emit("closegender");
    },
    
  },
};
</script>

<style>
</style>