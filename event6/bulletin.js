import { MessageLB } from "./lightbox.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import { GetPinBullentinList } from "./api.js";
import navbar from "./components/navbar.js";
import pagination from "./components/pagination.js";
import { tabItems as configTabItems } from "./config/tabItems.js";
import { debounce } from "./tool.js";

// regionLB();
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
// 公告列表
// Language語系
// Kind 對應公告類別
// Page取的頁數
// PageSize每頁筆數
// method 4 對應 Kind 0 取得全部時
// method 3 對應 Kind XXX 單個類別
// Kind 有類別時 toAll = 1
// Kind 無類別時 toAll = 0
function sanitizeInput(input) {
	return input.replace(/</g, "").replace(/>/g, "");
}

let bulletinList = {
	components: {
		pagination
	},
	setup() {
		const tabItems = Vue.ref(configTabItems);
		let bulletinList = Vue.ref([]);
		let pinBulletins = Vue.ref([]);
		let tab = Vue.ref(0);
		let searchText = Vue.ref("");
		let currentPage = Vue.ref(1);
		let pageNumberLimit = Vue.ref(10);
		let totalPage = Vue.ref(0);
		let loading = Vue.ref(true);
		let api = false;
		$(".loadingProgress").hide();
		// 轉換日期
		const formatDate = (startDateALL, startDate) => {
			const now = new Date();
			const startTime = new Date(startDateALL);
			const diffMinutes = Math.floor((now - startTime) / (1000 * 60));

			if (diffMinutes < 30) {
				return "剛剛";
			} else {
				return startDate;
			}
		};
		// 取得公告列表
		const getBullentinList = ({ kind = 0, page = 1, pageSize = 10, searchText = "", GetPin = 1, PinType = 0 } = {}) => {
			// $(".loadingProgress").show();
			GetPinBullentinList({ kind, page, pageSize, searchText, GetPin, PinType })
				.then((res) => {
					loading.value = false;
					api = false;
					let { code, data, message, url } = res.data;
					if (code == -1) {
						MessageLB(message);
						// return;
					}
					if (code == -2) {
						MessageLB(message, url);
						return;
					}
					totalPage.value = data.totalPage;
					if (data.bulletins !== null) {
						if (data.bulletins.length > 0) {
							bulletinList.value = data.bulletins;
						} else {
							bulletinList.value = [];
						}
					} else {
						bulletinList.value = [];
					}
					if (data.pinBulletins !== null) {
						if (data.pinBulletins.length > 0) {
							pinBulletins.value = data.pinBulletins;
						} else {
							pinBulletins.value = [];
						}
					} else {
						pinBulletins.value = [];
					}
				})
				.catch((error) => {
					loading.value = false;
					console.log(error);
				});
		};
		// 計算是否顯示分頁
		const showPagination = Vue.computed(() => {
			return !loading.value && bulletinList.value.length > 0 && totalPage.value > 0;
		});
		// 初始化
		Vue.onMounted(() => {
			// 取得公告類別
			let kind = new URLSearchParams(location.search).get("kind");
			if (kind) {
				getBullentinList({ kind });
				tab.value = kind;
			} else {
				getBullentinList();
			}
			// 判斷在手機pageNumberLimit:5
			if (isMobile.any) {
				pageNumberLimit.value = 5;
			}
		});
		// 切換公告類別
		const handleTab = debounce((item) => {
			if (api) {
				return;
			}
			tab.value = item.tab;
			api = true;
			loading.value = true;
			let query = {
				kind: tab.value,
				searchText: searchText.value,
				GetPin: 1,
				PinType: 0
			};
			getBullentinList(query);
			currentPage.value = 1;
		}, 100);
		// 搜尋
		const handleSearch = () => {
			if (api) {
				return;
			}
			api = true;
			searchText.value = sanitizeInput(searchText.value);
			if (searchText.value.match(/<[^>]+>/g)) {
				searchText.value = searchText.value.replace(/<[^>]+>/g, "");
			}
			loading.value = true;
			getBullentinList({ kind: tab.value, searchText: searchText.value, GetPin: 0, PinType: -1 });
			// searchText.value = "";
			currentPage.value = 1;
		};
		// 更新頁數
		const handlePageUpdate = (newPage) => {
			if (api) {
				return;
			}
			api = true;
			currentPage.value = newPage;
			loading.value = true;
			getBullentinList({ kind: tab.value, page: currentPage.value, searchText: searchText.value });
		};
		// 轉換公告類別
		const convertLabel = (label) => {
			if (!label) return "";
			// 當label在tabItems中的type，如果沒有就換查找tabItems中的tab，如果都沒有就回傳空字串
			const findItem = tabItems.value.find((item) => item.type == label);
			if (findItem) {
				return findItem.label;
			}
			const findItemTab = tabItems.value.find((item) => item.tab == label);
			return findItemTab ? findItemTab.label : "系統";
		};
		const convertClass = (label) => {
			if (!label) return "";
			// 當label在tabItems中的type，如果沒有就換查找tabItems中的tab，如果都沒有就回傳空字串
			const findItem = tabItems.value.find((item) => item.type == label);
			if (findItem) {
				return findItem.class;
			}
			const findItemTab = tabItems.value.find((item) => item.tab == label);
			return findItemTab ? findItemTab.class : "system";
		};
		return {
			convertLabel,
			convertClass,
			bulletinList,
			tab,
			handleTab,
			searchText,
			handleSearch,
			currentPage,
			pageNumberLimit,
			totalPage,
			handlePageUpdate,
			loading,
			tabItems,
			showPagination,
			formatDate,
			pinBulletins
		};
	},
	template: `
	<div class="annc-container">
		<div class="annc-title">公告資訊</div>
		<div class="annc-search">
			<div class="annc-search__box">
				<input type="text" class="annc-search__input" v-model="searchText" placeholder="輸入關鍵字" inputmode="search" @keydown.enter="handleSearch" />
				<a href="javascript:;" class="annc-search__btn" @click="handleSearch">搜尋</a>
			</div>
		</div>
		<main class="annc-content">
			<div class="annc-tab">
				<a v-for="item in tabItems" :key="item.type" href="javascript:;" class="annc-tab__item" :class="{ active: tab == item.tab }" :data-type="item.type" @click="handleTab(item)">
					<span>{{ item.label }}</span>
				</a>
			</div>
			<div class="annc-list" :class="[loading ? 'loading':'', bulletinList.length > 0 ? '' : '--empty']">
				<template v-if="pinBulletins.length > 0 && !loading">
					<a :href="[bulletin.urlLink ? bulletin.urlLink : '/BulletinDetail?Bid='+bulletin.bullentinId]" class="annc-list__item pin" v-for="bulletin in pinBulletins" v-memo="[bulletin.bullentinId, bulletin.title, bulletin.startDate]">
						<div class="annc-list__item-label" :data-label="bulletin.bullentinCatId" :class="['label-'+convertClass(bulletin.bullentinCatId)]"><span>{{convertLabel(bulletin.bullentinCatId)}}</span></div>
						<div class="annc-list__item-title">{{bulletin.title}}</div>
						<div class="annc-list__item-date">{{ formatDate(bulletin.startDateALL, bulletin.startDate) }}</div>
					</a>
				</template>
				<template v-if="bulletinList.length > 0 && !loading">
					<a :href="[bulletin.urlLink ? bulletin.urlLink : '/BulletinDetail?Bid='+bulletin.bullentinId]" class="annc-list__item" v-for="bulletin in bulletinList" v-memo="[bulletin.bullentinId, bulletin.title, bulletin.startDate]">
						<div class="annc-list__item-label" :data-label="bulletin.bullentinCatId" :class="['label-'+convertClass(bulletin.bullentinCatId)]"><span>{{convertLabel(bulletin.bullentinCatId)}}</span></div>
						<div class="annc-list__item-title">{{bulletin.title}}</div>
						<div class="annc-list__item-date">{{ formatDate(bulletin.startDateALL, bulletin.startDate) }}</div>
					</a>
				</template>
			</div>
		</main>
		<div class="annc-pagination" v-show="showPagination">
			<pagination v-if="bulletinList.length > 0" :total-page="totalPage" :page-number-limit="pageNumberLimit" v-model="currentPage" @update:current-page="handlePageUpdate"></pagination>
		</div>
	</div>
	`
};

$(".loadingProgress").show();
let app = Vue.createApp({
	components: {
		navbar,
		bulletinList
	},
	setup() {
		return {};
	}
});
app.mount("#app");
