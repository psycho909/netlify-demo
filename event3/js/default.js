import { MessageLB, LBGuide, LBSelectGame, LBLogin, LBLoginSuccess, LBWarm, gameList, LBSDataShare, LBSGetSn, LBLogout } from "./lightbox.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import { Init } from "./api.js";
import useEventStore from "./store.js";
import page1 from "./components/page1.js";
import page2 from "./components/page2.js";
import topBar from "./components/topbar.js";

// LBGuide();

// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

const pinia = Pinia.createPinia();
const { storeToRefs } = Pinia;

let app = Vue.createApp({
	components: {
		page1,
		page2,
		topBar
	},
	setup() {
		const store = useEventStore();
		let token = Vue.ref("");
		// let page = Vue.computed(() => store.page);
		const currentPage = Vue.computed(() => store.page);
		// let gameList = Vue.computed(() => store.gameList);
		Vue.onMounted(() => {});
		return { currentPage, token };
	}
});
app.use(pinia);
app.mount("#app");
