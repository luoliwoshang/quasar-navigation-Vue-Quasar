import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout/Layout'
import Home from '../views/Home/Home.vue'
Vue.use(Router)

// 用于解决点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// 用于解决点击重复路由报错
export default new Router({
	routes: [{
		path: '/',
		name: 'Layout',
		component: Layout,
		children: [{
			path: '',
			name: 'Home',
			component: Home,
			children: [
				{
					name:'express',
					path: 'express/:courier_code?/:tracking_number?',
					component: () => import('../components/Express/index.vue'),
					props: true//使其能在组件内通过props获取
				},
				{
					name:'setBackground',
					path:'setBackground',
					component:()=>import('../components/Dialog/set_background.vue')
				}
			]
		}, {
			path: 'test',
			name: 'test',
			component: () => import('../views/Test.vue')
		}]
	}]
})
