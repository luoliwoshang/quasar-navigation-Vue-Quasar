<template>
  <div class="home" :style="style">
    <Search :opacity="透明度"></Search>
    <navCard :opacity="透明度"></navCard>
    <Reorder></Reorder>
    <Express></Express>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import navCard from "./components/navCard.vue";
import Reorder from "./components/Reorder.vue";
import Express from '../../components/Express'
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Search,
    navCard,
    Reorder,
    Express
  },
  data() {
    return {
      style: {
        "background-image": "",
      },
    };
  },
  computed: {
    ...mapState("样式模组", {
      背景图片: (state) => state.背景图片,
      透明度: (state) => state.透明度,
    }),
  },
  watch: {
    背景图片() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.style["background-image"] = "url(" + this.背景图片 + ")";
    },
  },
};
</script>
<style scoped="scoped">
.home {
  padding: 0 14%;
  background-origin: border-box;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
