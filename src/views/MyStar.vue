<template>
	<div class="my-star">
		<hm-header>我的收藏</hm-header>
		<hm-post v-for="post in postList" :post="post" :key="post.id"></hm-post>
	</div>
</template>

<script>
export default {
	data() {
		return {
			postList: [], //文章列表
		}
	},
	//进入页面发送ajax请求，获取数据
	created() {
		this.reqPostList()
	},
	methods: {
		async reqPostList() {
			const res = await this.$axios.get('/user_star')
			console.log(res)
			this.postList = res.data.data
		},
	},
}
</script>

<style lang="less" scoped></style>
