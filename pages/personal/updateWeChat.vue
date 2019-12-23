<template>
	<view>
		<view class="topNav">
			<view class="topNavSpace"></view>
			<view class="topNavMain">
				<view class="tn-left" @tap="_tools.navBack()">
					<image src="/static/icon/fanhui.png" mode=""></image>
				</view>
				<view class="tn-name">
					修改微信
				</view>
				<view class="tn-right" @tap="sureMake()">
					完成
				</view>
			</view>
		</view>
		<view class="topNavSpace"></view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					微信
				</view>
				<view class="ua-right">
					<input v-model="uWeChatNum" type="text" placeholder="请输入微信">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uPhone : uni.getStorageSync('uPhone'),
				uWeChatNum : ''
			}
		},
		onLoad() {
			
		},
		methods: {
			sureMake(){
				if(!this.uWeChatNum){
					this._tools.myShow("微信不能为空");
					return false;
				}
				this._Api.updateUserInfo({
					phone : this.uPhone,
					wechat : this.uWeChatNum
				},res=>{
					console.log(res);
					if(res.code === 0){
						this._tools.myShow("修改成功",true);
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/personal/personalDate'
							})
						},1500)
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
	@import 'pages/personal/tools/update.scss';
</style>