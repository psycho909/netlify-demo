import { SuperItemLB, MessageLB } from "../lightbox.js";
import { CanvasSprite, loadingShow, loadingHide } from "../tool.js";
const part3Main = {
	setup(props) {
		let mobile = Vue.ref(false);
		let link1 = "./assets/css/images/part3/part3-title/";
		let c1 = Vue.ref(null);
		if (isMobile.any) mobile.value = true;
		Vue.nextTick(() => {
			let canvasArr = [];
			// const t1 = gsap.timeline();
			// t1.to(".part3-main-title", {
			// 	backgroundPosition: "-1400%",
			// 	duration: 1,
			// 	ease: SteppedEase.config(14),
			// 	onComplete: repeatAnimation
			// });
			c1.value = new CanvasSprite($(".part3-main-title"), 10, 0);
			canvasArr = [c1.value.PreLoad(link1, "1")];
			function repeatAnimation() {
				setInterval(() => {
					c1.value.Run();
				}, 4000);
			}
			repeatAnimation();
		});
		let SuperItem = () => {
			SuperItemLB();
		};
		return { SuperItem, mobile };
	},
	template: `
	<div class="section part3-main">
		<canvas class="part3-main-title" width="966" height="292"></canvas>
		<div class="part3-main-text"></div>
		<a href="https://maplestory.beanfun.com/main" class="part3-main-btn" target="_blank">立即開玩</a>
		<video id="part3-video" class="part3-video-pc" src="./assets/video/part3.mp4" poster="./assets/video/part3.jpg" autoplay loop muted playsinline v-if="!mobile"></video>
		<video id="part3-video-m" class="part3-video-m" src="./assets/video/part3-m.mp4" poster="./assets/video/part3-m.jpg" autoplay loop muted playsinline v-else></video>
	</div>
	<div class="part3-main-super-item">
		<a href="javascript:;" class="main-super-item__btn" @click="SuperItem"></a>
	</div>
	`
};

export default part3Main;
