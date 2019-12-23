<template>
	<view>
		<view class="topNav">
			<view class="topNavSpace"></view>
			<view class="topNavMain">
				<view class="tn-left" @tap="_tools.navBack()">
					<image src="/static/icon/fanhui.png" mode=""></image>
				</view>
				<view class="tn-name">
					我的发布
				</view>
				<view class="tn-right" @tap="_tools.navTo('release/releaseInfo')">
					<view class="tr-icon">
						<image src="/static/icon/jiahao.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="topNavSpace"></view>
		<view class="postMs" v-for="(p,p_idx) in releaseInfo" :key="p_idx">
			<view class="postMain" @tap="goDetails(p.id)">
				<view class="pm-desc">
					<view class="pd-title">
						{{p.title}}
					</view>
					<view class="pd-desc">
						{{p.details}}
						<!-- 气温逐渐下降之后就是呼呼大风把脑壳吹成鸡窝的季节了，在风比较大的北方，几乎是没啥发型可言，在家发型由睡姿决定，在外发型由大风决定。难道就这样乱糟糟的度过我的秋天？不！是时候找个理由买个帽子了。 -->
					</view>
					<view class="pd-show">
						<view class="ps-item" v-for="(i,i_idx) in p.imgsArr" :key="i_idx">
							<image :src="i" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="commentTiNus">
				<view class="ctn">
					评论<text>({{p.commentcount}})</text>
				</view>
			</view>
			<!-- 评论信息 -->
			<view class="comments" v-for="(c,c_idx) in p.commentList" :key="c_idx">
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
			<view class="lookAllComments" v-if="p.isShowAll" @tap="lookAllComments(true,p_idx)">
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
						<input type="text" v-model="p.comments" placeholder="写个评论吧" />
					</view>
					<view class="bm-btn" @tap="addComments(p_idx)">
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
				// 用户信息
				uPhone : uni.getStorageSync('uPhone'),
				// 发布信息
				releaseInfo : []
			}
		},
		onLoad() {
			this.getMyRelease();
		},
		methods: {
			// 获取我的全部发布
			getMyRelease(types,idx){
				this._Api.getPersonalRelease({
					phone : this.uPhone
				},res=>{
					console.log(res);
					if(res.code === 0){
						res.data.forEach((item,i)=>{
							item.comments = "";
							if(item.imgs.length !== 0 && item.imgs[0].imgurl !== "" && item.imgs[0].imgurl !== null){
								item.imgsArr = item.imgs[0].imgurl.split(",");
							}
							if(types && i === idx){
								item.isShowAll = false
							}else{
								if(item.commentList.length > 2){
									item.isShowAll = true
									item.commentList.length = 2
								}else{
									item.isShowAll = false
								}
							}
						})
						this.releaseInfo = res.data
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			// 查看全部
			lookAllComments(types,idx){
				this.getMyRelease(types,idx);
			},
			// 添加新评论
			addComments(idx){
				if(!this.uPhone){
					this._tools.whetherLogin();
				}else{
					if(!this.releaseInfo[idx].comments){
						uni.showToast({
							title:"评论内容不能为空哦",
							icon:'none',
							duration:1500
						});
						return false;
					}
					this._Api.addComment({
						phone : this.uPhone,
						cDetails : this.releaseInfo[idx].comments,
						exhibitionId : this.releaseInfo[idx].id
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.lookAllComments();
							this.releaseInfo[idx].comments = "";
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
			goDetails(idx){
				uni.navigateTo({
					url:"/pages/index/postDetails?eid="+idx
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'static/tools/comments.scss';
	@import 'static/tools/post_details.scss';
	@import 'pages/personal/tools/update.scss';
	.tn-right{
		background-color: #FFFFFF !important;
	}
</style>