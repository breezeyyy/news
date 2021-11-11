<template>
	<div>
		<van-pull-refresh
			v-model="refreshing"
			@refresh="onRefresh"
			success-text="刷新成功"
		>
			<van-list
				v-model="loading"
				:finished="finished"
				:error.sync="error"
				error-text="请求失败，点击重新加载"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<van-cell
					v-for="(item, index) in articles"
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
	export default {
		name: "Follow",
		data () {
			return {
				banners: [],
				articles: [],
				loading: false,
				finished: false,
				error: false,
				refreshing: false,
			};
		},
		methods: {
			onLoad () {
				this.loading = true;
				if (this.refreshing) {
					this.articles = [];
					this.refreshing = false;
				}
				this.$axios.get('/news/follow', {
					params: {
						_page: Number(this.articles.length / 30),
						_limit: 30,
					},
				}).then(res => {
					if (!res.err) {
						// Toast('刷新成功');
						this.loading = false;
						this.articles = [...this.articles, ...res.data];
					}
					this.finished = res.data.length < 30;
				}).catch(() => this.error = true);
			},
			onRefresh () {
				// 清空列表数据
				this.finished = false;
				
				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.onLoad();
			},
		},
	}
</script>

<style scoped>

</style>