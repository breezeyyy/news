import axios from "@/plugins/axios";

const state = {
	banners: [],
	current: 0,
	articles: [],
	loading: false,
	finished: false,
	error: false,
	refreshing: false,
};

const getters = {};

const actions = {
	banners ({commit}, {_limit, _page} = {}) {
		axios.get('/news/banner', {
			params: {
				_limit: _limit ?? 4,
				_page: _page ?? 0,
			}
		}).then(res => {
			res.err || commit('setBanners', {
				banners: res.data,
			});
		}).catch(err => console.log(err));
	},
	articles ({state, commit}, {_limit, _page} = {}) {
		state.refreshing && commit('setArticles', {
			articles: [],
		});
		axios.get('/news/home', {
			params: {
				_limit: _limit ?? 30,
				_page: _page ?? Number(state.articles.length / (_limit ?? 30)),
				q: '已审核',
				qSearch: 'audit',
			}
		}).then(res => {
			if (!res.err) {
				commit('setArticles', {
					articles: [...state.articles, ...res.data],
				});
				commit('setLoading', {
					loading: false,
				});
				state.refreshing && commit('setRefreshing', {
					refreshing: false,
				});
				commit('setFinished', {
					finished: res.data.length < (_limit ?? 30),
				});
			}
		}).catch(() => commit('setError', {
			error: true,
		}));
	},
	refresh ({dispatch, commit}) {
		state.finished && commit('setFinished', {
			finished: false,
		});
		commit('setLoading', {
			loading: true,
		});
		dispatch('articles');
	},
};

const mutations = {
	setBanners: (state, payload) => state.banners = payload.banners,
	setCurrent: (state, payload) => state.current = payload.current,
	setArticles: (state, payload) => state.articles = payload.articles,
	setLoading: (state, payload) => state.loading = payload.loading,
	setFinished: (state, payload) => state.finished = payload.finished,
	setError: (state, payload) => state.error = payload.error,
	setRefreshing: (state, payload) => state.refreshing = payload.refreshing,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
