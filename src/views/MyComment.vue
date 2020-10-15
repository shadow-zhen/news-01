<template>
	<div class="my-comment">
		<!-- 头部 -->
		<hm-header>我的跟帖</hm-header>
		<!-- 评论 -->
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="我也是有底线的..."
			@load="onLoad"
			:immediate-check="false"
		>
			<div class="comment" v-for="item in comments" :key="item.id">
				<div class="date">
					<p>{{ item.create_date | date }}</p>
				</div>
				<div class="parent" v-if="item.parent">
					<p>
						回复：<span>{{ item.parent.user.nickname }}</span>
					</p>
					<p>{{ item.parent.content }}</p>
				</div>
				<div class="content">
					<p>{{ item.content }}</p>
				</div>
				<div class="post">
					<p class="line1">{{ item.post.title }}</p>
					<i class="iconfont iconjiantou1"></i>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
export default {
	data() {
		return {
			comments: [], //用户评论数组
			loading: false, //是否处于正在加载的状态
			finished: false, //数据是否已经全部加载完成
			pageIndex: 1,
		}
	},
	//进入评论页面加载数据
	created() {
		this.reqComments()
	},
	methods: {
		//封装获取评论列表请求
		async reqComments() {
			const res = await this.$axios.get('/user_comments', {
				params: {
					pageIndex: this.pageIndex, // 页码 1
					pageSize: 5, // 每页的条数
				},
			})
			console.log(res)
			const { data, statusCode } = res.data
			if (statusCode === 200) {
				this.comments = [...this.comments, ...data]
				this.loading = false
				if (data.length < 5) {
					this.finished = true
				}
			}
		},
		onLoad() {
			this.pageIndex += 1
			this.reqComments()
		},
	},
}
</script>

<style lang="less" scoped>
.my-comment {
	.comment {
		padding: 10px;
		border-bottom: 2px solid #ccc;

		.parent {
			margin: 5px 0;
			padding: 10px;
			line-height: 30px;
			background-color: #ccc;
			color: #999;
		}
		.content {
			font-size: 16px;
		}
		.post {
			display: flex;
			margin-top: 5px;
			font-size: 12px;
			color: #999;
			justify-content: space-between;
			p {
				flex: 1;
			}
		}
	}
}
</style>
