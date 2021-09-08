<template>
  <div class="search">
    <div class="search-img" flex-center>
      <q-carousel
        swipeable
        style="background: transparent"
        :style="{ opacity }"
        height="100%"
        animated
        infinite
        transition-prev="scale"
        transition-next="scale"
        class="rounded-borders"
        ref="carousel"
        v-model="slide"
        @before-transition="
          (e) => {
            changeSearchMethod(e);
          }
        "
      >
        <template v-slot:control>
          <q-carousel-control
            position="top-left"
            :offset="[18, 18]"
            class="q-gutter-xs control"
          >
            <q-btn
              push
              dense
              :color="currentSearch === 'baidu' ? 'blue' : 'orange'"
              :text-color="currentSearch === 'baidu' ? 'white' : 'white'"
              :icon="currentSearch === 'baidu' ? 'shopping_cart' : 'search'"
              @click="$refs.carousel.next()"
            >
              <div class="q-ml-sm">
                {{ currentSearch === "baidu" ? "淘宝搜索" : "百度搜索" }}
              </div>
            </q-btn>
          </q-carousel-control>
        </template>
        <q-carousel-slide name="baidu" class="column no-wrap flex-center">
          <img src="../../../assets/imgs/baidu.png" />
        </q-carousel-slide>
        <q-carousel-slide name="taobao" class="column no-wrap flex-center">
          <img src="../../../assets/imgs/taobao.png" />
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="search-container">
      <div class="baidu-search">
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
          @keydown.ctrl.67="copy_translate_result"
          @keydown.meta.67="copy_translate_result"
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
      <div
        class="translate-search q-ml-md"
        :style="{
          width: translate_result.length > 10 ? '20%' : '10%',
        }"
      >
        <q-input
          v-model="translate_result"
          rounded
          outlined
          placeholder="翻译结果"
          :disable="!translate_result"
        >
          <template v-slot:append>
            <q-icon name="content_copy" @click="copy_translate_result">
              <q-tooltip
                :value="!!translate_result"
                anchor="center right"
                self="center left"
              >
                ctrl+c
              </q-tooltip>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import md5 from "js-md5";
import Api from "../../../api/api";
export default {
  name: "Search",
  data() {
    return {
      timer: {
        translate: null, //节流定时器
      },
      translate_result: "",
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
    wd(val) {
      if (val.length === 0) {
        this.translate_result = "";
        this.arr = [];
      }
    },
  },
  methods: {
    hideSearchContent() {
      setTimeout(() => {
        this.arr = [];
        this.showSearchContent = false;
      }, 150);
    },
    onInput() {
      if (!!this.wd) {
        this.getData(); //开始请求百度搜索候选栏
        this.translate(); //百度翻译
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
    render_candidate(data) {
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
    getData() {
      let _this = this;
      switch (this.currentSearch) {
        case "baidu":
          Api.searchBaidu({
            wd: this.wd,
            callback_name: "callback_method",
            callback_method: this.render_candidate,
          }).then((res) => {
            eval(res);
          });
          break;
        case "taobao":
          // Api.searchTaobao({
          //   q: this.wd,
          //   callback_name: "callback_method",
          //   callback_method: this.render_candidate,
          // }).then((res) => {
          //   eval(res)
          // });
          $.ajax({
            method: "post",
            url: this.search_taobao + this.wd,
            dataType: "jsonp",
          }).done((data) => {
            this.render_candidate(data);
          });
          break;
        default:
          break;
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
      this.currentSearch = e;
    },
    translate() {
      let query = this.wd;
      if (this.timer.translate) {
        clearTimeout(this.timer.translate);
      }
      this.timer.translate = setTimeout(() => {
        let appid = "20201013000588468";
        let key = "S31B040thI1pprUuNIXM";
        let salt = new Date().getTime();
        Api.translate({
          q: query,
          appid,
          salt,
          from: "zh",
          to: "en",
          sign: md5(appid + query + salt + key),
        }).then((res) => {
          console.log(res);
          let { trans_result } = res;
          this.translate_result = trans_result[0].dst;
          this.timer.translate = null;
        });
      }, 500);
    },
    copy_translate_result() {
      this.$copyText(this.translate_result);
      this.$q.notify({ color: "orange-6", message: "复制成功" });
      this.wd = "";
      this.translate_result = "";
    },
  },
  mounted() {
    window.addEventListener("blur", () => {
      document.title = "导航在这里哦 Navigation";
      this.wd = "";
    });
  },
};
</script>

<style lang="stylus" scoped="scoped">
@import '../../../assets/style/color.styl';

.search {
  .search-img {
    &:hover {
      .control {
        opacity: 1;
      }
    }
  }

  .search-img {
    width: 100%;
    height: 200px;

    .control {
      opacity: 0;
      transition: 0.3s;
    }

    img {
      display: block;
      height: 200px;
      margin: 0 auto;
    }
  }

  .search-container {
    display: flex;
    height: 56px;
    margin-top: 10px;

    .baidu-search {
      flex: 1;
      position: relative;
      transition: 0.3s;

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

    .translate-search {
      height: 100%;
      transition: 0.3s;
      padding: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .search {
    .search-img {
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
