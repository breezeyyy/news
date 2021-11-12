import axios from "@/plugins/axios";

const state = {
	articles: [],
	loading: false,
	finished: false,
	error: false,
	refreshing: false,
};

const getters = {};

const actions = {
	articles ({state, commit}, {_limit, _page} = {}) {
		state.refreshing && commit('setArticles', {
			articles: [],
		});
		axios.get('/news/column', {
			params: {
				_limit: _limit ?? 30,
				_page: _page ?? Number(state.articles.length / (_limit ?? 30)),
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
		dispatch('articles');
	},
};

const mutations = {
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
