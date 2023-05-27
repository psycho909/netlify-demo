import { SkillVideo, MessageLB, MessageLB2 } from "../lightbox.js";
import { CanvasSprite, particlesBg, surveyCake } from "../tool.js";
import { AddUserData } from "../api.js";
const sec1 = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		event: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { emit }) {
		let step1C1 = Vue.ref(null);
		let step1C2 = Vue.ref(null);
		let step2C1 = Vue.ref(null);
		let step2C2 = Vue.ref(null);
		let step3C1 = Vue.ref(null);
		let step3C2 = Vue.ref(null);
		let characterC1 = Vue.ref(null);
		let characterC2 = Vue.ref(null);
		let join = false;
		let joinDate = "";
		let enter = false;
		let timer = null;

		let skillPop = () => {
			SkillVideo();
		};

		let handleEnter = () => {
			enter = true;
			if (enter) {
				$(".sec1-left").addClass("show");
			}
		};
		let handleLeave = () => {
			enter = false;
			timer = setTimeout(() => {
				if (!enter) {
					$(".sec1-left").removeClass("show");
				}
			}, 500);
		};
		let handleLeftEnter = () => {
			enter = true;
			clearTimeout(timer);
		};
		let handleLeftLeave = () => {
			enter = false;
			timer = setTimeout(() => {
				if (!enter) {
					$(".sec1-left").removeClass("show");
				}
			}, 500);
		};
		let handleBtnEvent = (type) => {
			if ($("#Token").val() == "") {
				window.sessionStorage.setItem("type", type);
				window.location.href = "login.aspx";
				return;
			}
			if (join) {
				let msg = `
						<div class="lb-content">
							<div>${joinDate}</div>
							<div>已完成預約登入</div>
							<br />
							<div>2023/7/5 23:59前</div>
							<div>發送獎勵</div>
						</div>
					`;
				if (type == 1) {
					MessageLB(msg);
					return;
				}
				if (type == 2) {
					window.location.href = surveyCake;
					return;
				}
			}
			emit("showLoading", true);
			AddUserData($("#Token").val())
				.then((res) => {
					let { Code, Data, Message, Url } = res.data;
					if (Code == -1) {
						join = false;
						MessageLB(Message, Url);
						return;
					}
					join = true;
					joinDate = Data;
					let msg = `
						<div class="lb-content">
							<div>${joinDate}</div>
							<div>已完成預約登入</div>
							<br />
							<div>2023/7/5 23:59前</div>
							<div>發送獎勵</div>
						</div>
					`;
					if (type == 1) {
						if (Code == 1 || Code == 2) {
							MessageLB(msg);
							return;
						}
					}
					if (type == 2) {
						if (Code == 1) {
							MessageLB2(msg, surveyCake);
							return;
						}
						if (Code == 2) {
							window.location.href = surveyCake;
							return;
						}
					}
				})
				.finally(() => {
					if (window.sessionStorage.getItem("type")) {
						window.sessionStorage.removeItem("type");
					}
					emit("showLoading", false);
				});
		};
		Vue.nextTick(() => {
			particlesBg("sec1");
			// if (!props.mobile) {
			// 	let canvasArr = [];
			// 	characterC1.value = new CanvasSprite($(".sec1-character__canvas1"), 28, 60);
			// 	characterC2.value = new CanvasSprite($(".sec1-character__canvas2"), 25, 60);
			// 	if (props.event) {
			// 		step1C1.value = new CanvasSprite($(".sec1-btn__step1-canvas1"), 23, 95);
			// 		step1C2.value = new CanvasSprite($(".sec1-btn__step1-canvas2"), 23, 95);
			// 		step2C1.value = new CanvasSprite($(".sec1-btn__step2-canvas1"), 23, 95);
			// 		step2C2.value = new CanvasSprite($(".sec1-btn__step2-canvas2"), 23, 95);
			// 		canvasArr = [characterC1.value.PreLoad("./assets/css/images/character-normal/", "Comp 1_00000"), characterC2.value.PreLoad("./assets/css/images/character-hover/", "Comp1_00000"), step1C1.value.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step1C2.value.PreLoad("./assets/css/images/btn-hover/", "Hover_00000"), step2C1.value.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step2C2.value.PreLoad("./assets/css/images/btn-hover/", "Hover_00000")];
			// 	} else {
			// 		step3C1.value = new CanvasSprite($(".sec1-btn__step3-canvas1"), 23, 95);
			// 		step3C2.value = new CanvasSprite($(".sec1-btn__step3-canvas2"), 23, 95);
			// 		canvasArr = [characterC1.value.PreLoad("./assets/css/images/character-normal/", "Comp1_00000"), characterC2.value.PreLoad("./assets/css/images/character-hover/", "Comp1_00000"), step3C1.value.PreLoad("./assets/css/images/btn-normal/", "Normal_00000"), step3C2.value.PreLoad("./assets/css/images/btn-hover/", "Hover_00000")];
			// 	}
			// 	Promise.allSettled(canvasArr).then((res) => {
			// 		emit("showLoading", true);
			// 		if (props.event) {
			// 			step1C1.value.Loop();
			// 			step1C1.value.target.parent().removeClass("loading");
			// 			step1C2.value.Loop();
			// 			step2C1.value.Loop();
			// 			step2C1.value.target.parent().removeClass("loading");
			// 			step2C2.value.Loop();
			// 		} else {
			// 			step3C1.value.Loop();
			// 			step3C1.value.target.parent().removeClass("loading");
			// 			step3C2.value.Loop();
			// 		}
			// 		characterC1.value.Loop();
			// 		characterC2.value.Loop();
			// 		characterC1.value.target.parent().removeClass("loading");
			// 		document.querySelector("html").classList.remove("ovh");
			// 		emit("showLoading", false);
			// 	});
			// } else {
			// 	document.querySelector("html").classList.remove("ovh");
			// 	emit("showLoading", false);
			// }
			document.querySelector("html").classList.remove("ovh");
			emit("showLoading", false);
		});

		Vue.onMounted(() => {
			if (window.sessionStorage.getItem("type")) {
				handleBtnEvent(window.sessionStorage.getItem("type"));
			}
		});
		return {
			skillPop,
			handleEnter,
			handleLeave,
			handleLeftEnter,
			handleLeftLeave,
			handleBtnEvent
		};
	},
	template: `<div class="sec sec1" id="sec1">
    <div class="sec1-bg" v-if="!mobile">
        <video poster="./assets/video/bg-preview.jpg" muted autoplay loop playsinline>
			<source src="./assets/video/bg.mp4" type="video/mp4" />
		</video>
    </div>
    <div class="sec1-left" @mouseover="handleLeftEnter" @mouseleave="handleLeftLeave">
        <a class="sec1-left__link sec1-left__link--icon1">極限成長密藥</a>
        <a class="sec1-left__link sec1-left__link--icon2">皇家美髮券x3</a>
        <a class="sec1-left__link sec1-left__link--icon3">皇家整形券x3</a>
        <a class="sec1-left__link sec1-left__link--icon4">Savior 名牌戒指</a>
        <a class="sec1-left__link sec1-left__link--icon5">Savior 聊天戒指</a>
    </div>
    <div class="sec-wrap">
		<div class="sec1-cloud sec1-cloud1"></div>
		<div class="sec1-cloud sec1-cloud2"></div>
		<div class="sec1-cloud sec1-cloud4"></div>
		<div class="sec1-cloud sec1-cloud5"></div>
        <div class="sec1-title"></div>
        <div class="sec1-btn-group">
            <div class="sec1-btn__step1 loading" v-show="event">
                <a href="javascript:;" class="sec1-btn__link" @click="handleBtnEvent(1)" @mouseover="handleEnter" @mouseleave="handleLeave"></a>
                <div class="sec1-btn--normal"></div>
                <div class="sec1-btn--hover"></div>
				<canvas class="canvas1 sec1-btn__step1-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step1-canvas2" width="400" height="400"></canvas>
            </div>
            <div class="sec1-btn__step2 loading" v-show="event">
                <a href="javascript:;" class="sec1-btn__link" @click="handleBtnEvent(2)"></a>
				<div class="sec1-btn--normal"></div>
                <div class="sec1-btn--hover"></div>
                <canvas class="canvas1 sec1-btn__step2-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step2-canvas2" width="400" height="400"></canvas>
            </div>
			<div class="sec1-btn__step3 loading" v-show="!event">
                <a href="https://maplestory.beanfun.com/main" class="sec1-btn__link" target="_blank"></a>
				<div class="sec1-btn--normal"></div>
                <div class="sec1-btn--hover"></div>
                <canvas class="canvas1 sec1-btn__step3-canvas1" width="400" height="400"></canvas>
                <canvas class="canvas2 sec1-btn__step3-canvas2" width="400" height="400"></canvas>
            </div>
        </div>
        <a href="javascript:;" class="sec1-character loading" @click="skillPop">
			<div class="sec1-character--normal"></div>
			<div class="sec1-character--hover"></div>
            <canvas class="sec1-character__canvas1" width="829" height="829"></canvas>
            <canvas class="sec1-character__canvas2" width="829" height="829"></canvas>
        </a>
    </div>
</div>`
};

export default sec1;
