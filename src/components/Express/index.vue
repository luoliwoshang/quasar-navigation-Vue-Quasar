<template>
  <div>
    <div>
      <q-card
        :style="{
          background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
        }"
      >
        <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
          <q-item>
            <q-card-section class="q-pb-none">
              <q-btn
                flat
                round
                size="lg"
                style="color: #ff0080"
                icon="local_shipping"
              />
            </q-card-section>
            <q-card-section class="q-mt-md q-pt-none q-pa-none">
              <div>
                <div class="text-h5 text-bold text-purple-5">快递查询</div>
                <div class="text-subtitle2 text-cyan">By Luoliwoshang</div>
              </div>
            </q-card-section>
          </q-item>
          <q-card-section class="q-py-xs q-mb-none">
            <q-input
              ref="order"
              :rules="rule.order"
              color="purple-12"
              v-model="order_num"
              label="运单号"
            >
              <template v-slot:prepend>
                <q-icon name="pin" />
              </template>
            </q-input>
            <q-select
              ref="carrier"
              :rules="rule.carrier"
              v-model="current_carrier"
              label="快递公司"
              :options="carriers"
              :option-label="(item) => item.courier_name_cn"
            >
              <template v-slot:prepend>
                <q-icon name="business" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
          <q-card-actions class="q-my-none">
            <q-btn
              type="submit"
              push
              color="deep-purple-3"
              label="查询"
              class="full-width"
              size="lg"
            />
          </q-card-actions>
        </form>
      </q-card>
    </div>
    <q-dialog no-route-dismiss position="right" v-model="show_timeline">
      <q-card>
        <div v-for="(item, index) in express_data" :key="index" class="q-ma-lg">
          <q-timeline color="secondary">
            <q-timeline-entry heading> 快递信息 </q-timeline-entry>
            <q-timeline-entry
              v-for="(info, idx) in item.origin_info.trackinfo"
              :key="idx"
              :title="info.checkpoint_date"
              :subtitle="info.checkpoint_delivery_status"
            >
              <div>
                {{ info.tracking_detail }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Express from "@/api/express";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Express",
  props: ["courier_code", "tracking_number"], //通过路由获取查询参数
  data() {
    return {
      show_timeline: false, //是否显示时间线
      order_num: "SF1315425317258",
      current_carrier: "",
      rule: {
        order: [(val) => (val && val.length > 0) || "请输入运单号"],
        carrier: [() => this.current_carrier || "请选择快递公司"],
      },
      express_data: [], //所有运输信息
    };
  },
  computed: {
    ...mapState("moduleExpress", {
      carriers: (state) => state.carriers,
      tracking_info: (state) => state.tracking_info,
    }),
    current_express_param() {
      return {
        tracking_number: this.order_num,
        courier_code: this.current_carrier.courier_code,
      };
    },
  },
  methods: {
    ...mapMutations("moduleExpress", ["SET_NEW_TRACKING_INFO"]),
    // 开始查询添加 添加入待查询 并开始查询
    getExpressInfo() {
      // return new Promise((resolve, reject) => {
      //   Express.createTrack([this.current_express_param]).then(() => {
      //     Express.getInfo(this.current_express_param).then((res) => {
      //       // 添加到快递，设置到本地信息
      //       if (
      //         this.tracking_info.filter(
      //           (e) =>
      //             e.tracking_number ===
      //             this.current_express_param.tracking_number
      //         ).length === 0
      //         // 判断是否已经存在，不存在则添加入本地
      //       ) {
      //         // 传入订单号，物流商中文名，物流商简码
      //         this.SET_NEW_TRACKING_INFO({
      //           ...this.current_express_param,
      //           courier_name_cn: this.current_carrier.courier_name_cn,
      //         });
      //       }
      //       this.express_data = res.data;
      //       this.show_timeline = true;
      //       resolve(res);
      //     });
      //   });
      // });
            return new Promise((resolve, reject) => {
        Express.createTrack([this.current_express_param]).then(() => {
          Express.getInfo(this.current_express_param).then((res) => {
            // 添加到快递，设置到本地信息
            if (
              this.tracking_info.filter(
                (e) =>
                  e.tracking_number ===
                  this.current_express_param.tracking_number
              ).length === 0
              // 判断是否已经存在，不存在则添加入本地
            ) {
              // 传入订单号，物流商中文名，物流商简码
              this.SET_NEW_TRACKING_INFO({
                ...this.current_express_param,
                courier_name_cn: this.current_carrier.courier_name_cn,
              });
            }
            this.express_data = res.data;
            this.show_timeline = true;
            resolve(res);
          });
        });
      });
    },
    onSubmit() {
      this.$refs.carrier.validate();
      this.$refs.order.validate();
      if (this.$refs.carrier.hasError || this.$refs.order.hasError) {
        this.formHasError = true;
        this.$q.notify({
          type: "warning",
          message: `请输入快递公司以及快递单号`,
          position: "top",
          closeBtn: "我了解了",
        });
      } else {
        this.$q.notify({
          icon: "done",
          color: "positive",
          message: "获取成功",
        });
        this.getExpressInfo();
      }
    },
  },
  mounted() {
    if (this.$route.query.courier_code) {
      // 查询之前的物流
      this.current_carrier = {
        courier_code: this.$route.query.courier_code,
        courier_name_cn: this.$route.query.courier_name_cn,
      };
      this.order_num = this.$route.query.tracking_number;
      this.getExpressInfo().then((res) => {
        console.log(res);
        this.$router.push("express");
      }); //查询路由传递的物流信息
    } else {
      console.log("添加新的快递查询");
    }
  },
};
</script>
<style>
</style>