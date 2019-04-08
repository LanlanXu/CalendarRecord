<template>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/base.scss";

.main {
  transform: translateX(-($bar-width));
  transition: all 0.2s;

  &.active {
    transform: translateX(0);
  }

  .right-cont {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: $bar-width;
    background: #fff;
    overflow-y: auto;
  }
}
</style>
