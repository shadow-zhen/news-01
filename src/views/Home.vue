<template>
	<div class="home">
		<!-- home 头部 -->
		<van-sticky>
			<header>
				<div class="left">
					<i class="iconfont iconnew"></i>
				</div>
				<div class="center">
					<i class="iconfont iconsearch"></i>
					<span>搜索新闻</span>
				</div>
				<div class="right" @click="toUserOrLogin">
					<i class="iconfont iconwode"></i>
				</div>
			</header>
		</van-sticky>

		<!-- 小三角 -->
		<van-sticky z-index="999">
			<div class="container" @click="$router.push('/tabsedit')">
				<i class="iconfont iconjiantou1"></i>
			</div>
		</van-sticky>
		<!-- tab栏导航 -->
		<van-tabs v-model="active" :sticky="true" background="#ddd">
			<van-tab :title="tab.name" v-for="tab in tabs" :key="tab.id">
				<van-pull-refresh v-model="isRefrshing" @refresh="onRefresh">
					<van-list
						v-model="loading"
						:finished="finished"
						finished-text="没有更多了"
						@load="onLoad"
						:immediate-check="false"
					>
						<hm-post
							v-for="post in posts"
							:post="post"
							:key="post.id"
							@click.native="$router.push(`/detail/${post.id}`)"
						></hm-post>
					</van-list>
				</van-pull-refresh>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			active: 1, //栏目列表的下标
			tabs: [], //栏目列表数据
			posts: [], //文章列表数据
			loading: false, //正在加载中
			isRefrshing: false, //是否正在下拉刷新
			finished: false, //全部加载完成
			pageIndex: 1, //请求文章列表第几页的数据
			pageSize: 5, //请求文章数据的条数
		}
	},
	created() {
		this.reqTabs()
	},
	methods: {
		//封装进入页面栏目列表数据
		async reqTabs() {
			const res = await this.$axios.get('/category')
			// console.log(res)
			this.tabs = res.data.data
			//请求栏目列表 ==> 根据当前栏目列表id发送请求获取文章张列表数据
			this.reqPosts(this.tabs[this.active].id)
		},
		//封装获取文章列表数据
		async reqPosts(id) {
			const res = await this.$axios.get('/post', {
				params: {
					category: id,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
				},
			})
			// console.log(res)
			const { data, statusCode } = res.data
			if (statusCode === 200) {
				this.posts = [...this.posts, ...data]
				this.loading = false
				if (data.length < 5) {
					this.finished = true
				}
			}
		},
		//组件滚动到底部触发
		onLoad() {
			// console.log('滚到底部了')
			this.pageIndex++
			this.reqPosts(this.tabs[this.active].id)
		},
		//组件下拉刷新时触发
		onRefresh() {
			// console.log('下拉刷新')
			this.isRefrshing = false
			this.posts = []
			this.loading = true
			this.finished = false
			this.pageIndex = 1
			this.reqPosts(this.tabs[this.active].id)
		},
		//去往个人中心或登录页面
		toUserOrLogin() {
			const token = localStorage.getItem('token')
			if (token) {
				this.$router.push('/user')
			} else {
				this.$router.push('/login')
			}
		},
	},
	watch: {
		active(newValue) {
			this.active = newValue
			this.posts = []
			this.loading = true
			this.finished = false
			this.pageIndex = 1
			// console.log(this.active)
			this.reqPosts(this.tabs[this.active].id)
		},
	},
}
</script>

<style lang="less" scoped>
.home {
	header {
		display: flex;
		height: 40px;
		background-color: red;
		text-align: center;
		align-items: center;
		color: #fff;

		.left {
			width: 50px;
			.iconnew {
				font-size: 50px;
			}
		}
		.right {
			width: 40px;

			.iconwode {
				font-size: 28px;
			}
		}
		.center {
			flex: 1;
			height: 30px;
			line-height: 30px;
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 15px;

			.iconsearch,
			sapn {
				margin: 0 5px;
			}
		}
	}

	/deep/ .van-tabs__wrap {
		margin-right: 40px;
	}
	// 小三角
	.container {
		width: 40.5px;
		height: 44px;
		background: #ddd;
		line-height: 44px;
		text-align: center;
		color: #000;

		position: absolute;
		right: 0;
		z-index: 999;
	}
}
</style>
