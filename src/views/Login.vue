<template>
	<div class="login">
		<!-- header -->
		<hm-header>Login</hm-header>
		<!-- logo -->
		<hm-logo></hm-logo>
		<!-- 输入框 -->
		<van-field
			v-model="username"
			required
			label="用户名"
			placeholder="请输入用户名"
			clearable
			:error-message="usernameErrMsg"
			@input="checkUsername"
			@clear="clearUsername"
		/>
		<van-field
			v-model="password"
			type="password"
			required
			label="密码"
			placeholder="请输入密码"
			clearable
			:error-message="passwordErrMsg"
			@input="checkPassword"
			@clear="clearPassword"
		/>
		<!-- button -->
		<hm-button @click.native="startLogin">Login</hm-button>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			username: '123456', //用户名
			password: '123456', //密码
			usernameErrMsg: '', //用户名错误提示信息
			passwordErrMsg: '', //密码错误提示信息
		}
	},
	methods: {
		//检验用户名
		checkUsername() {
			const reg = /^1\d{3,5}$/
			if (reg.test(this.username)) {
				this.usernameErrMsg = ''
			} else {
				this.usernameErrMsg = '用户名格式不正确！'
			}
			if (this.username === '') {
				this.usernameErrMsg = ''
			}
		},
		//清空用户名
		clearUsername() {
			this.usernameErrMsg = ''
		},
		//检验密码
		checkPassword() {
			const reg = /\d{3,12}$/
			if (reg.test(this.password)) {
				this.passwordErrMsg = ''
			} else {
				this.passwordErrMsg = '密码格式不正确！'
			}
			if (this.password === '') {
				this.passwordErrMsg = ''
			}
		},
		//清空密码框
		clearPassword() {
			this.passwordErrMsg = ''
		},
		//开始登录
		startLogin() {
			//从当前组件中解构
			const { username, password, usernameErrMsg, passwordErrMsg } = this
			//发送ajax前进行格式验证
			if (
				username.trim() &&
				password.trim() &&
				!usernameErrMsg &&
				!passwordErrMsg
			) {
				this.$toast.success('验证成功')
				//发送ajax请求
				this.$axios
					.post('/login', {
						username,
						password,
					})
					.then(res => {
						// console.log(res)
						const { data, statusCode, message } = res.data
						if (statusCode === 200) {
							//保存token
							localStorage.setItem('token', data.token)
							localStorage.setItem('user_id', data.user.id)
							//提示登录成功
							this.$toast.success(message)
							//跳转到用户页
							this.$router.push('/user')
						} else {
							this.$toast.fail(message)
						}
					})
			} else {
				this.$toast.fail('验证失败')
			}
		},
	},
}
</script>

<style></style>
