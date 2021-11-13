<template>
	<div class="content" v-if="getUser.icon">
		<div class="header">
			<van-image
				round
				width="0.7rem"
				height="0.7rem"
				:src="$serverUrl+getUser.icon"
			/>
			<div class="user">
				<p>{{ getUser.nikename }}</p>
				<a
					href="javascript:"
					class="logout"
					@click="loginOut"
				>&nbsp;&nbsp;&nbsp;退出</a>
			</div>
			<ul class="clearfix">
				<li>
					<span>{{ getUser.follow }}</span>
					<p>关注</p>
				</li>
				<li>
					<span>{{ getUser.fans }}</span>
					<p class="end">粉丝</p>
				</li>
			</ul>
		</div>
		<van-grid
			clickable
			:border="false"
		>
			<van-grid-item
				icon="star"
				text="收藏"
				style="color: #FF6034"
			/>
			<van-grid-item
				icon="underway"
				text="历史"
				style="color: #7FC83C"
			/>
			<van-grid-item
				icon="chat"
				text="评论"
				style="color: #599CDB"
			/>
			<van-grid-item
				icon="comment"
				text="消息"
				style="color: #F3AF3E"
			/>
		</van-grid>
		<van-cell
			center
			is-link
			title="公开博文"
			icon="orders-o"
			:value="getUser.pubArt"
			style="margin-top: .1rem"
		/>
		<van-cell
			center
			is-link
			title="秘密博文"
			icon="closed-eye"
			:value="getUser.priArt"
		/>
		<van-cell
			center
			is-link
			title="草稿箱"
			icon="records"
			:value="getUser.draArt"
		/>
		<van-cell
			center
			is-link
			title="收藏夹"
			icon="pending-payment"
			:value="getUser.favorite"
		/>
		<van-cell
			center
			is-link
			title="发现"
			icon="eye-o"
			style="margin-top: .1rem"
		/>
		<van-cell
			center
			is-link
			title="我的礼包"
			icon="point-gift-o"
		/>
		<van-cell
			center
			is-link
			title="更多设置"
			icon="setting-o"
			style="margin-top: .1rem"
		/>
	</div>
</template>

<script>
	import {mapActions, mapState} from "vuex";
	import Cookie from "js-cookie";
	
	export default {
		name: "user",
		beforeMount () {
			this.user(this.$router);
		},
		methods: {
			...mapActions('user', ['user']),
			loginOut () {
				Cookie.remove('token');
				this.$router.replace('/login');
			},
		},
		computed: {
			...mapState('user', {
				getUser: state => state.user,
			})
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 6.2rem;
		width: 100%;
		background: #F8F8F8;
		
		.header {
			position: relative;
			height: 30%;
			background: linear-gradient(to top, #FF6034, #EE0A24);
			overflow: hidden;
			
			.van-image {
				position: absolute;
				top: 30%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			
			.user {
				display: flex;
				align-items: center;
				justify-content: center;
				height: .3rem;
				margin-top: 1rem;
				
				p, a {
					font-size: 16px;
					color: #FFFFFF;
				}
			}
			
			ul {
				display: flex;
				align-items: center;
				justify-content: center;
				height: .5rem;
				
				li {
					position: relative;
					float: left;
					width: 50%;
					font-size: 16px;
					color: #FFFFFF;
					text-align: center;
					
					&:first-child::after {
						content: '';
						position: absolute;
						top: 50%;
						right: 0;
						width: 1px;
						height: 20px;
						background-color: #FFF;
					}
				}
			}
		}
		
		.van-cell {
			background-color: #FFF;
		}
	}
</style>
