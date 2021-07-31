<template>
  <q-card
    :style="{
      width: '400px',
      background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
    }"
    class="q-ml-lg q-mr-lg q-mt-lg"
  >
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
      <q-input color="purple-12" v-model="运单号" label="运单号">
        <template v-slot:prepend>
          <q-icon name="pin" />
        </template>
      </q-input>
      <q-select
        filled
        v-model="此_物流商"
        use-chips
        :options="物流商"
        label="物流商"
        @filter="获取_全_物流商;"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        filled
        v-model="此_物流商"
        use-chips
        label="Lazy load opts"
        :options="物流商"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
  </q-card>
</template>
<script>
import 物流 from "@/api/post";
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
export default {
  name: "Express",
  data() {
    return {
      model: null,
      options: null,
      运单号: "",
      此_物流商: null,
      物流商: null,
      常用_物流商: ["顺丰", "中通", "菜鸟"],
    };
  },
  methods: {
    filterFn(val, update, abort) {
      if (this.物流商 !== null) {
        // already loaded
        update();
        return;
      }

      update(() => {
        物流.获取_物流商信息()
          .then((返回值) => {
            this.物流商 = 返回值.data.filter((单_物流商) => {
              let 是否_常用 = false;
              this.常用_物流商.forEach((物流商_名) => {
                单_物流商.name_cn;
                if (单_物流商.name_cn.indexOf(物流商_名) >= 0) {
                  是否_常用 = true;
                }
              });
              console.log(是否_常用);
              return 是否_常用;
            });
          })
          .finally(() => {
            console.log(this.物流商);
          });
        // console.log('开始获取')
        // this.物流商 = this.全_物流商;
      });
    },

    abortFilterFn() {
      // console.log('delayed filter aborted')
    },
    获取_全_物流商(val, update, abort) {
      if (this.物流商 !== null) {
        // already loaded
        update();
        return;
      }

      setTimeout(() => {
        update(() => {
          物流.获取_物流商信息()
            .then((返回值) => {
              console.log(1);
              this.物流商 = this.返回值.data;
            })
            .finally(() => {
              console.log("获取结束");
            });
          // console.log('开始获取')
          // this.物流商 = this.全_物流商;
        });
      }, 2000);
    },
  },
  mounted() {
    // 物流.获取_物流商信息().then((返回值) => {
    //   console.log(返回值);
    // });
    // Post.createTrack([
    //   {
    //     tracking_number: "SF1315425317258",
    //     courier_code: "sf-express"
    //   }
    // ]).then(res=>{
    //   console.log(res)
    // })
    // Post.getInfo({
    //   tracking_number: "SF1315425317258",
    //   courier_code: "sf-express",
    // }).then((res) => {
    //   console.log(res);
    // });
  },
};
</script>
<style>
</style>