import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/register',
			component: Register,
		},
		{
			path: '/user',
			component: User,
		},
		{
			path: '/edit',
			component: Edit,
		},
		{
			path: '/home',
			component: Home,
		},
		{
			path: '/detail/:post_id',
			component: Detail,
		},
		{
			path: '/my-follow',
			component: MyFollow,
		},
		{
			path: '/my-comment',
			component: MyComment,
		},
		{
			path: '/my-star',
			component: MyStar,
		},
		{
			path: '/search',
			component: Search,
		},
	],
})

export default router
