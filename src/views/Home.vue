<template>
	<div class="home">
		<!--		轮播图-->
		<van-swipe
			class="my-swipe"
			:autoplay="3000"
			:show-indicators="false"
		>
			<van-swipe-item
				v-for="item in banners"
				:key="item._id"
				@click="goToDetails(item._id)"
			>
				<img v-lazy="item.banner"/>
				<div class="text-box">
					<h2>{{ item.title }}</h2>
					<p>{{ item.detail.auth }} /文</p>
				</div>
			</van-swipe-item>
		</van-swipe>
		<!--		数据列表-->
		<van-pull-refresh
			v-model="refreshing"
			@refresh="onRefresh"
			success-text="刷新成功"
		>
			<van-list
				v-model="loading"
				:finished="finished"
				:error.sync="error"
				error-text="请求失败，点击重新加载"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<van-cell
					v-for="(item, index) in articles"
					:key="item._id"
					:to="`/details/${item._id}?from=home`"
				>
					<h2>{{ index + 1 }}.{{ item.title }}</h2>
					<p>{{ item.des }}</p>
				</van-cell>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data () {
			return {
				banners: [],
				articles: [],
				loading: false,
				finished: false,
				error: false,
				refreshing: false,
			};
		},
		mounted () {
			this.$axios.get('/news/banner', {
				params: {
					_limit: 4,
				},
			}).then(res => {
				res.err || (this.banners = res.data);
			}).catch(err => console.log(err));
		},
		methods: {
			onLoad () {
				this.loading = true; // 把加载状态改为真，表示加载中
				if (this.refreshing) {
					this.articles = [];
					this.refreshing = false;
				}
				// 向服务器请求数据
				this.$axios.get('/news/home', {
					params: {
						// 当前数据的长度 / 每次获取的数量 = 要获取的目标页数
						_page: Number(this.articles.length / 30),
						_limit: 30,
					},
				}).then(res => {
					if (!res.err) {
						// Toast('刷新成功');
						this.loading = false; // 把加载状态设置false表示加载结束
						// 把当前的列表数据和res返回的data数据合并到一个新的数组中然后重新赋值到当前的列表数据
						// 然后数据改了dom就会重新渲染
						this.articles = [...this.articles, ...res.data];
					}
					// 这个是我的写法，如果当前获取的这一页的数据不够30条，表示数据获取完了，把结束状态设为真
					this.finished = res.data.length < 30;
				}).catch(() => this.error = true);
			},
			onRefresh () {
				// 清空列表数据
				this.finished = false;
				
				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.onLoad();
			},
			goToDetails (_id) {
				this.$router.push(`/details/${_id}?from=banner`);
			}
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
				height: 0.7rem;
				padding: 0 0.2rem;
				color: #FFF;
				background: rgba(0, 0, 0, 0.5);
			}
			
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
			
			p {
				line-height: 100%;
			}
		}
	}
</style>
