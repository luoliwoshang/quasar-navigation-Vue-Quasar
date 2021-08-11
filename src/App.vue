<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations("moduleNav", ["INIT_NAV"]),
    ...mapMutations("moduleStyle", ["init_style"]),
    ...mapMutations("moduleExpress", ["INIT_TRACKING_INFO"]),
  },
  mounted() {
    this.INIT_NAV(); //初始化导航
    this.init_style(); //初始化主页样式
    this.INIT_TRACKING_INFO(); //初始化快递单号信息
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
