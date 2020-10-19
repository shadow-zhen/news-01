<template>
	<div class="hm-post">
		<!-- 视频 -->
		<div class="video-post" v-if="post.type === 2">
			<div class="top">
				<p class="title line2">{{ post.title }}</p>
			</div>
			<div class="center">
				<img :src="fixImg(post.cover[0].url)" alt="" />
				<i class="iconfont iconshipin"></i>
			</div>
			<div class="bottom">
				<span>{{ post.user.nickname }}</span>
				<span
					>{{
						post.comments ? post.comments.length : post.comment_length
					}}
					跟帖</span
				>
			</div>
		</div>
		<!-- 单张图片 -->
		<div
			class="single-img-post"
			v-else-if="post.type === 1 && post.cover.length < 3"
		>
			<div class="left">
				<p class="title line2">
					{{ post.title }}
				</p>
				<p class="bottom">
					<span>{{ post.user.nickname }}</span>
					<span
						>{{
							post.comments ? post.comments.length : post.comment_length
						}}
						跟帖</span
					>
				</p>
			</div>
			<div class="right">
				<img :src="fixImg(post.cover[0].url)" alt="" />
			</div>
		</div>
		<!-- 多张图片 -->
		<div class="multi-img-post" v-else>
			<div class="top">
				<p class="titie">{{ post.title }}</p>
			</div>
			<div class="center">
				<img :src="fixImg(post.cover[0].url)" alt="" />
				<img :src="fixImg(post.cover[1].url)" alt="" />
				<img :src="fixImg(post.cover[2].url)" alt="" />
			</div>
			<div class="bottom">
				<span>{{ post.user.nickname }}</span>
				<span
					>{{
						post.comments ? post.comments.length : post.comment_length
					}}
					跟帖</span
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['post'],
	methods: {
		//修复图片路径
		fixImg(url) {
			return url.startsWith('http') ? url : this.$axios.defaults.baseURL + url
		},
	},
}
</script>

<style lang="less" scoped>
.title {
	font-size: 16px;
	line-height: 20px;
}

.bottom {
	span {
		color: #999;
		margin-right: 20px;
	}
}
.hm-post {
	.single-img-post {
		display: flex;
		padding: 10px;
		border-bottom: 2px solid #ccc;

		.left {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
		}
		.right {
			img {
				width: 110px;
				height: 75px;
				object-fit: cover;
			}
		}
	}

	.multi-img-post {
		padding: 10px;
		border-bottom: 2px solid #ccc;
		.center {
			display: flex;
			margin: 10px 0;

			img {
				width: 110px;
				height: 75px;
				object-fit: cover;
				flex: 1;
			}
		}
	}

	.video-post {
		padding: 10px;

		.center {
			position: relative;

			img {
				width: 100%;
				height: 170px;
				padding: 10px;
				object-fit: cover;
			}

			i {
				position: absolute;
				width: 60px;
				height: 60px;
				line-height: 60px;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.5);
				text-align: center;
				font-size: 34px;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
			}
		}
	}
}
</style>
