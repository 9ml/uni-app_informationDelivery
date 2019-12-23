<template>
	<view>
		<view class="ccMain">
			<view class="cm-ewm">
				<image :src="getInfo.qrcodeurl" mode=""></image>
			</view>
			<view class="cm-name">
				微信客服
			</view>
			<view class="cm-phone">
				<view class="cp-icon">
					<image src="/static/icon/tel.png" mode=""></image>
				</view>
				<view class="cp-phone">
					{{getInfo.kfcall}}
				</view>
			</view>
			<view class="cm-name">
				{{getInfo.address}}
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
	.ccMain{
		height: 700rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F6F6F6;
		.cm-ewm{
			width: 260rpx;
			height: 260rpx;
			margin: 0 auto;
			padding-top: 80rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		view{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			text-align: center;
		}
		.cm-phone{
			display: flex;
			align-items: center;
			justify-content: center;
			.cp-icon{
				height: 40rpx;
				margin-right: 16rpx;
				image{
					width: 30rpx;
					height: 36rpx;
				}
			}
		}
	}
</style>
