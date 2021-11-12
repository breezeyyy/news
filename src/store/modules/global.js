const state = {
	footerFlag: true,
};

const actions = {
	footerFlag ({commit}, routerPath) {
		commit('setFooterFlag', {
			// 以下路由会显示导航栏
			footerFlag: /home|follow|column|user/.test(routerPath),
		});
	},
};

const mutations = {
	setFooterFlag: (state, payload) => state.footerFlag = payload.footerFlag,
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}
