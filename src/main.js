import Vue from 'vue'
//自动适配所有屏幕
import 'lib-flexible'

//引入根组件App
import App from './App.vue'
//引入路由
import router from './router'

Vue.config.productionTip = false

// 引入 vant
import { Field, Toast } from 'vant'

Vue.use(Field)
Vue.use(Toast)

//引入基础样式
import './styles/base.less'
//引入字体图标
import './styles/iconfont.css'

//引入路由组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
