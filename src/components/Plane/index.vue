<template>
  <div ref="el">
    <q-tab-panels
      v-model="scene"
      animated
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
      class="shadow-2 rounded-borders"
    >
      <q-tab-panel name="setting" class="">
        <div class="control">
          <div class="row">
            <div class="col">
              <q-input
                v-model="shootParam.own_side.frequency"
                label="子弹发射频率 越大越慢"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="shootParam.own_side.frequency"
                :min="1"
                :max="100"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model.number="setting.bullet.single_shift"
                label="子弹单刻时间移动距离"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="setting.bullet.single_shift"
                :min="1"
                :max="100"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="setting.bullet.damage_amount"
                label="子弹伤害值"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="setting.bullet.damage_amount"
                :min="1"
                :max="100"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input v-model="plane.hp" label="己方生命值" filled dense />
            </div>
            <div class="col">
              <q-slider v-model="plane.hp" :min="1" :max="100" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="setting.enemy.damage_amount"
                label="敌机撞击伤害值"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="setting.enemy.damage_amount"
                :min="1"
                :max="100"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model.number="setting.enemy.single_shift"
                label="敌机单刻移动距离"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="setting.enemy.single_shift"
                :min="1"
                :max="100"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="setting.enemy.hp"
                label="敌机生命值"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider v-model="setting.enemy.hp" :min="1" :max="100" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="shootParam.enemy_side.frequency"
                label="敌机出现频率 越大越慢"
                filled
                dense
              />
            </div>
            <div class="col">
              <q-slider
                v-model="shootParam.enemy_side.frequency"
                :min="1"
                :max="100"
              />
            </div>
          </div>

          <q-separator />
        </div>
      </q-tab-panel>
      <q-tab-panel name="plane" class="q-pa-none">
        <div class="text-center q-py-md fit">
          <q-btn-group rounded>
            <q-btn
              push
              color="primary"
              label="暂停"
              @click="play({ status: 'stop' })"
            />
            <q-btn
              push
              color="primary"
              label="开始"
              @click="play({ status: 'start' })"
            />
            <q-btn
              push
              icon="settings"
              color="primary"
              @click="scene = 'setting'"
            />
          </q-btn-group>
        </div>

        <div class="container" :style="containerStyle">
          <div>
            <div
              class="plane"
              :style="planeStyle"
              @mousedown.stop="touchstart($event)"
            >
              <q-linear-progress
                :value="plane.hp / 100"
                class="hpLine"
                color="red"
                dark
                stripe
                rounded
                size="10px"
              />
              <svg class="icon colorfulFont">
                <use xlink:href="#icon-feiji"></use>
              </svg>
            </div>

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
            <div
              class="enemy-bullet"
              v-for="(bullet, index) in enemy_bullets"
              :key="'enemy-bullet' + index"
              :style="{
                left: bullet.pos.x + 'px',
                top: bullet.pos.y + 'px',
                width: bullet.size.width + 'px',
                height: bullet.size.height + 'px',
              }"
            >
              ||
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
// * 子弹每秒行进速度=setting.bullet.single_shift * shootParam.interval
export default {
  name: "plane",
  data() {
    return {
      scene: "plane", //setting 为设置
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
          left: 30,
          top: 0,
        },
        size: {
          width: 200,
          height: 400,
        },
      },
      // 默认配置
      setting: {
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
          //碰撞体积位移后计算得出
          collide: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          single_shift: 1, // ? 子弹单次移动距离
          damage_amount: 10, // ? 单次伤害量
        },
        // 敌机配置
        enemy: {
          pos: {
            x: 0,
            y: 0,
          },
          size: {
            width: 30,
            height: 30,
          },
          collide: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          hp: 100,
          single_shift: 2,
          damage_amount: 50, // ? 敌机撞击单次伤害量
          request_total: 0, // ? 敌机请求创建子弹的次数
          frequency: 30, // ? 射击子弹的频率
          permitCreateBullet: false, // ? 是否允许生成子弹
        },
        // 敌机子弹配置
        enemy_bullet: {
          pos: {
            x: 0,
            y: 0,
          },
          size: {
            width: 10,
            height: 10,
          },
          single_shift: 10,
          damage_amount:40
        },
      },
      plane: {
        pos: {
          x: 0,
          y: 340,
        },
        nextPos: {
          x: 0,
        },
        size: {
          width: 50,
          height: 50,
        },
        collide: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        hp: 100,
      },
      bullets: [], //所有己方子弹
      enemies: [], //所有敌人
      enemy_bullets: [], //所有敌方子弹
      permit_object: {
        //允许出现的对象
        enemy: true,
        bullet: true,
        enemy_bullet: true,
      },
      max_reachable_area: [], //所有移动对象的最大可到达区域
      // 统一管理敌方我方的射击状态
      shootParam: {
        enemy_side: {
          request_total: 0, //请求创建的敌机总量 在准备创建时添加计数
          frequency: 100, // 敌机出动频率 n个单位时间发射一次
        },
        own_side: {
          request_total: 0, //请求创建的子弹总量 在准备创建时添加计数
          frequency: 30, // 子弹发射频率 n个单位时间发射一次
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
      this.plane.collide = {
        left: this.plane.pos.x,
        right: this.plane.pos.x + this.plane.size.width,
        top: this.plane.pos.y,
        bottom: this.plane.pos.y + this.plane.size.height,
      };
      return {
        left: this.plane.pos.x + "px",
        top: this.plane.pos.y + "px",
        width: this.plane.size.width + "px",
        height: this.plane.size.height + "px",
      };
    },
    // 边界
    borderArea() {
      return {
        left: 0,
        right: +this.container.size.width,
        top: 0,
        bottom: this.container.size.height,
      };
    },
    // 下一次己方飞机唯一是否到边界
    isNextEdge() {
      return (
        this.plane.size.width + this.plane.nextPos.x >= this.borderArea.right ||
        this.plane.nextPos.x <= 0
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
    // 是否继续添加敌机，根据敌机添加频率
    permitCreateEnemy() {
      return (
        this.shootParam.enemy_side.request_total %
          this.shootParam.enemy_side.frequency ===
        0
      );
    },
    // 填充子弹时的参数
    create_bullet_param() {
      return {
        beforeCreate: () => {
          this.shootParam.own_side.request_total += 1;
        },
        permit: this.permitCreateBullet,
        magezine: this.bullets,
        setting: this.setting.bullet,
        pos: {
          x:
            this.plane.pos.x +
            this.plane.size.width / 2 -
            this.setting.bullet.size.width / 2,
          y:
            this.container.size.height -
            this.plane.size.height -
            this.setting.bullet.size.height,
        },
      };
    },
  },
  methods: {
    // * 下方为工具类函数

    /**
     * @description 设置每种对象的最大边界区域 x & y轴 在挂载时调用
     */
    set_max_reachable_area() {
      let { left, right, top, bottom } = this.borderArea;
      for (let item in this.permit_object) {
        let { height, width } = this.setting[item].size;
        if (this.permit_object[item]) {
          this.max_reachable_area.push({
            type: item,
            pos: {
              left: left - width,
              right: right + width,
              top: top - height,
              bottom: bottom + height,
            },
          });
        }
      }
    },
    /**
     * @description 判断两个对象是否撞击
     * @param objA 对象A
     * @param objB 对象B
     * @param bottom_to_top  方向，默认判断A是否接触B底部 置反时 判断A是否接触B顶部
     * @returns objA & objB 是否相遇
     */
    is_impact({ objA, objB, bottom_to_top = true }) {
      let counter_x_left = // 左侧相遇条件: > b 左侧 && < b 右侧
        objA.collide.right > objB.collide.left &&
        objA.collide.right < objB.collide.right;
      let counter_x_right = // 右侧相遇条件: > b 左侧 && < b 右侧
        objA.collide.left < objB.collide.right &&
        objA.collide.left > objB.collide.left;
      let counter_x = counter_x_left || counter_x_right;
      let counter_y = false;
      if (bottom_to_top) {
        counter_y = objA.collide.top < objB.collide.bottom; //返回高度是否相遇
      } else {
        counter_y = objA.collide.bottom > objB.collide.top; //返回高度是否相遇
      }
      return counter_x && counter_y;
    },
    /**
     * @description 获得对象的碰撞体积
     * @param obj 拥有pos&size的对象
     */
    get_collide(obj) {
      return {
        top: obj.pos.y,
        bottom: obj.pos.y + obj.size.height,
        left: obj.pos.x,
        right: obj.pos.x + obj.size.width,
      };
    },
    /**
     * @description 判断 对象 是否离开 最大可视区域
     * @param obj 拥有pos&size的对象
     */
    is_leave({ obj, type }) {
      const { collide: item } = obj;
      let { left, right, top, bottom } = this.max_reachable_area.filter(
        (e) => e.type === type
      )[0].pos;
      return (
        item.top < top ||
        item.bottom > bottom ||
        item.left < left ||
        item.right > right
      );
    },
    // * 下方为运行逻辑
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
    /**
     * @description 创建子弹
     * @require permit 是否允许增加
     * @require beforeCreate 函数，基本用于添加请求次数
     * @require magezine 弹夹，用于存放子弹数据
     * @require setting 初始配置
     */
    create_bullet({ beforeCreate, permit, magezine, setting, pos }) {
      // 每次创建子弹时发起请求
      beforeCreate && beforeCreate();
      // 当频率准许时创建新的子弹
      if (permit) {
        magezine.push({
          ...setting,
          pos,
        });
      }
    },
    create_enemy(position = "random") {
      this.shootParam.enemy_side.request_total += 1;
      // 当频率准许时创建新的敌机
      if (this.permitCreateEnemy) {
        this.enemies.push({
          ...this.setting.enemy,
          pos: {
            x:
              Math.floor(
                Math.random() *
                  (this.container.size.width - this.setting.enemy.size.width)
              ) + 1,
            y: 0,
          },
        });
      }
    },
    play({ status }) {
      if (status === "start" && !this.play_state.timer) {
        // 只有第一次启动时才会添加定时器
        this.play_state.timer = setInterval(() => {
          //每刻执行一次
          this.create_enemy(); //发起创建敌机请求
          this.create_bullet({ ...this.create_bullet_param }); //发起创建子弹请求
          // 移除  击中敌机||离开边界 的子弹
          this.bullets = this.bullets.filter((item) => {
            item.pos.y += -this.setting.bullet.single_shift; // ? 位移
            item.collide = this.get_collide(item); // ? 每次移动更新碰撞位置
            let hited = this.is_hit_enemy(item); // ? 判断当前子弹是否击中任意一架敌机 // ? 判断是否离开可视区域
            return (
              //保留 未出边界 且 未击中敌机的 子弹
              !this.is_leave({ obj: item, type: "bullet" }) && !hited
            );
          });
          // 移除 击中己方 || 离开边界 的敌机
          this.enemies = this.enemies.filter((item) => {
            // ? 创建敌方子弹
            this.create_bullet({
              beforeCreate: () => {
                item.request_total += 1;
                item.permitCreateBullet =
                  item.request_total % item.frequency === 0;
              },
              permit: item.permitCreateBullet,
              magezine: this.enemy_bullets,
              setting: this.setting.enemy_bullet,
              pos: {
                x: item.pos.x + item.size.width / 2,
                y: item.collide.bottom,
              },
            });
            // ? 创建敌方子弹

            item.pos.y += this.setting.enemy.single_shift; // ? 位移
            item.collide = this.get_collide(item); // ? 每次移动更新碰撞位置
            const hited = this.is_hit_own(item); // ? 判断是否击中己方
            return !this.is_leave({ obj: item, type: "enemy" }) && !hited;
          });
          // 移除 击中己方 || 离开边界 的敌方子弹
          this.enemy_bullets = this.enemy_bullets.filter((item) => {
            item.pos.y += item.single_shift; // ? 位移
            item.collide = this.get_collide(item); // ? 每次移动更新碰撞位置
            const hited = this.is_hit_own(item); // ? 判断是否击中己方
            return !this.is_leave({ obj: item, type: "enemy_bullet" }) && !hited;
          });
        }, this.play_state.interval);
      } else if (status === "stop") {
        clearTimeout(this.play_state.timer);
        this.play_state.timer = null;
      }
    },

    is_hit_enemy(bullet) {
      let { pos, size, damage_amount } = bullet;
      let ifHit = false;
      //判断当前是否能击中任何一个敌人,击中后敌人消失
      this.enemies = this.enemies.filter((enemy) => {
        // * 存活条件 不符合以下条件的enemy即为击中
        if (this.is_impact({ objA: bullet, objB: enemy })) {
          // 子弹碰到敌机扣除子弹的伤害对应的hp
          ifHit = true; //击中状态
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
      let isHit = this.is_impact({
        objA: enemy,
        objB: this.plane,
        bottom_to_top: false,
      });
      if (isHit) {
        this.plane.hp -= enemy.damage_amount;
        if (this.plane.hp <= 0) {
          this.$q.notify({
            type: "negative",
            message: `你已经die了`,
          });
        }
      }
      return isHit; //返回是否击中己方
    },
  },
  mounted() {
    this.bus.$emit("changeWorkBenchMainHeight", this.$refs.el.offsetHeight); //发送高度信息设置workbench渐变
    this.set_max_reachable_area(); //设置每个移动对象的最大高度
    this.bus.$on("backComponentsMain", () => {
      this.play({ status: "stop" });
      this.scene = "plane";
    });
  },
  watch: {
    scene() {
      this.$nextTick(() => {
        console.log(this.$refs.el.offsetHeight);
        this.bus.$emit("changeWorkBenchMainHeight", this.$refs.el.offsetHeight); //发送高度信息设置workbench渐变
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  position: relative;
  border: 1px solid red;
  overflow: hidden;

  .plane {
    cursor: pointer;
    position: absolute;
    font-size: 30px;

    .hpLine {
      position: absolute;
      bottom: 0px;
    }

    .icon {
      width: 100%;
      height: 100%;
    }
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

  .enemy-bullet {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: black;
  }
}
</style>