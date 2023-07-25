<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
import { info } from '@/api/user.js'
export default {
	data() {
		return {
			title: 'Hello uni-app'
		}
	},
	onLoad() {
		this.getUserinfo()
		this.getUserinfo()
		setTimeout(()=>{
			this.getUserinfo()
		},4000)
		console.log(process.env.VUE_APP_MODE, '====VUE_APP_BASE')
		console.log(process.env.VUE_APP_BASE, '====VUE_APP_BASE')
	},

	methods: {

		async getUserinfo() {
			let res = await info()
		}
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
