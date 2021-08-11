<template>
  <div>
    <q-dialog
      no-route-dismiss
      v-model="show_workbench"
      :offset="['33', '0']"
      position="left"
    >
      <div class="q-ma-lg">
        <div class="rounded-borders workbench">
          <q-bar dark class="bg-primary text-white">
            <q-btn dense flat round icon="lens" size="8.5px" color="red">
              <q-tooltip>关闭</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              round
              icon="lens"
              size="8.5px"
              color="yellow"
              @click="back"
            >
              <q-tooltip>返回主页</q-tooltip>
            </q-btn>
            <q-btn dense flat round icon="lens" size="8.5px" color="green" />
            <div class="col text-center text-weight-bold">Workbench</div>
          </q-bar>
          <q-tab-panels class="container" v-model="tab" animated swipeable>
            <q-tab-panel name="main" class="q-pa-none">
              <q-card class="no-border-radius q-pa-none">
                <q-card-section class="q-pa-none">
                  <div class="card-wrap">
                    <div class="row q-gutter-sm q-mt-sm">
                      <div class="col">
                        <q-card class="fit column bg-grey-3">
                          <q-btn
                            class="col"
                            flat
                            color="cyan"
                            @click="handleReorder"
                          >
                            <div class="q-gutter-x-xs">
                              <q-icon class="text-primary" name="sort" />
                              <span>卡片顺序</span>
                            </div>
                          </q-btn>
                          <q-btn
                            class="col"
                            flat
                            color="cyan"
                            @click="handleSetBackground"
                          >
                            <div class="q-gutter-x-xs">
                              <q-icon class="text-primary" name="image" />
                              <span>设置背景</span>
                            </div>
                          </q-btn>
                          <q-btn
                            class="col"
                            flat
                            color="cyan"
                            @click="handleNewNavigation"
                          >
                            <div class="q-gutter-x-xs">
                              <q-icon class="text-primary" name="add" />
                              <span>添加导航</span>
                            </div>
                          </q-btn>
                        </q-card>
                      </div>
                      <div class="col">
                        <div class="fit">
                          <div class="column full-height">
                            <q-btn
                              class="col q-mb-sm"
                              color="primary"
                              @click="express"
                            >
                              <q-icon name="mail"></q-icon><span>查看快递</span>
                            </q-btn>
                            <q-select
                              class="col fit q-mb-sm"
                              v-model="module.express.current_order"
                              rounded
                              :options="module.express.order_list"
                              map-options
                              emit-value
                              @input="handleTrackInfoCLick"
                              :option-value="(opt) => opt"
                              :option-label="(opt) => opt.tracking_number"
                            >
                            </q-select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row q-gutter-sm q-mt-sm">
                      <q-item class="fit q-ma-none">
                        <q-item-section side class="q-pr-xs">
                          <q-btn class="q-ma-none" outline padding="xs md">
                           透明度
                            <q-icon name="opacity" />
                          </q-btn>
                        </q-item-section>
                        <q-item-section>
                          <q-slider
                            class="q-ml-sm"
                            @input="handleOpacity"
                            v-model="module.set_opacity.value"
                            :step="0.01"
                            label
                            :min="0"
                            :max="1"
                          />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>
            <q-tab-panel name="application" class="q-pa-none">
              <router-view></router-view>
            </q-tab-panel>
          </q-tab-panels>
          <footer class="bg-cyan-6 text-white q-pa-xs q-pl-md">
            Quasar Navigation Version 1.4.1
          </footer>
        </div>
      </div>
    </q-dialog>
    <!-- 以下是工具组件  -->
    <Reorder
      v-if="module.reorder.show"
      @hide="module.reorder.show = false"
    ></Reorder>
    <NewNavigation
      v-if="module.new_navigation.show"
      @hide="module.new_navigation.show = false"
    ></NewNavigation>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Reorder from "../Reorder/Reorder.vue";
import NewNavigation from "../Dialog/new_navigation.vue";
export default {
  name: "Workbench",
  components: {
    Reorder,
    NewNavigation,
  },
  data() {
    return {
      show_workbench: false,
      tab: "main", //当前控制台页面
      module: {
        // ? 快递信息
        express: {
          order_list: [], //本地的物流单号信息
          current_order: {}, //当前选中的物流信息
        },
        // ? 卡片排序
        reorder: {
          show: false,
        },
        // ? 添加新导航
        new_navigation: {
          show: false,
        },
        set_background: {
          show: false,
        },
        set_opacity: {
          value: Number(this.$store.state.moduleStyle.opacity),
        },
      },
    };
  },
  mounted() {
    this.bus.$on("show_workbench", () => {
      this.show_workbench = true;
      this.module.express.order_list = this.tracking_info;
    });
    this.bus.$on("workbench_back", () => {
      this.back();
    });
    this.set_opacity.value = this.opacity;
  },
  computed: {
    ...mapState("moduleExpress", {
      tracking_info: (state) => state.tracking_info,
    }),
    ...mapState("moduleStyle", {
      opacity: (state) => Number(state.opacity),
    }),
  },
  methods: {
    ...mapMutations("moduleStyle", ["set_opacity"]), //改变新的背景url
    back() {
      this.$router.push("/");
      this.tab = "main";
    },
    express(item) {
      this.$router.push({
        path: "/express",
        query: {
          ...item,
        },
      });
      this.tab = "application";
    },
    // ? 选中之前查询的物流信息时触发
    handleTrackInfoCLick(value) {
      // 获取点击的项目，跳转搜索页面，查询当前选项的值
      this.express(value);
    },
    // ? 重新排序
    handleReorder() {
      this.module.reorder.show = true;
    },
    // ? 背景图
    handleSetBackground() {
      this.$router.push({
        path: "/setBackground",
      });
      this.tab = "application";
    },
    // ? 添加新导航
    handleNewNavigation() {
      this.module.new_navigation.show = true;
    },
    handleOpacity(val) {
      this.set_opacity(val);
    },
  },
};
</script>

<style lang="stylus" scoped>
.workbench {
  $full_width = 260;
  width: $full_width px;
  overflow: hidden;

  .container {
    .card-wrap {
      $row_height = 110;
      height: 300px;
      display: flex;
      flex-direction: column;
      padding: 0 10px;

      &>.row {
        height: $row_height px;
      }
    }
  }
}
</style>