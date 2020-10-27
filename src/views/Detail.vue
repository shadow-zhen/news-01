<template>
	<div class="detail">
		<!-- 头部 -->
		<div class="header">
			<div class="left" @click="$router.back()">
				<i class="iconfont iconjiantou2"></i>
			</div>
			<div class="center">
				<i class="iconfont iconnew"></i>
			</div>
			<div class="right">
				<p v-if="!detail.has_follow" @click="follow(detail.user.id)">关注</p>
				<p v-else @click="unFollow(detail.user.id)" class="follow">已关注</p>
			</div>
		</div>
		<!-- 内容 -->
		<div class="container">
			<h2 class="title line2">{{ detail.title }}</h2>
			<div class="name">
				<span>{{ detail.user.nickname }}</span>
				<span>{{ detail.create_date }}</span>
			</div>
			<div class="content">
				<video :src="detail.content" controls></video>
			</div>
			<div class="bottom">
				<p @click="like(detail.id)" :class="{ like: detail.has_like }">
					<i class="iconfont icondianzan"></i>
					<span>{{ detail.like_length }}</span>
				</p>
			</div>
		</div>
		<!-- 评论列表 -->
		<div class="comments">
			<hm-comment
				:postComment="postComment"
				v-for="postComment in postComments"
				:key="postComment.id"
			></hm-comment>
		</div>
		<!-- 发布评论 -->
		<div class="footer">
			<!-- input -->
			<div class="inp" v-if="isShowInp">
				<input type="text" @focus="showTextarea" placeholder="写跟帖" />
				<van-icon name="chat-o" :badge="detail.comment_length" />
				<van-icon name="star-o" :class="{ isStar: detail.has_star }" @click="star(detail.id)" />
			</div>
			<!-- textarea -->
			<div class="textarea" v-else>
				<textarea
					ref="textarea"
					@blur="isShowInp = !isShowInp"
					:placeholder="replyName ? '回复：' + replyName : '请输入内容'"
				></textarea>
				<button @click="submitComment(detail.id)">发送</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			detail: {
				user: {}, //文章详情中的用户，添加，未来防止初始化渲染时报错
			}, //文章详情
			postComments: [], //文章评论列表
			isShowInp: true, //input框和textarea的显示与隐藏
			replyId: '', //回复的id
			replyName: '', //回复人的昵称
		}
	},
	created() {
		this.reqDetail()

		// 注册事件
		this.$bus.$on('reply', async (replyId, replyName) => {
			// 保存
			this.replyId = replyId //  用来发送
			this.replyName = replyName // 它的作用仅仅就是为了显示在 textarea 里面

			this.isShowInp = false
			await this.$nextTick()
			this.$refs.textarea && this.$refs.textarea.focus()
		})
	},
	methods: {
		//封装获取文章详情的请求
		async reqDetail() {
			const { post_id } = this.$route.params
			const res = await this.$axios.get(`/post/${post_id}`)
			// console.log(res)
			const { statusCode, data } = res.data
			if (statusCode === 200) {
				this.detail = data

				// 得到文章详情后，获取评论列表
				this.reqPostComments(post_id)
			}
		},
		//关注用户
		async follow(user_id) {
			const res = await this.$axios.get(`/user_follows/${user_id}`)
			// console.log(res)
			this.reqDetail()
		},
		//取消关注用户
		async unFollow(user_id) {
			const res = await this.$axios.get(`/user_unfollow/${user_id}`)
			// console.log(res)
			this.reqDetail()
		},
		//点赞
		async like(post_id) {
			const res = await this.$axios.get(`/post_like/${post_id}`)
			// console.log(res)
			this.reqDetail()
		},
		//关注
		async star(post_id) {
			const res = await this.$axios.get(`/post_star/${post_id}`)
			// console.log(res)
			this.reqDetail()
		},
		//显示textarea
		showTextarea() {
			this.isShowInp = false
			this.$nextTick(() => {
				this.$refs.textarea.focus()
			})
		},
		//发布评论
		async submitComment(post_id) {
			const content = this.$refs.textarea.value.trim()
			if (!content) {
				return this.$toast.fail('输入内容不能为空！')
			}
			const res = await this.$axios.post(`/post_comment/${post_id}`, {
				content,
				parent_id: this.replyId,
			})
			console.log(res)
			this.isShowInp = true
			this.reqPostComments()
		},
		// 获取用户评论列表
		async reqPostComments(id) {
			const res = await this.$axios.get(`/post_comment/${id}`)
			// console.log(res)
			const { statusCode, data } = res.data
			if (statusCode === 200) {
				this.postComments = data
			}
		},
	},
}
</script>

<style lang="less" scoped>
.detail {
	padding-bottom: 50px;
	.header {
		display: flex;
		height: 40px;
		align-items: center;
		border-bottom: 2px solid #ccc;

		.left {
			width: 40px;
			text-align: center;
			.iconjiantou2 {
				font-size: 24px;
			}
		}
		.center {
			flex: 1;

			.iconnew {
				font-size: 58px;
			}
		}
		.right {
			display: flex;
			justify-content: center;
			width: 100px;

			p {
				box-sizing: border-box;
				width: 80%;
				height: 26px;
				line-height: 26px;
				border-radius: 13px;
				text-align: center;
				font-size: 14px;
				border: 1px solid #ccc;

				&.follow {
					border: 1px solid red;
					color: red;
				}
			}
		}
	}

	.container {
		padding: 0 10px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.name {
			span {
				margin-right: 8px;
				font-size: 14px;
				color: #ccc;
			}
		}
		.content {
			video {
				width: 100%;
			}
		}
		.bottom {
			display: flex;
			justify-content: flex-end;

			p {
				width: 100px;
				height: 30px;
				line-height: 30px;
				border-radius: 15px;
				// background-color: skyblue;
				border: 1px solid #999;
				text-align: center;

				.icondianzan,
				span {
					font-size: 18px;
					margin: 0 6px;
				}

				&.like {
					border: 1px solid red;
					.icondianzan,
					span {
						color: red;
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		width: 100%;
		bottom: 0;
		border-top: 2px solid #000;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #fff;
		.inp {
			display: flex;
			height: 40px;
			justify-content: space-around;
			align-items: center;

			input {
				width: 180px;
				height: 30px;
				border-radius: 15px;
				border: none;
				background-color: #ccc;
				text-indent: 2em;
			}
			/deep/ .van-icon {
				font-size: 28px;
			}

			.isStar {
				color: red;
			}
		}

		.textarea {
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
			textarea {
				width: 200px;
				height: 80px;
				padding-top: 5px;
				background-color: #ccc;
				border: none;
				border-radius: 10px;
				text-indent: 2em;
			}
			button {
				height: 30px;
				width: 50px;
				border: none;
				background-color: red;
				color: #fff;
				border-radius: 5px;
				transform: translateX(-30px);
			}
		}
	}
}
</style>
