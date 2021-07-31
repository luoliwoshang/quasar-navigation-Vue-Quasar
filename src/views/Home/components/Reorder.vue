<template>
  <div class="Reorder">
    <q-dialog v-model="显示_卡片排序" position="right">
      <q-card class="container">
        <q-card-section>
          <div class="text-h6">拖动卡片以排序</div>
        </q-card-section>
        <q-card-section>
          <vuedraggable animation=200 class="wrapper" v-model="navs">
            <div class="item" v-for="(item, index) in navs">
              <q-btn
                style="cursor: all-scroll"
                :style="{ background: item.backgroundColor, color: item.color }"
                class="fit item"
                flat
                :label="item.name"
              />
            </div>
          </vuedraggable>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, state, mapMutations } from "vuex";
import vuedraggable from "vuedraggable";
export default {
  name: "Reorder",
  data() {
    return {
      显示_卡片排序: false,
      navs: [],
    };
  },
  methods: {
    ...mapMutations("moduleNav", ["SET_NAVS"]),
  },
  watch: {
    navs() {
      this.SET_NAVS(this.navs); //发送到vuex设置所有卡片
    },
  },
  components: { vuedraggable },

  mounted() {
    setTimeout(() => {
      this.navs = [...this.$store.state.moduleNav.navs];
    });
    this.bus.$on("显示_卡片排序", () => {
      this.显示_卡片排序 = true;
    });
  },
};
</script>
<style lang="stylus" scoped>
.container {
  width: 200px;

  .item {
    height: 60px;
    margin-bottom: 20px;
  }
}
</style>