<template>
  <q-layout view="lHh LpR lFf">
    <q-page-container>
      <q-page class="relative">
        <vue-particles
          :particlesNumber="30"
          :style="{ position: 'absolute', width: '100%' }"
        >
        </vue-particles>
        <router-view></router-view>
      </q-page>
    </q-page-container>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn
        round
        class="workbrench-btn"
        icon="card_travel"
        @click="show_workbrench"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>
export default {
  name: "Layout",
  components: {},
  data() {
    return {
      drawerLeft: false,
      header: false,
    };
  },
  methods: {
    show_workbrench() {
      this.bus.$emit("show_workbench");
    },
  },
};
</script>
<style lang="stylus" scoped>
.workbrench-btn {
  background-color: var(--main-color-1);
  color: var(--font-color-light);
  transition: var(--change-transition-time);
}
</style>
