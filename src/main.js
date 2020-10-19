import Vue from 'vue'
//自动适配所有屏幕
import 'lib-flexible'

//引入根组件App
import App from './App.vue'
//引入路由
import router from './router'

Vue.config.productionTip = false

//引入基础样式
import './styles/base.less'
//引入字体图标
import './styles/iconfont.css'

//引入moment时间插件
import moment from 'moment'
//注册一个全局过滤器,时间格式化
Vue.filter('date', (val, format = 'YYYY-MM-DD') => {
	return moment(val).format(format)
})

//全局引入axios
import axios from 'axios'
//处理axios
axios.defaults.baseURL = 'http://localhost:3000'
// 把 axios 挂在到 Vue 原型上, 那么每一个vue实例(vue组件) 里面就可以直接使用了
Vue.prototype.$axios = axios
//请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
// axios.interceptors.response.use(
// 	function(response) {
// 		// 对响应数据做点什么
// 		return response
// 	},
// 	function(error) {
// 		// 对响应错误做点什么
// 		return Promise.reject(error)
// 	}
// )

// 引入 vant,按需加载
import {
	Field,
	Toast,
	Cell,
	CellGroup,
	Dialog,
	Radio,
	RadioGroup,
	Uploader,
	List,
} from 'vant'

Vue.use(List)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Toast)

//注册公共组件组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
