<template>
	<view>
		<!-- 启动页 -->
		<view class="startPages">
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/icon/start_a.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/icon/start_b.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item @tap="interApp()">
					<view class="swiper-item">
						<image src="/static/icon/start_c.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			interApp(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		},
	}
</script>

<style lang="scss">
	.startPages{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 99999999;
		left: 0;
		top: 0;
		.swiper{
			width: 100%;
			height: 100%;
			swiper-item{
				width: 100%;
				height: 100%;
				.swiper-item{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
