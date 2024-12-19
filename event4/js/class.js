/* import */
// import { topBar, navBar, intro, btnPlus } from "./common.js";
/* Common */
function setCookie(name, value = true, hours = 0.5) {
	let date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
}
function getCookie(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return false;
	}
}
// url
const url = "";
// mobile
const isMB = isMobile.any ? true : false;
isMB ? $("body,.wrapper").addClass("mobile") : $("body,.wrapper").addClass("desktop");
/* VM Set */
const app = Vue.createApp({
	components: {
		// "top-bar": topBar,
		// "nav-bar": navBar,
		// intro: intro,
		// "btn-plus": btnPlus
	},
	setup() {
		$("body").addClass("ovh");
		//
		const store = Vuex.useStore();
		// loadingProgress
		loadingProgress({
			loadedFN: function () {
				$(".loadingProgress").fadeOut();
				//
				if (isMB) {
					store.commit("introPlay", false);
					store.commit("intro", false);
					$("body").removeClass("ovh");
					return;
				}
				//
				if (!getCookie("EventIntroMS20241218")) {
					store.commit("introPlay", true);
					setTimeout(() => {
						store.commit("intro", false);
						$("body").removeClass("ovh");
						setCookie("EventIntroMS20241218");
					}, 1000);
				} else {
					store.commit("introPlay", false);
					store.commit("intro", false);
					$("body").removeClass("ovh");
				}
			},
			detectVideo: false,
			autoHide: false
		});
		return {};
	}
});
/* Vuex */
// state
const pageStates = {
	//
	isMB: isMB,
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
const pageStore = Vuex.createStore({
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

/* Components */
app.component("page-3", {
	template: `
			<div class="page page-3" id="page-3">
				<div class="bg">
					<div class="bg-content"></div>
				</div>
				<div class="cover" v-if="!isMB" id="particles-cover"></div>
				<div class="title fz0">職業Remaster</div>
				<div class="content">
					<div class="content-character content-character-1"
						:class="{'active': activeCharacter == 1}"
						@mouseover="activeCharacter = 1"
						@mouseout="activeCharacter = 0"
						@click="openLightboxCharacter(1)">
							<div class="image"></div>
							<div class="text fz0">了解更多</div>
						</div>
					<div class="content-character content-character-2"
						:class="{'active': activeCharacter == 2}"
						@mouseover="activeCharacter = 2"
						@mouseout="activeCharacter = 0"
						@click="openLightboxCharacter(2)">
							<div class="image"></div>
							<div class="text fz0">了解更多</div>
						</div>
				</div>
			</div>
		`,
	setup(props) {
		let activeCharacter = Vue.ref(0);
		// store
		const store = Vuex.useStore();
		// isMB
		let isMB = Vue.computed(() => {
			return store.state.isMB;
		});
		// isOpen
		function openLightboxCharacter(num) {
			store.commit("openLightbox", {
				type: "character3",
				char: num
			});
		}
		alert(isMB.value);
		// particles
		if (!isMB.value) {
			setTimeout(() => {
				particlesJS("particles-cover", {
					particles: {
						number: { value: 30, density: { enable: true, value_area: isMB.value ? 768 : 1920 } },
						color: { value: "#fff" },
						shape: {
							type: "image",
							stroke: { width: 0, color: "#000000" },
							polygon: { nb_sides: 5 },
							image: {
								src: "assets/image/float/float-3.png",
								width: 47,
								height: 58
							}
						},
						opacity: {
							value: 1,
							random: false,
							anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
						},
						size: {
							value: isMB.value ? 20 : 40,
							random: true,
							anim: { enable: false, speed: 30, size_min: isMB.value ? 10 : 20, sync: false }
						},
						rotate: {
							value: 45,
							random: true,
							anim: {
								enable: true,
								speed: 10
							}
						},
						line_linked: { enable: false, distance: 500, color: "#ffffff", opacity: 0.4, width: 2 },
						move: {
							enable: true,
							speed: isMB.value ? 10 : 5,
							direction: "none",
							random: true,
							straight: false,
							out_mode: "out",
							bounce: false,
							attract: {
								enable: false,
								rotateX: 200,
								rotateY: 400
							}
						}
					},
					interactivity: {
						detect_on: "canvas",
						events: { onhover: { enable: false, mode: "bubble" }, onclick: { enable: false, mode: "repulse" }, resize: true },
						modes: {
							grab: { distance: 400, line_linked: { opacity: 0.5 } },
							bubble: { distance: 120, size: 5, duration: 0.4, opacity: 1, speed: 3 },
							repulse: { distance: 200, duration: 0.4 },
							push: { particles_nb: 4 },
							remove: { particles_nb: 2 }
						}
					},
					retina_detect: false
				});
			}, 0);
		}
		return {
			activeCharacter,
			openLightboxCharacter,
			isMB
		};
	}
});
app.component("lightbox-character-3", {
	template: `
			<div class="lightbox lightbox-character-3"
				v-if="isOpenCharacter3"
				:data-char="characterNum">
				<div class="bg"></div>
				<div class="image" :data-char="characterNum"></div>
				<div class="text font-notoSerif" v-html="characterText"></div>
				<div class="btn video">
					<a class="btn-play" :href="urlYT"
					:id="'btn-character-video-' + characterNum"
					target="_blank"
					rel="noopener noreferrer"></a>
				</div>
				<a href="javascript:;"
					class="btn btn-more"
					:id="'btn-character-more-' + characterNum"></a>
				<div class="btn btn-close" @click="closeLightboxCharacter"></div>
			</div>
		`,
	setup(props) {
		// store
		const store = Vuex.useStore();
		// isOpen
		let isOpenCharacter3 = Vue.computed(() => {
			let isOpen = store.state.lightbox.isOpen;
			if (isOpen) {
				$("body").addClass("ovh");
			}
			return isOpen;
		});
		let characterNum = Vue.computed(() => {
			return store.state.lightbox.character;
		});
		let urlYT = Vue.computed(() => {
			return characterNum == 1 ? "https://youtu.be/3CB6YzWrI0g" : "https://youtu.be/_IIsXyAdBLo";
		});
		//
		let textArray = Vue.ref({
			1: {
				text: "對抗黑魔法師的五大英雄之一，在即將完成黑魔法師的封印前，與其他英雄一起被黑魔法師施加詛咒，狂狼勇士遭到了冰封，且失去了記憶和能力。幾百年後，狂狼勇士身處在一個名為瑞恩的島嶼，並被一位叫莉琳的少女所喚醒，而他需要重新找回屬於他的一切...。"
			},
			2: {
				text: "對抗黑魔法師的五大英雄之一，在與黑魔法師進行最終決戰時，隱月以自己的存在作為代價，將黑魔法師封印，卻也因此迷失在次元裂縫，且被世人遺忘。幾百年後，隱月甦醒在一個陌生的世界-尖耳狐狸的村落，並在那邊遇到了一位叫做小蘭的狐狸少女...。"
			}
		});
		let characterText = Vue.computed(() => {
			return textArray.value[characterNum.value].text;
		});
		//
		function closeLightboxCharacter() {
			store.commit("closeLightbox", "character3");
			$("body").removeClass("ovh");
		}
		// gboxVideo
		function openGboxVideo(num) {
			// gboxVideo('char' + num);
			if (num == 1) {
				$(".gbox-char-1").show();
			} else {
				$(".gbox-char-2").show();
			}
		}
		return {
			isOpenCharacter3,
			characterNum,
			characterText,
			closeLightboxCharacter,
			openGboxVideo,
			urlYT
		};
	}
});
/* VM Mount */
// 執行VM
function afterInit() {
	app.use(pageStore);
	app.mount("#app");
	$(".gbox-video").hide();
}
afterInit();
// gboxVideo
