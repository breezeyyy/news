import axios from "@/plugins/axios";
import Cookie from "js-cookie";

const state = {
	user: {},
};

const getters = {};

const actions = {
	user ({commit}, router) {
		const token = Cookie.get('token');
		if (!token) {
			router.replace('/login');
			return;
		}
		axios.get('/user', {
			headers: {
				token,
			},
		}).then(res => commit('setUser', {
			user: res.data
		})).catch(err => console.log(err));
	},
};

const mutations = {
	setUser: (state, payload) => state.user = payload.user,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
