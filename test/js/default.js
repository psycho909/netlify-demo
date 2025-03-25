import { MessageLB, VideoLB, ComingSoonLB } from "./lightbox.js";
import { createLeafAnimation, scale, ZoomAdapter } from "./tool.js";
import asideMenu from "./components/aside-menu.js";
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

let app = Vue.createApp({
	components: {
		"aside-menu": asideMenu
	},
	setup() {
		Vue.onMounted(() => {
			loadingProgress({
				loadedFN: function () {
					document.querySelector("#loadingProgress").style.display = "none";
					setTimeout(() => {
						document.querySelector("body").classList.add("com");
					}, 200);
				},
				autoHide: false
			});
			document.querySelector(".top").addEventListener("click", function () {
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			});

			window.addEventListener("scroll", function () {
				const scrollHeight = document.documentElement.scrollHeight;
				const scrollTop = window.scrollY || window.pageYOffset;
				const clientHeight = document.documentElement.clientHeight;

				// 當滾動到底部時（考慮 50px 的緩衝區）
				if (scrollHeight - (scrollTop + clientHeight) == 0) {
					document.querySelector("body").classList.add("show");
				} else {
					// 如果需要在離開底部時移除 class，可以取消註解下一行
					document.querySelector("body").classList.remove("show");
				}
			});

			document.querySelector(".swiper-video__box").addEventListener("click", function () {
				let video = this.dataset.video;
				VideoLB(video);
			});

			const initLeafAnimation = createLeafAnimation();
			const canvas = document.getElementsByClassName("particle")[0];
			if (!isMobile.any) {
				initLeafAnimation(canvas);
			}

			scale();
			// 直接使用
			ZoomAdapter({ baseWidth: 1920, elementSelector: "#app" });
		});
		return {};
	}
});
app.mount("#app");
