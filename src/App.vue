<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { listenDrakMode,unListenDrakMode } from "@/util/theme.js";
export default {
  name: "App",
  methods: {
    ...mapMutations("moduleNav", ["INIT_NAV"]),
    ...mapMutations("moduleStyle", ["INIT_STYLE"]),
    ...mapMutations("moduleExpress", ["INIT_TRACKING_INFO"]),
  },
  mounted() {
    this.INIT_NAV(); //初始化导航
    this.INIT_STYLE(); //初始化主页样式
    this.INIT_TRACKING_INFO(); //初始化快递单号信息
    listenDrakMode();
  },
  destoryed() {
    unListenDrakMode();
  },
};
</script>

<style lang="stylus">
*::-webkit-scrollbar {
  display: none;
}

body, html {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
