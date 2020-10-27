<template>
	<div>
		<hm-floor :count="count - 1" v-if="parent.parent" :parent="parent.parent"></hm-floor>
		<div class="hm-floor" :class="{ top: !parent.parent }">
			<div class="header">
				<p>{{ count }}楼</p>
				<p>{{ parent.user.nickname }}</p>
				<p>{{ parent.create_date | date('YYYY-MM-DD HH:mm') }}</p>
				<p @click="reply">回复</p>
			</div>
			<div class="content">{{ parent.content }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'hm-floor',
	props: ['parent', 'count'],
	methods: {
		reply() {
			this.$bus.$emit('reply', this.parent.id, this.parent.user.nickname)
		},
	},
}
</script>

<style lang="less" scoped>
.hm-floor {
	padding: 10px;
	border: 1px solid #000;
	border-top: none;
	background-color: #ddd;
	.header {
		display: flex;
		margin-bottom: 10px;
		align-items: center;
		font-size: 16px;
		p:nth-child(2) {
			margin: 0 20px;
		}
		p:nth-child(3) {
			color: #999;
			text-align: right;
		}
		p:last-child {
			flex: 1;
			text-align: right;
		}
	}
	&.top {
		border-top: 1px solid #000;
	}
}
</style>
