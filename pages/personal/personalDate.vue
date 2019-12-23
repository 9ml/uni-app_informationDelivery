<template>
	<view>
		<view class="eachMian">
			<view class="e-main">
				<view class="em-left">
					头像
				</view>
				<view class="em-right" @tap="updateHeader()">
					<view class="er-left">
						<image :src="userInfo.avatar" mode=""></image>
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian" @tap="navTo('personal/updateName')">
			<view class="e-main">
				<view class="em-left">
					昵称
				</view>
				<view class="em-right">
					<view class="er-fonts">
						{{userInfo.username}}
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian">
			<view class="e-main">
				<view class="em-left">
					性别
				</view>
				<view class="em-right">
					<view class="er-fonts">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian">
			<view class="e-main">
				<view class="em-left">
					地区
				</view>
				<view class="em-right">
					<view class="er-fonts">
						<view class="tab" :class="{'active':index==tabIndex}" @tap="toggleTab(item,index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</view>
							<w-picker
								mode="region"
								:defaultVal="['北京市','市辖区','东城区']"
								:areaCode="['11','1101','110101']"
								:hideArea="false"
								@confirm="onConfirm" 
								ref="region" 
							></w-picker>
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian" @tap="navTo('personal/updateQQ')">
			<view class="e-main">
				<view class="em-left">
					QQ
				</view>
				<view class="em-right">
					<view class="er-fonts">
						{{userInfo.qq}}
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian" @tap="navTo('personal/updateWeChat')">
			<view class="e-main">
				<view class="em-left">
					微信
				</view>
				<view class="em-right">
					<view class="er-fonts">
						{{userInfo.wechat}}
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="eachMian">
			<view class="e-main">
				<view class="em-left">
					联系方式
				</view>
				<view class="em-right">
					<view class="er-fonts">
						{{userInfo.phone}}
					</view>
					<view class="er-right">
						<image src="/static/icon/btn_enter_grzl.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="saveBtn" @tap="save()">
			<button type="primary">保存</button>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				uPhone : uni.getStorageSync('uPhone'),
				userInfo : "",
				array: ['女','男'],
				index: 0,
				mode:"range",
				tabList : [
					{
						mode:"region",
						name:"徐州市"
					}
				],
				tabIndex:0
			}
		},
		onLoad() {
			this.baseUrl = this._Api.baseUrl;
			this.getUserInfo();
		},
		methods: {
			// 获取信息
			getUserInfo(){
				this._Api.getUserInfo({
					phone : this.uPhone
				},res=>{
					console.log(res);
					if(res.code === 0){
						this.userInfo = res.data
						if(!res.data.district){}else{
							this.tabList[0].name = res.data.district
						}
						if(!res.data.gender || res.data.gender == "1"){
							this.index = 1
						}else if(res.data.gender == "0"){
							this.index = 0
						}
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			// 修改头像
			updateHeader(){
				uni.chooseImage({
				    success: (res) => {
						console.log(res.tempFilePaths[0])
				        const tempFilePaths = res.tempFilePaths;
				        uni.uploadFile({
				            url: this.baseUrl+'/users/changeHeader',
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
								phone : this.uPhone,
				            },
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes);
								this.getUserInfo()
								uni.showToast({
									title:"修改成功",
									icon:"none",
									duration:1500
								})
				            }
				        });
				    }
				});
			},
			// 跳转
			navTo(url){
				uni.navigateTo({
					url:'/pages/'+url
				})
			},
			bindPickerChange: function(e) {
				console.log(e);
			    this.index = e.target.value
				this._Api.updateUserInfo({
					phone : this.uPhone,
					gender : this.index
				},res=>{
					console.log(res);
					if(res.code === 0){
						this._tools.myShow("修改成功",true);
						this.getUserInfo();
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			toggleTab(item,index){
				this.tabIndex=index;
				this.mode=item.mode;
				this.defaultVal=item.value;
				this.$refs[item.mode].show();
			},
			onConfirm(val){
				console.log(val);
				this.resultInfo=val;
				this.tabList[0].name = val.checkArr[0] + "," + val.checkArr[1] + "," + val.checkArr[2]
				this._Api.updateUserInfo({
					phone : this.uPhone,
					district : this.tabList[0].name
				},res=>{
					console.log(res);
					if(res.code === 0){
						this._tools.myShow("修改成功",true);
						this.getUserInfo();
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			},
			// 保存
			save(){
				this._tools.myShow("保存成功",true);
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/personal/personal'
					})
				},1500)
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.eachMian{
		border-top: 1rpx solid #F6F6F6;
		background-color: #FFFFFF;
		.e-main{
			width: 92%;
			height: 88rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.em-left{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
			}
			.em-right{
				display: flex;
				align-items: center;
				.er-left{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.er-fonts{
					height: 60rpx;
					line-height: 60rpx;
					margin-right: 20rpx;
					font-size: 26rpx;
					color: #808080;
					picker{
						.uni-input{
							font-size: 26rpx;
						}
					}
				}
				.er-right{
					height: 60rpx;
					image{
						width: 18rpx;
						height: 32rpx;
						margin-top: 14rpx;
					}
				}
			}
		}
	}
	.saveBtn{
		width: 620rpx;
		height: 90rpx;
		background-color: #387CDC;
		border-radius: 16rpx;
		overflow: hidden;
		margin: 200rpx auto 0;
		button{
			width: 100%;
			height: 100%;
			line-height: 90rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
</style>
