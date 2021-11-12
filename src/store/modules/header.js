const state = {
	active: null,
	pages: ['/home', '/follow', '/column',],
	animateVal: false,
};

const getters = {
	nextPath: state => state.pages[state.active],
};

const actions = {
	createActive ({state, commit}, routerPath) {
		commit('setActive', {
			active: state.pages.indexOf(routerPath),
		});
	},
};

const mutations = {
	setActive: (state, payload) => state.active = payload.active,
	setAnimateVal: (state, payload) => state.animateVal = payload.animateVal,
};


export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
