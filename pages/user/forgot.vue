<template>
	<view>
		<view class="topSpace"></view>
		<view class="topName">
			忘记密码
		</view>
		<view class="inpSpace"></view>
		<view class="inpItem">
			<input type="text" v-model="uPhone" placeholder="请输入手机号" />
		</view>
		<view class="inpItem">
			<input type="text" v-model="uCode" placeholder="请输入验证码" />
			<view class="getCode" v-if="get" @tap="getCode()">
				获取验证码
			</view>
			<view class="getCode seconds" v-if="got">
				请{{seconds}}秒后再试
			</view>
		</view>
		<view class="inpItem">
			<input type="password" v-model="uPwd" placeholder="请输入密码" />
		</view>
		<view class="inpItem">
			<input type="password" v-model="uPwds" placeholder="请再次输入密码" />
		</view>
		<view class="inpBtn" @tap="updatePwd()">
			<button type="primary">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uPhone : '',
				uCode : '',
				uPwd : '',
				uPwds : '',
				get : true,
				got : false,
				seconds : 120
			}
		},
		methods: {
			// 获取验证码
			getCode(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"您输入的手机号格式不正确",
						icon:'none',
						duration:1500
					})
					return false;
				}
				this._Api.getRegisterCode({
					phone : this.uPhone,
					type : 1
				},res=>{
					console.log(res);
					if(res.code === 0){
						uni.showToast({
							title:"验证码发送成功，请注意查收",
							icon:'none',
							duration:1500
						});
						this.get = false;
						this.got = true;
						let timer = setInterval(()=>{
							this.seconds --
							if(this.seconds === 0){
								clearInterval(timer);
								this.get = true;
								this.got = false;
								this.seconds = 120
							}
						},1000)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 修改密码
			updatePwd(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"您输入的手机号格式不正确",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!this.uCode){
					uni.showToast({
						title:"验证码不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!this.uPwd){
					uni.showToast({
						title:"密码不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!this.uPwds){
					uni.showToast({
						title:"重复密码不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(this.uPwd !== this.uPwds){
					uni.showToast({
						title:"两次密码不一致，请确认",
						icon:'none',
						duration:1500
					})
					return false;
				}
				this._Api.updatePwd({
					phone : this.uPhone,
					code : this.uCode,
					password : this.uPwd,
					newpassword : this.uPwds
				},res=>{
					console.log(res);
					if(res.code === 0){
						uni.showToast({
							title:"修改成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/user/login?phone='+this.uPhone+"&pwd="+this.uPwd
							})
						},1500)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "pages/user/tools/user.scss";
</style>