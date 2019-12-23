<template>
	<view>
		<view class="msgItem" v-for="(s,s_idx) in systemInfo" :key="s_idx">
			<view class="msg-item">
				<view class="mi-space_a"></view>
				<view class="mi-top">
					{{s.title}}
				</view>
				<view class="mi-space_b"></view>
				<view class="mi-bom">
					{{s.innser}}
				</view>
			</view>
		</view>
		<!-- <view class="msgItem">
			<view class="msg-item">
				<view class=".mi-space_a"></view>
				<view class="mi-top">
					账号安全提示
				</view>
				<view class=".mi-space_b"></view>
				<view class="mi-bom">
					您的账号在2019年05月08日在南京545212
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户
				uPhone : uni.getStorageSync('uPhone'),
				// 系统消息
				systemInfo : []
			}
		},
		onLoad() {
			this.getMySystemInfo()
		},
		methods: {
			getMySystemInfo(){
				this._Api.getPersonalSystem({},res=>{
					console.log(res);
					if(res.code === 0){
						this.systemInfo = res.data
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
	.msgItem{
		height: 120rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F6F6F6;
		.msg-item{
			width: 90%;
			margin: 0 auto;
			.mi-space_a{
				height: 20rpx;
			}
			.mi-space_b{
				height: 10rpx;
			}
			.mi-top{
				font-size: 26rpx;
			}
			.mi-bom{
				font-size: 24rpx;
				overflow: hidden;
				color: #666666;
			}
		}
	}
</style>
