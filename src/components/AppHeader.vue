<template>
	<div class="appHeader">
		<van-search
			v-model="getSearchInput"
			shape="round"
			show-action
			background="#EE0A24"
			placeholder="请输入搜索关键词"
		>
			<template #action>
				<div class="addArt">
					<van-icon
						name="add"
						color="#FFF"
						size="22px"
						:style="{
							'display': 'block',
						}"
					/>
					发布
				</div>
			</template>
		</van-search>
		<van-tabs
			v-model="getActive"
			sticky
			swipeable
			:animated="getAnimateVal"
			title-active-color="#EE0A24"
			title-inactive-color="#9e9a95"
			line-width="70px"
			line-height="4px"
		>
			<keep-alive>
				<van-tab title="首页">
					<router-view></router-view>
				</van-tab>
			</keep-alive>
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
			...mapMutations('header', ['setActive', 'setAnimateVal', 'setSearchInput']),
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
			getSearchInput: {
				get () {
					return this.$store.state.header.searchInput
				},
				set (searchInput) {
					this.setSearchInput({
						searchInput
					})
				},
			},
		},
	}
</script>

<style scoped lang="scss">
	.addArt {
		color: #FFFFFF;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
	}
	
	.van-cell__title {
		flex-grow: 7 !important;
	}

</style>
