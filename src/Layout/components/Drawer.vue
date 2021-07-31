<template>
  <div>
    <q-btn class="fit" flat color="primary" text-color="info">
      <q-item class="fit">
        <q-item-section> 透明度 </q-item-section>
        <q-item-section>
          <q-slider
            v-model="透明度"
            :min="0.1"
            :max="1"
            label
            :step="0.1"
            color="light-blue"
            @change="
              (值) => {
                设置_透明度(值);
              }
            "
          />
        </q-item-section>
      </q-item>
    </q-btn>
    <q-btn
      padding="13px"
      class="fit"
      flat
      color="primary"
      text-color="info"
      icon="add"
      label="添加新的导航"
      @click="添加新导航_对话框 = true"
    />
    <q-btn
      padding="13px"
      class="fit"
      flat
      color="primary"
      text-color="info"
      icon="add"
      label="添加背景图"
      @click="添加背景图()"
    />
    <q-btn
      padding="13px"
      class="fit"
      flat
      color="primary"
      text-color="info"
      icon="sort"
      label="设置卡片顺序"
      @click="卡片排序()"
    />
    <q-btn
      padding="13px"
      class="fit"
      flat
      color="primary"
      text-color="info"
      icon="sort"
      label="查看我的快递"
      @click="showExpress()"
    />
    <Dialog_NewNavCard
      :是否弹出="添加新导航_对话框"
      @添加新导航_对话框_隐藏="添加新导航_对话框_隐藏()"
    ></Dialog_NewNavCard>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Dialog_NewNavCard from "../../components/Dialog/Dialog_NewNavCard.vue"; //新建导航卡片
import Express from "../../components/Express"; //快递组件

export default {
  name: "Drawer",
  components: {
    Dialog_NewNavCard,
    Express,
  },
  methods: {
    ...mapMutations("moduleNav", ["addNewNav"]), //获得操作添加新项目
    ...mapMutations("样式模组", ["设置_背景图片", "设置_透明度"]), //改变新的背景url
    添加背景图() {
      this.$q
        .dialog({
          title: "新的背景图",
          message: "请输入url",
          cancel: true,
          prompt: {
            model: "",
            type: "text",
          },
        })
        .onOk((链接) => {
          this.设置_背景图片({
            链接,
          });
        });
    },
    卡片排序() {
      this.bus.$emit("显示_卡片排序");
    },
    添加新导航_对话框_隐藏() {
      this.添加新导航_对话框 = false;
    },
    showExpress() {
      this.bus.$emit("show_express")
    },
  },
  data() {
    return {
      透明度: Number(localStorage.v_opacity),
      添加新导航_对话框: false,
      show_express: false,
    };
  },
};
</script>