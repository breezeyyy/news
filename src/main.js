import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "./router";

Vue.config.productionTip = false;

// 全局CSS
import "./assets/css/global.scss";
// 自适应字体
// import "./assets/js/font"
// 配置好的axios
import "./plugins/axios";
// vant组件
import "./plugins/vant";
//引入服务器地址
import {url} from './server.js';

Vue.prototype.$serverUrl = url;


new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
