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
  },
  mounted() {
    this.初始化_导航();
    this.初始化_样式(); //初始化主页样式
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
