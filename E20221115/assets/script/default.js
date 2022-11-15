import top from "./top.js";
import footerbar from "./footerbar.js";
import front from "./front.js";
import login from "./login.js";
import navbar from "./navbar.js";
import gamedata from "./gamedata.js";
import lottery from "./lottery.js";
import lotteryLoading from "./lotteryLoading.js";
import loading from "./loading.js";
import { Message, LoginNotice, Congrats, UnLucky, RewardListEmpty, RewardList, RewardTask } from "./lightbox.js";

Vue.component("loading", loading);
Vue.component("lottery-loading", lotteryLoading);

// loadingProgress控制
function loadingHide() {
	$("#loadingProgress").hide();
}

function loadingShow() {
	$("#loadingProgress").show();
}
//建立 store
const indexStore = new Vuex.Store({
	actions: {},
	state: {},
	mutations: {}
});

// LoginNotice();

// var textHTML = `<div>共用樣式<div><div>共用樣式<div><div>共用樣式<div><div>共用樣式<div>`;
// Message(textHTML);
// Congrats();
// UnLucky();
// RewardListEmpty();
// RewardList();
// RewardTask();

const vm = new Vue({
	el: "#app",
	store: indexStore,
	components: {
		navbar,
		front,
		lottery,
		login,
		gamedata,
		top,
		footerbar
	},
	data: {},
	computed: {},
	methods: {},
	mounted() {},
	updated() {}
});
