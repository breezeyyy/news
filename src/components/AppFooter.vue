<template>
	<van-tabbar
		v-model="getActive"
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
