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
    ...mapMutations("moduleNav", ["初始化_导航"]),
    ...mapMutations("样式模组", ["初始化_样式"]),
    ...mapMutations("moduleExpress", ["INIT_TRACKING_INFO"]),
  },
  mounted() {
    this.初始化_导航();//初始化导航
    this.初始化_样式(); //初始化主页样式
    this.INIT_TRACKING_INFO()//初始化快递单号信息
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
