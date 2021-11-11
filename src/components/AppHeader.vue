<template>
	<div class="appHeader">
		<van-tabs
			v-model="active"
			sticky
			swipeable
			:animated="animateVal"
			color="#5477b2"
			title-active-color="#5477b2"
			title-inactive-color="#9e9a95"
			line-width="70px"
			line-height="4px"
		>
			<van-tab title="首页">
				<router-view></router-view>
			</van-tab>
			<van-tab title="关注">
				<router-view></router-view>
			</van-tab>
			<van-tab title="栏目">
				<router-view></router-view>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: "AppHeader",
		data () {
			return {
				active: null,
				pages: ['/home', '/follow', '/column',],
				animateVal: false,
			}
		},
		created () {
			this.active = this.pages.indexOf(this.$router.currentRoute.fullPath);
		},
		watch: {
			active (newVal, oldVal) {
				oldVal === null || this.$router.push(this.pages[this.active]);
				this.animateVal = true;
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
