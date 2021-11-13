<template>
	<van-tabbar
		v-model="getActive"
		placeholder
		active-color="#EE0A24"
		inactive-color="#9e9a95"
	>
		<van-tabbar-item
			icon="wap-home"
			to="/home"
		>首页
		</van-tabbar-item>
		<van-tabbar-item
			icon="fire"
		>热门
		</van-tabbar-item>
		<van-tabbar-item
			icon="friends"
		>动态
		</van-tabbar-item>
		<van-tabbar-item
			to="/user"
			icon="manager"
		>我的
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import {mapActions, mapMutations} from "vuex";
	
	export default {
		name: "AppFooter",
		created () {
			this.judgeActive(this.$router);
		},
		methods: {
			...mapActions('footer', ['judgeActive']),
			...mapMutations('footer', ['setActive']),
		},
		watch: {
			$route () {
				this.judgeActive(this.$router);
			}
		},
		computed: {
			getActive: {
				get () {
					return this.$store.state.footer.active;
				},
				set (active) {
					this.setActive({
						active,
					});
				},
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
