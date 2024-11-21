import { MessageLB, LBGuide, LBSelectGame, LBLogin, LBLoginSuccess, LBWarm, LBSDataShare, LBSGetSn, LBLogout } from "../lightbox.js";
import useEventStore from "../store.js";

const page1 = {
	setup() {
		const store = useEventStore();
		let handleGuide = (type) => {
			if (type == 1) {
				// 如果有Token就直接進入page2，沒有Token 執行LBGuide(1);
				store.setPage("page2");
			} else {
				LBGuide();
			}
		};
		let scrollDown = () => {
			// 移動到.page1-content，移動距離需減去.top-bar高度
			let topBarHeight = document.querySelector(".top-bar").offsetHeight;
			window.scrollTo({
				top: document.querySelector(".page1-content").offsetTop,
				behavior: "smooth"
			});
		};
		return {
			handleGuide,
			scrollDown
		};
	},
	template: `
    <div class="page1">
        <div class="page1-mirror">
            <div class="page1-mirror__title">2024橘子周年慶</div>
            <a href="javascript:;" class="page1-mirror__btn-start" @click="handleGuide(1)">喚醒魔鏡</a>
            <a href="javascript:;" class="page1-mirror__btn-guide" @click="handleGuide">活動說明</a>
			<span class="page1-mirror-bg"></span>
        </div>
        <a href="javascript:;" class="btn-scroll-down" @click="scrollDown"></a>
        <div class="page1-content">
            <div class="page1-content__title">周年慶系列活動 參與遊戲名單</div>
            <div class="page1-content__list">
                <a href="https://lineagem.beanfun.com/Main" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="lineage-m"></a>
                <a href="https://warsofprasia.beanfun.com/Main" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="twp"></a>
                <a href="https://maplestory.beanfun.com/Main" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="maple"></a>
                <a href="https://tw.beanfun.com/lineagenew" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="lineage-r"></a>
                <a href="https://tw.beanfun.com/lineage" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="lineage-month"></a>
                <a href="https://tw.beanfun.com/ELSWORD/main/index.aspx" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="els"></a>
                <a href="https://tw.beanfun.com/LineageFree" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="lineage-free"></a>
                <a href="https://mabinogi.beanfun.com/Main" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="mabi"></a>
                <a href="https://dragonnest.beanfun.com/Main" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="dn"></a>
                <a href="https://cso.beanfun.com/main.html" class="page1-content__item" target="_blank" rel="noopener noreferrer" data-game="cso"></a>
            </div>
        </div>
    </div>
    `
};

export default page1;
