<template>
	<view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					标题
				</view>
				<view class="ua-right">
					<input type="text" v-model="pTitle" placeholder="请输入标题">
				</view>
			</view>
		</view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					分类
				</view>
				<view class="ua-right">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="updateMain talkWays">
			<view class="um-main">
				<view class="ua-left">
					联系方式
				</view>
				<view class="ua-right"></view>
			</view>
		</view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					QQ
				</view>
				<view class="ua-right">
					<input v-model="pQQ" type="text" placeholder="请输入QQ">
				</view>
			</view>
		</view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					微信
				</view>
				<view class="ua-right">
					<input v-model="pWeChat" type="text" placeholder="请输入微信">
				</view>
			</view>
		</view>
		<view class="updateMain">
			<view class="um-main">
				<view class="ua-left">
					手机号
				</view>
				<view class="ua-right">
					<input v-model="phone" type="text" placeholder="请输入手机号">
				</view>
			</view>
		</view>
		<view class="areaMain">
			<view class="am-main">
				<view class="am-area">
					<textarea v-model="pDetail" maxlength="-1" placeholder="请输入内容" />
				</view>
				<view class="am-icon" @tap="chosePostImgs()">
					<image src="/static/icon/icon_tjtp_xj.png" mode=""></image>
				</view>
				<view class="am-imgs" v-if="showOhidden">
					<view class="ai-item" v-for="(i,i_idx) in gotChoseImgs" :key="i_idx">
						<image :src="i" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btnMain" @tap="posts()">
			<button type="primary">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            array : [],
				codes : [],
				index: 0,
				pTitle : '',
				pQQ : '',
				pWeChat : '',
				phone : '',
				pDetail : '',
				uPhone : uni.getStorageSync('uPhone'),
				gotChoseImgs : [],
				showOhidden : true
	        }
	    },
		onLoad() {
			this.getReleaseAllKinds();
			this.baseUrl = this._Api.baseUrl;
			console.log(this.baseUrl);
		},
	    methods: {
			// 全部分类
			getReleaseAllKinds(){
				this._Api.releaseAllKinds({
					type : 2
				},res=>{
					console.log(res);
					if(res.code === 0){
						let getKinds = res.data
						let kindsArr = []
						let codeArr = []
						getKinds.forEach((item,idx)=>{
							if(idx !== 0){
								kindsArr[kindsArr.length] = item.name
								codeArr[codeArr.length] = item.code
							}
						})
						this.array = kindsArr
						this.codes = codeArr
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 发布
			posts(){
				if(!this.pTitle){
					this._tools.myShow("标题不能为空",true);
					return false;
				}else if(!this.pQQ){
					this._tools.myShow("QQ不能为空",true);
					return false;
				}else if(!this.pWeChat){
					this._tools.myShow("微信不能为空",true);
					return false;
				}else if(!this.phone){
					this._tools.myShow("手机号不能为空",true);
					return false;
				}else if(this.phone !== this.uPhone){
					this._tools.myShow("手机号与登录手机号不一致",true);
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					this._tools.myShow("手机号格式不正确",true);
					return false;
				}else if(!this.pDetail){
					this._tools.myShow("内容不能为空",true);
					return false;
				}
				let allImgs = this.gotChoseImgs.join(",");
				this._Api.addPost({
					phone : this.phone,
					publishType : 0,
					title : this.pTitle,
					qq : this.pQQ,
					weixin : this.pWeChat,
					exhibitionType : this.codes[this.index],
					details : this.pDetail,
					imgurl : allImgs
				},res=>{
					console.log(res);
					if(res.code === 0){
						this._tools.myShow("发布成功~",true);
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/release/release"
							})
						},1500)
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			// 切换分类
	        bindPickerChange: function(e) {
	            this.index = e.target.value
	        },
			chosePostImgs(){
				if(this.gotChoseImgs.length >= 9){
					this._tools.myShow("最多上传9张图片哦",true);
					this.gotChoseImgs.length = 9
					this.showOhidden = false
					this.showOhidden = true
				}else{
					uni.chooseImage({
						success:(res)=>{
							res.tempFilePaths.forEach((i)=>{
								this.unloadFiles(i);
							});
						}
					})
				}
			},
			unloadFiles(getFile){
				uni.uploadFile({
					url: this.baseUrl+'/exhibitions/updateHeadImg',
					filePath: getFile,
					name: 'file',
					formData: {},
					success: (res) => {
						let gotInfo = JSON.parse(res.data)
						console.log(res)
						if(gotInfo.code === 0){
							this.gotChoseImgs[this.gotChoseImgs.length] = gotInfo.msg
							this.showOhidden = false
							this.showOhidden = true
						}
					}
				});
			}
	    }
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.updateMain{
		height: 90rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #F6F6F6;
		.um-main{
			width: 90%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.ua-left{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 26rpx;
			}
			.ua-right{
				width: 60%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: right;
				picker{
					width: 100%;
					height: 100%;
					.uni-input{
						font-size: 24rpx;
					}
				}
				input{
					width: 100%;
					height: 100%;
					font-size: 24rpx;
					text-align: right;
				}
			}
		}
	}
	.talkWays{
		background-color: #F6F6F6;
	}
	.areaMain{
		background-color: #FFFFFF;
		border-top: 1rpx solid #F6F6F6;
		padding-bottom: 20rpx;
		.am-main{
			width: 90%;
			margin: 0 auto;
			// height: 360rpx;
			.am-area{
				width: 100%;
				textarea{
					width: 100%;
					height: 200rpx;
					font-size: 24rpx;
					padding-top: 10rpx;
				}
			}
			.am-icon{
				height: 120rpx;
				margin-bottom: 20rpx;
				margin: 10rpx 0 20rpx 0;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.am-imgs{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.ai-item{
					width: 20%;
					text-align: center;
					height: 120rpx;
					margin-bottom: 20rpx;
					image{
						width: 120rpx;
						height: 120rpx;
						margin: 0 20rpx;
					}
				}
			}
		}
	}
	.btnMain{
		width: 530rpx;
		height: 90rpx;
		background-color: #387BDC;
		margin: 60rpx auto 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		button{
			width: 100%;
			height: 100%;
			line-height: 90rpx;
			color: #FFFFFF;
			font-size: 26rpx;
		}
	}
</style>
