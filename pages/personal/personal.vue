<template>
	<view>
		<!-- 顶部 -->
		<view class="userTop">
			<!-- 背景图 -->
			<view class="ut-bg">
				<image :src="userInfo.avatar" mode=""></image>
			</view>
			<!-- 遮罩层 -->
			<view class="ut-cover"></view>
			<!-- 用户信息 -->
			<view class="ut-user ut-unLogin" v-if="unLogin" @tap="goLogin()">
				<view class="un-ts">
					请先登录
				</view>
			</view>
			<view class="ut-user" v-if="isLogin" @tap="navTo('personal/personalDate')">
				<view class="uu-header">
					<image :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="uu-desc">
					<view class="ud-name">
						{{userInfo.username}}
					</view>
					<view class="ud-other" v-if="sex === '男'">
						<view class="uo-sex">
							<view class="us-icon">
								<image src="/static/icon/img_nan_xb_pre.png" mode=""></image>
							</view>
							<view class="us-fonts">
								{{sex}}
							</view>
						</view>
						<view class="uo-adress">
							<view class="ua-icon">
								<image src="/static/icon/icon_dz_wd.png" mode=""></image>
							</view>
							<view class="ua-fonts">
								{{userInfo.district}}
							</view>
						</view>
					</view>
					<view class="ud-other" v-if="sex === '女'">
						<view class="girl">
							<view class="us-icon">
								<image src="/static/icon/img_nv_xz_pre.png" mode=""></image>
							</view>
							<view class="us-fonts">
								{{sex}}
							</view>
						</view>
						<view class="uo-adress">
							<view class="ua-icon">
								<image src="/static/icon/icon_dz_wd.png" mode=""></image>
							</view>
							<view class="ua-fonts">
								{{userInfo.district}}
							</view>
						</view>
					</view>
				</view>
				<view class="uu-icon">
					<image src="/static/icon/icon_jr_wd.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- handles -->
		<view class="userHandlesMain" v-for="(h,h_idx) in uChoseList" :key="h_idx" @tap="navTo(h.ucl_url)">
			<view class="uhm-main">
				<view class="um-left">
					<view class="ul-icon">
						<image :src="h.ucl_img" mode=""></image>
					</view>
					<view class="ul-fonts">
						{{h.ucl_fns}}
					</view>
				</view>
				<view class="um-right">
					<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户
				uPhone : uni.getStorageSync('uPhone'),
				// 获取用户
				userInfo : "",
				// 未登录
				unLogin : true,
				// 已登录
				isLogin : false,
				// 性别
				sex : '',
				// 操作
				uChoseList : [
					{
						ucl_idx : 1,
						ucl_img : '/static/icon/icon_wdfb_wd.png',
						ucl_fns : '我的发布',
						ucl_url : 'personal/myRelease'
					},
					{
						ucl_idx : 2,
						ucl_img : '/static/icon/icon_wdpl_wd.png',
						ucl_fns : '我的评论',
						ucl_url : 'personal/myComments'
					},
					{
						ucl_idx : 3,
						ucl_img : '/static/icon/icon_xtxx_wd.png',
						ucl_fns : '系统消息',
						ucl_url : 'personal/systemMsg'
					},
					{
						ucl_idx : 4,
						ucl_img : '/static/icon/icon_gy_wd.png',
						ucl_fns : '关于',
						ucl_url : 'personal/aboutUs'
					},
					{
						ucl_idx : 5,
						ucl_img : '/static/icon/icon_lxwm_wd.png',
						ucl_fns : '联系客服',
						ucl_url : 'personal/contactCustomer'
					},
					{
						ucl_idx : 6,
						ucl_img : '/static/icon/icon_tcdl_wd.png',
						ucl_fns : '退出登录',
						ucl_url : 'logout'
					}
				]
			}
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			//  获取用户信息
			getUserInfo(){
				if(!this.uPhone){}else{
					this._Api.getUserInfo({
						phone : this.uPhone
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.unLogin = false;
							this.isLogin = true;
							this.userInfo = res.data
							if(!res.data.gender || res.data.gender == "1"){
								this.sex = "男"
							}else{
								this.sex = "女"
							}
						}else{
							this._tools.myShow(res.msg,true);
						}
					})
				}
			},
			// 跳转
			navTo(url){
				if(!this.uPhone){
					this._tools.whetherLogin();
				}else if(url == "logout"){
					uni.showModal({
					    title: '提示',
					    content: '确定退出登录吗？',
					    success: (res)=>{
					        if(res.confirm){
								uni.clearStorageSync("uPhone");
								this._tools.myShow("退出成功",true);
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/user/login'
									})
								},1500)
					        }else if(res.cancel){
								// console.log("取消");
					        }
					    }
					});
				}else{
					uni.navigateTo({
						url:'/pages/'+url
					})
				}
			},
			goLogin(){
				uni.reLaunch({
					url:'/pages/user/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.userTop{
		width: 100%;
		height: 360rpx;
		position: relative;
		.ut-bg{
			width: 100%;
			height: 360rpx;
			position: absolute;
			top: 0;
			left: 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ut-cover{
			width: 100%;
			height: 360rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
			background-color: rgba($color: #000000, $alpha: 0.8);
		}
		.ut-user{
			width: 80%;
			height: 130rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -40%;
			margin-top: -65rpx;
			z-index: 99;
			display: flex;
			align-items: center;
			.uu-header{
				width: 126rpx;
				height: 126rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.ut-unLogin{
			.un-ts{
				width: 100%;
				text-align: center;
				font-size: 30rpx;
				color: #FFFFFF;
				line-height: 130rpx;
			}
		}
		.uu-desc{
			width: 60%;
			height: 100rpx;
			.ud-name{
				height: 60rpx;
				line-height: 60rpx;
				margin-left: 20rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				font-weight: bold;
			}
			.ud-other{
				height: 40rpx;
				display: flex;
				align-items: center;
				.uo-sex{
					width: 70rpx;
					height: 30rpx;
					line-height: 30rpx;
					background-color: #5384F6;
					border-radius: 6rpx;
					display: flex;
					margin-left: 30rpx;
					justify-content: center;
					align-items: center;
					.us-icon{
						width: 30rpx;
						height: 30rpx;
						image{
							width: 30rpx;
							height: 30rpx;
						}
					}
					.us-fonts{
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}
				.girl{
					width: 70rpx;
					height: 30rpx;
					line-height: 30rpx;
					background-color: #FF7CBD;
					border-radius: 6rpx;
					display: flex;
					margin-left: 30rpx;
					justify-content: center;
					align-items: center;
					.us-icon{
						width: 30rpx;
						height: 30rpx;
						image{
							width: 30rpx;
							height: 30rpx;
						}
					}
					.us-fonts{
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}
				.uo-adress{
					width: 70rpx;
					height: 30rpx;
					line-height: 30rpx;
					margin-left: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.ua-icon{
						width: 30rpx;
						height: 30rpx;
						image{
							width: 24rpx;
							height: 30rpx;
						}
					}
					.ua-fonts{
						width: 40rpx;
						height: 30rpx;
						font-size: 20rpx;
						color: #FFFFFF;
						overflow: hidden;
					}
				}
			}
		}
		.uu-icon{
			width: 20%;
			height: 100rpx;
			text-align: right;
			image{
				width: 18rpx;
				height: 32rpx;
				margin-top: 31rpx;
			}
		}
	}
	.userHandlesMain{
		height: 90rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #F4F4F4;
		&:nth-child(5){
			margin-top: 10rpx;
		}
		&:nth-child(7){
			margin-top: 10rpx;
		}
		.uhm-main{
			width: 92%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.um-left{
				display: flex;
				align-items: center;
				.ul-icon{
					width: 40rpx;
					height: 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.ul-fonts{
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}
			.um-right{
				width: 14rpx;
				height: 40rpx;
				image{
					width: 18rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
