function getSizes(width = 768, height = 1500) {
	// 手機板時滿版
	if (isMobile.any) {
		var zoom = window.outerWidth / width;
		var zoom2 = window.innerHeight / zoom;
		let zoom1;
		if (zoom2 < height) {
			zoom1 = window.innerHeight / height;
		} else {
			zoom1 = window.outerWidth / width;
		}
		$("html").css("fontSize", 16 * zoom1 + "px");
	} else {
		// 防止瀏覽器縮放改變
		let zoom1 = ((window.outerWidth - 10) / window.innerWidth) * 100;
		var count = Math.ceil(zoom1) / 100;
		$("html").css("fontSize", 16 / count + "px");
	}
}
getSizes(768, 1500);
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		return;
	}
});

import fight from "../components/fight.js";
import home from "../components/home.js";
import bossMap from "../components/map.js";
import store from "../store/index.js";
const app = Vue.createApp({
	components: {
		home,
		bossMap,
		fight
	},
	setup() {
		const store = Vuex.useStore();

		store.dispatch("bossInit", {
			BossLevel: 2,
			BossHealth: 10
		});
	}
});
app.use(store);
app.mount("#app");
