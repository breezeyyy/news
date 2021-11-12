const state = {
	active: null,
};

const getters = {};

const actions = {
	judgeActive ({commit}, router) {
		commit('setActive', {
			active: router.currentRoute.fullPath === '/user' ? 2 : 0,
		});
	},
};

const mutations = {
	setActive: (state, payload) => state.active = payload.active,
};


export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
