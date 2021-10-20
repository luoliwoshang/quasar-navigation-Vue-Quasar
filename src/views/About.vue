<template>
  <div class="container"><button @click="change">change</button></div>
</template>
<script type="text/javascript">
export default {
  name: "Test",
  methods: {
    change() {
      document.documentElement.style.setProperty("--main-color", "blue");
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  width: 200px;
  height: 200px;
  background-color: var(--main-color);
}
</style>