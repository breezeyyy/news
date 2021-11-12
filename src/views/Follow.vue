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
					v-for="(item, index) in getArticles"
					:key="item._id"
					:to="`/details/${item._id}?from=follow`"
				>
					<h2>{{ index + 1 }}.{{ item.title }}</h2>
					<p>{{ item.des }}</p>
				</van-cell>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {mapActions, mapMutations, mapState} from "vuex";
	import {throttle} from "lodash/function";
	
	export default {
		name: "Follow",
		methods: {
			...mapActions('follow', ['articles', 'refresh']),
			...mapMutations('follow', ['setRefreshing', 'setLoading']),
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
			// 双向绑定状态
			refreshingFlag: {
				get () {
					return this.$store.state.follow.refreshing
				},
				set (refreshing) {
					this.setRefreshing({
						refreshing
					})
				}
			},
			loadingFlag: {
				get () {
					return this.$store.state.follow.loading
				},
				set (loading) {
					this.setLoading({
						loading
					})
				}
			},
			// 仅获取
			...mapState('follow', {
				getFinished: state => state.finished,
				getError: state => state.error,
				getArticles: state => state.articles,
			})
		},
	}
</script>

<style scoped>

</style>
