import Vue from "vue";
import axios from "axios";

// 请求拦截器
axios.interceptors.request.use(config => {
	config.baseURL = '/api/'; // 设置基准Url请求
	config.headers = { // 携带token
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqaiIsIl9pZCI6IjYxNzM2MWVkMmQ0OWFhMTFjNmQ3MjhlNCIsImlhdCI6MTYzNjAyNDkwNSwiZXhwIjoxNjM2MTExMzA1fQ.dye6zsP8EQ-YjzvUDOHctqS7rLdf-RhdnNrM-4qvf50",
	};
	
	/* 可控制请求发出后显示loading…… */
	
	return config;
}, error => {
	return Promise.reject(error);
});

// 相应拦截器
axios.interceptors.response.use(response => {
	/* 可控制请求响应后隐藏loading…… */
	return response.data;
}, error => {
	return Promise.reject(error);
});

Vue.prototype.$axios = axios;
export default axios;

// axios实例配置
/*
 export default axios.create({
 baseURL: '/api/',
 headers: {
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqaiIsIl9pZCI6IjYxNzM2MWVkMmQ0OWFhMTFjNmQ3MjhlNCIsImlhdCI6MTYzNjAyNDkwNSwiZXhwIjoxNjM2MTExMzA1fQ.dye6zsP8EQ-YjzvUDOHctqS7rLdf-RhdnNrM-4qvf50",
 }
 });*/