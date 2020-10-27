<template>
	<div class="hm-comment">
		<!-- 评论头部 -->
		<div class="header">
			<div class="left">
				<img :src="$axios.defaults.baseURL + postComment.user.head_img" alt="" />
			</div>
			<div class="center">
				<p>{{ postComment.user.nickname }}</p>
				<p>{{ postComment.create_date | date('YYYY-MM-DD HH:mm') }}</p>
			</div>
			<p class="right">回复</p>
		</div>
		<!-- 评论回复 -->
		<hm-floor v-if="postComment.parent" :count="getCount(0, postComment)" :parent="postComment.parent"></hm-floor>
		<!-- 评论底部 -->
		<div class="content">{{ postComment.content }}</div>
	</div>
</template>

<script>
export default {
	props: ['postComment'],
	methods: {
		getCount(num, parent) {
			if (parent.parent) {
				return this.getCount(num + 1, parent.parent)
			} else {
				return num
			}
		},
	},
}
</script>

<style lang="less" scoped>
.hm-comment {
	padding: 10px;
	border-top: 2px solid #999;
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		.left {
			width: 70px;
			height: 70px;
			margin: 0 10px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 50%;
			}
		}
		.center {
			flex: 1;
			height: 50px;
			line-height: 25px;

			p:first-child {
				font-size: 16px;
			}
			p:last-child {
				font-size: 14px;
				color: #ccc;
			}
		}
		.right {
			width: 50px;
			text-align: right;
			color: #999;
		}
	}
	.content {
		margin-top: 10px;
	}
}
</style>
