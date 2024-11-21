import { MessageLB, LBGuide, LBSelectGame, LBLogin, LBLoginSuccess, LBWarm, LBSDataShare, LBSGetSn, LBLogout } from "../lightbox.js";
import useEventStore from "../store.js";

let topbar = {
	setup() {
		const store = useEventStore();
		let menuStatus = Vue.ref(false);
		let token = Vue.computed(() => store.Token);
		let menuToggle = () => {
			// menuStatus.value == true ，body加上class ov-hidden
			menuStatus.value = !menuStatus.value;
			if (menuStatus.value) {
				document.body.classList.add("ov-hidden");
			} else {
				document.body.classList.remove("ov-hidden");
			}
		};
		let goPage = (page) => {
			if (page == 1) {
				store.setPage("page1");
				window.scrollTo(0, 0);
			}
			if (page == 2) {
				// 如果有登入token會有資料，跳轉到page2，沒有的話則使用LBGuide(1)，如果當前已經是page2則不會有任何動作
				if (store.page == "page2") {
					menuToggle();
					return;
				}
				if (token.value) {
					store.setPage("page2");
				} else {
					LBGuide(1);
				}
			}
			menuToggle();
		};
		let goHome = () => {
			store.setPage("page1");
			// 置頂
			window.scrollTo(0, 0);
		};
		let page = Vue.computed(() => store.page);
		return { menuStatus, menuToggle, token, goPage, goHome, LBLogout, page };
	},
	template: `
    <div class="top-bar">
        <div class="top-bar__box">
            <a href="javascript:;" class="top-bar__logo"  @click="goHome"></a>
            <div class="top-bar__title">與柑姆重啟遊戲人生</div>
             <a href="javascript:;" class="top-bar__btn-logout" :class="{ active: token }" v-if="token" @click="LBLogout">登出</a>
            <a href="javascript:;" class="top-bar__btn-menu" @click="menuToggle"></a>
        </div>
    </div>
    <div class="menu" :class="{ active: menuStatus }">
        <a href="javascript:;" class="menu__item1" data-type="index" @click="goPage(1)">鏡之迷宮活動首頁</a>
        <a href="javascript:;" class="menu__item1" data-type="personal" @click="goPage(2)">個人數據活動頁</a>
        <div class="menu__group">
            <a href="https://www.facebook.com/gamania.fans/videos/1435441310746215/" class="menu__item2" data-type="else1" target="_blank" rel="noopener noreferrer">周年慶主活動入口</a>
            <a href="https://bean.fun/周年慶來簽到" class="menu__item2" data-type="else2" target="_blank" rel="noopener noreferrer">簽到簿加碼抽獎</a>
        </div>
    </div>
    `
};

export default topbar;
