<template>
	<div id="app">
		<router-view/>
		<app-footer v-show="$store.state.app.footerFlag"/>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	import AppFooter from "@/components/AppFooter";
	
	export default {
		name: "app",
		components: {
			AppFooter,
		},
		methods: {
			...mapActions('app', ["footerFlag"]),
		},
		// 不知道这一段干嘛的，但注释了也能跑
		// beforeMount () {
		// this.setFooterFlag(this.$route.path)
		// this.setFooterFlag = /home|follow|column|user/.test(this.$route.path);
		// },
		watch: {
			$route (value) {
				this.footerFlag(value.path);
			}
		}
	}
</script>

<style lang="scss">
	.van-tabs__nav {
		padding: {
			left: 0.5rem;
			right: 0.5rem;
		};
	}
</style>
