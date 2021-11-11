<template>
	<div id="app">
		<router-view/>
		<app-footer v-show="footerFlag"/>
	</div>
</template>

<script>
	import AppFooter from "@/components/AppFooter";
	
	export default {
		name: "app",
		components: {
			AppFooter,
		},
		data () {
			return {
				footerFlag: true,
			};
		},
		beforeMount () {
			this.footerFlag = /home|follow|column|user/.test(this.$route.path);
		},
		watch: {
			$route (value) {
				this.footerFlag = /home|follow|column|user/.test(value.path);
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