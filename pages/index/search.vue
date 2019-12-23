<template>
	<view>
		<!-- 搜索框 -->
		<view class="topNav">
			<view class="tnSpace"></view>
			<view class="tnMain">
				<view class="tm-icon" @tap="back()">
					<image src="/static/icon/fanhui.png" mode=""></image>
				</view>
				<view class="tm-inp">
					<view class="ti-icon">
						<image src="../../static/icon/icon_ss_sy.png" mode=""></image>
					</view>
					<view class="ti-inp">
						<input v-model="searchFonts" type="text" placeholder="请输入想要搜索的商品" />
					</view>
				</view>
				<view class="tm-fonts" @tap="search()">
					搜索
				</view>
			</view>
		</view>
		<view class="topNavSpace"></view>
		<view class="searchAll">
			<!-- 热门搜索 -->
			<!-- <view class="hotSearch">
				<view class="hs-title">
					热门搜索
				</view>
				<view class="hs-main">
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vanssssss</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
					<text>Vans</text>
				</view>
			</view> -->
			<!-- 搜索历史 -->
			<view class="hisSearch" v-if="hisSearch">
				<view class="hs-title">
					搜索历史
				</view>
				<view class="hs-item" v-for="(h,h_idx) in hisSearchInfo" :key="h_idx" @tap="tapHisSearch(h.content)">
					{{h.content}}
				</view>
				<view class="clearHis" @tap="delHis()">
					清除搜索记录
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="searchMs" v-if="isShowSearchRes">
			<!-- 商品 -->
			<view class="goodsShow" v-for="(r,r_idx) in searchRes" :key="r_idx">
				<view class="gs-main" @tap="goDetails(r.id)">
					<view class="gm-img">
						<image :src="r.getImage" mode=""></image>
					</view>
					<view class="gm-fonts">
						<view class="gf-title">
							{{r.title}}
						</view>
						<view class="gf-desc">
							{{r.details}}
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
				uPhone : uni.getStorageSync('uPhone'),
				userId : uni.getStorageSync("userId"),
				// 历史搜索信息
				hisSearchInfo : [],
				// 搜索关键字
				searchFonts : '',
				// 历史搜索
				hisSearch : true,
				// 搜索结果
				searchRes : [],
				isShowSearchRes : false,
				idx : 0
			}
		},
		onLoad() {
			this.getHisSearch();
		},
		methods: {
			// 搜索历史
			getHisSearch(){
				if(!this.uPhone){
					this.hisSearch = false
				}else{
					this._Api.searchHis({
						phone : this.uPhone
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.hisSearchInfo = res.data
						}else{
							uni.showToast({
								title:res.msg,
								icon:"none",
								duration:1500
							})
						}
					})
				}
			},
			// 删除历史搜索
			delHis(){
				if(this.hisSearchInfo.length === 0){
					this._tools.myShow("无搜索历史，无需删除",true);
				}else{
					uni.showModal({
					    title: '提示',
					    content: '确定删除所有历史记录吗？',
					    success: (res)=>{
					        if(res.confirm){
								this._Api.delSearchHis({
									phone : this.uPhone
								},res=>{
									console.log(res);
									if(res.code === 0){
										this._tools.myShow("删除成功",true);
										this.getHisSearch();
									}else{
										this._tools.myShow(res.msg,true);
									}
								})
					        }else if(res.cancel){
								// console.log("取消");
					        }
					    }
					});
				}
			},
			// 搜索
			search(){
				if(!this.searchFonts){
					this._tools.myShow("搜索内容不能为空！");
					return false;
				}
				this._Api.search({
					uid : this.userId,
					keyword :  this.searchFonts
				},res=>{
					console.log(res);
					if(res.code === 0){
						if(!res.data){
							this._tools.myShow("未查询到，请换个关键词试试哦~")
						}else{
							var getArr = res.data
							getArr.forEach((i)=>{
								if(i.imgs.length === 0){}else{
									if(!i.imgs[0].imgurl){}else{
										i.getImage = i.imgs[0].imgurl.split(",")[0]
									}
								}
							})
							this.isShowSearchRes = true
							this.hisSearch = false
							this.searchRes = getArr
						}
					}else{
						this.myShow(res.msg,true);
					}
				})
			},
			// 搜索历史搜索
			tapHisSearch(content){
				this.searchFonts = content
				this.search()
			},
			goDetails(idx){
				uni.navigateTo({
					url:'/pages/index/postDetails?eid='+idx
				})
			},
			// 返回
			back(){
				this._tools.navBack();
			}
		}
	}
</script>

<style lang="scss">
	@import 'static/tools/goods_show.scss';
	.topNav{
		width: 100%;
		height: 130rpx;
		position: fixed;
		top: 0;
		background-color: #F7F7F7;
		z-index: 999;
		.tnSpace{
			height: 30rpx;
		}
		.tnMain{
			width: 96%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tm-icon{
				width: 6%;
				height: 70rpx;
				image{
					width: 16rpx;
					height: 30rpx;
					margin-top: 20rpx;
				}
			}
			.tm-inp{
				width: 80%;
				height: 70rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				box-shadow: 0 0 20rpx #999999;
				display: flex;
				align-items: center;
				.ti-icon{
					width: 10%;
					height: 70rpx;
					text-align: center;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-top: 20rpx;
					}
				}
				.ti-inp{
					width: 90%;
					height: 70rpx;
					input{
						width: 100%;
						height: 100%;
						font-size: 22rpx;
					}
				}
			}
			.tm-fonts{
				width: 12%;
				height: 60rpx;
				border: 1rpx solid #FF584C;
				margin-left: 2%;
				border-radius: 30rpx;
				font-size: 24rpx;
				color: #FF584C;;
				text-align: center;
				line-height: 60rpx;
			}
		}
	}
	.topNavSpace{
		height: 130rpx;
	}
	.searchAll{
		width: 92%;
		margin: 0 auto;
		.hotSearch{
			.hs-title{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				color: #666666;
			}
			.hs-main{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				text{
					padding: 2rpx 6rpx 2rpx 6rpx;
					background-color: #EFEFEF;
					font-size: 24rpx;
					border-radius: 8rpx;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}
		.hisSearch{
			.hs-title{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				color: #666666;
				border-bottom: 1rpx solid #E4E4E4;
			}
			.hs-item{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				border-bottom: 1rpx solid #E4E4E4;
			}
			.clearHis{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				text-align: center;
				color: #666666;
				border-bottom: 1rpx solid #E4E4E4;
			}
		}
	}
</style>
