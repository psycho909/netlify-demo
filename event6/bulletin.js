import pagination from "./pagination.js";

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
		let searchText = Vue.ref("");
		let currentPage = Vue.ref(1);
		let pageNumberLimit = Vue.ref(10);
		let totalPage = Vue.ref(100);
		let loading = Vue.ref(true);
		const paginationRef = Vue.ref(null);
		// 取得公告列表
		const getBullentinList = () => {
			// $(".loadingProgress").show();
			axios.get("https://randomuser.me/api/").then((res) => {
				console.log(res);
			});
		};
		// 初始化
		Vue.onMounted(() => {
			// 取得公告類別
			getBullentinList();
		});
		// 搜尋
		const handleSearch = () => {
			handleResetPagination();
			// searchText.value = sanitizeInput(searchText.value);
			// if (searchText.value.match(/<[^>]+>/g)) {
			// 	searchText.value = searchText.value.replace(/<[^>]+>/g, "");
			// }
			// loading.value = true;
			// getBullentinList();
			// // searchText.value = "";
			// currentPage.value = 1;
		};
		// 更新頁數
		const handlePageUpdate = (newPage) => {
			currentPage.value = newPage;
			loading.value = true;
			getBullentinList();
		};
		const handleResetPagination = () => {
			paginationRef.value?.resetPagination(5);
		};
		return {
			searchText,
			handleSearch,
			currentPage,
			pageNumberLimit,
			totalPage,
			handlePageUpdate,
			paginationRef,
			handleResetPagination
		};
	},
	template: `
	<div class="annc-container">
		<div class="annc-search">
			<div class="annc-search__box">
				<input type="text" class="annc-search__input" v-model="searchText" placeholder="輸入關鍵字" inputmode="search" @keydown.enter="handleSearch" />
				<a href="javascript:;" class="annc-search__btn" @click="handleSearch">搜尋</a>
			</div>
		</div>
		<div class="annc-pagination">
			<pagination  :total-page="totalPage" :page-number-limit="pageNumberLimit" ref="paginationRef" @update:current-page="handlePageUpdate"></pagination>
		</div>
	</div>
	`
};

let app = Vue.createApp({
	components: {
		bulletinList
	},
	setup() {
		return {};
	}
});
app.mount("#app");
