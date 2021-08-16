<template>
  <div class="container" :style="containerStyle">
    <div>
      <q-btn
        class="plane"
        :style="planeStyle"
        @mousedown="touchstart($event)"
        round
        color="primary"
        icon="flight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "plane",
  data() {
    return {
      mouse: {
        prev: { pageX: 0 }, //上次事件滑动距离

        // 鼠标离plane容器的距离
        con: {
          left: 0,
          right: 0,
        },
        cur: {
          pageX: 0,
        },
        remove: {
          x: 0,
        },
      },
      plane: {
        pos: {
          x: 0,
        },
        size: {
          width: 50,
          height: 50,
        },
      },
      container: {
        left: 50,
        top: 50,
        width: 200,
        height: 400,
      },
    };
  },
  computed: {
    // 容器样式
    containerStyle() {
      return {
        left: this.container.left + "px",
        top: this.container.top + "px",
        width: this.container.width + "px",
        height: this.container.height + "px",
      };
    },
    planeStyle() {
      return {
        left: this.plane.pos.x + "px",
        width: this.plane.size.width + "px",
        height: this.plane.size.height + "px",
      };
    },
    borderArea() {
      return {
        left: this.container.left,
        right: this.container.left + this.container.width,
      };
    },
  },
  methods: {
    touchstart(e) {
      console.log(e.offsetX);
      this.mouse.con.left = e.offsetX;
      this.mouse.con.right = this.plane.size.width - e.offsetX;
      this.mouse.prev.pageX = e.pageX; //设置一开始的距离
      let move = window.addEventListener("mousemove", this.plane_move);
      // 抬起时注销事件
      window.addEventListener("mouseup", (e) => {
        window.removeEventListener("mousemove", this.plane_move);
      });
    },
    // 鼠标开始滑动
    plane_move(e) {
      console.log(
        e.pageX + this.plane.size.width,
        this.container.left + this.container.width - this.mouse.con.right
      );
      this.mouse.remove.x = e.pageX - this.mouse.prev.pageX; //设置移动的x距离
      this.mouse.prev.pageX = e.pageX; //设置下一次相对的开始位置
      console.log("移动了" + this.mouse.remove.x);
      this.plane.pos.x += this.mouse.remove.x;
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  position: relative;
  border: 1px solid red;

  .plane {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    background-color: cyan;
  }
}
</style>