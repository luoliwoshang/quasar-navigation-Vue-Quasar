<template>
<div ref="el">
  <q-card  class="card no-border-radius">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <q-item>
        <q-card-section class="q-pb-none">
          <q-btn flat round size="lg" style="color: #ffffff" icon="image" />
        </q-card-section>
        <q-card-section class="q-mt-md q-pt-none q-pa-none">
          <div>
            <div class="text-h5 text-bold text-white">背景图设置</div>
            <div class="text-subtitle2 text-cyan">By Luoliwoshang</div>
          </div>
        </q-card-section>
      </q-item>
      <q-card-section class="q-py-xs q-mb-none">
        <q-input
          ref="url"
          :rules="rule.url"
          color="purple-12"
          v-model="input"
          label="图片URL"
        >
          <template v-slot:prepend>
            <q-icon name="pin" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="q-my-none">
        <q-btn
          type="submit"
          push
          color="deep-purple-3"
          label="确认设置"
          class="full-width"
          size="lg"
        />
      </q-card-actions>
    </form>
  </q-card>
</div>

</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "set_background",
  data() {
    return {
      show: true,
      input: "",
      rule: {
        url: [(val) => (val && val.length > 0) || "请输入URL"],
      },
    };
  },
  methods: {
    ...mapMutations("moduleStyle", ["set_background"]), //改变新的背景url
    handleHide() {
      this.$emit("hide");
    },
    onSubmit() {
      this.$refs.url.validate();
      if (this.$refs.url.hasError) {
        this.formHasError = true;
      } else {
        this.set_background({
          url: this.input,
        });
        this.$q.notify({
          icon: "done",
          color: "positive",
          message: "设置成功",
        });
        this.bus.$emit("workbench_back");
      }
    },
  },
  mounted() {
    console.log(this.$refs.el.offsetHeight + "px")
    this.bus.$emit(
      "changeWorkBenchMainHeight",
      this.$refs.el.offsetHeight 
    );
  },
};
</script>

<style lang="stylus" scoped>
.card {
  background-image: linear-gradient(135deg, #FF7AF5 10%, #513162 100%);
  min-height: 100%;
}
</style>