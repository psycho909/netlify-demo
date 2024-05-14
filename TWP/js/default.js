import { Guide, MessageLB, Notice, Warning, SelectNot, SelectPlundered, SelectPlunderSuccess, SelectPlunderFailed, SelectCreate, SelectCreated, PreProtect, PreCD, PlunderSuccess, Plundered, PlunderFailed } from "./lightbox.js";
import navBar from "./components/navBar.js";
import top from "./components/top.js";
import entrance from "./pages/entrance.js";
import selected from "./pages/selected.js";
import create from "./pages/create.js";
import plunder from "./pages/plunder.js";
import pinia from "./pinia.js";
import useEventStore from "./store.js";
import { getAndRemoveQueryStringInsensitive, setCookie, getCookie } from "./utils.js";
// SelectPlunderFailed();
// MessageLB("MessageLB");
// Plundered();
Guide();
const { storeToRefs } = Pinia;
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
let app = Vue.createApp({
	components: {
		"nav-bar": navBar,
		top,
		entrance,
		selected,
		plunder,
		create
	},
	setup() {
		const store = useEventStore();
		const { titleData } = storeToRefs(store);
		let token = Vue.ref("");
		let currentPage = Vue.ref("create");
		Vue.watch(storeToRefs(store).currentPage, (val) => {
			currentPage.value = val;
			document.querySelector("#app").setAttribute("class", "");
			document.querySelector("#app").classList.add(val);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
		Vue.onMounted(() => {
			let cookie = getCookie("TWPEvent");
			// let selectedItemId = localStorage.getItem("selectedItemId");
			// 如果有cookie，則是已經登入過
			if (cookie) {
				// 判斷是否有稱號招喚過並未送出
				// if (titleData.value.length < 3) {
				// 	if (selectedItemId) {
				// 		// 打API
				// 	}
				// }
				// 取得使用者角色資料(cookie);
				// 進入稱號招喚頁面
				// store.setCurrentPage("create");
			}
			// 如果有URL?queryString DDDD並有token，則是其他頁面跳轉過來
			if (getAndRemoveQueryStringInsensitive("DDDD")) {
				// 打API獲取角色資訊及Token
				// Token存入Cookie
				// 判斷是否有稱號招喚過並未送出
				// if (titleData.value.length < 3) {
				// 	if (selectedItemId) {
				// 		// 打API
				// 	}
				// }
			}
			// 如果有URL?queryString OTT並有token，則是login頁面跳轉過來
			if (getAndRemoveQueryStringInsensitive("OTT")) {
				// 打API獲取角色資訊及Token
				// Token存入Cookie
				// 判斷是否有稱號招喚過並未送出
				// if (titleData.value.length < 3) {
				// 	if (selectedItemId) {
				// 		// 打API
				// 	}
				// }
			}
		});
		return { currentPage };
	}
});

app.use(pinia);
app.mount("#app");
