import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import "./assets/css/global.scss";
import "./assets/js/font";

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");