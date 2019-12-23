<template>
	<view>
		<!-- 导航头 - 搜索框 -->
		<view class="navSearch">
			<view class="ns-space"></view>
			<view class="ns-main" @tap="navTo('index/search')">
				<view class="nm-icon">
					<image src="/static/icon/icon_ss_sy.png" mode=""></image>
				</view>
				<view class="nm-inp">
					<input type="text" placeholder="请输入想要搜索的商品" />
				</view>
			</view>
		</view>
		<view class="navSearchSpace"></view>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper class="swiper" autoplay="true" interval="3000" indicator-dots="true" indicator-color="#6A6F70" indicator-active-color="#3B79DF" duration="500">
			    <swiper-item v-for="(b,b_idx) in bannerList" :key="b_idx" @tap="navTo('index/postDetails',b.eid)">
			        <image :src="b.url" mode=""></image>
			    </swiper-item>
			</swiper>
		</view>
		<view class="goodsAndComments">
			<!-- 商品 -->
			<view class="goodsShow" @tap="navTo('index/postDetails',indexShowInfo.id)">
				<view class="gs-main">
					<view class="gm-img">
						<image :src="indexImages" mode=""></image>
					</view>
					<view class="gm-fonts">
						<view class="gf-title">
							{{indexShowInfo.title}}
						</view>
						<view class="gf-desc">
							{{indexShowInfo.details}}
						</view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="commentTiNus">
				<view class="ctn">
					评论<text>({{indexShowInfo.commentcount}})</text>
				</view>
			</view>
			<!-- 评论信息 -->
			<view class="comments" v-for="(c,c_idx) in indexShowInfo.commentList" :key="c_idx">
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
								{{c.ctime}}
							</view>
						</view>
					</view>
					<view class="cm-desc">
						{{c.details}}
					</view>
				</view>
			</view>
			<!-- 显示所有评论 -->
			<view class="lookAllComments" v-if="isLookAll" @tap="lookAllComments()">
				<view class="lac-fonts">
					显示所有评论
				</view>
				<view class="lac-icon">
					<image src="/static/icon/icon_xl_sy.png" mode=""></image>
				</view>
			</view>
			<!-- 发表评论 -->
			<view class="bomSendComment">
				<view class="bsc-main">
					<view class="bm-inpt">
						<input type="text" v-model="comments" placeholder="写个评论吧" />
					</view>
					<view class="bm-btn" @tap="addComments()">
						发送
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				bannerList : [
					{
						id : 1,
						img_ur : '/static/imgs/banner.png'
					},
					{
						id : 2,
						img_ur : '/static/imgs/banner.png'
					},
					{
						id : 3,
						img_ur : '/static/imgs/banner.png'
					},
					{
						id : 4,
						img_ur : '/static/imgs/banner.png'
					}
				],
				// 主页信息
				indexShowInfo : "",
				// 是否查看全部
				isLookAll : true,
				// 评论内容
				comments : '',
				// 用户
				uPhone : uni.getStorageSync("uPhone"),
				indexImages : ""
			}
		},
		// 页面加载
		onLoad() {
			this.getBanner();
			this.getIndexShowInfo();
		},
		// 下拉刷新
		onPullDownRefresh(){
			try{
				this.getBanner();
				this.getIndexShowInfo();
				this.isLookAll = true;
			}catch(e){
				console.log(e)
			}
			setTimeout(()=>{
				this._tools.myShow("刷新成功",true);
				uni.stopPullDownRefresh();
			},2000);
		},
		methods: {
			// 轮播图
			getBanner(){
				this._Api.banner({},res=>{
					console.log(res);
					if(res.code === 0){
						this.bannerList = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 展示信息
			getIndexShowInfo(){
				this._Api.indexInfo({},res=>{
					console.log(res);
					if(res.code === 0){
						if(res.data.commentList.length > 2){
							res.data.commentList.length = 2
							this.isLookAll = true
						}else{
							this.isLookAll = false
						}
						this.indexShowInfo = res.data
						this.indexImages = res.data.imgs[0].imgurl
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 查看所有评论
			lookAllComments(){
				this._Api.indexInfo({},res=>{
					// console.log(res);
					if(res.code === 0){
						this.isLookAll = false
						this.indexShowInfo = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 添加新评论
			addComments(){
				if(!this.uPhone){
					this._tools.whetherLogin();
				}else{
					if(!this.comments){
						this._tools.myShow("评论内容不能为空哦",true);
						return false;
					}
					this._Api.addComment({
						phone : this.uPhone,
						cDetails : this.comments,
						exhibitionId : this.indexShowInfo.id
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.lookAllComments();
							this.comments = "";
							this._tools.myShow("评论成功",true);
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none',
								duration:1500
							})
						}
					})
				}
			},
			// 跳转
			navTo(url,idx){
				uni.navigateTo({
					url:'/pages/'+url+"?eid="+idx
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'static/tools/nav_search.scss';
	@import 'static/tools/goods_show.scss';
	@import 'static/tools/comments.scss';
	.banner{
		height: 340rpx;
		background-color: #F6F6F6;
		.swiper{
			width: 96%;
			height: 320rpx;
			border-radius: 10rpx;
			overflow: hidden;
			padding-top: 10rpx;
			margin: 0 auto;
			swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
