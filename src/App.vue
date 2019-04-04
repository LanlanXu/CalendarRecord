<template>
  <div id="app">
    <div class="main" :class="{'active': barShow}">
      <left-bar v-model="barShow"></left-bar>
      <div class="right-cont">
        <c-header v-model="barShow"></c-header>
        <div class="wrapper" ref="wrapper">
          <router-view/>
        </div>
      </div>
    </div>
    <c-status></c-status>
  </div>
</template>

<script>
import leftBar from "@/page/modules/leftBar";
import cHeader from "@/page/modules/header";
import cStatus from "@/page/status";
export default {
  name: "App",
  data() {
    return {
      barShow: false
    };
  },
  components: {
    leftBar,
    cHeader,
    cStatus
  },
  // data() {
  //   return {
  //     // layerShow: false,
  //     // loginShow: true
  //   };
  // },
  methods: {
    toRegister() {
      this.loginShow = false;
    },
    toLogin() {
      this.loginShow = true;
    }
  },
  created() {
    console.log("created");
  }
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
  }
}
</style>
