<template>
  <div class="left-bar">
    <fourleafs :size="40" :left="60" :top="60"></fourleafs>
    <ul>
      <!--<li>
            <i class="fa fa-home"></i>
            <span class="text">首页</span>
          </li>-->
      <li @click="openLayer" v-if="false">
        <i class="fa fa-sign-in"></i>
        <span class="text">登陆</span>
      </li>
      <li>
        <i class="fa fa-sign-out"></i>
        <!--<span class="text">退出</span>-->
        <router-link to="/login">退出</router-link>
      </li>
    </ul>
    <transition name="fade">
      <div class="shadow" v-if="value" @click="closeLayer"></div>
    </transition>
  </div>
</template>

<script>
import fourleafs from "@/components/fourLeafs";
export default {
  data() {
    return {
      // barShow: false
    };
  },
  props: ["value"],
  components: {
    fourleafs
  },
  methods: {
    openLayer() {
      this.closeLayer();
      this.layerShow = true;
      this.loginShow = true;
    },
    closeLayer() {
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.left-bar {
  width: $bar-width;
  height: 100vh;
  background: $bg-color;
  position: absolute;
  top: 0;

  ul {
    list-style: none;
    margin-top: 50px;

    li {
      line-height: $bar-btn;
      border-bottom: 1px solid #2b8aa0;
      font-size: 14px;
      position: relative;
      text-align: center;
      a {
        color: #fff;
      }


      .fa {
        padding: 0 5px;
        color: #fff;
      }

      &::before {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid #b6c6ca;
      }
    }
  }

  .shadow {
    position: absolute;
    top: 0;
    right: -100vw;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 3;
  }
}
</style>


