import { ComingSoonLB } from "../lightbox.js";

function fetchNonCachedJSON(url) {
	// 使用時間戳動態產生唯一查詢參數
	const nonCachedUrl = `${url}?_=${new Date().getTime()}`;

	return fetch(nonCachedUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("成功載入最新JSON資料");
			return data;
		})
		.catch((error) => {
			console.error("獲取JSON時發生錯誤:", error);
		});
}
const asideMenu = {
	setup() {
		let data = Vue.ref(null);
		let fetchData = async () => {
			data.value = await fetchNonCachedJSON("./js/data.json");
		};

		Vue.onMounted(() => {
			fetchData();
			document.querySelectorAll(".aside-menu__item").forEach((item, index) => {
				if (item.dataset.target) {
					item.addEventListener("click", function () {
						let target = this.dataset.target;
						let top = document.querySelector(".section[data-page='" + target + "']").getBoundingClientRect().top + window.pageYOffset;
						window.scrollTo({
							top: top,
							behavior: "smooth",
						});
					});
				}
			});
			document.querySelector(".aside-menu__item-5").addEventListener("click", function () {
				const documentHeight = document.documentElement.scrollHeight;

				window.scrollTo({
					top: documentHeight, // 滾動到文件最底部
					behavior: "smooth", // 平滑滾動效果
				});
				// document.querySelector("#app").classList.add("show")
			});
			document.querySelector(".aside-menu__item-6").addEventListener("click", function () {
				if (this.href == "javascript:;") {
					ComingSoonLB();
				}
			});
		});
		return {
			data,
		};
	},
	template: `
    <div class="aside-menu">
        <a class="aside-menu__item aside-menu__item-1" href="javascript:;" data-target="page1">合作介紹</a>
        <a class="aside-menu__item aside-menu__item-2" href="javascript:;" data-target="page2">全新技能</a>
        <a class="aside-menu__item aside-menu__item-3" href="javascript:;" data-target="page3">限定活動</a>
        <a class="aside-menu__item aside-menu__item-4" href="javascript:;" data-target="page4">合作商品</a>
        <a class="aside-menu__item aside-menu__item-5" href="javascript:;">小遊戲</a>
        <a class="aside-menu__item aside-menu__item-6" :href="data?.anniversary" :target="data?.anniversary == 'javascript:;'?'':'_blank'">楓之谷20周年</a>
    </div>
    `,
};

export default asideMenu;
