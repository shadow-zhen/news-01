<template>
	<div class="hm-header">
		<div class="m">
			<div class="left" @click="$router.back()">
				<i class="iconfont iconjiantou2"></i>
			</div>
			<div class="center"><slot></slot></div>
			<div class="right"></div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-header {
	height: 40px;

	.m {
		position: fixed;
		width: 100%;
		z-index: 9999;

		display: flex;
		height: 40px;
		background-color: #ddd;
		border-bottom: 2px solid #ccc;
		align-items: center;

		.left,
		.right {
			width: 30px;
		}

		.center {
			flex: 1;
			text-align: center;
			font-size: 20px;
			font-weight: 700;
		}
	}
}
</style>
