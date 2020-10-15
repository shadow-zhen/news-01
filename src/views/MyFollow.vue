<template>
	<div class="my-follow">
		<hm-header>我的关注</hm-header>
		<ul>
			<li v-for="item in list" :key="item.id">
				<div class="left">
					<img :src="$axios.defaults.baseURL + item.head_img" alt="" />
				</div>
				<div class="center">
					<p>{{ item.nickname }}</p>
					<p>{{ item.create_date | date }}</p>
				</div>
				<div class="right">
					<button @click="unFollw(item.id)">取消关注</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		}
	},
	//进入我的关注页面发送请求，获取用户关注列表
	created() {
		// this.follow()
		this.reqFollowList()
	},
	methods: {
		//封装获取用户关注列表
		async reqFollowList() {
			const res = await this.$axios.get('/user_follows')
			// console.log(res)
			this.list = res.data.data
		},
		//取消关注
		async unFollw(id) {
			try {
				await this.$dialog.confirm({
					title: '温馨提示',
					message: '你确定要取消关注吗',
				})
				const res = await this.$axios.get(`/user_unfollow/${id}`)
				console.log(res)
				this.reqFollowList()
			} catch (err) {}
		},
		// 模拟关注用户
		async follow() {
			const res = await this.$axios.get('/user_follows/8')
			console.log(res)
		},
	},
}
</script>

<style lang="less" scoped>
.my-follow {
	ul {
		li {
			display: flex;
			padding: 10px;
			align-items: center;

			.left {
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					object-fit: cover;
				}
			}
			.center {
				flex: 1;
				padding-left: 10px;

				p:first-child {
					font-size: 16px;
				}
				p:last-child {
					font-size: 12px;
					color: rgb(230, 230, 230);
				}
			}
			.right {
				button {
					border: none;
					width: 100px;
					height: 30px;
					border-radius: 15px;
				}
			}
		}
	}
}
</style>
