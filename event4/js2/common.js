// common.js

// 定義一個 composable 來共享 isMBSuffix 計算屬性
function useMBSuffix() {
	const store = Vuex.useStore();
	const isMBSuffix = Vue.computed(() => store.getters.isMBSuffix);
	return { isMBSuffix };
}

/* Components */
const topBar = {
	template: `
        <div class="top-bar">
            <div class="content">
                <a href="https://maplestory.beanfun.com/main" :id="'btn-logo' + isMBSuffix" target="_blank" rel="noreferrer noopener" class="logo fz0">新楓之谷</a>
                <div class="links">
                    <a href="https://www.instagram.com/maplestory_tw" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gig" :id="'btn-i_g' + isMBSuffix"></a>
                    <a href="https://www.facebook.com/www.maplestory.msfans.com.tw" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gfb" :id="'btn-f_b' + isMBSuffix"></a>
                    <a href="https://www.youtube.com/user/TWmaplestory/videos" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gyt" :id="'btn-y_t' + isMBSuffix"></a>
                </div>
            </div>
        </div>
    `,
	setup() {
		const { isMBSuffix } = useMBSuffix();
		return { isMBSuffix };
	}
};

const navBar = {
	template: `
        <div class="nav-bar"
            :class="{'active': isNavOpen}"
            v-if="isNavShow">
            <div class="btn btn-nav-control fz0" @click="isNavOpen = !isNavOpen" :id="'btn-nav' + isMBSuffix">開關</div>
            <nav class="nav">
                <ul>
                    <li class="btn btn-nav"><a href="./class.html" :id="'btn-nav-index' + isMBSuffix">事前預約</a></li>
                    <li class="btn btn-nav"><a href="./class2.html" :id="'btn-nav-class' + isMBSuffix">職業改編</a></li>
                    <li class="btn btn-nav"><a href="./class3.html" :id="'btn-nav-more' + isMBSuffix">更多活動</a></li>
                </ul>
            </nav>
        </div>
    `,
	setup() {
		const isNavOpen = Vue.ref(false);
		const store = Vuex.useStore();
		const isNavShow = Vue.computed(() => store.state.isNavShow);
		const { isMBSuffix } = useMBSuffix();
		return {
			isNavOpen,
			isNavShow,
			isMBSuffix
		};
	}
};

const intro = {
	template: `
        <div class="intro" v-if="isIntro">
            <div class="intro-content" data-type="dt" v-if="isIntroPlay"></div>
            <div class="intro-content" data-type="mb" v-if="isIntroPlay"></div>
        </div>
    `,
	setup() {
		const store = Vuex.useStore();
		const isIntro = Vue.computed(() => store.state.isIntro);
		const isIntroPlay = Vue.computed(() => store.state.isIntroPlay);
		return {
			isIntro,
			isIntroPlay
		};
	}
};

const btnPlus = {
	template: `
        <div class="btn btn-plus" :id="'btn-plus' + isMBSuffix" @click="gboxPlus"></div>
    `,
	setup() {
		function gboxPlus() {
			let html = `
            <div class="title">超越極限的泰里專屬豪禮</div>
            <div class="text">豪華大禮輸入序號 立即領取!!</div>
            <div class="content">
                <div class="content-row">
                    <div class="content-number">CHASERTERRY</div>
                    <div class="btn btn-copy" data-clipboard-text="CHASERTERRY"></div>
                </div>
                <div class="content-item" data-num="plus"></div>
            </div>
        `;
			$.gbox.open(html, {
				addClass: "gbox-cards gbox-items gbox-items-plus",
				titleBar: "",
				hasCloseBtn: true,
				hasActionBtn: false,
				afterOpen: function () {
					$(".gbox-content .content").addClass("scrollbar2");
				}
			});
		}
		const { isMBSuffix } = useMBSuffix();
		const clipboard = new ClipboardJS(".btn-copy");
		clipboard.on("success", function (e) {
			e.clearSelection();
		});
		clipboard.on("error", function (e) {});
		return {
			isMBSuffix,
			gboxPlus
		};
	}
};

export { topBar, navBar, intro, btnPlus };
