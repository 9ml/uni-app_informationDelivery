<template>
	<view>
		<!-- 导航头 - 搜索框 -->
		<view class="navSearch">
			<view class="ns-space"></view>
			<view class="ns-main">
				<view class="nm-icon" @tap="navTo('index/search',0)">
					<image src="/static/icon/icon_ss_sy.png" mode=""></image>
				</view>
				<view class="nm-inp" @tap="navTo('index/search',0)">
					<input type="text" placeholder="请输入想要搜索的商品" />
				</view>
				<view class="addIcon" @tap="navTo('release/releaseInfo')">
					<image src="/static/icon/jiahao.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="navSearchSpace"></view>
		<!-- tab 切换 -->
		<view class="topTabSpace"></view>
		<view class="topTab">
			<view class="tt-item" v-for="(t,t_idx) in tabList" :key="t_idx" :class="[current === t_idx ? 'active' : '']" @tap="tabChange(t_idx)">
				{{t.name}}
			</view>
		</view>
		<!-- 主体 -->
		<view class="slideMain">
			<view class="goodsAndComments" v-for="(r,r_idx) in releaseEachKindInfo" :key="r_idx">
				<!-- 商品 -->
				<view class="goodsShow" @tap="navTo('index/postDetails',r.id)">
					<view class="gs-main">
						<view class="gm-img">
							<image :src="r.getEachImg" mode=""></image>
						</view>
						<view class="gm-fonts">
							<view class="gf-title">
								{{r.title}}
							</view>
							<view class="gf-desc">
								{{r.details}}
								<!-- 帽子能轻松搭配连衣裙，森林系等衣服时尚、休闲、甜美、可爱、无论哪种风格都能驾驭帽子能轻松搭配连衣裙，森林系等衣服时尚、休闲、甜美、可爱、无论哪种风格都能驾驭帽子能轻松搭配连衣裙，森林系等衣服时尚、休闲、甜美、可爱、无论哪种风格都能驾驭 -->
							</view>
						</view>
					</view>
				</view>
				<!-- 评论 -->
				<view class="commentTiNus">
					<view class="ctn">
						评论<text>({{r.commentcount}})</text>
					</view>
				</view>
				<!-- 评论信息 -->
				<view class="comments" v-for="(c,c_idx) in r.commentList" :key="c_idx">
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
				<view class="lookAllComments" v-if="r.isLookAll" @tap="lookAllComments(r_idx)">
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
							<input type="text" v-model="r.comments" placeholder="写个评论吧" />
						</view>
						<view class="bm-btn" @tap="addComments(r_idx)">
							发送
						</view>
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
				// 分类列表
				tabList : [],
				// 分类详情
				releaseEachKindInfo : [],
				// 
				current : 0,
				// 用户
				uPhone : uni.getStorageSync("uPhone")
			}
		},
		// 页面加载
		onLoad() {
			this.getReleaseAllKinds();
			this.getReleaseEachInfo("");
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.getReleaseAllKinds();
			if(this.current === 0){
				this.getReleaseEachInfo("");
			}else{
				this.getReleaseEachInfo(this.tabList[this.current].code);
			}
			setTimeout(()=>{
				this._tools.myShow("刷新成功",true);
				uni.stopPullDownRefresh();
			},2000);
		},
		methods: {
			// 全部分类
			getReleaseAllKinds(){
				this._Api.releaseAllKinds({
					type : 2
				},res=>{
					console.log(res);
					if(res.code === 0){
						this.tabList = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 点击切换
			tabChange(idx){
				this.current = idx
				if(idx === 0){
					this.getReleaseEachInfo("")
				}else{
					this.getReleaseEachInfo(this.tabList[idx].code)
				}
			},
			getReleaseEachInfo(types,idx){
				this._Api.releaseEachKindsInfo({
					type : types
				},res=>{
					console.log(res);
					if(res.code === 0){
						let getInfo = res.data
						if(getInfo !== null){
							getInfo.forEach((item,index)=>{
								item.comments = ""
								if(!item.imged){
									
								}else{
									item.getEachImg = item.imged.split(",")[0];
								}
								// item.commentList.forEach((i)=>{
								// 	i.ctime = this._tools.conversionTime(i.ctime)
								// })
								if(item.commentList.length > 2){
									if(index === idx){
										item.commentList.length = item.commentList.length
										item.isLookAll = false
									}else{
										item.commentList.length = 2
										item.isLookAll = true
									}
									
								}else{
									item.isLookAll = false
								}
							})
						}
						this.releaseEachKindInfo = getInfo
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 查看全部
			lookAllComments(idx){
				// console.log(idx);
				this.releaseEachKindInfo[idx].isLookAll = false
				if(this.current === 0){
					this.getReleaseEachInfo("",idx)
				}else{
					this.getReleaseEachInfo(this.tabList[this.current].code,idx)
				}
			},
			addComments(idx){
				let exhibitionId = this.releaseEachKindInfo[idx].id
				if(!this.uPhone){
					this._tools.whetherLogin();
				}else{
					if(!this.releaseEachKindInfo[idx].comments){
						uni.showToast({
							title:"评论内容不能为空哦",
							icon:'none',
							duration:1500
						});
						return false;
					}
					this._Api.addComment({
						phone : this.uPhone,
						cDetails : this.releaseEachKindInfo[idx].comments,
						exhibitionId : exhibitionId
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.lookAllComments(idx);
							this.releaseEachKindInfo[idx].comments = "";
							uni.showToast({
								title:"评论成功",
								icon:'none',
								duration:1500
							})
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
	.navSearch{
		.ns-main{
			position: relative;
			.addIcon{
				width: 46rpx;
				height: 46rpx;
				position: absolute;
				top: 50%;
				margin-top: -23rpx;
				right: -66rpx;
				z-index: 999;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.topTabSpace{
		height: 70rpx;
	}
	.topTab{
		width: 100%;
		height: 60rpx;
		position: fixed;
		top: 130rpx;
		padding-bottom: 10rpx;
		background-color: #FFFFFF;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tt-item{
			width: 20%;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			text-align: center;
		}
		.active{
			color: #367BDB;
			border-bottom: 6rpx solid #367BDB;
		}
	}
	.goodsAndComments{
		margin-top: 10rpx;
		border-top: 10rpx solid #F6F6F6;
	}
</style>