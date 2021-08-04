<template>
  <div>
    <div class="search-img" flex-center>
      <q-carousel
        swipeable
        style="background: transparent"
        :style="{ opacity }"
        height="100%"
        arrows
        animated
        infinite
        transition-prev="scale"
        transition-next="scale"
        control-color="primary"
        class="rounded-borders"
        v-model="slide"
        @transition="
          (e) => {
            changeSearchMethod(e);
          }
        "
      >
        <q-carousel-slide name="baidu" class="column no-wrap flex-center">
          <img src="../../../assets/imgs/baidu.png" />
        </q-carousel-slide>
        <q-carousel-slide name="taobao" class="column no-wrap flex-center">
          <img src="../../../assets/imgs/taobao.png" />
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="search-box">
      <q-input
        v-model="wd"
        clearable
        class="text-h5"
        :outlined="!!!wd"
        :filled="!!wd"
        bg-color="cyan-1"
        rounded
        :style="{ opacity }"
        @blur="hideSearchContent"
        @focus="showSearchContent = true"
        placeholder="请输入内容"
        @input="onInput"
        @keydown.40.native="nextOption"
        @keydown.38.native="lastOption"
        @keydown.13.native="submit"
      />
      <div
        class="search-content"
        v-show="showSearchContent"
        :style="{ opacity }"
      >
        <q-card
          square
          v-for="(item, idx) in arr"
          :key="idx"
          :data-content="item"
          :data-id="idx"
          @click="itemClick($event)"
          :class="idx == index ? 'active' : ''"
        >
          <q-card-section class="text-primary">
            <div class="text-h6">{{ item }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "Search",
  data() {
    return {
      slide: "baidu", //图片切换
      lorem: "test", //测试文字
      wd: "", //搜索内容
      arr: [], //搜索后结果
      index: -1, //当前选中项
      showSearchContent: true, //是否显示搜索后选框
      currentSearch: "baidu", //当前搜索方式baidu/taobao
      search_baidu:
        "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=sr", //百度的请求
      search_taobao:
        "https://suggest.taobao.com/sug?code=utf-8&_ksTS=1594451639078_2581&callback=jsonp2582&k=1&area=c2c&bucketid=1&q=", //淘宝请求
    };
  },
  props: ["opacity"],
  computed: {
    hasContent() {
      return this.arr.length > 0;
    },
  },

  watch: {
    index() {
      if (this.index >= this.arr.length - 1) {
        this.index = this.arr.length - 1;
      } else if (this.index <= -1) {
        this.index = -1;
      }
      this.wd = this.arr[this.index];
    },
  },
  methods: {
    hideSearchContent() {
      setTimeout(() => {
        this.showSearchContent = false;
      }, 150);
    },
    onInput() {
      if (!!this.wd) {
        this.getData(); //开始请求数据
      } else {
        this.arr = [];
      }
    },
    nextOption(event) {
      // 按的下键
      this.index = this.index + 1;
    },
    lastOption(event) {
      // 按的下键
      this.index = this.index - 1;
    },
    getData() {
      if (this.currentSearch === "baidu") {
        $.ajax({
          method: "post",
          url: this.search_baidu,
          data: {
            wd: this.wd,
          }, //文本框中的值
          jsonpCallback: "sr", //百度的回调函数
          dataType: "jsonp", //跨域
        }).done((data) => {
          this.getDataSuccess(data);
        });
      } else {
        $.ajax({
          method: "post",
          url: this.search_taobao + this.wd,
          dataType: "jsonp",
        }).done((data) => {
          this.getDataSuccess(data);
        });
      }
    },
    getDataSuccess(data) {
      // 不同的需要过滤
      if (this.currentSearch === "baidu") {
        this.arr = data.s;
      } else if (this.currentSearch === "taobao") {
        let newdata = [];
        data.result.forEach((item, index) => {
          newdata[index] = item[0];
        });
        this.arr = newdata;
      }
    },
    itemClick(event) {
      if (this.currentSearch === "baidu") {
        window.open(
          "https://www.baidu.com/s?wd=" + event.currentTarget.dataset.content
        );
      } else if (this.currentSearch === "taobao") {
        window.open(
          "https://s.taobao.com/search?q=" + event.currentTarget.dataset.content
        );
      }
    },
    submit() {
      if (this.currentSearch === "baidu") {
        window.open("https://www.baidu.com/s?wd=" + this.wd);
      } else if (this.currentSearch === "taobao") {
        window.open("https://s.taobao.com/search?q=" + this.wd);
      }
    },
    changeSearchMethod(e) {
      // 改变了搜索内容
      console.log(e);
      this.currentSearch = e;
    },
  },
  mounted() {
    window.addEventListener("blur", () => {
      document.title = "导航在这里哦 Navigation";
      this.wd = "";
      this.showSearchContent = false;
    });
  },
};
</script>

<style lang="stylus" scoped="scoped">
@import '../../../assets/style/color.styl';

.search-img {
  width: 100%;
  height: 200px;

  img {
    display: block;
    height: 200px;
    margin: 0 auto;
  }
}

.search-box {
  margin-top: 20px;
  position: relative;

  .q-input {
  }

  .search-content {
    position: absolute;
    z-index: 9;
    width: 100%;

    .q-card {
      cursor: pointer;

      &:hover, &.active {
        background-color: $main-color;
      }
    }
  }
}
</style>
