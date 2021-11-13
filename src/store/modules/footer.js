const state = {
	active: null,
	headerBar: ['/home', '/follow', '/column'],
	navBar: ['/home', '/fire', '/friend', '/user'],
};

const getters = {};

const actions = {
	judgeActive ({state, commit}, router) {
		commit('setActive', {
			active: state.headerBar.includes(router.currentRoute.fullPath) ? 0 : state.navBar.indexOf(router.currentRoute.fullPath),
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
