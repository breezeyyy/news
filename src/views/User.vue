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
		<van-cell
			center
			is-link
			title="公开博文"
			icon="location-o"
			:value="getUser.pubArt"
		/>
		<van-cell
			center
			is-link
			title="秘密博文"
			icon="location-o"
			:value="getUser.priArt"
		/>
		<van-cell
			center
			is-link
			title="草稿箱"
			icon="location-o"
			:value="getUser.draArt"
		/>
		<van-cell
			center
			is-link
			title="收藏夹"
			icon="location-o"
			:value="getUser.favorite"
		/>
		<van-cell
			center
			title="设置"
			icon="location-o"
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
	body {
		background: #F2F4F5;
	}
	
	.content {
		height: 6.2rem;
		width: 100%;
		
		.header {
			position: relative;
			height: 30%;
			margin-bottom: 0.2rem;
			background-color: #9E9A95;
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
		
		.van-cell:last-child {
			margin-top: .2rem;
		}
	}
</style>
