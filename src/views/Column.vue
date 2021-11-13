<template>
	<div>
		<van-pull-refresh
			v-model="refreshingFlag"
			@refresh="onRefresh"
			success-text="刷新成功"
		>
			<van-list
				v-model="loadingFlag"
				:finished="getFinished"
				:error.sync="getError"
				error-text="请求失败，点击重新加载"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<van-cell
					v-for="item in getArticles"
					:key="item._id"
					:to="`/details/${item._id}?from=column`"
					:title="item.title"
					:label="item.des"
					is-link
					center
					size="large"
					:icon="item.detail.auth_icon"
					style="padding: 0.2rem 0.1rem 0.2rem 0.2rem"
				/>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {mapActions, mapState, mapMutations} from "vuex";
	import {throttle} from "lodash/function";
	
	export default {
		name: "Column",
		methods: {
			...mapActions('column', ['articles', 'refresh']),
			...mapMutations('column', ['setRefreshing', 'setLoading']),
			// 将onLoad节流
			onLoad: throttle(function () {
				// 向服务器请求数据
				this.articles();
			}, 500),
			onRefresh: throttle(function () {
				// 向服务器请求数据
				this.refresh();
			}, 500),
		},
		computed: {
			// 仅获取
			...mapState('column', {
				getFinished: state => state.finished,
				getError: state => state.error,
				getArticles: state => state.articles,
			}),
			// 双向绑定状态
			refreshingFlag: {
				get () {
					return this.$store.state.column.refreshing
				},
				set (refreshing) {
					this.setRefreshing({
						refreshing
					})
				}
			},
			loadingFlag: {
				get () {
					return this.$store.state.column.loading
				},
				set (loading) {
					this.setLoading({
						loading
					})
				}
			},
		},
	}
</script>

<style scoped>

</style>
