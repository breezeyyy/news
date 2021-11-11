<template>
	<van-tabbar
		v-model="active"
		placeholder
		active-color="#5477b2"
		inactive-color="#9e9a95"
	>
		<van-tabbar-item
			icon="home-o"
			to="/home"
		>首页
		</van-tabbar-item>
		<van-tabbar-item
			to="/write"
			class="write"
		></van-tabbar-item>
		<van-tabbar-item
			to="/user"
			icon="friends-o"
		>我的
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		name: "AppFooter",
		data () {
			return {
				active: null,
			}
		},
		created () {
			this.judgeActive();
		},
		updated () {
			this.judgeActive();
		},
		beforeRouteUpdate () {
			this.judgeActive();
		},
		methods: {
			judgeActive () {
				this.active = this.$router.currentRoute.fullPath === '/user' ? 2 : 0;
			},
		}
	}
</script>

<style scoped lang="scss">
	.write {
		height: 100%;
		
		background: {
			image: url("../assets/images/write.png");
			repeat: no-repeat;
			position: 50% 0;
			size: contain;
		}
		
	}
</style>
