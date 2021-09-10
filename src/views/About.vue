<template>
  <div>
    <div class="container">
      <div class="row" v-for="(row, row_index) in container" :key="row_index">
        <div
          class="cell"
          v-for="(cell, cell_index) in row"
          :key="cell_index"
          :style="style_cell"
        >
          {{ row[cell_index] }}
          {{ cell ? cell : cell_index }}
        </div>
      </div>
    </div>
    <!-- <button @click="next_step">下一步</button> -->
  </div>
</template>
<script type="text/javascript">
const unit_distance = 30;
function unit(number) {
  return unit_distance * number;
}
export default {
  name: "Test",
  mounted() {
    this.create_block();
  },
  data() {
    return {
      container: (function () {
        return [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
        ];
        // return [[...Array(6).fill(null)], [...Array(6).fill(null)]];
      })(),
      config: {
        blocks: [
          {
            shape: [Array(4).fill(1), Array(1).fill(1)],
            pos: {
              x: 0,
              y: 0,
            },
          },
        ],
      },
    };
  },
  computed: {
    style_cell() {
      return {
        width: unit(1) + "px",
        height: unit(1) + "px",
      };
    },
  },
  methods: {
    unit() {
      return unit_distance * number;
    },
    create_block() {
      // 随机获得一个即将被置入container的block
      let block = this.config.blocks[0];
      let { pos, shape } = block;
      let container = this.container;
      //   for (let row = 0; row < shape.length; row++) {
      //     //   获得block每一行的长度
      //     console.log(shape[row]);
      //     shape[row].forEach((cell, index) => {
      //       console.log("填充第" + row + "行第" + index + "列");
      //       // 获得每一个block行的每一格
      //       container[row][index] = cell;
      //       console.log(container[row]);
      //       console.log(container);
      //     });
      //     console.log(row + "-------" + row);
      //   }
      shape.forEach((row, row_index) => {
        console.log(row, row_index);
        row.forEach((col, col_index) => {
          this.container[row_index][col_index] = col;
        });
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  width: fit-content;
  position: relative;
  border: 1px solid black;

  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }
}
</style>