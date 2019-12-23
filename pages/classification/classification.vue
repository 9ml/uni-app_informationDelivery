<template>
	<view>
		<!-- 导航头 - 搜索框 -->
		<view class="navSearch">
			<view class="ns-space"></view>
			<view class="ns-main" @tap="navTo('index/search',0)">
				<view class="nm-icon">
					<image src="/static/icon/icon_ss_sy.png" mode=""></image>
				</view>
				<view class="nm-inp">
					<input type="text" placeholder="请输入想要搜索的商品" />
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
			<!-- <swiper class="swiper" :current="current" @change="swiperChange">
				<swiper-item v-for="(s,s_idx) in tabList.length" :key="s_idx">
					
				</swiper-item>
			</swiper> -->
			<view class="goodsAndComments" v-for="(c,c_idx) in getEachKindsInfos" :key="c_idx">
				<!-- 商品 -->
				<view class="postMain" @tap="navTo('index/postDetails',c.id)">
					<view class="pm-desc">
						<view class="pd-title">
							{{c.title}}
						</view>
						<view class="pd-desc">
							{{c.details}}
							<!-- 气温逐渐下降之后就是呼呼大风把脑壳吹成鸡窝的季节了，在风比较大的北方，几乎是没啥发型可言，在家发型由睡姿决定，在外发型由大风决定。难道就这样乱糟糟的度过我的秋天？不！是时候找个理由买个帽子了。 -->
						</view>
						<view class="pd-show">
							<view class="ps-item" v-for="(i,i_idx) in c.imgsArr" :key="i_idx">
								<image :src="i" mode=""></image>
							</view>
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
				tabList : [
					{
						t_name : '鞋服'
					},
					{
						t_name : '衣帽'
					},
					{
						t_name : '饮食'
					},
					{
						t_name : '游玩'
					}
				],
				current : 0,
				getEachKindsInfos : []
			}
		},
		// 页面加载
		onLoad(){
			this.getReleaseAllKinds();
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.getReleaseAllKinds();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this._tools.myShow("刷新成功",true);
			},2000);
		},
		methods: {
			// 全部分类
			getReleaseAllKinds(){
				this._Api.classTabs({},res=>{
					console.log(res);
					if(res.code === 0){
						this.tabList = res.data
						this.getEachKindsInfo(this.current);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 获取信息
			getEachKindsInfo(i){
				this._Api.releaseEachKindsInfo({
					type : this.tabList[i].code
				},res=>{
					console.log(res);
					if(res.code === 0){
						if(!res.data){
							this.getEachKindsInfos = []
						}else{
							res.data.forEach((item)=>{
								if(!item.imged){}else{
									item.imgsArr = item.imged.split(",");
								}
							})
							this.getEachKindsInfos = res.data
						}
					}else{
						this._tools(res.msg,true);
					}
				})
			},
			tabChange(idx){
				this.current = idx
				this.getEachKindsInfo(idx)
			},
			// swiperChange(e){
			// 	this.current = e.detail.current
			// },
			navTo(url,idx){
				uni.navigateTo({
					url:'/pages/'+url+'?eid='+idx
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'static/tools/nav_search.scss';
	@import 'static/tools/post_details.scss';
	@import 'static/tools/comments.scss';
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
			width: 25%;
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
	.swiper{
		height: 2200rpx;
	}
	.goodsAndComments{
		margin-top: 10rpx;
		border-top: 10rpx solid #F6F6F6;
		.postMain{
			border: none;
		}
	}
</style>
