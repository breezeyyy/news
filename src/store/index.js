import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from "@/store/modules/global";
import header from "@/store/modules/header";
import footer from "@/store/modules/footer";
import home from "@/store/modules/home";
import follow from "@/store/modules/follow";
import column from "@/store/modules/column";
import details from "@/store/modules/details";
import user from "@/store/modules/user";

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		app,
		header,
		footer,
		home,
		follow,
		column,
		details,
		user,
	}
})
