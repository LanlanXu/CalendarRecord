<template>
  <transition name="slide-fade">
    <div class="layer-plate" v-if="layerShow">
      <div class="close" @click="closeLayer">
        <i class="fa fa-times"></i>
      </div>
      <login v-if="loginShow" @toRegister="toRegister"></login>
      <register v-if="!loginShow" @toLogin="toLogin"></register>
    </div>
  </transition>
</template>
<script>
import login from "@/page/status/login";
import register from "@/page/status/register";
export default {
  data() {
    return {
      layerShow: false
    };
  },
  components: {
    login,
    register
  },
  methods: {
    closeLayer() {
      this.layerShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.layer-plate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg-color;

  > .close {
    color: #fff;
    position: absolute;
    top: 4px;
    right: 10px;
    font-size: 24px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

 {
  transform: translateX(100vw);
  opacity: 0;
}
</style>

