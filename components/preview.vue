<template :name="preview">
	<view>
		<view class="pbMs">
			<swiper class="swiper" :current="tapIndex" indicator-dots="true">
				<swiper-item v-for="(i,i_idx) in imgList" :key="i_idx">
					<view class="sImgs">
						<image :src="i" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: "preview",
		props:{
			imgList : {
				type : Array,
				default: function() {
					return []
				}
			},
			tapIndex : {
				type : Number
			}
		},
		data() {
			return {
				index : 1,
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.pbMs{
		width: 100%;
		height: vh;
		position: fixed;
		z-index: 99999999999;
		top: 50%;
		margin-top: -25vh;
		.swiper{
			width: 100%;
			height: 50vh;
			swiper-item{
				.sImgs{
					width: 100%;
					height: 50vh;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
