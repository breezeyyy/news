import {
	Tab,
	Tabs,
	Tabbar,
	TabbarItem,
	Swipe,
	SwipeItem,
	List,
	Cell,
	PullRefresh,
	NavBar,
	Skeleton,
	Lazyload,
	Form,
	Field,
	Button,
	Image as VanImage,
	Uploader,
	Loading,
	Search,
	Icon,
	ShareSheet,
	Divider,
	Grid,
	GridItem,
} from 'vant';
import Vue from "vue";

// 懒加载
Vue.use(Lazyload);
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
Vue.use(PullRefresh);
// 导航栏
Vue.use(NavBar);
// 骨架屏
Vue.use(Skeleton);
// 表单输入
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
// 个人中心
Vue.use(VanImage);
// 文件上传
Vue.use(Uploader);
Vue.use(Loading);
Vue.use(Search);
Vue.use(Icon);
Vue.use(ShareSheet);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
