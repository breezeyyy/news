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
			>
				<img v-lazy="item.banner"/>
				<div class="text-box">
					<h2>{{ item.title }}</h2>
					<p>{{ item.detail.auth }} /文</p>
				</div>
			</van-swipe-item>
		</van-swipe>
		<!--		数据列表-->
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-cell
				v-for="(item, index) in articles"
				:key="item._id"
			>
				<h2>{{ index + 1 }}.{{ item.title }}</h2>
				<p>{{ item.des }}</p>
			</van-cell>
		</van-list>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {Lazyload} from 'vant';
	
	Vue.use(Lazyload);
	
	export default {
		name: 'Home',
		data () {
			return {
				banners: [],
				articles: [],
				loading: false,
				finished: false,
			};
		},
		mounted () {
			this.$axios.get('/news/banner', {
				params: {
					_limit: 4,
				},
			}).then(res => {
				// console.log(res.err);
				res.err || (this.banners = res.data);
			}).catch(err => console.log(err));
			// this.$axios.get('/news/home', {
			// 	params: {
			// 		_limit: 30,
			// 	},
			// }).then(res => {
			// 	if (!res.err) {
			// 		this.loading = false;
			// 		this.articles = [...this.articles, ...res.data];
			// 	}
			// 	console.log(this.articles);
			// 	this.finished = res.data.length < 30;
			// }).catch(err => console.log(err));
		},
		methods: {
			onLoad () {
				this.loading = true;
				this.$axios.get('/news/home', {
					params: {
						_page: this.articles.length / 30 + 1,
						_limit: 30,
					},
				}).then(res => {
					if (!res.err) {
						this.loading = false;
						this.articles = [...this.articles, ...res.data];
					}
					this.finished = res.data.length < 30;
				}).catch(err => console.log(err));
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