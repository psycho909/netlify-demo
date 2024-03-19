import { MessageLB, SelectCharacterLB, GoLotteryLB, LotteryLogLB } from "./lightbox.js";
import useEventStore from "./store.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import { FindGameWorld, GetInitData, GoLottery, FindLotteryLog } from "./api.js";
import page1 from "./components/page1.js";
import page2 from "./components/page2.js";
import page3 from "./components/page3.js";
import menubar from "./components/menubar.js";
import pinia from "./pinia.js";
SelectCharacterLB([
	{
		GameWorldId: 1,
		GameWorldName: "伺服器1",
		CharacterId: 1,
		CharacterName: "角色1",
	},
	{
		GameWorldId: 2,
		GameWorldName: "伺服器2",
		CharacterId: 2,
		CharacterName: "角色2",
	},
]);
// LotteryLogLB();
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

const { storeToRefs } = Pinia;

let app = Vue.createApp({
	setup() {
		const store = useEventStore();
		store.Count++;
		let token = Vue.ref("");
		let currentPage = Vue.ref("page1");
		let logoutBtn = () => {
			deleteCookie("MapleEvent");
			window.location.href = "../../Logout/Logout.aspx";
		};
		let goLottery = () => {
			GoLotteryLB();
		};
		let lotteryLog = () => {
			LotteryLogLB();
		};
		Vue.watch(storeToRefs(store).currentPage, (val) => {
			currentPage.value = val;
		});
		Vue.onUpdated(() => {
			if (currentPage.value == "page1") {
				var element = document.querySelector(".page1");
				element.scrollIntoView({ behavior: "smooth" });
			}
		});
		Vue.onMounted(async () => {
			let cookie = getCookie("MapleEvent");
			let url;
			if (cookie) {
				token.value = cookie;
				url = location.href.split("?")[0];
				history.pushState({}, 0, url);
				store.setLogin(true);
				// try {
				// 	loadingShow();
				// 	let InitData = await Init(store.state.Token);
				// 	if (InitData.Data.GameAccountNickName == window.localStorage.getItem("Maple")) {
				// 		let ExchangeOrRecycleInitAPI = await store.dispatch("ExchangeOrRecycleInitAPI");
				// 		store.commit("SET_DATA", InitData.Data);
				// 		if (ExchangeOrRecycleInitAPI.Code == -1) {
				// 			MessageLB(ExchangeOrRecycleInitAPI.Message);
				// 		}
				// 		if (ExchangeOrRecycleInitAPI.Code == -2) {
				// 			MessageLB(ExchangeOrRecycleInitAPI.Message, ExchangeOrRecycleInitAPI.Url);
				// 		}
				// 		loadingHide();
				// 	} else {
				// 		loadingHide();
				// 	}
				// } catch (err) {
				// 	MessageLB(err.Message, err.Url);
				// 	loadingHide();
				// }
			} else {
				if ($("#hfData").val()) {
					url = location.href.split("?")[0];
					history.pushState({}, 0, url);
					FindGameWorld($("#hfData").val()).then((res) => {
						let { Code, ListData, Url, Message } = res.data;
						if (Code == -1) {
							MessageLB(Message);
							return;
						}
						if (Code == -2) {
							MessageLB(Message, Url);
							return;
						}
						SelectCharacter(ListData);
					});
				}
			}
		});
		return { goLottery, lotteryLog, logoutBtn, currentPage };
	},
	components: {
		page1,
		page2,
		page3,
		menubar,
	},
});
app.use(pinia);
app.mount("#app");
