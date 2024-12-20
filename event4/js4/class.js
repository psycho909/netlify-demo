import btnPlus from "./btnPlus.js";
import page3 from "./page3.js";
import characterLB from "./characterLB.js";
import intro from "./intro.js";
import navBar from "./navBar.js";
import topBar from "./topBar.js";
import store from "./store.js";

const app = Vue.createApp({
	components: {
		"top-bar": topBar,
		"nav-bar": navBar,
		intro: intro,
		"btn-plus": btnPlus,
		"page-3": page3,
		"character-lb": characterLB
	},
	setup() {
		let store = Vuex.useStore();
		let isIntro = Vue.ref(false);
		let isIntroPlay = Vue.ref(false);
		let isOpenCharacter = Vue.ref(false);
		Vue.watch(
			() => store.state.character,
			(val) => {
				isOpenCharacter.value = val.isOpen;
			},
			{ deep: true }
		);
		return {
			isIntro,
			isIntroPlay,
			isOpenCharacter
		};
	}
});
app.use(store);
app.mount("#app");
