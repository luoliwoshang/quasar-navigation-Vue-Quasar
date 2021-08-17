<template>
  <div class="home" :style="style">
    <Search :opacity="opacity"></Search>
    <navCard :opacity="opacity"></navCard>
    <Workbench></Workbench>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import navCard from "./components/navCard.vue";
import Workbench from "../../components/Workbench/index.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Search,
    navCard,
    Workbench,
  },
  data() {
    return {
      style: {
        "background-image": "",
      },
    };
  },
  computed: {
    ...mapState("moduleStyle", {
      background: (state) => state.background,
      opacity: (state) => state.opacity,
    }),
  },
  watch: {
    background() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.style["background-image"] = "url(" + this.background + ")";
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
  background-size: 100%;
}
</style>
