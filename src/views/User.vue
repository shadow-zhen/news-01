<template>
	<div class="user">
		<!-- 头部 -->
		<hm-header>个人中心</hm-header>
		<!-- 个人信息 -->
		<div class="info">
			<div class="left">
				<img :src="`http://localhost:3000${info.head_img}`" alt="" />
			</div>
			<div class="center">
				<div class="nickname">
					<i
						class="iconfont"
						:class="info.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'"
					></i>
					{{ info.nickname }}
				</div>
				<div class="date">{{ info.create_date | date }}</div>
			</div>
		</div>
		<!-- vant单元格 -->
		<van-cell-group>
			<van-cell
				title="我的关注"
				is-link
				value="关注的用户"
				@click="$router.push('/my-follow')"
			/>
			<van-cell
				title="我的跟帖"
				is-link
				value="跟帖/回复"
				@click="$router.push('/my-comment')"
			/>
			<van-cell
				title="我的收藏"
				is-link
				value="文档/视频"
				@click="$router.push('/my-star')"
			/>
			<van-cell title="设置" is-link @click="goEdit" />
		</van-cell-group>
		<!-- 退出 -->
		<hm-button @click.native="logout">Logout</hm-button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			info: {}, //后台响应的个人信息
		}
	},
	methods: {
		//退出功能
		logout() {
			this.$dialog
				.confirm({
					title: '温馨提示',
					message: '您确认要退出吗',
				})
				.then(() => {
					// on confirm
					// 删除token和user_id
					localStorage.removeItem('token')
					localStorage.removeItem('user_id')
					//跳转到login页面
					this.$router.push('login')
				})
				.catch(() => {
					// on cancel
				})
		},
		//点击设置跳转到编辑资料页面
		goEdit() {
			this.$router.push('/edit')
		},
	},
	created() {
		const user_id = localStorage.getItem('user_id')
		//发送ajax请求
		this.$axios.get(`/user/${user_id}`).then(res => {
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
}
</script>

<style scoped lang="less">
.info {
	height: 100px;
	border-bottom: 2px solid #cccccc;

	display: flex;
	padding: 0 20px;
	align-items: center;

	.left {
		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	.center {
		flex: 1;
		padding-left: 20px;
		height: 50px;
		line-height: 25px;
		font-size: 14px;
		.name {
			color: #000;
		}
	}
}
</style>
