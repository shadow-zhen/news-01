import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import Home from '../views/Home.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'

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
	],
})

export default router
