<template>
	<div class="articleDetails">
		<van-nav-bar
			title="文章详情"
			left-text="返回"
			left-arrow
			fixed
			placeholder
			safe-area-inset-top
			@click-left="$router.go(-1)"
		/>
		<van-skeleton
			title
			avatar
			:row="16"
			title-width="50%"
			avatar-size="50px"
			:loading="loadingFlag"
		>
			<div class="content" v-if="getArticleDetails.detail">
				<div class="header clear">
					<h2><img :src="getArticleDetails.detail.auth_icon"/></h2>
					<p>{{ getArticleDetails.detail.auth }}</p></div>
				<div class="cont">
					<h3>{{ getArticleDetails.title }}</h3>
					<div class="time">
						<p>{{ calcTime }}
							<span><img src="../assets/images/zan.png" alt=""/></span>
						</p>
					</div>
					<div class="text-box">{{ getArticleDetails.detail.content }}</div>
				</div>
			</div>
			<van-tabbar
				route
				placeholder
				active-color="#5477b2"
				inactive-color="#9e9a95"
			>
				<van-tabbar-item
					icon="home-o"
				>评论
				</van-tabbar-item>
				<van-tabbar-item
					icon="friends-o"
				>点赞
				</van-tabbar-item>
				<van-tabbar-item
					icon="friends-o"
				>收藏
				</van-tabbar-item>
				<van-tabbar-item
					icon="friends-o"
				>分享
				</van-tabbar-item>
			</van-tabbar>
		</van-skeleton>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapState} from "vuex";
	
	export default {
		name: "Details",
		created () {
			this.articleDetails({
				from: this.$route.query.from,
				_id: this.$route.params._id,
			});
		},
		methods: {
			...mapActions('details', ['articleDetails']),
		},
		computed: {
			...mapGetters('details', ['calcTime']),
			...mapState('details', {
				getArticleDetails: state => state.articleDetails,
			}),
			loadingFlag: {
				get () {
					return this.$store.state.details.loading
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

<style scoped lang="scss">
	html, body {
		overflow-x: hidden;
	}
	
	.content {
		max-width: 6.4rem;
		margin: 0 auto 0;
		background: #F2F4F5;
		padding-bottom: 0.53rem;
	}
	
	.content .header {
		padding: 0.23rem 0.16rem 0.08rem;
		height: 0.86rem;
		background: none
	}
	
	.header h2 {
		float: left;
		margin-right: 0.18rem;
		width: 0.5rem;
		height: 0.5rem
	}
	
	.header h2 img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.header p {
		float: left;
		margin-top: 0.18rem;
		font-size: 18px;
	}
	
	.content .cont {
		padding: 0 0.22rem;
		color: #494D4D;
	}
	
	.cont h3 {
		font-size: 23px;
		line-height: 0.35rem;
		padding-bottom: 0.14rem;
		border-bottom: 1px solid #494D4D;
	}
	
	.cont .time {
		height: 0.14rem;
		margin: 0.15rem 0;
	}
	
	.time p {
		float: left;
		position: relative;
	}
	
	.time span {
		width: 0.19rem;
		height: 0.19rem;
		position: absolute;
		top: -0.02rem;
		right: -0.35rem;
	}
	
	.time span img {
		width: 100%;
		height: 100%;
	}
	
	.cont .text-box {
		font-size: 15px;
	}
	
	.text-box p {
		line-height: 0.45rem;
		margin-bottom: 0.1rem;
	}
</style>
