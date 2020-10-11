<template>
	<div class="register">
		<!-- header -->
		<hm-header>Register</hm-header>
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
			v-model="nickname"
			required
			label="昵称"
			placeholder="请输入昵称"
			clearable
			:error-message="nicknameErrMsg"
			@input="checkNickname"
			@clear="clearNickname"
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
		<hm-button @click.native="startRegister">Register</hm-button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			username: '123456', //用户名
			nickname: '飒飒撒', //用户昵称
			password: '123456', //密码
			usernameErrMsg: '', //用户名错误提示信息
			nicknameErrMsg: '', //用户昵称错误提示信息
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
		//清空username
		clearUsername() {
			this.usernameErrMsg = ''
		},
		//检验昵称
		checkNickname() {
			const reg = /^[\u4e00-\u9fa5]{3,7}$/
			if (reg.test(this.nickname)) {
				this.nicknameErrMsg = ''
			} else {
				this.nicknameErrMsg = '昵称格式不正确！'
			}
			if (this.nickname === '') {
				this.nicknameErrMsg = ''
			}
		},
		//清空昵称
		clearNickname() {
			this.nickname = ''
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
		//开始注册
		startRegister() {
			const {
				username,
				nickname,
				password,
				usernameErrMsg,
				nicknameErrMsg,
				passwordErrMsg,
			} = this
			//发送ajax前进行格式验证
			if (
				username.trim() &&
				nickname.trim() &&
				password.trim() &&
				!usernameErrMsg &&
				!nicknameErrMsg &&
				!passwordErrMsg
			) {
				this.$toast.success('验证成功')
				//发送ajax请求
				this.$axios
					.post('/register', {
						username,
						nickname,
						password,
					})
					.then(res => {
						console.log(res)
						const { data, statusCode, message } = res.data
						if (statusCode === 200) {
							this.$toast.success(message)
							//注册成功跳转到登录页
							this.$router.push('/login')
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
