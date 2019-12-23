<template>
	<view>
		<view class="samain">
			{{gotInfo}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gotInfo : ""
			}
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				this._Api.policygreement({},res=>{
					console.log(res);
					if(res.code === 0){
						this.gotInfo = res.data[0].policycontent
					}else{
						this._tools.myShow(res.msg,true);
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.samain{
		width: 92%;
		margin: 0 auto;
		font-size: 28rpx;
		color: #8A8A8A;
	}
</style>
