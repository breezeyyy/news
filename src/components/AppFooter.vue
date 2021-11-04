<template>
	<van-tabbar
		v-model="active"
		route
		active-color="#5477b2"
		inactive-color="#9e9a95"
	>
		<van-tabbar-item
			icon="home-o"
			to="/"
		>首页
		</van-tabbar-item>
		<van-tabbar-item
			class="write"
			to="/write"
		></van-tabbar-item>
		<van-tabbar-item
			icon="friends-o"
			to="/user"
		>我的
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		name: "AppFooter",
		data () {
			return {
				active: 1,
			}
		}
	}
</script>

<style scoped lang="scss">
	/*.appFooter {*/
	/*	position: fixed;*/
	/*	bottom: 0;*/
	/*}*/
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