<template>
  <div>
    <q-dialog
      v-model="是否弹出"
      persistent
      @hide="
        (val) => {
          隐藏弹窗();
        }
      "
    >
      <q-card class="my-card" style="width: 350px">
        <q-form @submit="确认添加新导航()">
          <q-toolbar>
            <q-btn flat round dense icon="add" class="q-mr-sm" />
            <q-toolbar-title>添加新的导航</q-toolbar-title>
          </q-toolbar>
          <q-card-section horizontal>
            <q-card-section width="50%">
              <q-input
                v-model="导航参数.网站名称"
                label="网站名称"
                :rules="校验.非空"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="导航参数.网站链接"
                label="网站链接"
                :rules="校验.非空"
              ></q-input>
            </q-card-section>
          </q-card-section>
          <q-card-section>
            <q-input v-model="导航参数.网站背景颜色" label="网站背景颜色">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-color v-model="导航参数.网站背景颜色"></q-color>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="取消" @click="取消_事件()" />
            <q-btn flat color="primary" round icon="check" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Dialog_NewNavCard",
  props: {
    是否弹出: Boolean,
  },
  watch: {
    是否弹出() {
      console.log(this.是否弹出);
    },
  },
  data() {
    return {
      导航参数: {
        网站名称: "",
        网站链接: "",
        网站背景颜色: "",
      },
      校验: {
        非空: [(v) => !!v || "请不要空着"],
      },
    };
  },
  methods: {
    ...mapMutations("moduleNav", ["添加新导航"]), //获得操作添加新导航项目
    确认添加新导航() {
      this.添加新导航({
        ...this.导航参数,
      });
      this.$emit("添加新导航_对话框_隐藏");
    },
    隐藏弹窗() {
      return false;
    },
    取消_事件() {
      this.$emit("添加新导航_对话框_隐藏");
    },
  },
};
</script>

<style>
</style>