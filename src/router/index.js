import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'AppHeader',
		component: () => import(/* webpackChunkName: "AppHeader" */'@/components/AppHeader'),
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import(/* webpackChunkName: "Home" */'@/views/Home'),
			}, {
				path: 'follow',
				name: 'follow',
				component: () => import(/* webpackChunkName: "Follow" */'@/views/Follow'),
			}, {
				path: 'column',
				name: 'column',
				component: () => import(/* webpackChunkName: "Column" */'@/views/Column'),
			},
		]
	}, {
		path: '/details/:_id',
		name: 'details',
		component: () => import(/* webpackChunkName: "Details" */'@/views/Details'),
	}, {
		path: '/user',
		name: 'user',
		component: () => import(/* webpackChunkName: "User" */'@/views/User'),
	}, {
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "Login" */'@/views/Login'),
	}, {
		path: '/reg',
		name: 'reg',
		component: () => import(/* webpackChunkName: "Reg" */'@/views/Reg'),
	}, {
		path: '*',
		name: 'noPage',
		component: () => import(/* webpackChunkName: "NoPage" */'@/views/NoPage'),
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
