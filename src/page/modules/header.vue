<template>
  <div class="head">
    <div class="bar-btn" @click="closeLayer">
      <i class="fa fa-bars"></i>
    </div>
    <div class="name">
      <span class="text">~~~~</span>
      <i class="fa fa-paper-plane"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value"],
  methods: {
    closeLayer() {
      this.$emit("input", !this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/base.scss";
.head {
  height: $bar-btn;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  background: $bg-color;

  .bar-btn {
    width: $bar-btn;
    height: $bar-btn;
    text-align: center;
    line-height: $bar-btn;
    font-size: 24px;
    color: #fff;
  }

  .name {
    line-height: $bar-btn;
    color: #fff;
    font-size: 14px;
    padding: 0 15px;
  }
}
</style>
