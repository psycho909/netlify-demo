import { MessageLB } from "../lightbox.js";
// 創建一個獨立的函數來處理 BF_divHeader
function handleBFHeader() {
	let originalSize = { width: 0, height: 0 };
	let headerInitialized = false;

	function scaleHeader() {
		const header = document.getElementById("BF_divHeader");
		if (!header) return;

		const windowWidth = window.innerWidth;
		const baseWidth = 1920; // 基準寬度

		if (windowWidth >= baseWidth) {
			// 如果瀏覽器寬度大於等於 1920px，使用初始容器的寬度和高度
			header.style.zoom = "";
		} else {
			// 如果瀏覽器寬度小於 1920px，進行縮放
			const scale = windowWidth / baseWidth;
			header.style.zoom = scale;
		}
	}

	// 初始化
	function initHeader() {
		const header = document.getElementById("BF_divHeader");
		if (header && !headerInitialized) {
			originalSize = {
				width: header.offsetWidth,
				height: header.offsetHeight
			};
			headerInitialized = true;
			scaleHeader();
			window.addEventListener("resize", scaleHeader);
		}
	}

	// 使用 MutationObserver 來監視 body 的變化
	const observer = new MutationObserver((mutations) => {
		for (let mutation of mutations) {
			if (mutation.type === "childList") {
				initHeader();
				if (headerInitialized) {
					observer.disconnect();
					break;
				}
			}
		}
	});

	// 監視 body 的變化
	observer.observe(document.body, { childList: true, subtree: true });

	// 初始檢查，以防 BF_divHeader 已經存在
	initHeader();
}

// 在 window 加載完成後執行
window.addEventListener("load", handleBFHeader);
let headerBar = {
	props: {
		music: {
			type: String,
			default: ""
		}
	},
	setup(props) {
		const navWrapRef = Vue.ref(null);
		const navBoxRef = Vue.ref(null);
		const navListRef = Vue.ref(null);
		// 取得目標
		const getTarget = (child) => (child.openInNewTab ? "_blank" : "_self");

		const handleResize = Vue.ref(null);
		// 初始化導航
		const initNavigation = () => {
			const navBox = navBoxRef.value;
			const navWrap = navWrapRef.value;
			const navList = navListRef.value;
			if (!isMobile.any && navBox && navWrap && navList) {
				const style = window.getComputedStyle(navBox);
				const height = parseInt(style.height);
				const marginTop = parseInt(style.marginTop);

				navWrap.setAttribute("data-height", `${height + marginTop}`);

				const setNavHeight = () => {
					const originalHeight = parseInt(navWrap.getAttribute("data-height"));
					const newHeight = navList.clientHeight - navBox.clientHeight + originalHeight;
					navWrap.style.height = `${newHeight}px`;
				};

				navBox.addEventListener("mouseenter", () => {
					navWrap.classList.add("-open");
					setNavHeight();
				});

				navBox.addEventListener("mouseleave", () => {
					navWrap.classList.remove("-open");
					navWrap.style.height = `${navWrap.getAttribute("data-height")}px`;
				});

				const navItems = navWrap.querySelectorAll(".nav-li");
				navItems.forEach((navItem) => {
					navItem.addEventListener("mouseenter", function () {
						this.querySelector(".nav-li__item").classList.add("active");
					});

					navItem.addEventListener("mouseleave", function () {
						this.querySelector(".nav-li__item").classList.remove("active");
					});
				});

				// Debounce function
				const debounce = (func, wait) => {
					let timeout;
					return function executedFunction(...args) {
						const later = () => {
							clearTimeout(timeout);
							func(...args);
						};
						clearTimeout(timeout);
						timeout = setTimeout(later, wait);
					};
				};

				// Resize handler
				handleResize.value = debounce(() => {
					const height = parseInt(style.height);
					const marginTop = parseInt(style.marginTop);
					navWrap.style.height = "";
					navWrap.setAttribute("data-height", `${height + marginTop}`);
				}, 250);

				window.addEventListener("resize", handleResize.value);
			} else if (isMobile.any && navBox) {
				const navOpen = document.querySelector(".nav-open");
				const navClose = navBox.querySelector(".nav-close");
				navOpen.addEventListener("click", () => {
					navBox.classList.add("-open");
				});

				navClose.addEventListener("click", () => {
					navBox.classList.remove("-open");
				});
			}
		};

		// 初始化
		Vue.onMounted(() => {
			initNavigation();
		});

		// 卸載
		Vue.onUnmounted(() => {
			if (handleResize.value) {
				window.removeEventListener("resize", handleResize.value);
			}
		});

		return {};
	},
	template: `
		<header class="header header-bf">
			<!-- -open -->
			<div class="header-wrap" ref="navWrapRef">
				<a href="./index.html" class="header-logo"></a>
				<div class="header-box" ref="navBoxRef">
					<div class="header-list">
						<a href="https://lineagenew.beanfun.com/Main" class="header-list__item" target="_blank" rel="noopener noreferrer">國際服官網</a>
						<a href="https://lineage.beanfun.com/Main" class="header-list__item" target="_blank" rel="noopener noreferrer">月費服官網</a>
						<a href="https://lineagefree.beanfun.com/Main" class="header-list__item" target="_blank" rel="noopener noreferrer">免費服官網</a>
					</div>
				</div>
				<div class="header-social">
					<a href="https://gama-event.beanfun.com/index?Url=8F7B06C2C5E05EB1A880389F428B61A7&Id=1038&pageTypeSeq=1" class="header-social__item" target="_blank">新手指南</a>
					<a href="https://bfweb.beanfun.com/Register/JoinBeanfunSingup?isbfApp=0&reUrl=https%3A%2F%2Ftw.beanfun.com" class="header-social__item" target="_blank">申請帳號</a>
					<a href="https://www.facebook.com/Gamania.LineageTW" class="header-social__item" target="_blank">粉絲專頁</a>
				</div>
			</div>
		</header>
    `
};

export default headerBar;
