<template>
	<div>
		<div class="header">
			<div class="left" @click="$router.back()">
				<i class="iconfont iconjiantou2"></i>
			</div>
			<div class="center">
				<input
					type="text"
					v-model="keyword"
					@input="search_recommend"
					@keyup.enter="search"
					placeholder="请输入搜索的内容"
				/>
				<i class="iconfont iconsearch"></i>
			</div>
			<div class="right" @click="search">搜索</div>
		</div>
		<!-- 搜索推荐 -->
		<div class="search_recommend" v-if="recommendList.length">
			<div v-for="item in recommendList" :key="item.id">{{ item.title }}</div>
		</div>
		<!-- 列表 -->
		<div class="content" v-else-if="postList.length">
			<hm-post
				@click.native="$router.push(`/detail/${post.id}`)"
				v-for="post in postList"
				:key="post.id"
				:post="post"
			></hm-post>
		</div>
		<!-- 历史 -->
		<div class="history" v-else>
			<!-- 历史记录 -->
			<div class="title">历史记录</div>
			<div class="list">
				<div class="item" @click="clickHistoryTag(history)" v-for="(history, index) in historyList" :key="index">
					{{ history }}
				</div>
			</div>
			<!-- 热门搜索 -->
			<div class="title">热门搜索</div>
			<div class="list">
				<div class="item" v-for="(hot, index) in hotList" :key="index">{{ hot }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'
export default {
	data() {
		return {
			keyword: '', //搜索关键字
			recommendList: [], //推荐列表
			postList: [], //文章列表
			historyList: [], //历史记录
			hotList: ['迪丽热巴', '古力娜扎', '马尔扎哈'], //热门推荐
		}
	},
	created() {
		// 提前把防抖和节流的函数都处理好
		this.search_recommend = _.debounce(this.search_recommend, 500)

		const historyList = JSON.parse(localStorage.getItem('history_list'))

		if (historyList) {
			this.historyList = historyList
		}
	},
	methods: {
		//搜索推荐
		async search_recommend() {
			const { keyword } = this
			// console.log(this.keyword)
			if (!keyword.trim()) return
			const res = await this.$axios.get(`/post_search_recommend?keyword=${keyword}`)
			console.log(res)
			const { statusCode, data } = res.data
			if (statusCode === 200) {
				this.recommendList = data
			}
		},
		//搜索
		async search() {
			const { keyword, historyList } = this
			//去除两端空格，判断是否为空
			if (!keyword.trim()) return
			//把输入关键字添加到历史记录，并保存到本地
			if (!historyList.includes(keyword)) {
				historyList.unshift(keyword)
				localStorage.setItem('history_list', JSON.stringify(historyList))
			}
			//发送ajax请求
			const res = await this.$axios.get(`/post_search?keyword=${keyword}`)
			// console.log(res)

			const { statusCode, data } = res.data
			if (statusCode === 200) {
				//保存文章列表
				this.postList = data
				// 清空推荐，为了使文章列表显示
				this.recommendList = []
				//清空输入
				this.keyword = ''
			}
		},
		// 点击历史记录标签
		clickHistoryTag(h) {
			this.keyword = h
			this.search()
		},
	},
}
</script>

<style scoped lang="less">
.header {
	height: 40px;
	background: #ddd;
	border-bottom: 1px solid #ccc;
	display: flex;
	.left {
		width: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right {
		width: 50px;
		display: flex;
		align-items: center;
	}
	.center {
		flex: 1;
		// background: pink;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		input {
			height: 30px;
			width: 90%;
			border: none;
			border: 1px solid #ccc;
			border-radius: 15px;
			text-indent: 2em;
		}
		i {
			position: absolute;
			left: 20px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}

.history {
	padding: 10px;
	.title {
		height: 30px;
		line-height: 30px;
		font-size: 20px;
		color: #000;
		font-weight: 700;
		margin-top: 20px;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		.item {
			background: #ddd;
			padding: 10px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
}

.search_recommend {
	padding: 10px;
	div {
		border-bottom: 1px solid #ccc;
		line-height: 50px;
		height: 50px;
		font-size: 16px;
	}
}
</style>
