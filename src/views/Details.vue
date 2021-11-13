<template>
	<div class="articleDetails">
		<van-nav-bar
			left-arrow
			fixed
			placeholder
			safe-area-inset-top
			@click-left="$router.go(-1)"
		>
			<template
				#title
				v-if="getArticleDetails.detail"
			>
				<div class="auth">
					<img :src="getArticleDetails.detail.auth_icon" alt=""/>
					<em>{{ getArticleDetails.detail.auth }}</em>
					<van-button
						round
						color="#F5F5F5"
						icon="add"
					><i style="color: #EE0A24">关注</i>
					</van-button>
				</div>
			</template>
			<template #right>
				<van-icon
					name="share"
					size="18"
					@click="share(true)"
				/>
			</template>
		</van-nav-bar>
		<van-skeleton
			title
			:row="16"
			title-width="50%"
			avatar-size="50px"
			:loading="loadingFlag"
		>
			<div class="content" v-if="getArticleDetails.detail">
				<div class="cont">
					<h3>{{ getArticleDetails.title }}</h3>
					<div class="time">
						<van-divider>{{ calcTime }}</van-divider>
					</div>
					<div class="text-box" v-html="getArticleDetails.detail.content"></div>
				</div>
			</div>
			<van-grid
				clickable
				:border="false"
			>
				<van-grid-item
					style="flex-basis: 55% !important;"
				>
					<van-field
						center
						left-icon="edit"
						placeholder="我来说两句..."
					/>
				</van-grid-item>
				<van-grid-item
					icon="comment-o"
					badge="99+"
					style="flex-basis: 15% !important;"
				/>
				<van-grid-item
					icon="good-job-o"
					style="flex-basis: 10% !important;"
				/>
				<van-grid-item
					icon="star-o"
					style="flex-basis: 10% !important;"
				/>
				<van-grid-item
					icon="share-o"
					style="flex-basis: 10% !important;"
					@click="share(true)"
				/>
			</van-grid>
		</van-skeleton>
		<van-share-sheet
			v-model="ShowShareFlag"
			title="立即分享给好友"
			:options="getShareOptions"
		/>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
	import Cookie from "js-cookie";
	
	export default {
		name: "Details",
		mounted () {
			this.articleDetails({
				from: this.$route.query.from,
				_id: this.$route.params._id,
			});
		},
		methods: {
			...mapActions('details', ['articleDetails']),
			...mapMutations('details', ['setShowShare']),
			share (showShare) {
				Cookie.get('token') ? this.setShowShare({
					showShare
				}) : this.$router.replace('/login')
			},
		},
		computed: {
			...mapGetters('details', ['calcTime']),
			...mapState('details', {
				getArticleDetails: state => state.articleDetails,
				getShareOptions: state => state.options,
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
			ShowShareFlag: {
				get () {
					return this.$store.state.details.showShare
				},
				set (showShare) {
					this.setShowShare({
						showShare
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
	
	.auth {
		height: 0.4rem;
		padding: 0 0.1rem;
		border-radius: 0.2rem;
		background-color: #F5F5F5;
		line-height: 0.37rem;
		
		img {
			width: 0.3rem;
			border-radius: 50%;
			margin-right: 0.04rem;
		}
		
		em {
			position: relative;
			display: inline-block;
			padding: 0 0.15rem 0 0;
			font-size: 14px;
			
			&::after {
				content: '';
				display: inline-block;
				position: absolute;
				top: 50%;
				right: 0.07rem;
				width: 0.01rem;
				height: 50%;
				background-color: #CCC;
				transform: translateY(-50%);
			}
		}
	}
	
	.content {
		max-width: 6.4rem;
		padding-top: 0.1rem;
		margin: 0 auto 0;
		background-color: #F5F5F5;
		padding-bottom: 0.8rem;
		
		.header {
			padding: 0.23rem 0.16rem 0.08rem;
			height: 0.86rem;
			background: none
		}
		
		.cont {
			color: #494D4D;
			text-align: center;
			
			h3 {
				padding: 0 0.4rem;
				font-size: 18px;
				letter-spacing: 1px;
				line-height: 0.3rem;
			}
			
			.time {
				height: 0.14rem;
				margin: 0 0 0.3rem 0;
				font-size: 13px;
			}
			
			.text-box {
				padding: 0 0.22rem;
				text-indent: 0.3rem;
				font-size: 16px;
				line-height: 1.7;
				text-align: left;
				background: #F2F4F5;
			}
		}
	}
</style>
