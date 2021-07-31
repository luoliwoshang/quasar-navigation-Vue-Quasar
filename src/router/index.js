import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout/Layout'
import Home from '../views/Home/Home.vue'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Layout',
		component: Layout,
		children: [{
			path: '',
			name: 'Home',
			component: Home
		}, {
			path: 'test',
			name: 'test',
			component: () => import('../views/Test.vue')
		}, {
			path: 'express',
			name: 'express',
			component: () => import('../components/Express/index.vue')
		}]
	}]
})
