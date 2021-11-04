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
import {Tab, Tabs, Tabbar, TabbarItem, Swipe, SwipeItem, List, Cell} from 'vant';
// 标签页
Vue.use(Tab);
Vue.use(Tabs);
// 标签栏
Vue.use(Tabbar);
Vue.use(TabbarItem);
// 轮播图
Vue.use(Swipe);
Vue.use(SwipeItem);
// 数据列表
Vue.use(List);
Vue.use(Cell);

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");