<template>
	<div class="home">
		<!--		轮播图-->
		<van-swipe
			class="my-swipe"
			:autoplay="3000"
			:show-indicators="false"
			@change="onChange"
		>
			<van-swipe-item
				v-for="item in getBanner"
				:key="item._id"
				@click="goToDetails(item._id)"
			>
				<img v-lazy="item.banner"/>
				<div class="text-box">
					<h2>{{ item.title }}</h2>
				</div>
			</van-swipe-item>
			<template #indicator>
				<div class="custom-indicator">{{ getCurrent + 1 }}/{{ getBanner.length }}</div>
			</template>
		</van-swipe>
		<!--		数据列表-->
		<van-pull-refresh
			v-model="refreshingFlag"
			@refresh="onRefresh"
			success-text="刷新成功"
		>
			<van-list
				v-model="loadingFlag"
				:finished="getFinished"
				:error.sync="getError"
				error-text="请求失败，点击重新加载"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<van-cell
					v-for="item in getArticles"
					:key="item._id"
					:to="`/details/${item._id}?from=home`"
					:title="item.title"
					:label="item.des"
					is-link
					center
					size="large"
					:icon="item.detail.auth_icon"
					style="padding: 0.2rem 0.1rem 0.2rem 0.2rem"
				/>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {mapActions, mapState, mapMutations} from "vuex";
	import {throttle} from "lodash/function";
	
	export default {
		name: 'Home',
		mounted () {
			this.banners();
		},
		methods: {
			...mapActions('home', ['banners', 'articles', 'refresh']),
			...mapMutations('home', ['setRefreshing', 'setLoading', 'setCurrent']),
			// 将onLoad节流
			onLoad: throttle(function () {
				// 向服务器请求数据
				this.articles();
			}, 500),
			onRefresh: throttle(function () {
				// 向服务器请求数据
				this.refresh();
			}, 500),
			goToDetails (_id) {
				this.$router.push(`/details/${_id}?from=banner`);
			},
			onChange (index) {
				this.setCurrent({
					current: index
				})
			},
		},
		computed: {
			// 仅获取
			...mapState('home', {
				getCurrent: state => state.current,
				getFinished: state => state.finished,
				getError: state => state.error,
				getArticles: state => state.articles,
				getBanner: state => state.banners,
			}),
			// 双向绑定状态
			refreshingFlag: {
				get () {
					return this.$store.state.home.refreshing
				},
				set (refreshing) {
					this.setRefreshing({
						refreshing
					})
				}
			},
			loadingFlag: {
				get () {
					return this.$store.state.home.loading
				},
				set (loading) {
					this.setLoading({
						loading
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	
	.my-swipe {
		.van-swipe-item {
			img {
				width: 100%;
				height: 200px;
			}
			
			.text-box {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 0.4rem;
				padding: 0 0.2rem;
				color: #FFF;
				background: rgba(0, 0, 0, 0.4);
				
				h2 {
					margin-top: 0.1rem;
					margin-bottom: 0.1rem;
					font-size: 20px;
					font-weight: normal;
					line-height: 100%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		
		.custom-indicator {
			position: absolute;
			z-index: 100;
			right: 5px;
			bottom: 5px;
			padding: 2px 5px;
			font-size: 12px;
			color: #FFFFFF;
			background: rgb(238, 10, 36);
		}
	}
</style>
