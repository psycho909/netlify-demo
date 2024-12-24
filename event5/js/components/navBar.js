let navBar = {
	setup() {
		const shareActive = Vue.ref(false);
		const navActive = Vue.ref(false);

		const handleShareClick = () => {
			shareActive.value = !shareActive.value;
		};

		const handleNavClick = (status) => {
			navActive.value = status;
		};

		const handleNavScrollClick = () => {
			const navItems = document.querySelectorAll(".nav-item");
			const headerHeight = document.querySelector(".header").offsetHeight;

			navItems.forEach((item) => {
				item.addEventListener("click", (e) => {
					e.preventDefault();

					// 獲取 data-sec 值
					const targetSec = item.getAttribute("data-sec");

					// 查找對應的錨點元素
					const targetAnchor = document.querySelector(`[data-anchor="${targetSec}"]`);

					if (targetAnchor) {
						// 計算滾動距離
						const scrollDistance = targetAnchor.offsetTop - headerHeight;

						// 平滑滾動到目標位置
						window.scrollTo({
							top: scrollDistance,
							behavior: "smooth"
						});

						// 更新導航項的激活狀態
						navItems.forEach((navItem) => navItem.classList.remove("active"));
						item.classList.add("active");
						navActive.value = false;
						shareActive.value = false;
					}
				});
			});
		};
		const copyLink = async () => {
			try {
				const url = window.location.href;
				await navigator.clipboard.writeText(url);
				alert("複製成功");
			} catch (err) {
				console.error("複製失敗", err);
				alert("複製失敗");
			}
		};
		document.querySelectorAll(".nav-link").forEach((navLink) => {
			navLink.addEventListener("click", (e) => {
				e.preventDefault();
				// 如果document.querySelector(".nav")有.on的class，則移除
				if (document.querySelector(".nav").classList.contains("on")) {
					document.querySelector(".nav").classList.remove("on");
				}
			});
		});
		Vue.onMounted(() => {
			if (isMobile.any) {
				handleNavScrollClick();
			}
		});
		return {
			shareActive,
			navActive,
			handleShareClick,
			handleNavClick,
			copyLink
		};
	},
	template: `
    <nav id="nav" class="nav" :class="{ on: navActive }">
		<div class="nav-open" @click="handleNavClick(true)">
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="nav-header-top">
			<div class="nav-close" @click="handleNavClick(false)">
				<span></span>
				<span></span>
			</div>
			<a href="javascript:;" class="nav-logo header-logo" target="_blank"></a>
			<div class="nav-header-list">
				<a href="https://gama-event.beanfun.com/index?Url=8F7B06C2C5E05EB1A880389F428B61A7&Id=1038&pageTypeSeq=1" class="nav-header__item" target="_blank">新手指南</a>
				<a href="https://www.facebook.com/Gamania.LineageTW" class="nav-header__item" target="_blank">粉絲專頁</a>
				<a href="https://bfweb.beanfun.com/Register/JoinBeanfunSingup?isbfApp=0&reUrl=https%3A%2F%2Ftw.beanfun.com" class="nav-header__item" target="_blank">申請帳號</a>
			</div>
		</div>
		<ul class="nav-list">
			<li class="nav-item" data-sec="sec1">
				<a href="javascript:;" class="nav-link" data-page="1">REMASTERED 介紹</a>
			</li>
			<li class="nav-item nav-item--sub" data-sec="sec2" data-menuanchor="sec2">
				<a href="#sec2" class="nav-link" data-page="2">-HD 畫質提升</a>
			</li>
			<li class="nav-item nav-item--sub" data-sec="sec3" data-menuanchor="sec3">
				<a href="#sec3" class="nav-link" data-page="3">-寬廣畫面視野</a>
			</li>
			<li class="nav-item nav-item--sub" data-sec="sec4" data-menuanchor="sec4">
				<a href="#sec4" class="nav-link" data-page="4">-遊戲介面</a>
			</li>
			<li class="nav-item nav-item--sub nav-item--sub-end" data-sec="sec5" data-menuanchor="sec5">
				<a href="#sec5" class="nav-link" data-page="5">-PSS輔助</a>
			</li>
			<li class="nav-item" data-sec="sec6" data-menuanchor="sec6">
				<a href="#sec6" class="nav-link" data-page="6">伺服器介紹</a>
			</li>
			<li class="nav-item" data-sec="sec7" data-menuanchor="sec7">
				<a href="#sec7" class="nav-link" data-page="7">職業介紹</a>
			</li>
			<li class="nav-item" data-sec="sec8" data-menuanchor="sec8">
				<a href="#sec8" class="nav-link" data-page="8">殷海薩系統</a>
			</li>
			<li class="nav-item" data-sec="sec9" data-menuanchor="sec9">
				<a href="#sec9" class="nav-link" data-page="9">遊戲畫面</a>
			</li>
		</ul>
		<div class="btn-share" :class="{ on: shareActive }" @click="handleShareClick">
			<div class="btn-share-list g-share">
				<a href="javascript:;" target="_blank" class="btn-share__item g-share-fb" data-share="f"></a>
				<a href="javascript:;" target="_blank" class="btn-share__item g-share-twitter" data-share="x"></a>
				<a href="javascript:;" target="_blank" class="btn-share__item g-share-line" data-share="l"></a>
				<a href="javascript:;" class="btn-share__item" data-share="link" @click="copyLink"></a>
			</div>
		</div>
	</nav>
    `
};

export default navBar;
