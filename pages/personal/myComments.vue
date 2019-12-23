<template>
	<view>
		<view class="topNav">
			<view class="topNavSpace"></view>
			<view class="topNavMain">
				<view class="tn-left" @tap="_tools.navBack">
					<image src="/static/icon/fanhui.png" mode=""></image>
				</view>
				<view class="tn-name">
					我的评论
				</view>
				<view class="tn-right" @tap="handle(userHandles)">
					{{userHandles}}
				</view>
			</view>
		</view>
		<view class="topNavSpace"></view>
		<!-- 评论 -->
		<view class="commentTiNus">
			<view class="ctn">
				评论<text>({{commentsInfo.length}})</text>
			</view>
		</view>
		<!-- 评论信息 -->
		<view class="comments" v-for="(c,c_idx) in commentsInfo" :key="c_idx">
			<view class="c-main">
				<view class="cm-user">
					<view class="cu-header">
						<image :src="c.avatar" mode=""></image>
					</view>
					<view class="cu-info">
						<view class="ci-name">
							{{c.username}}
						</view>
						<view class="ci-time">
							{{c.createTime}}
						</view>
					</view>
				</view>
				<view class="cm-desc">
					{{c.cDetails}}
				</view>
			</view>
			<view class="c-title" @tap="goDetails(c.id)">
				<view class="ct-ms">
					{{c.title}}
				</view>
			</view>
			<view class="c-handle" v-if="isHandles" @tap="delThisComment(c.cid)">
				删除
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
				// 评论信息
				commentsInfo : [],
				// 管理
				userHandles : "管理",
				//
				isHandles : false
			}
		},
		onLoad() {
			this.getMyAllComments();
		},
		methods: {
			getMyAllComments(){
				this._Api.getPersonalComments({
					phone : this.uPhone
				},res=>{
					console.log(res);
					if(res.code === 0){
						// res.data.forEach((i)=>{
						// 	i.forEach((j)=>{
								
						// 	})
						// })
						this.commentsInfo = res.data
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			// 管理
			handle(type){
				type === "管理" ? (this.userHandles = "完成",this.isHandles = true) : (this.userHandles = "管理",this.isHandles = false)
			},
			// 删除
			delThisComment(idx){
				uni.showModal({
				    title: '提示',
				    content: '确定删除此条评论吗？',
				    success: (res)=> {
				        if (res.confirm) {
							this._Api.delEachComment({
								cid : idx
							},res=>{
								if(res.code === 0){
									this._tools.myShow("删除成功",true);
									this.getMyAllComments();
								}else{
									this._tools.myShow(res.msg,true);
								}
							})
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
			},
			goDetails(idx){
				uni.navigateTo({
					url:'/pages/index/postDetails?eid='+idx
				})
			}
		},
	}
</script>

<style lang="scss">
	@import 'pages/personal/tools/update.scss';
	@import 'static/tools/comments.scss';
	page{
		background-color: #FFFFFF;
	}
	.comments{
		position: relative;
		.c-title{
			width: 72%;
			margin: 0 auto;
			display: flex;
			overflow: hidden;
			.ct-ms{
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				padding: 0 20rpx 0 20rpx;
				border-radius: 6rpx;
				color: #387BDC;
				background-color: #EFEFEF;
			}
		}
		.c-handle{
			width: 100rpx;
			height: 60rpx;
			border: 1rpx solid #FF584C;
			font-size: 28rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			text-align: center;
			position: absolute;
			top: 50%;
			right: 20rpx;
			margin-top: -30rpx;
			color: #FF584C;
			z-index: 9;
		}
	}
</style>
