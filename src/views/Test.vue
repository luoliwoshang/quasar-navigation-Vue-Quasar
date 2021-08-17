<template>
  <div>
    <div class="control">
      <q-btn @click="play({ status: 'stop' })">暂停</q-btn>
      <q-btn @click="play({ status: 'start' })">开始</q-btn>
    </div>
    <div class="container" :style="containerStyle">
      <div>
        <!-- 
        <svg
          class="icon plane colorfulFont"
          :style="planeStyle"
          @mousedown="touchstart($event)"
          @click="shoot"
        >
          <use xlink:href="#icon-feiji"></use>
        </svg> -->
        <svg
          class="icon plane colorfulFont"
          :style="planeStyle"
          @mousedown="touchstart($event)"
        >
          <use xlink:href="#icon-feiji"></use>
        </svg>
        <div
          class="bullet"
          v-for="(bullet, index) in bullets"
          :key="'bullet' + index"
          :style="{
            left: bullet.pos.x + 'px',
            top: bullet.pos.y + 'px',
            width: bullet.size.width + 'px',
            height: bullet.size.height + 'px',
          }"
        >
          ||
        </div>
        <div
          class="enemy"
          v-for="(enemy, index) in enemies"
          :key="'enemy' + index"
          :style="{
            left: enemy.pos.x + 'px',
            top: enemy.pos.y + 'px',
            width: enemy.size.width + 'px',
            height: enemy.size.height + 'px',
          }"
        >
          <q-linear-progress :value="enemy.hp / 100" class="hpLine" />
          <q-icon name="flight" class="icon rotate-180"></q-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// * 子弹每秒行进速度=default.bullet.single_shift * shootParam.interval
export default {
  name: "plane",
  data() {
    return {
      play_state: {
        timer: null, //存放全局的单位时间 定时器
        interval: 20, //n ms子弹会行进一次
        processing: false, //是否进行中
      },
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
      default: {
        // 己方子弹配置
        bullet: {
          pos: {
            // 相对于容器
            x: 0, // ? x跟随plane的中心
            y: 0, // ? y初始为容器的底部
          },
          size: {
            width: 30,
            height: 30,
          },
          single_shift: 6, // ? 子弹单次移动距离
          damage_amount: 10, // ? 单次伤害量
        },
        enemy: {
          pos: {
            x: 0,
            y: 0,
          },
          size: {
            width: 30,
            height: 30,
          },
          hp: 100,
          speed: 1,
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
      enemies: [], //所有敌人
      // 统一管理敌方我方的射击状态
      shootParam: {
        own_side: {
          request_total: 0, //请求创建的子弹总量 在准备创建时添加计数
          frequency: 10, // 子弹发射频率 n个单位时间发射一次
        },
      },
    };
  },
  computed: {
    // 容器
    containerStyle() {
      return {
        left: this.container.pos.left + "px",
        top: this.container.pos.top + "px",
        width: this.container.size.width + "px",
        height: this.container.size.height + "px",
      };
    },
    // 我方
    planeStyle() {
      return {
        left: this.plane.pos.x + "px",
        width: this.plane.size.width + "px",
        height: this.plane.size.height + "px",
      };
    },
    // 边界
    borderArea() {
      return {
        left: this.container.pos.left,
        right: this.container.pos.left + this.container.size.width,
      };
    },
    // 是否在边界
    isEdge() {
      return (
        this.plane.size.width + this.plane.pos.x + this.container.pos.left >=
        this.borderArea.right
      );
    },
    // 下一次行动是否到边界
    isNextEdge() {
      return (
        this.plane.size.width +
          this.plane.nextPos.x +
          this.container.pos.left >=
          this.borderArea.right || this.plane.nextPos.x <= 0
      );
    },
    // 是否继续填充子弹，根据己方射击频率
    permitCreateBullet() {
      return (
        this.shootParam.own_side.request_total %
          this.shootParam.own_side.frequency ===
        0
      );
    },
  },
  methods: {
    touchstart(e) {
      this.mouse.con.left = e.offsetX;
      this.mouse.con.right = this.plane.size.width - e.offsetX;
      this.mouse.prev.pageX = e.pageX; //设置初始距离

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
      this.create_bullet();
      this.play({ status: "start" }); //开始
    },
    // 创建子弹
    create_bullet() {
      // 每次创建子弹时发起请求
      this.shootParam.own_side.request_total += 1;
      // 当频率准许时创建新的子弹
      if (this.permitCreateBullet) {
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
      }
    },
    create_enemy({ position = "random" }) {
      this.enemies.push({
        ...this.default.enemy,
        pos: {
          x:
            Math.floor(
              Math.random() *
                (this.container.size.width - this.default.enemy.size.width)
            ) + 1,
          y: 0,
        },
      });
    },
    play({ status }) {
      if (status === "start" && !this.play_state.timer) {
        // 只有第一次启动时才会添加定时器
        this.play_state.timer = setInterval(() => {
          //每个 刻 执行

          this.create_bullet(); //发起创建子弹请求

          // 删除位移且删除已经离开边界的子弹
          this.bullets = this.bullets.filter((item) => {
            item.pos.y += -this.default.bullet.single_shift; // ? 位移
            let hited = this.is_hit_enemy(item); // ? 判断当前子弹是否击中任意一架敌机
            return item.pos.y >= -this.default.bullet.size.height && !hited; //保留 未出边界 且 未击中敌机的 子弹
          });
          this.enemies = this.enemies.filter((item) => {
            item.pos.y += this.default.enemy.speed;
            let hited = this.is_hit_own(item);
            return true;
          });
        }, this.play_state.interval);
      } else if (status === "stop") {
        clearTimeout(this.play_state.timer);
        this.play_state.timer = null;
      }
    },
    is_impact({ objA, objB }) {
      return (
        objA.pos.y < objB.pos.y + objB.size.height &&
        objA.pos.x + objA.size.width > objB.pos.x &&
        objA.pos.x < objB.pos.x + objB.size.width
      );
    },
    is_hit_enemy(bullet) {
      let { pos, size, damage_amount } = bullet;
      let ifHit = false;
      //判断当前是否能击中任何一个敌人,击中后敌人消失
      this.enemies = this.enemies.filter((enemy) => {
        // 判断当前 bullet y轴距离是否接触到 enemy 底部
        // * 存活条件 不符合以下条件的enemy即为击中
        // ? bullet y轴需要大于 enemy 离 容器顶部 + enemy 的高度
        // ? bullet x轴距离 + bullet 宽度 需要小于 enemy 离左边容器距离
        // ? bullet 离x轴距离 大于 enemy 离左边距离 + enemy宽度
        if (this.is_impact({ objA: bullet, objB: enemy })) {
          // 子弹碰到敌机扣除子弹的伤害对应的hp
          console.log("子弹碰到敌机");
          ifHit = true; //设置当前子弹碰到敌机
          return (enemy.hp -= damage_amount) > 0;
        } else {
          //没有碰到敌机
          return true;
        }
      });
      return ifHit; //返回是否击中状态，销毁子弹
    },
    is_hit_own(enemy) {
      // todo 与子弹一起建立工具函数复用
    },
  },
  mounted() {
    this.create_enemy({ position: "random" });
  },
};
</script>
<style lang="stylus" scoped>
.control {
  position: relative;
  left: 50px;
  top: 50px;
}

.container {
  position: relative;
  border: 1px solid red;
  overflow: hidden;

  .plane {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    font-size: 30px;
  }

  .bullet {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: orange;
    // border: 1px solid lightblue;
  }

  .enemy {
    position: absolute;
    display: flex;
    color: grey;
    align-items: center;
    justify-content: center;
    font-size: 23px;

    .hpLine {
      position: absolute;
      top: 0px;
    }
  }
}
</style>