<template>
	<!--	<div class="appHeader">-->
	<van-tabs
		v-model="active"
		sticky
		swipeable
		color="#5477b2"
		title-active-color="#5477b2"
		title-inactive-color="#9e9a95"
		line-width="70px"
		line-height="4px"
	>
		<van-tab
			title="首页"
			to="/"
		></van-tab>
		<van-tab
			title="关注"
			to="/follow"
		></van-tab>
		<van-tab
			title="栏目"
			to="/column"
		></van-tab>
	</van-tabs>
	<!--	</div>-->
</template>

<script>
	export default {
		name: "AppHeader",
		data () {
			return {
				active: 0
			}
		}
	}
</script>

<style scoped lang="scss">
	//.appHeader {
	//	padding: 0 0.5rem 0;
	//}
</style>