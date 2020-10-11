<template>
	<div class="edit">
		<!-- 头部 -->
		<hm-header>编辑资料</hm-header>
		<!-- avatar -->
		<div class="avatar">
			<img :src="$axios.defaults.baseURL + info.head_img" alt="" />
			<van-uploader class="uploader" :after-read="afterRead" />
		</div>
		<van-cell-group>
			<van-cell
				title="昵称"
				:value="info.nickname"
				is-link
				@click="showNickname"
			/>
			<van-cell title="密码" value="*******" is-link />
			<van-cell
				title="性别"
				:value="info.gender === 1 ? '男' : '女'"
				is-link
				@click="showGender"
			/>
		</van-cell-group>
		<!-- 修改昵称弹框 -->
		<van-dialog
			v-model="isShowNicakname"
			title="标题"
			show-cancel-button
			@confirm="confirmNickname"
		>
			<van-field v-model="nickname" placeholder="请输入昵称" />
		</van-dialog>
		<!-- 修改性别弹框 -->
		<van-dialog
			v-model="isShowGender"
			title="标题"
			show-cancel-button
			@confirm="confirmGender"
		>
			<van-radio-group v-model="gender">
				<van-cell-group>
					<van-cell title="男" clickable @click="gender = 1">
						<template #right-icon>
							<van-radio :name="1" />
						</template>
					</van-cell>
					<van-cell title="女" clickable @click="gender = 0">
						<template #right-icon>
							<van-radio :name="0" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</van-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user_id: localStorage.getItem('user_id'), //获取用户id
			info: {}, //从后台获取的个人信息
			isShowNicakname: false, //是否展示昵称弹框
			nickname: '', //数据回显时昵称
			isShowGender: false, //是否展示性别弹框
			gender: -1, //数据回显时性别
		}
	},
	methods: {
		//封装获取用户信息方法
		getInfo() {
			//发送ajax请求
			this.$axios.get(`/user/${this.user_id}`).then(res => {
				// console.log(res)
				const { data, statusCode, message } = res.data
				if (statusCode === 200) {
					//提示成功
					this.$toast.success(message)
					//给info赋值
					this.info = data
				} else {
					this.$toast.fail(message)
				}
			})
		},
		// 封装修改用户信息的方法
		editUser(data) {
			//从当前组件中解构所需数据
			const { nickname, info, user_id } = this

			this.$axios.post(`/user_update/${user_id}`, data).then(res => {
				// console.log(res)
				const { data, statusCode, message } = res.data
				if (statusCode === 200) {
					this.$toast.success(message)
					this.info = data
				}
			})
		},
		// 修改昵称弹框
		showNickname() {
			this.isShowNicakname = true
			this.nickname = this.info.nickname
		},
		//确认修改昵称，并发送ajax请求
		confirmNickname() {
			//从当前组件中解构所需数据
			const { nickname, info } = this
			// 当修改后的昵称和原昵称相同，则不发送ajax请求
			if (nickname === info.nickname) return
			//发送ajax请求
			this.editUser({ nickname })
		},
		// 修改性别弹框
		showGender() {
			this.isShowGender = true
			this.gender = this.info.gender
		},
		// 确认修改性别，并发送ajax请求
		confirmGender() {
			//从当前组件中解构所需数据
			const { gender, info } = this
			// 当修改后的昵称和原昵称相同，则不发送ajax请求
			if (gender === info.gender) return
			//发送ajax请求
			this.editUser({ gender })
		},
		//
		afterRead(file) {
			// 此时可以自行将文件上传至服务器
			console.log(file)
			//1. 借助 FormData 帮我们上传  ==> data
			const formdata = new FormData()
			formdata.append('file', file.file)
			//2. 上传
			this.$axios.post('/upload', formdata).then(res => {
				console.log(res)
				this.editUser({ head_img: res.data.data.url })
			})
		},
	},
	created() {
		//进入页面，获取用户信息
		this.getInfo()
	},
}
</script>

<style lang="less" scoped>
.edit {
	.avatar {
		position: relative;
		margin: 20px 0;
		text-align: center;

		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			object-fit: cover;
		}

		.uploader {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			opacity: 0;
		}
	}
}
</style>
