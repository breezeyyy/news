<template>
	<div class="appHeader">
		<van-tabs
			v-model="getActive"
			sticky
			swipeable
			:animated="getAnimateVal"
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
	import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
	
	export default {
		name: "AppHeader",
		methods: {
			...mapActions('header', ['createActive']),
			...mapMutations('header', ['setActive', 'setAnimateVal']),
			...mapGetters('header', ['nextPath']),
		},
		created () {
			this.createActive(this.$router.currentRoute.fullPath);
		},
		watch: {
			getActive (newVal, oldVal) {
				oldVal === null || this.$router.push(this.nextPath());
				this.getAnimateVal || this.setAnimateVal({
					animateVal: true,
				});
			}
		},
		computed: {
			...mapState('header', {
				getAnimateVal: state => state.animateVal,
			}),
			getActive: {
				get () {
					return this.$store.state.header.active
				},
				set (active) {
					this.setActive({
						active
					})
				},
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
