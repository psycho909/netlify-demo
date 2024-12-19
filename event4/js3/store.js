/* Vuex */
// state
// mobile
const isMB = isMobile.any ? true : false;
isMB ? $("body,.wrapper").addClass("mobile") : $("body,.wrapper").addClass("desktop");
const pageStates = {
	//
	isMB,
	//
	isNavShow: true,
	// intro
	isIntro: true,
	isIntroPlay: false,
	//
	lightbox: {
		isOpen: false,
		character: 0
	}
};
// mutations // 同步方法
const pageMutations = {
	// nav
	changeNavShow(state, payload) {
		state.isNavShow = payload;
	},
	// intro
	intro(state, payload) {
		state.isIntro = payload;
	},
	introPlay(state, payload) {
		state.isIntroPlay = payload;
	},
	// lightbox
	openLightbox(state, payload) {
		state.lightbox.isOpen = true;
		state.lightbox.character = payload.char;
	},
	closeLightbox(state, payload) {
		state.lightbox.isOpen = false;
		state.lightbox.character = 0;
	}
};
// getters // state運算
const pageGetters = {
	isMBSuffix(state, getters) {
		return state.isMB ? "" : "";
	}
};
// actions // 非同步方法
const pageActions = {
	//
};
//建立 store
export const pageStore = Vuex.createStore({
	state: {
		...pageStates
	},
	mutations: {
		...pageMutations
	},
	getters: {
		...pageGetters
	},
	actions: {
		...pageActions
	}
});
