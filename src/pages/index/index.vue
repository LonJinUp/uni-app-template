<template>
	<view class="content">
		<view class="title">
			{{ title }}
		</view>
	</view>
</template>

<script>
import { info } from '@/api/user.js'
import { testApi } from '@/api/test.js'
export default {
	data() {
		return {
			title: 'hello,uni-app-template'
		}
	},
	async onLoad() {
		this.test()
		this.getUserinfo()

	},

	methods: {
		async getUserinfo() {
			let res = await info()
		},

		async test() {
			let res = await testApi()
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	height: 100%;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	flex-wrap: wrap;

	.title {
		font-size: 30rpx;
		text-align: center;
		color: black;
		letter-spacing: 1px;
	}
}
</style>
