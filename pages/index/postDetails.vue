<template>
	<view>
		<preview v-if="isShowPreview" :imgList="postDetailsInfo.imgsArr" :tapIndex="index"></preview>
		<!-- 遮罩层 -->
		<view class="coverView" v-if="isShowCover" @tap="hiddenCover()"></view>
		<view class="postMain">
			<view class="pm-desc">
				<view class="pd-title">
					{{postDetailsInfo.title}}
				</view>
				<view class="pd-desc">
					{{postDetailsInfo.details}}
					<!-- 气温逐渐下降之后就是呼呼大风把脑壳吹成鸡窝的季节了，在风比较大的北方，几乎是没啥发型可言，在家发型由睡姿决定，在外发型由大风决定。难道就这样乱糟糟的度过我的秋天？不！是时候找个理由买个帽子了。 -->
				</view>
				<view class="pd-show">
					<view class="ps-item" v-for="(p,p_idx) in postDetailsInfo.imgsArr" @tap="showPreview(p_idx)" :key="p_idx">
						<image :src="p" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="commentTiNus">
			<view class="ctn">
				评论<text>({{postDetailsInfo.commentcount}})</text>
			</view>
		</view>
		<!-- 评论信息 -->
		<view class="comments" v-for="(c,c_idx) in postDetailsInfo.commentList" :key="c_idx">
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
		<!-- 联系方式 信息 -->
		<view class="contactAll" v-show="showInfo">
			<view class="contactInfo">
				<view class="ci-item">
					<view class="ci-left">
						电话
					</view>
					<view class="ci-right">
						{{postDetailsInfo.userPhone}}
					</view>
				</view>
			</view>
			<view class="contactInfo">
				<view class="ci-item">
					<view class="ci-left">
						微信
					</view>
					<view class="ci-right">
						{{postDetailsInfo.weixin}}
					</view>
				</view>
			</view>
			<view class="contactInfo">
				<view class="ci-item">
					<view class="ci-left">
						QQ
					</view>
					<view class="ci-right">
						{{postDetailsInfo.qq}}
					</view>
				</view>
			</view>
		</view>
		<!-- 联系方式 按钮 -->
		<view class="contactBtn" @tap="shows(contactFonts)">
			{{contactFonts}}
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
</template>

<script>
	import preview from "@/components/preview.vue";
	export default {
		components:{
			preview
		},
		data() {
			return {
				// 帖子详情
				postDetailsInfo : "",
				// 查看全部
				isLookAll : true,
				// 评论内容
				comments : '',
				showInfo : false,
				isShowPreview : false,
				isShowCover : false,
				index : 0,
				contactFonts : "联系方式",
				// 用户
				uPhone : uni.getStorageSync("uPhone")
			}
		},
		onLoad(options) {
			this.eid = options.eid
			this.getPostDetails();
		},
		methods: {
			// 帖子详情
			getPostDetails(){
				this._Api.postDetails({
					eid : this.eid
				},res=>{
					console.log(res);
					if(res.code === 0){
						if(res.data.imgs.length !== 0){
							if(!res.data.imgs[0].imgurl){}else{
								res.data.imgsArr = res.data.imgs[0].imgurl.split(",");
							}
						}
						if(res.data.commentList.length > 2){
							res.data.commentList.length = 2
						}else{
							this.isLookAll = false
						}
						this.postDetailsInfo = res.data
						console.log(this.postDetailsInfo = res.data);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			showPreview(idx){
				this.index = idx
				this.isShowPreview = true
				this.isShowCover = true
			},
			hiddenCover(){
				this.isShowPreview = false
				this.isShowCover = false
			},
			changeValue(e){
				console.log(e)
			},
			// 查看所有评论
			lookAllComments(){
				this._Api.postDetails({
					eid : this.eid
				},res=>{
					console.log(res);
					if(res.code === 0){
						if(res.data.imgs.length !== 0){
							res.data.imgsArr = res.data.imgs[0].imgurl.split(",");
						}
						this.postDetailsInfo = res.data
						this.isLookAll = false
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
						uni.showToast({
							title:"评论内容不能为空哦",
							icon:'none',
							duration:1500
						});
						return false;
					}
					this._Api.addComment({
						phone : this.uPhone,
						cDetails : this.comments,
						exhibitionId : this.postDetailsInfo.id
					},res=>{
						console.log(res);
						if(res.code === 0){
							this.lookAllComments();
							this.comments = "";
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
			// 查看联系方式
			shows(fonts){
				if(fonts === "联系方式"){
					if(!this.uPhone){
						this._tools.whetherLogin();
					}else{
						this.showInfo = true;
						this.contactFonts = "收起";
					}
				}else{
					this.showInfo = false;
					this.contactFonts = "联系方式";
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'static/tools/comments.scss';
	@import 'static/tools/post_details.scss';
	.coverView{
		width: 100%;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha: .8);
		position: fixed;
		top: 0;
		z-index: 99999;
	}
	.contactBtn{
		width: 520rpx;
		height: 80rpx;
		margin: 18rpx auto 18rpx;
		background-color: #387CDC;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;
	}
	.contactAll{
		.contactInfo{
			border-bottom: 1rpx solid #F6F6F6;
			.ci-item{
				width: 90%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				margin: 0 auto;
			}
		}
	}
</style>