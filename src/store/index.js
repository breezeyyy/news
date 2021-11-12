import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import header from "@/store/modules/header";
import footer from "@/store/modules/footer";
import home from "@/store/modules/home";
import follow from "@/store/modules/follow";
import column from "@/store/modules/column";
import details from "@/store/modules/details";
import user from "@/store/modules/user";

export default new Vuex.Store({
	state: {
		footerFlag: true,
	},
	mutations: {
		setFooterFlag: (state, payload) => state.footerFlag = payload.footerFlag,
	},
	actions: {
		footerFlag ({commit}, routerPath) {
			commit('setFooterFlag', {
				// 以下路由会显示导航栏
				footerFlag: /home|follow|column|user/.test(routerPath),
			});
		},
	},
	modules: {
		header,
		footer,
		home,
		follow,
		column,
		details,
		user,
	}
})
