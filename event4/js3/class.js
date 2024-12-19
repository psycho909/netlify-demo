/* import */
import { topBar, navBar, intro, btnPlus } from "./common.js";
/* Common */
import { setCookie, getCookie } from "./tools.js";
import { pageStore } from "./store.js";
// url
const url = "";

/* VM Set */
const app = Vue.createApp({
	components: {
		"top-bar": topBar,
		"nav-bar": navBar,
		intro: intro,
		"btn-plus": btnPlus
	},
	setup() {
		$("body").addClass("ovh");
		//
		const store = Vuex.useStore();
		const isMB = Vue.computed(() => {
			return store.state.isMB;
		});
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
					Vue.nextTick(() => {
						store.commit("intro", false);
						$("body").removeClass("ovh");
						setCookie("EventIntroMS20241218");
					});
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
			<template v-for="n in 2" :key="n">
				<div 
				:class="[
					'content-character',
					'content-character-' + n,
					{ active: activeCharacter === n }
				]"
				v-on="!isMB ? {
					mouseover: () => activeCharacter = n,
					mouseout: () => activeCharacter = 0
				} : {}"
				@click="openLightboxCharacter(n)"
				>
				<div class="image"></div>
				<div class="text fz0">了解更多</div>
				</div>
			</template>
			</div>
	  </div>
	`,
	setup() {
		const store = Vuex.useStore();
		const activeCharacter = Vue.ref(0);
		const isMB = Vue.computed(() => store.state.isMB);

		const openLightboxCharacter = (num) => {
			store.commit("openLightbox", {
				type: "character3",
				char: num
			});
		};
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
	setup() {
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
		return {
			isOpenCharacter3,
			characterNum,
			characterText,
			closeLightboxCharacter,
			urlYT
		};
	}
});
/* VM Mount */
// 執行VM

app.use(pageStore);
app.mount("#app");
