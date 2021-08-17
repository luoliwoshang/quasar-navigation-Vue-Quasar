<template>
  <div class="container" :style="containerStyle">
    <q-btn @click="shooting({ status: 'stop' })">暂停</q-btn>
    <div>
      <q-btn
        class="plane"
        :style="planeStyle"
        @mousedown="touchstart($event)"
        round
        color="primary"
        label="11"
        @click="shoot"
      />
      <div
        class="bullet"
        v-for="(bullet, index) in bullets"
        :key="index"
        :style="{
          left: bullet.pos.x + 'px',
          top: bullet.pos.y + 'px',
          width: bullet.size.width + 'px',
          height: bullet.size.height + 'px',
        }"
      >
        0
      </div>
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
      container: {
        pos: {
          left: 50,
          top: 50,
        },
        size: {
          width: 200,
          height: 400,
        },
      },
      // 默认初始值
      default: {
        bullet: {
          pos: {
            // 相对于容器
            x: 0,
            y: 0,
          },
          size: {
            width: 30,
            height: 30,
          },
          // 子弹
          speed: 10,
        },
      },
      plane: {
        pos: {
          x: 0,
        },
        nextPos: {
          x: 0,
        },
        size: {
          width: 50,
          height: 50,
        },
      },
      bullets: [],
      shootParam: {
        processing: false, //是否进行中
        timer: "", //定时器，保存interval开始与关闭
      },
    };
  },
  computed: {
    // 容器样式
    containerStyle() {
      return {
        left: this.container.pos.left + "px",
        top: this.container.pos.top + "px",
        width: this.container.size.width + "px",
        height: this.container.size.height + "px",
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
        left: this.container.pos.left,
        right: this.container.pos.left + this.container.size.width,
      };
    },
    isEdge() {
      return (
        this.plane.size.width + this.plane.pos.x + this.container.pos.left >=
        this.borderArea.right
      );
    },
    isNextEdge() {
      return (
        this.plane.size.width +
          this.plane.nextPos.x +
          this.container.pos.left >=
          this.borderArea.right || this.plane.nextPos.x <= 0
      );
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
    // 开始移动
    plane_move(e) {
      //判断下一次移动是否接触边界
      this.mouse.remove.x = e.pageX - this.mouse.prev.pageX; //设置移动的x距离
      this.mouse.prev.pageX = e.pageX; //设置下一次相对的开始位置
      this.plane.nextPos.x += this.mouse.remove.x; //将要移动到的距离
      this.plane.pos.x = this.isNextEdge
        ? this.plane.pos.x
        : this.plane.nextPos.x;
      // if (!this.isNextEdge) {
      //   this.plane.pos.x = this.plane.nextPos.x;
      // }
    },
    shoot() {
      console.log({
        ...this.default.bullet,
        pos: { x: this.plane.pos.x + this.plane.size.width / 2 },
      });
      // 添加一颗
      this.bullets.push({
        ...this.default.bullet,
        pos: {
          x:
            this.plane.pos.x +
            this.plane.size.width / 2 -
            this.default.bullet.size.width / 2,
          y:
            this.container.size.height -
            this.plane.size.height -
            this.default.bullet.size.height,
        },
      });
      this.shooting({ status: "start" }); //开始shooting
    },
    shooting({ status }) {
      if (status === "start" && !this.shootParam.timer) {
        // 只有第一次启动时才会添加定时器
        this.shootParam.timer = setInterval(() => {
          // 设置位移，且删除
          this.bullets.map((item) => {
            item.pos.y += -this.default.bullet.speed;
            return item;
          });
          // this.bullets.forEach((item) => {
          //   item.pos.y += -this.default.bullet.speed;
          // });
        }, 100);
      } else if (status === "stop") {
        clearTimeout(this.shootParam.timer);
        this.shootParam.timer = null;
      }
    },
  },
  mounted() {},
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

  .bullet {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: lightblue;
    color: cyan;
  }
}
</style>