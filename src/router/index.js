import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Follow from '../views/Follow.vue';
import Column from '../views/Column.vue';
import AppHeader from "@/components/AppHeader";
import Details from "@/views/Details";
import User from "@/views/User";
import Login from "@/views/Login";
import Reg from "@/views/Reg";
import NoPage from "@/views/NoPage";


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'AppHeader',
		component: AppHeader,
		children: [
			{
				path: 'home',
				name: 'home',
				component: Home
				,
			}, {
				path: 'follow',
				name: 'follow',
				component: Follow,
			}, {
				path: 'column',
				name: 'column',
				component: Column,
			},
		]
	}, {
		path: '/details/:_id',
		name: 'details',
		component: Details,
	}, {
		path: '/user',
		name: 'user',
		component: User,
	}, {
		path: '/login',
		name: 'login',
		component: Login,
	}, {
		path: '/reg',
		name: 'reg',
		component: Reg,
	}, {
		path: '*',
		name: 'noPage',
		component: NoPage,
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;