<template>
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
                        <q-btn class="col" flat color="cyan">
                          <div class="q-gutter-x-xs">
                            <q-icon class="text-primary" name="sort" />
                            <span>卡片顺序</span>
                          </div>
                        </q-btn>
                        <q-btn class="col" flat color="cyan">
                          <div class="q-gutter-x-xs">
                            <q-icon class="text-primary" name="image" />
                            <span>设置背景</span>
                          </div>
                        </q-btn>
                        <q-btn class="col" flat color="cyan">
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
                          <q-select class="col" rounded>

                          </q-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="application" class="q-pa-none">
            <router-view></router-view>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "Workbench",
  data() {
    return {
      show_workbench: false,
      tab: "main", //当前控制台页面
    };
  },
  mounted() {
    this.bus.$on("show_workbench", () => {
      this.show_workbench = true;
    });
  },
  methods: {
    back() {
      this.$router.push("/");
      this.tab = "main";
    },
    express() {
      this.$router.push("express");
      this.tab = "application";
      // this.bus.$emit("show_express");
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
    min-height: 300px;

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