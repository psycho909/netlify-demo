const characterLB = {
	props: {
		isOpenCharacter: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		let stroe = Vuex.useStore();
		let closeLightboxCharacter = () => {
			stroe.commit("openLightbox", { isOpen: false, char: 0 });
		};
		let characterNum = Vue.computed(() => {
			return stroe.state.character.char;
		});
		let textArray = Vue.ref({
			1: {
				text: "對抗黑魔法師的五大英雄之一，在即將完成黑魔法師的封印前，與其他英雄一起被黑魔法師施加詛咒，狂狼勇士遭到了冰封，且失去了記憶和能力。幾百年後，狂狼勇士身處在一個名為瑞恩的島嶼，並被一位叫莉琳的少女所喚醒，而他需要重新找回屬於他的一切...。"
			},
			2: {
				text: "對抗黑魔法師的五大英雄之一，在與黑魔法師進行最終決戰時，隱月以自己的存在作為代價，將黑魔法師封印，卻也因此迷失在次元裂縫，且被世人遺忘。幾百年後，隱月甦醒在一個陌生的世界-尖耳狐狸的村落，並在那邊遇到了一位叫做小蘭的狐狸少女...。"
			}
		});
		let urlYT = Vue.computed(() => {
			return stroe.state.character.char == 1 ? "https://youtu.be/3CB6YzWrI0g" : "https://youtu.be/_IIsXyAdBLo";
		});
		let characterText = Vue.computed(() => {
			return textArray.value[stroe.state.character.char].text;
		});
		return {
			closeLightboxCharacter,
			characterNum,
			characterText,
			urlYT
		};
	},
	template: `
    <div class="lightbox lightbox-character-3" v-if="isOpenCharacter" :data-char="characterNum">
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
    `
};

export default characterLB;
