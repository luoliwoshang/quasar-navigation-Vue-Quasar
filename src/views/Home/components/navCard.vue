<template>
	<div class="container">
		<div  class="row">
			<div 
			:style="{opacity}"
			class="col-4 col-lg-4 col-md-6 col-xs-12"
			v-for="(item,index) in navs"
			:key="index">
				<q-card
				bordered
				v-ripple:white
				:style="{backgroundColor:item.backgroundColor}"
				@contextmenu.prevent="handleDel(index)">
					<q-card-actions align="right" class="absolute">
						<q-tooltip anchor="top middle" self="bottom middle">右键删除</q-tooltip>
						<q-fab   size="10px" icon="settings" push  bordered direction="right" @click.stop>
							<!-- 改变url -->
							<q-fab-action   rounded push  icon="link"
								:data-v_id="index" @click="handleChangeUrlClick" >
								<q-tooltip  anchor="top middle" self="bottom middle" >修改url</q-tooltip>
								</q-fab-action>
								<!-- 改变名称 -->
							<q-fab-action   rounded push 
								icon="font_download" :data-v_id="index" @click="handleChangeNameClick" >
								<q-tooltip anchor="top middle" self="bottom middle" >修改名称</q-tooltip>
								</q-fab-action>
								<!-- 改变背景颜色 -->
							<q-fab-action rounded push  icon="brush"
								:data-v_id="index" @click="handleChangeBackgroundColorClick" >
								<q-tooltip  anchor="top middle" self="bottom middle" >修改背景颜色</q-tooltip>
								</q-fab-action>
								<!-- 改变文字颜色 -->
							<q-fab-action   rounded push  icon="color_lens"
								:data-v_id="index" @click="handleChangeColorClick" >
								<q-tooltip  anchor="top middle" self="bottom middle" >修改文字颜色</q-tooltip>
								</q-fab-action>
								
						</q-fab>
					</q-card-actions>
					<q-card-section class="text-h2 text-center" >
						<a target="_blank" :style="{color:item.color}" :href="item.url">{{item.name}}</a>
					</q-card-section>
				</q-card>
			</div>
		</div>
		<!-- 网站URl -->
		<q-dialog v-model="showChangeUrl">
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">新的url</div>
				</q-card-section>
				<q-input dense v-model="navUrl" autofocus @keyup.enter="changeUrl();showChangeUrl = false" />
				</q-card-section>
				<q-card-actions align="right" class="text-primary">
					<q-btn flat label="确认更改" v-close-popup @click="changeFeature('url',navUrl)" />
				</q-card-actions>
			</q-card>
		</q-dialog>
		
		<!-- 网站名称 -->
		<q-dialog v-model="showChangeName">
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">新的url</div>
				</q-card-section>
				<q-input dense v-model="navName" autofocus @keyup.enter="changeName();showChangeName = false" />
				</q-card-section>
				<q-card-actions align="right" class="text-primary">
					<q-btn flat label="确认更改" v-close-popup @click="changeFeature('name',navName)" />
				</q-card-actions>
			</q-card>
		</q-dialog>
		
		<!-- 背景颜色 -->
		<q-dialog v-model="showChangeBackgroundColor">
			<q-card>
				<q-card-section>
					<q-chip size="18px" icon="bookmark" class="text-center">
						新颜色
					</q-chip>
				</q-card-section>
				<q-card-section>
					<q-input dense v-model="navBackgroundColor" autofocus @keyup.enter="changeName();showChangeName = false" />
				</q-card-section>
				<q-card-section class="q-pt-none">
					<q-color style="width: 300px;" v-model="navBackgroundColor" class="my-picker" />
				</q-card-section>
				<q-card-actions align="right">
					<q-btn push label="确认" v-close-popup @click="changeFeature('backgroundColor',navBackgroundColor)"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
		
		<!-- 文字颜色 -->
		<q-dialog v-model="showChangeColor">
			<q-card>
				<q-card-section>
					<q-chip size="18px" icon="bookmark" class="text-center">
						新颜色
					</q-chip>
				</q-card-section>
				<q-card-section class="q-pt-none">
					<q-color style="width: 300px;" v-model="navColor" class="my-picker" />
				</q-card-section>
				<q-card-actions align="right">
					<q-btn push label="确认" v-close-popup @click="changeFeature('color',navColor)"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Dialog } from "quasar";
import vuedraggable from 'vuedraggable';//拖拽
export default {
  name: "navCard",
  data() {
    return {
      test: 1,
      showChangeUrl: false, //是否显示 改变网站URl
      showChangeName: false, //是否显示 改变网站名
      showChangeBackgroundColor: false, //是否显示网站颜色
      showChangeColor: false, //是否显示 改变字体颜色
      navUrl: "", //当前显示的url
      navName: "", //当前显示的name
      navBackgroundColor: "", //当前背景颜色
      navColor: "", //当前文字颜色
      currentCard: "", //存放当前操作的卡片
      tooltipShow: false, //是否显示当前卡片的工具
    };
  },
  props: ["opacity"],
  computed: {
    ...mapState("moduleNav", ["navs"])
  },
  methods: {
    ...mapMutations("moduleNav", ["CHANGE_NAV_FEATURE", "DELETE_NAV"]),
    handleChangeUrlClick($event) {
      this.showChangeUrl = true; //设置显示改变对话框
      this.currentCard = $event.currentTarget.dataset.v_id; //设置当前卡片
      this.navUrl = this.navs[this.currentCard].url; //设置当前对话框出现的内容为当前卡片的值
    },
    handleChangeNameClick($event) {
      this.showChangeName = true;
      this.currentCard = $event.currentTarget.dataset.v_id; //设置当前卡片
      this.navName = this.navs[this.currentCard].name; //设置当前对话框出现的内容为当前卡片的值
    },
    handleChangeBackgroundColorClick($event) {
      this.showChangeBackgroundColor = true;
      this.currentCard = $event.currentTarget.dataset.v_id; //设置当前卡片
      this.navBackgroundColor = this.navs[this.currentCard].backgroundColor; //
    },
    handleChangeColorClick($event) {
      this.showChangeColor = true;
      this.currentCard = $event.currentTarget.dataset.v_id; //设置当前卡片
      this.navColor = this.navs[this.currentCard].color; //设置当前对话框出现的内容为当前卡片的值
    },
    changeFeature(feature, value) {
      this.CHANGE_NAV_FEATURE({
        v_id: this.currentCard,
        feature: feature,
        value: value,
      });
    },
    handleDel(index) {
      this.$q
        .dialog({
          title: "确认删除吗",
          cancel: true,
        })
        .onOk(() => {
          this.DELETE_NAV(index);
        });
    },
  },
};
</script>

<style scoped="scoped" lang="stylus">
@import '../../../assets/style/common.css';

.container {
  .col-4 {
    margin-top: 50px;

    .q-card {
      margin: 0 auto;
      position: relative;
      cursor: pointer;
      width: 300px;
      height: 200px;
      border-radius: 5%;
      color: white;
      background-color: $main-color;

      .q-fab {
        z-index: 8;
        opacity: 0;
        transition: 0.4s;
      }

      .q-input {
        padding: 0 8%;
      }

      .q-card__section {
        width: 100%;
        height: 100%;

        a {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
      }

      &:hover {
        .q-fab {
          opacity: 1;
        }
      }
    }
  }
}
</style>
