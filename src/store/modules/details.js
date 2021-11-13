import axios from "@/plugins/axios";
import formatTime from "@/utils/formatTime";

const state = {
	articleDetails: {},
	loading: false,
	showShare: false,
	options: [
		[
			{name: '微信', icon: 'wechat'},
			{name: '朋友圈', icon: 'wechat-moments'},
			{name: '微博', icon: 'weibo'},
			{name: 'QQ', icon: 'qq'},
		],
		[
			{name: '复制链接', icon: 'link'},
			{name: '分享海报', icon: 'poster'},
			{name: '二维码', icon: 'qrcode'},
			{name: '小程序码', icon: 'weapp-qrcode'},
		],
	],
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
	setShowShare: (state, payload) => state.showShare = payload.showShare,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
