<template>
	<view>
		<view class="siMain">
			<view class="logo">
				<image :src="getInfo.logo" mode=""></image>
			</view>
			<view class="name">
				{{getInfo.name}}
			</view>
			<view class="name">
				系统版本: {{getInfo.version}}
			</view>
			<view class="name link">
				官方链接: {{getInfo.link}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getInfo : ""
			}
		},
		onLoad() {
			this.getSoftInfo();
		},
		methods: {
			getSoftInfo(){
				this._Api.getSoftInfo({},res=>{
					console.log(res);
					if(res.code === 0){
						this.getInfo = res.data
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.siMain{
		height: 600rpx;
		border-top: 1rpx solid #F6F6F6;
		background-color: #FFFFFF;
		.logo{
			width: 144rpx;
			height: 144rpx;
			margin: 0 auto;
			padding-top: 50rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.name{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 32rpx;
			text-align: center;
		}
		.link{
			margin-top: 20rpx;
			color: #4B74CB;
		}
	}
</style>
