<template>
	<view>
		<view class="topSpace"></view>
		<view class="topName">
			登录
		</view>
		<view class="inpSpace"></view>
		<view class="inpItem">
			<input type="text" v-model="uPhone" placeholder="请输入手机号" />
		</view>
		<view class="inpItem">
			<input type="password" v-model="uPwd" placeholder="请输入密码" />
		</view>
		<view class="inpBtn" @tap="login()">
			<button type="primary">登录</button>
		</view>
		<view class="otherChose">
			<view class="oc-item" @tap="navTo('user/registe')">
				注册
			</view>
			<view class="oc-item" @tap="navTo('user/forgot')">
				忘记密码
			</view>
		</view>
		<!-- <view class="otherLogin">
			<view class="ol-lines"></view>
			<view class="ol-fonts">其他登录方式</view>
			<view class="ol-lines"></view>
		</view>
		<view class="wxIcon">
			<view class="icon">
				<image src="/static/icon/wecha.png" mode=""></image>
			</view>
			<view class="fonts">
				微信登录
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uPhone : '',
				uPwd : ''
			}
		},
		onLoad(options) {
			this.uPhone = options.phone
			this.uPwd = options.pwd
		},
		methods: {
			// 登录
			login(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:'none',
						duration:1500
					});
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"您输入的手机号格式不正确",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!this.uPwd){
					uni.showToast({
						title:"密码不能为空",
						icon:'none',
						duration:1500
					});
					return false;
				}
				this._Api.login({
					phone : this.uPhone,
					password : this.uPwd
				},res=>{
					console.log(res.data);
					if(res.code === 0){
						uni.setStorageSync("uPhone",res.data.phone)
						uni.setStorageSync("userId",res.data.uid)
						uni.showToast({
							title:"登录成功",
							icon:"none",
							duration:1500
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1500);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 跳转
			navTo(url){
				uni.navigateTo({
					url:'/pages/'+url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "pages/user/tools/user.scss";
	// .otherLogin{
	// 	width: 520rpx;
	// 	height: 60rpx;
	// 	margin: 80rpx auto 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: space-between;
	// 	.ol-lines{
	// 		width: 150rpx;
	// 		height: 2rpx;
	// 		background-color: #AEAEAE;
	// 	}
	// 	.ol-fonts{
	// 		font-size: 24rpx;
	// 		color: #ABABAB;
	// 	}
	// }
	// .wxIcon{
	// 	height: 150rpx;
	// 	margin-top: 10rpx;
	// 	.icon{
	// 		width: 90rpx;
	// 		height: 90rpx;
	// 		margin: 0 auto;
	// 		image{
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}
	// 	.fonts{
	// 		margin-top: 20rpx;
	// 		font-size: 24rpx;
	// 		color: #ABABAB;
	// 		text-align: center;
	// 	}
	// }
</style>
