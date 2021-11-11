<template>
	<div class="content">
		<div class="header">
			<van-image
				round
				width="0.7rem"
				height="0.7rem"
				:src="$serverUrl+user.icon"
			/>
			<div class="user">
				<p>{{ user.nikename }}</p>
				<a
					href="javascript:"
					class="logout"
					@click="loginOut"
				>&nbsp;&nbsp;&nbsp;退出</a>
			</div>
			<ul class="clearfix">
				<li>
					<span>{{ user.follow }}</span>
					<p>关注</p>
				</li>
				<li>
					<span>{{ user.fans }}</span>
					<p class="end">粉丝</p>
				</li>
			</ul>
		</div>
		<van-cell
			center
			is-link
			title="公开博文"
			icon="location-o"
			:value="user.pubArt"
		/>
		<van-cell
			center
			is-link
			title="秘密博文"
			icon="location-o"
			:value="user.priArt"
		/>
		<van-cell
			center
			is-link
			title="草稿箱"
			icon="location-o"
			:value="user.draArt"
		/>
		<van-cell
			center
			is-link
			title="收藏夹"
			icon="location-o"
			:value="user.favorite"
		/>
		<van-cell
			center
			title="设置"
			icon="location-o"
		/>
	</div>
</template>

<script>
	import Cookie from "js-cookie";
	
	export default {
		name: "user",
		data () {
			return {
				user: {
					icon: "images/loading.gif",
				},
			};
		},
		beforeMount () {
			const token = Cookie.get('token');
			token || this.$router.replace('/login');
			this.$axios.get('/user', {
				headers: {
					token,
				},
			}).then(res => this.user = res.data)
			.catch(err => console.log(err));
		},
		methods: {
			loginOut () {
				Cookie.remove('token');
				this.$router.replace('/login');
			},
		},
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
