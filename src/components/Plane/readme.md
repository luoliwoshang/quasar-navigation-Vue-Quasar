# `setting` 配置移动对象

**require `pos` 对象的 x 轴与对象的 y 轴坐标**

**require `size` 移动对象的宽高，显示为 px**

- `single_shift` 移动对象的单次移动距离 显示为 px
- `damage_amount` 移动对象单次伤害量
- `collide` 为计算得出，无需配置，(需要预留位置)

```javascript
  bullet: {
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
    single_shift: 1, //子弹单次移动距离
    damage_amount: 10, //单次伤害量
  },
```

##
# `max_reachable_area` 无需配置,用于存放每个可移动对象的最大移动位置
* `type` 移动对象的种类
* `pos` 移动对象的最大移动位置

```javascript

[
    {
        type: "enemy",
        pos: { left: -30, right: 230, top: -30, bottom: 430 }
    },
    {
        type: "bullet",
        pos: { left: -30, right: 230, top: -30, bottom: 430 }
    }
]
```