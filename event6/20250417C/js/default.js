import { MessageLB, Sec2SlideLB } from "./lightbox.js";
import { AlphaVideoPlayer, VideoController } from "./tool.js";
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
// Sec2SlideLB();
function centerMap() {
	const container = document.querySelector(".sec2");
	const map = document.querySelector(".sec2-map");

	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;

	const mapWidth = map.clientWidth;
	const mapHeight = map.clientHeight;

	const centerX = (containerWidth - mapWidth) / 2;
	const centerY = (containerHeight - mapHeight) / 2;
	gsap.set(map, {
		x: centerX,
		y: centerY,
	});
}
const mainVideo = document.getElementById("main-video");
let mainVideoCtrl = new VideoController(mainVideo);
if (location.hash != "" && location.hash != "#sec1") {
	document.querySelector(".intro-video").style.display = "none";
}
let app = Vue.createApp({
	setup() {
		let skip = Vue.ref(false);
		let play = Vue.ref(false);
		let slogan = Vue.ref(null);
		let sec3Time = Vue.ref(null);
		let sec4Time = Vue.ref(null);
		let sec3Con1Index = Vue.ref(0);
		let sec4Con1Index = Vue.ref(0);
		let fullpageRender = Vue.ref(false);
		function toggleSec3Con1() {
			document.querySelectorAll(".sec3-tab__con1-map-item").forEach(function (item) {
				item.classList.remove("active");
			});
			sec3Con1Index.value = (sec3Con1Index.value + 1) % document.querySelectorAll(".sec3-tab__con1-map-item").length;
			document.querySelectorAll(`.sec3-tab__con1-map-item`)[sec3Con1Index.value].classList.add("active");
		}
		function toggleSec4Con1() {
			document.querySelectorAll(".sec4-tab__con1-map-item").forEach(function (item) {
				item.classList.remove("active");
			});
			sec4Con1Index.value = (sec4Con1Index.value + 1) % document.querySelectorAll(".sec4-tab__con1-map-item").length;
			document.querySelectorAll(`.sec4-tab__con1-map-item`)[sec3Con1Index.value].classList.add("active");
		}

		Vue.onMounted(() => {
			let _anchorLink, _direction, sec2Anim, sec3Anim, sec4Anim, sec1Anim;
			if (!isMobile.any) {
				sec1Anim = gsap
					.timeline({
						paused: !0,
					})
					.addLabel("start")
					.from(
						".sec1-title",
						{
							duration: 0.8,
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"start+=0.5"
					)
					.from(
						".sec1-scroll-down",
						{
							duration: 0.8,
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"start+=0.5"
					);
				sec2Anim = gsap
					.timeline({
						paused: !0,
					})
					.addLabel("start")
					.from(
						".sec2-title",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"start+=0.6"
					)
					.from(
						".sec2-time",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec2-map__btn--1",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.52"
					)
					.from(
						".sec2-map__btn--2",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.62"
					)
					.from(
						".sec2-map__btn--3",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.62"
					)
					.from(
						".sec2-map__btn--4",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.62"
					)
					.from(
						".sec2-map__btn--5",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.62"
					);
				sec3Anim = gsap
					.timeline({
						paused: !0,
					})
					.addLabel("start")
					.from(
						".sec3-title",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"start+=0.6"
					)
					.from(
						".sec3-time",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec3-tab__btn-list",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec3-tab__content",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec3-btn",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					);
				sec4Anim = gsap
					.timeline({
						paused: !0,
					})
					.addLabel("start")
					.from(
						".sec4-title",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"start+=0.6"
					)
					.from(
						".sec4-time",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec4-tab__btn-list",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec4-tab__content",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					)
					.from(
						".sec4-btn",
						{
							duration: 0.68,
							y: "+=120",
							autoAlpha: 0,
							ease: "power2.easeIn",
						},
						"-=0.48"
					);
			}
			const video1 = document.getElementById("world_in");
			const video2 = document.getElementById("world_loop");
			const video1Ctrl = new VideoController(video1);
			const video2Ctrl = new VideoController(video2);
			// 分享選單開啟
			document.querySelector(".fixed-social__share-open").addEventListener("click", function () {
				// 上一層.social-header__share-group
				this.parentElement.classList.add("active");
				document.querySelector(".fixed-social").classList.add("open");
			});
			// 分享選單關閉
			document.querySelector(".fixed-social__share-close").addEventListener("click", function () {
				// 上一層.social-header__share-group
				this.parentElement.classList.remove("active");
				document.querySelector(".fixed-social").classList.remove("open");
			});
			if (!isMobile.any) {
				// 標題動畫
				const videoConfigs = [
					{
						src: "./assets/video/title_loop.mp4",
						loop: true, // 覆蓋默認循環設置
					},
				];

				// 全局播放器配置
				const playerOptions = {
					el: "#sloganCanvas",
					width: 1200, // 畫布寬度
					height: 400, // 畫布高度
					fps: 60, // 幀率
				};
				slogan.value = new AlphaVideoPlayer(videoConfigs, playerOptions);
				slogan.value.start().then((res) => {
					play.value = true;
				});

				gsap.registerPlugin(Draggable, InertiaPlugin);
				Draggable.create(".sec2-map", {
					bounds: ".sec2",
					type: "x,y",
					zIndexBoost: !1,
				});
			} else {
				document.querySelector(".nav-toggle").addEventListener("click", function () {
					if (!fullpageRender.value) {
						return;
					}
					this.parentElement.classList.toggle("active");
					if (this.parentElement.classList.contains("active")) {
						$.fn.fullpage.setAllowScrolling(false);
					} else {
						$.fn.fullpage.setAllowScrolling(true);
					}
				});
			}

			// SEC2 地圖開啟POP SLIDE
			document.querySelectorAll(".sec2-map__btn").forEach(function (item) {
				item.addEventListener("click", function () {
					let slideIndex = this.dataset.slide;
					Sec2SlideLB(slideIndex);
				});
			});

			document.querySelectorAll(".fixed-btn__toggle").forEach(function (item) {
				item.addEventListener("click", function () {
					// 先移除所有 .fixed-btn__toggle 父元素的 active class
					document.querySelectorAll(".fixed-btn__toggle").forEach(function (otherItem) {
						if (otherItem !== item) {
							otherItem.parentElement.classList.remove("active");
						}
					});

					// 切換當前點擊元素父元素的 active class
					this.parentElement.classList.toggle("active");
				});
			});

			// SEC3 TAB
			document.querySelectorAll(".sec3-tab__btn-item").forEach(function (item) {
				item.addEventListener("click", function () {
					document.querySelectorAll(".sec3-tab__btn-item").forEach(function (el) {
						el.classList.remove("active");
					});
					this.classList.add("active");

					// 取得對應的內容區塊索引
					const index = this.dataset.tab;
					if (index == 2) {
						document.querySelector(".sec3-bg2").classList.add("active");
					} else {
						document.querySelector(".sec3-bg2").classList.remove("active");
					}
					// 處理對應的內容顯示
					document.querySelectorAll(".sec3-tab__content-box").forEach(function (content) {
						content.classList.remove("active");
					});
					document.querySelector(`.sec3-tab__content-box[data-tab="${index}"]`).classList.add("active");
				});
			});
			// SEC4 TAB
			document.querySelectorAll(".sec4-tab__btn-item").forEach(function (item) {
				item.addEventListener("click", function () {
					document.querySelectorAll(".sec4-tab__btn-item").forEach(function (el) {
						el.classList.remove("active");
					});
					this.classList.add("active");

					// 取得對應的內容區塊索引
					const index = this.dataset.tab;

					// 處理對應的內容顯示
					document.querySelectorAll(".sec4-tab__content-box").forEach(function (content) {
						content.classList.remove("active");
					});
					document.querySelector(`.sec4-tab__content-box[data-tab="${index}"]`).classList.add("active");
				});
			});
			document.querySelector("#app").classList.add("active");
			$("#app").fullpage({
				menu: "#nav",
				anchors: ["sec1", "sec2", "sec3", "sec4"],
				sectionSelector: ".sec",
				afterRender: function () {
					fullpageRender.value = true;
				},
				afterLoad: function (anchorLink, destination) {
					if (destination != 1) {
						document.querySelector(".intro-video").style.display = "none";
						skip.value = true;
					}
					if (destination >= 2) {
						document.querySelector(".nav-item-parent[data-sec='sec2']").classList.add("on");
					} else {
						document.querySelector(".nav-item-parent[data-sec='sec2']").classList.remove("on");
					}
					if (_direction == "up" && destination == 4) {
						return;
					}
					switch (destination) {
						case 1:
							_anchorLink = anchorLink;
							if (!isMobile.any) {
								// document.querySelector("#main-bg").play();
								// if (!play.value) {
								// 	slogan.value.start();
								// 	// sec1Anim.play(0);
								// }
								if (skip.value) {
									document.querySelector("#main-bg").play();
									if (!play.value) {
										slogan.value.start();
									}
									sec1Anim.play(0);
									return;
								}
								if (location.hash == "" || location.hash == "#sec1") {
									mainVideoCtrl.play();
									mainVideoCtrl.onEnd(() => {
										if (skip.value) {
											return;
										}
										gsap.to(".intro-video", {
											opacity: 0,
											duration: 0.3,
											onComplete: function () {
												document.querySelector(".intro-video").style.display = "none";
												document.querySelector("#main-bg").play();
												skip.value = true;
												sec1Anim.play(0);
											},
										});
									});

									document.querySelector(".intro-video__skip").addEventListener("click", function () {
										skip.value = true;
										gsap.to(".intro-video", {
											opacity: 0,
											duration: 0.3,
											onComplete: function () {
												document.querySelector(".intro-video").style.display = "none";
												document.querySelector("#main-bg").play();
												skip.value = true;
												sec1Anim.play(0);
											},
										});
									});
								} else {
									document.querySelector(".intro-video").style.display = "none";
								}
							}
							break;
						case 2:
							_anchorLink = anchorLink;
							if (!isMobile.any) {
								$.fn.fullpage.setAllowScrolling(false);
								document.querySelector(".sec2-in-video").classList.add("active");
								gsap.set(".sec2-in-video", {
									opacity: 1,
								});
								document.querySelector(".sec2-map").classList.add("active");
								document.querySelector(".sec2-map__video").classList.add("active");
								centerMap();
								video1Ctrl.play();
								video1Ctrl.onEnd(() => {
									gsap.to(".sec2-in-video", {
										opacity: 0,
										duration: 0.3,
										onComplete: function () {
											document.querySelector(".sec2-in-video").classList.remove("active");
											video2.play();
											sec2Anim.play(0);
											$.fn.fullpage.setAllowScrolling(true);
										},
									});
								});
							}
							break;
						case 3:
							_anchorLink = anchorLink;
							if (!isMobile.any) {
								sec3Anim.play(0);
								document.querySelector("#sec3-video").play();
							}
							sec3Time.value = setInterval(() => {
								toggleSec3Con1();
							}, 2000);
							break;
						case 4:
							_anchorLink = anchorLink;
							if (!isMobile.any) {
								sec4Anim.play(0);
								document.querySelector("#sec4-video").play();
							}
							sec4Time.value = setInterval(() => {
								toggleSec4Con1();
							}, 2000);
							break;
						case 5:
							if (anchorLink == "footer" && _anchorLink == undefined) {
								sec4Anim.play(0);
							} else {
								_anchorLink = "sec4";
							}
							break;
					}
				},
				onLeave: function (origin, destination, direction) {
					_direction = direction;
					if (isMobile.any) {
						if (document.querySelector("#nav").classList.contains("active")) {
							setTimeout(() => {
								$.fn.fullpage.setAllowScrolling(true);
								document.querySelector("#nav").classList.remove("active");
							}, 700);
						}
					}
					if (destination < 2) {
						document.querySelector(".nav-item-parent[data-sec='sec2']").classList.remove("on");
					}
					if (direction == "down" && destination == 5) {
						return;
					}
					if (direction == "up" && destination == 4) {
						return;
					}
					switch (destination) {
						case 1:
							if (!isMobile.any) {
								sec1Anim.pause(0);
							}
							break;
						case 2:
							if (!isMobile.any) {
								video1Ctrl.video.currentTime = 0;
								gsap.set(".sec2-in-video", {
									opacity: 1,
								});
								document.querySelector(".sec2-map__video").classList.remove("active");
								sec2Anim.pause(0);
							}
							break;
						case 3:
							if (sec3Time.value) {
								clearInterval(sec3Time.value);
								sec3Time.value = null;
							}
							if (!isMobile.any) {
								sec3Anim.pause(0);
							}
							break;
						case 4:
							if (sec4Time.value) {
								clearInterval(sec4Time.value);
								sec4Time.value = null;
							}

							if (!isMobile.any) {
								sec4Anim.pause(0);
							}
							break;
					}
				},
			});
		});
		return {};
	},
});
app.mount("#app");
