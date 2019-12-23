<template>
	<view>
		<view class="auMain" @tap="navTo('personal/softwareInformation')">
			<view class="am-main">
				<view class="am-left">
					软件信息
				</view>
				<view class="am-right">
					<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="auMain">
			<view class="am-main">
				<view class="am-left">
					检查更新
				</view>
				<view class="am-right">
					已是最新版本
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url:'/pages/'+url,
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.auMain{
		height: 90rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F6F6F6;
		.am-main{
			width: 90%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.am-left{
				font-size: 28rpx;
			}
			.am-right{
				height: 40rpx;
				font-size: 26rpx;
				color: #999999;
				image{
					width: 18rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
