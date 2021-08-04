<template>
  <div>
    <q-dialog position="left" v-model="show_search">
      <div>
        <q-card
          :style="{
            width: '400px',
            background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
          }"
          class="q-ml-lg q-mr-lg q-mt-lg"
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
            <q-card-section class="q-pt-xs">
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
                @filter="filterFn"
                :option-label="(item) => item.name_cn"
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
            <q-card-actions>
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
    </q-dialog>
    <q-dialog position="right" v-model="show_timeline">
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
import { mapState } from "vuex";

export default {
  name: "Express",
  data() {
    return {
      show_search: false, //是否显示组件
      show_timeline: false, //是否显示时间线
      order_num: "SF1315425317258",
      current_carrier: null,
      carriers: null, //物流商选项组
      rule: {
        order: [(val) => (val && val.length > 0) || "请输入运单号"],
        carrier: [() => this.current_carrier || "请选择快递公司"],
      },
      express_data: [], //所有运输信息
    };
  },
  computed: {
    ...mapState("moduleExpress", {
      common_carriers: (state) => state.carriers,
    }),
  },
  methods: {
    filterFn(val, update, abort) {
      console.log(this);
      if (this.carriers !== null) {
        // already loaded
        update();
        return;
      }
      Express.getCarriers().then((res) => {
        // let list = [];
        // res.data.forEach((e) => {
        //   let name_cn = e.name_cn;
        //   if (name_cn) {
        //     for (let i in this.common_carriers) {
        //       if (name_cn.indexOf(this.common_carriers[i]) >= 0) {
        //         console("常用");
        //         list.push(e);
        //       }
        //     }
        //   }
        // });
        update(() => {
          // this.carriers = list;
          this.carriers = this.common_carriers;
        });
      });
    },
    // 开始查询添加 添加入待查询 并开始查询
    getExpressInfo() {
      Express.createTrack([
        {
          tracking_number: this.order_num,
          courier_code: this.current_carrier.courier_code,
        },
      ]).then(() => {
        Express.getInfo({
          tracking_number: this.order_num,
          courier_code: this.current_carrier.courier_code,
        }).then((res) => {
          console.log(res);
          this.express_data = res.data;
          this.show_timeline = true;
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
    this.bus.$on("show_express", () => {
      this.show_search = true;
    });
  },
};
</script>
<style>
</style>