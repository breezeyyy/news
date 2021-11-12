import axios from "@/plugins/axios";
import formatTime from "@/utils/formatTime";

const state = {
	articleDetails: {},
	loading: false,
};

const getters = {
	calcTime: state => formatTime(state.articleDetails.time),
};

const actions = {
	articleDetails ({commit}, {from, _id} = {}) {
		commit('setLoading', {
			loading: true,
		});
		axios.get(`/news/${from}/${_id}`)
		.then(res => {
			if (!res.err) {
				commit('setLoading', {
					loading: false,
				});
				commit('setArticleDetails', {
					articleDetails: res.data,
				});
			}
		}).catch(err => console.log(err));
	},
};

const mutations = {
	setArticleDetails: (state, payload) => state.articleDetails = payload.articleDetails,
	setLoading: (state, payload) => state.loading = payload.loading,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
