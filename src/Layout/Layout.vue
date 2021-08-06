<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated v-model="header">
      <q-toolbar>
        <q-btn icon="menu" flat @click="drawerLeft = !drawerLeft"></q-btn>
        <q-toolbar-title> Quasar Navigation Version 1.0.1 </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      elevated
      v-model="drawerLeft"
      :width="200"
      :breakpoint="700"
      elevated
      content-class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <Drawer></Drawer>
      </q-scroll-area>
    </q-drawer>
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

    <q-page-sticky
      position="top-right"
      :offset="[18, 18]"
      @click="
        header = !header;
        drawerLeft = !drawerLeft;
      "
    >
      <q-btn round color="accent" icon="menu" class="rotate-45" />
    </q-page-sticky>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn round color="accent" icon="card_travel" @click="show_workbrench" />
    </q-page-sticky>
  </q-layout>
</template>

<script>
import Drawer from "./components/Drawer.vue";
export default {
  name: "Layout",
  components: {
    Drawer,
  },
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
