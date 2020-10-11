<template>
	<div class="hm-header">
		<div class="left"><i class="iconfont iconjiantou2"></i></div>
		<div class="center"><slot></slot></div>
		<div class="right"></div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-header {
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
</style>
