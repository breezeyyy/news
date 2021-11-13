<template>
	<div id="app">
		<router-view/>
		<app-footer v-show="getFooterFlag"/>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import AppFooter from "@/components/AppFooter";
	
	export default {
		name: "app",
		components: {
			AppFooter,
		},
		methods: {
			...mapActions(["footerFlag"]),
		},
		// 不知道这一段干嘛的，但注释了也能跑
		// beforeMount () {
		// 	this.setFooterFlag(this.$route.path)
		// 	this.setFooterFlag = /home|follow|column|user/.test(this.$route.path);
		// },
		watch: {
			$route (value) {
				this.footerFlag(value.path);
			}
		},
		computed: {
			...mapState({
				getFooterFlag: state => state.footerFlag,
			}),
		},
	}
</script>

<style lang="scss">
	.van-tabs__nav {
		padding: {
			left: 0.5rem;
			right: 0.5rem;
		};
	}
	
	.appHeader .van-cell__left-icon {
		width: 0.5rem;
		height: 0.5rem;
	}
	
	.appHeader .van-icon__image {
		width: 100%;
		height: 100%;
	}
	
	.van-nav-bar {
		.van-icon {
			color: #EE0A24 !important;
		}
		
		.van-nav-bar__text {
			color: #EE0A24 !important;
		}
	}
	
	.auth {
		
		.van-button {
			position: relative;
			top: -4px;
			padding: 0 0.1rem 0 0;
		}
	}
	
	.articleDetails {
		.van-grid {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
		
		.van-grid-item__content {
			padding: 0.08rem 0.05rem;
			
			.van-field {
				height: 0.28rem;
				border-radius: 0.18rem;
				background-color: #E5E4E4;
				color: #333;
			}
			
			.van-grid-item__icon {
				font-size: 22px;
			}
		}
	}
</style>
