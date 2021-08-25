<template>
  <div>
    <div
      class="boom"
      v-for="(item, index) in booms"
      :key="index"
      :style="{ left: item.x + 'px', top: item.y + 'px' }"
    >
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi1.17173.itc.cn%2F2013%2Fdnf%2F2013%2F06%2F13%2Fluka0613baihua_08.gif&refer=http%3A%2F%2Fi1.17173.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632469336&t=8f16292687f333d2ce39184226bdfe70"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "boom",
  data() {
    return {
      booms: [],
    };
  },
  mounted() {
    this.bus.$off("boom");
    this.bus.$on("boom", (pos) => {
      let id = this.booms.length;
      this.booms.push({
        ...pos,
        id,
      });
      //   一秒后移出当前boom
      setTimeout(() => {
        this.booms = this.booms.filter((item) => {
          return item.id != id;
        });
      }, 1000);
    });
  },
};
</script> 

<style scope>
.boom {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  animation: "opacity" 1s;
}
.boom img {
  width: 100%;
  height: 100%;
}
@keyframes opacity {
  0% {
      opacity: 1;
  }
  100%{
      opacity: 0;
  }
}
</style>