import { CanvasSprite, loadingShow, loadingHide } from "../tool.js";
import { MessageLB } from "../lightbox.js";
import store from "../store.js";
function runAnimation(element, index) {
	const rect = element.getBoundingClientRect();
	const startX = 0; // 初始 x 座標
	const startY = 0; // 初始 y 座標
	let endX = -rect.x - 100; // 結束 x 座標
	let endY = rect.x + 100; // 結束 y 座標

	// 創建動畫實例並儲存到元素的屬性中
	element.animation = gsap.fromTo(
		element,
		{
			x: startX,
			y: startY,
			opacity: 1
		},
		{
			x: endX,
			y: endY,
			opacity: 0,
			duration: 4 * (index + 1),
			ease: "power1.out",
			repeat: -1,
			repeatDelay: 2,
			onRepeat: () => {
				// 可在每次重複時執行的操作
			}
		}
	);
}

// 停止動畫
function stopAnimation(element) {
	if (element.animation) {
		element.animation.pause(); // 暫停動畫
	}
}

// 重新播放動畫
function playAnimation(element) {
	if (element.animation) {
		element.animation.play(); // 播放動畫
	}
}
// 重新撥放（重置並播放）動畫
function restartAnimation(element, index) {
	if (element.animation) {
		element.animation.restart(); // 重置並重新播放動畫
	} else {
		runAnimation(element, index); // 如果尚未執行動畫，則開始新的動畫
	}
}
const t1 = gsap.timeline();
function repeatAnimation() {
	setTimeout(() => {
		t1.restart();
	}, 2000);
}
const part2Version = {
	props: {
		complete: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let swiper = Vue.ref(null);
		let c1 = Vue.ref(null);
		let c2 = Vue.ref(null);
		let c3 = Vue.ref(null);
		let c4 = Vue.ref(null);
		let c5 = Vue.ref(null);
		let slideClick = Vue.ref(false);
		let slideChangeCheck = Vue.ref(false);
		let slideLeaveCheck = Vue.ref(false);
		var isAnimatedPart2Video = false;
		var isAnimatedPart2Version = false;
		let mobile = Vue.computed(() => {
			return isMobile.any;
		});
		let players = Vue.ref([]);
		var playerInfoList = [
			{
				id: "player1",
				videoId: "T6-Yt0L4skQ"
			},
			{
				id: "player2",
				videoId: "E4eYjgv9Gh8"
			},
			{
				id: "player3",
				videoId: "-LIyrQPenhk"
			}
		];
		let initializePlayer = () => {
			function createPlayer(playerInfo) {
				return new YT.Player(playerInfo.id, {
					videoId: playerInfo.videoId,
					playerVars: {
						showinfo: 0,
						mute: 1,
						autoplay: 1
					},
					events: {
						onStateChange: function (event) {
							if (event.data == 0 && event.target.o.id == "player1") {
								players.value[0].playVideo();
							}
						}
					}
				});
			}
			if (typeof playerInfoList === "undefined") return;

			for (var i = 0; i < playerInfoList.length; i++) {
				var curplayer = createPlayer(playerInfoList[i]);
				players.value[i] = curplayer;
			}
		};
		let plays = (i) => {
			if (players.value[i]) {
				if (typeof players.value[i].playVideo === "function") {
					players.value[i].playVideo();
				}
			}
		};
		let pauses = (i) => {
			if (players.value[i]) {
				if (typeof players.value[i].playVideo === "function") {
					players.value[i].pauseVideo();
				}
			}
		};
		Vue.watch(
			() => store.state.img2,
			(val) => {
				swiper.value.autoplay.resume();
			}
		);
		Vue.nextTick(() => {
			let link1 = "./assets/css/images/part2/slide1-2/";
			let link2 = "./assets/css/images/part2/slide2-box/";
			let link3 = "./assets/css/images/part2/slide3-bar/";
			let link4 = "./assets/css/images/part2/slide4-island/";
			let link5 = "./assets/css/images/part2/slide5-cube/";
			let link6 = "./assets/css/images/part2/slide3-bar-m/";
			let canvasArr = [];
			let animMeteorElements = document.querySelectorAll(".part2-version-5__meter");
			let paginationBullet = document.querySelectorAll(".part2-swiper-pagination .swiper-pagination-bullet");
			const t1 = gsap.timeline();
			// Initial animation
			t1.to(".part2-version-2__title", {
				backgroundPosition: "-1400%",
				duration: 1,
				ease: SteppedEase.config(14),
				onComplete: repeatAnimation
			});
			t1.pause();
			function repeatAnimation() {
				setTimeout(() => {
					t1.restart();
				}, 5000);
			}
			if (isMobile.any) {
				c3.value = new CanvasSprite($(".part2-version-3__bar canvas"), 48, 0);
				canvasArr = [c3.value.PreLoad(link6, "0100")];
			} else {
				c3.value = new CanvasSprite($(".part2-version-3__bar canvas"), 96, 0);
				c4.value = new CanvasSprite($(".part2-version-4__island canvas"), 48, 0);
				c5.value = new CanvasSprite($(".part2-version-5__cube canvas"), 48, 0);
				canvasArr = [c3.value.PreLoad(link3, "2200"), c4.value.PreLoad(link4, "0100"), c5.value.PreLoad(link5, "0100")];
			}

			store.commit("SET_IMG2", false);
			Promise.allSettled(canvasArr).then((res) => {
				store.commit("SET_IMG2", true);
			});
			if (isMobile.any) {
				swiper.value = new Swiper(".part2-swiper", {
					speed: 2000,
					parallax: true,
					creativeEffect: {
						prev: {
							shadow: true,
							translate: ["0%", 0, -1]
						},
						next: {
							translate: ["100%", 0, 0]
						}
					},
					allowTouchMove: true,
					loop: true,
					navigation: {
						nextEl: ".part2-swiper-button-next",
						prevEl: ".part2-swiper-button-prev"
					},
					watchSlidesProgress: true
				});
			} else {
				swiper.value = new Swiper(".part2-swiper", {
					speed: 2000,
					parallax: true,
					creativeEffect: {
						prev: {
							shadow: true,
							translate: ["0%", 0, -1]
						},
						next: {
							translate: ["100%", 0, 0]
						}
					},
					autoplay: {
						delay: 15000,
						disableOnInteraction: false,
						waitForTransition: true
					},
					loop: true,
					navigation: {
						nextEl: ".part2-swiper-button-next",
						prevEl: ".part2-swiper-button-prev"
					},
					watchSlidesProgress: true,
					on: {
						init: function (s) {
							s.autoplay.pause();
						},
						autoplayStart(swiper) {},
						autoplayTimeLeft(s, time, progress) {
							let currentIndex = s.realIndex;
							if (progress < 0) progress = 0;
							if (progress > 1) progress = 1;
							var percentage = (1 - progress) * 100;
							paginationBullet.forEach((item, index) => {
								if (index === currentIndex) {
									item.style.setProperty("--progress", percentage.toFixed(2));
								} else {
									item.style.setProperty("--progress", 0);
								}
							});
						}
					}
				});
			}

			swiper.value.on("slideChange", (s) => {
				if (s.previousIndex == 0) {
					if (!isMobile.any) {
						// $(".part2-version-1__2").addClass("loading");
						// c1.value.Stop();
					}
					pauses(1);
					$(".part2-version-1__1").removeClass("move1");
				}
				if (s.previousIndex == 1) {
					if (!isMobile.any) {
						// $(".part2-version-2__box").addClass("loading");
						// c2.value.Stop();
						// $(".part2-version-2__title").removeClass("title-flash");
					}
					t1.pause();
					$(".part2-version-2__rock1").removeClass("move1");
					$(".part2-version-2__rock2").removeClass("move3");
					$(".part2-version-2__rock3").removeClass("move2");
					$(".part2-version-2__rock4").removeClass("move4");
					$(".part2-version-2__rock5").removeClass("move5");
					pauses(2);
				}
				if (s.previousIndex == 2) {
					$(".part2-version-3__bar").addClass("loading");
					c3.value.Stop();
				}
				if (s.previousIndex == 3) {
					if (!isMobile.any) {
						$(".part2-version-4__island").addClass("loading");
						c4.value.Stop();
						$(".part2-version-4__2").removeClass("boatMoving");
						$(".part2-version-4__1").removeClass("boatSwing");
					}
				}
				if (s.previousIndex == 4) {
					if (!isMobile.any) {
						$(".part2-version-5__cube").addClass("loading");
						c5.value.Stop();
						$(".part2-version-5__circle1").removeClass("move1");
						$(".part2-version-5__circle2").removeClass("move3");
						$(".part2-version-5__circle3").removeClass("move2");
						$(".part2-version-5__circle4").removeClass("move4");
						animMeteorElements.forEach((element, index) => {
							stopAnimation(element);
						});
					}
				}
			});
			swiper.value.on("slideChangeTransitionStart", (s) => {
				slideChangeCheck.value = true;
				if (slideClick.value) {
					swiper.value.autoplay.stop();
					swiper.value.autoplay.pause();
					paginationBullet.forEach((item, index) => {
						item.style.setProperty("--progress", 0);
					});
				}
				if (s.realIndex != 0) {
					$(".part2-version-1__1").removeClass("move1");
					pauses(1);
				}
				if (s.realIndex != 1) {
					// $(".part2-version-2__title").removeClass("title-flash");
					t1.pause();
					$(".part2-version-2__rock1").removeClass("move1");
					$(".part2-version-2__rock2").removeClass("move3");
					$(".part2-version-2__rock3").removeClass("move2");
					$(".part2-version-2__rock4").removeClass("move4");
					$(".part2-version-2__rock5").removeClass("move5");
					pauses(2);
				}
				if (s.realIndex != 2) {
				}
				if (s.realIndex != 3) {
					$(".part2-version-4__2").removeClass("boatMoving");
					$(".part2-version-4__1").removeClass("boatSwing");
				}
				if (s.realIndex != 4) {
					$(".part2-version-5__circle1").removeClass("move1");
					$(".part2-version-5__circle2").removeClass("move3");
					$(".part2-version-5__circle3").removeClass("move2");
					$(".part2-version-5__circle4").removeClass("move4");
					animMeteorElements.forEach((element, index) => {
						stopAnimation(element);
					});
				}
			});
			swiper.value.on("slideChangeTransitionEnd", (s) => {
				slideChangeCheck.value = false;
				if (slideClick.value) {
					swiper.value.autoplay.start();
					swiper.value.autoplay.pause();
					setTimeout(() => {
						if (slideLeaveCheck.value) {
							swiper.value.autoplay.resume();
						}
						slideClick.value = false;
					}, 100);
				}
				if (s.realIndex == 0) {
					if (!isMobile.any) {
						// c1.value.Loop();
						// $(".part2-version-1__2").removeClass("loading");
					}
					$(".part2-version-1__1").addClass("move1");
					plays(1);
				}
				if (s.realIndex == 1) {
					if (!isMobile.any) {
						// $(".part2-version-2__box").removeClass("loading");
						// c2.value.Loop();
					}
					// if (!$(".part2-version-2__title").hasClass("title-flash")) {
					// 	$(".part2-version-2__title").addClass("title-flash");
					// }
					t1.resume();
					plays(2);
					$(".part2-version-2__rock1").addClass("move1");
					$(".part2-version-2__rock2").addClass("move3");
					$(".part2-version-2__rock3").addClass("move2");
					$(".part2-version-2__rock4").addClass("move4");
					$(".part2-version-2__rock5").addClass("move5");
				} else {
					$(".part2-version-2__title").removeClass("title-flash");
				}
				if (s.realIndex == 2) {
					$(".part2-version-3__bar").removeClass("loading");
					c3.value.Loop();
				}
				if (s.realIndex == 3) {
					if (!isMobile.any) {
						$(".part2-version-4__island").removeClass("loading");
						c4.value.Loop();
						$(".part2-version-4__2").addClass("boatMoving");
						$(".part2-version-4__1").addClass("boatSwing");
					}
				}
				if (s.realIndex == 4) {
					if (!isMobile.any) {
						$(".part2-version-5__cube").removeClass("loading");
						c5.value.Loop();
						$(".part2-version-5__circle1").addClass("move1");
						$(".part2-version-5__circle2").addClass("move3");
						$(".part2-version-5__circle3").addClass("move2");
						$(".part2-version-5__circle4").addClass("move4");

						animMeteorElements.forEach((element, index) => {
							restartAnimation(element, index);
						});
					}
				}
			});
			swiper.value.on("autoplayPause", () => {});
			swiper.value.on("autoplayResume", () => {});
		});
		const slideToPage = (index) => {
			swiper.value.slideToLoop(index);
			slideClick.value = true;
		};
		const slideEnter = (e) => {
			slideLeaveCheck.value = false;
			swiper.value.autoplay.pause();
		};
		const slideLeave = (index) => {
			slideLeaveCheck.value = true;
			swiper.value.autoplay.resume();
		};
		let linkLB = (link) => {
			MessageLB("Coming Soon");
		};
		let videoEnter = (i) => {
			slideLeaveCheck.value = false;
			swiper.value.autoplay.pause();
		};
		let videoLeave = (i) => {
			slideLeaveCheck.value = true;
			swiper.value.autoplay.resume();
		};
		Vue.onMounted(() => {
			var scrollPos = $(window).scrollTop();
			var part2VideoOffset = $(".part2-video").offset().top;
			var part2VersionOffset = $(".part2-version").offset().top;
			var part2Boundary = window.outerHeight * 0.2;
			// if (!isAnimatedPart2Video && Math.abs(scrollPos - part2VideoOffset) < part2Boundary) {
			// 	$(".part2-video video")[0].play();
			// }
			// if (!isAnimatedPart2Version && Math.abs(scrollPos - part2VersionOffset) < part2Boundary) {
			// 	isAnimatedPart2Version = true;
			// }
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = initializePlayer;
			if (!isMobile.any) {
				$(window).scroll(function () {
					scrollPos = $(window).scrollTop();
					part2VideoOffset = $(".part2-video").offset().top;
					part2VersionOffset = $(".part2-version").offset().top;
					part2Boundary = window.outerHeight * 0.75;
					// 檢查並滾動到 .part2-video
					if (!isAnimatedPart2Video && Math.abs(scrollPos - part2VideoOffset) < part2Boundary) {
						$("html, body").animate(
							{
								scrollTop: part2VideoOffset
							},
							400
						);
						plays(0);
						isAnimatedPart2Video = true;
					}

					// 檢查並滾動到 .part2-version
					if (!isAnimatedPart2Version && Math.abs(scrollPos - part2VersionOffset) < part2Boundary) {
						$("html, body").animate(
							{
								scrollTop: part2VersionOffset
							},
							400
						);
						isAnimatedPart2Version = true;
					}
				});
			}
		});
		return { slideToPage, slideEnter, slideLeave, mobile, linkLB, videoEnter, videoLeave };
	},
	template: `
	<div class="section part2-video">
		<div id="player1"></div>
	</div>
	<div id="part2" class="section part2-version">
    <div class="swiper part2-swiper">
        <div class="swiper-wrapper">
            <!-- NEW AGE6轉 -->
            <div class="swiper-slide part2-version-1">
                <div class="part2-version-1__2 loading" data-swiper-parallax="-560">
					<canvas width="1920" height="1080"></canvas>
				</div>
                <div class="part2-version-1__box" data-swiper-parallax="-760">
					<a class="part2-version-1__box-yt" href="https://www.youtube.com/watch?v=-LIyrQPenhk" target="_blank"></a>
					<div class="part2-version-1__box-video" @mouseenter="videoEnter(1)" @mouseleave="videoLeave(1)">
						<div id="player2"></div>
					</div>
				</div>
                <div class="part2-version__text-box part2-version-1__text" data-swiper-parallax="-960">
                    <span></span>
                    <a href="https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=9913" target="_blank" class="part2-version__btn" id="6promotion">瞭解更多</a>
                </div>
            </div>
            <!-- 究極燃燒 -->
            <div class="swiper-slide part2-version-2">
                <div class="part2-version-2__1" data-swiper-parallax="-760"></div>
                <div class="part2-version-2__2" data-swiper-parallax="-760"></div>
                <div class="part2-version-2__box loading" data-swiper-parallax="-360">
					<canvas width="1920" height="1080"></canvas>
					<a class="part2-version-2__box-yt" href="https://www.youtube.com/watch?v=-LIyrQPenhk" target="_blank"></a>
					<div class="part2-version-2__box-video" @mouseenter="videoEnter(2)" @mouseleave="videoLeave(2)">
						<div id="player3"></div>
					</div>
				</div>
                <span class="part2-version-2__title"></span>
				<div class="part2-version-2__rock1" data-swiper-parallax="-1360"></div>
				<div class="part2-version-2__rock2" data-swiper-parallax="-1360"></div>
				<div class="part2-version-2__rock3" data-swiper-parallax="-1360"></div>
				<div class="part2-version-2__rock4" data-swiper-parallax="-1360"></div>
				<div class="part2-version-2__rock5" data-swiper-parallax="-1360"></div>
                <div class="part2-version__text-box part2-version-2__text" data-swiper-parallax="-1560">
                    <span></span>
                    <a href="https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=9917" target="_blank" class="part2-version__btn" id="break260">瞭解更多</a>
                </div>
            </div>
            <!-- 經驗值優化 -->
            <div class="swiper-slide part2-version-3">
				<div class="part2-version-3__1" data-swiper-parallax="-560"></div>
                <div class="part2-version-3__bar loading" data-swiper-parallax="-360">
					<canvas width="1920" height="1080" v-if="!mobile"></canvas>
					<canvas width="768" height="1334" v-else></canvas>
				</div>
                <div class="part2-version-3__title" data-swiper-parallax="-860"></div>
                <div class="part2-version__text-box part2-version-3__text" data-swiper-parallax="-760">
                    <span></span>
                    <a href="https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=9922" target="_blank" class="part2-version__btn" id="EXP50percent">瞭解更多</a>
                </div>
            </div>
            <!-- 伊甸提斯克 -->
            <div class="swiper-slide part2-version-4">
                <div class="part2-version-4__1" data-swiper-parallax="-360"></div>
                <div class="part2-version-4__2" data-swiper-parallax="-760"></div>
                <div class="part2-version-4__island loading" data-swiper-parallax="-1160">
					<canvas width="1920" height="1080"></canvas>
				</div>
                <div class="part2-version__text-box part2-version-4__text" data-swiper-parallax="-1560">
                    <span></span>
                    <a href="https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=9914" target="_blank" class="part2-version__btn" id="eden">瞭解更多</a>
                </div>
            </div>
            <!-- 新手超強禮包 -->
            <div class="swiper-slide part2-version-5">
                <div class="part2-version-5__1" data-swiper-parallax="-760"></div>
                <div class="part2-version-5__2" data-swiper-parallax="-960"></div>
                <div class="part2-version-5__3" data-swiper-parallax="-1160"></div>
                <div class="part2-version-5__cube loading" data-swiper-parallax="-360">
					<canvas width="1920" height="1080"></canvas>
				</div>
                <div class="part2-version-5__title" data-swiper-parallax="-460"></div>
                <div class="part2-version-5__circle1" data-swiper-parallax="-1360"></div>
                <div class="part2-version-5__circle2" data-swiper-parallax="-1360"></div>
                <div class="part2-version-5__circle3" data-swiper-parallax="-1360"></div>
                <div class="part2-version-5__circle4" data-swiper-parallax="-1360"></div>
                <div class="part2-version__text-box part2-version-5__text" data-swiper-parallax="-1160">
                    <span></span>
                    <a href="https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=9918" target="_blank" class="part2-version__btn" id="newbiebox">瞭解更多</a>
                </div>
            </div>
        </div>
        <div class="part2-swiper-button-prev"></div>
        <div class="part2-swiper-button-next"></div>
        <div class="part2-swiper-pagination">
            <div class="swiper-pagination-bullet" data-slide="0" @click="slideToPage(0)" @mouseenter="slideEnter" @mouseleave="slideLeave" style="--progress:0"></div>
            <div class="swiper-pagination-bullet" data-slide="1" @click="slideToPage(1)" @mouseenter="slideEnter" @mouseleave="slideLeave" style="--progress:0"></div>
            <div class="swiper-pagination-bullet" data-slide="2" @click="slideToPage(2)" @mouseenter="slideEnter" @mouseleave="slideLeave" style="--progress:0"></div>
            <div class="swiper-pagination-bullet" data-slide="3" @click="slideToPage(3)" @mouseenter="slideEnter" @mouseleave="slideLeave" style="--progress:0"></div>
            <div class="swiper-pagination-bullet" data-slide="4" @click="slideToPage(4)" @mouseenter="slideEnter" @mouseleave="slideLeave" style="--progress:0"></div>
        </div>
    </div>
</div>`
};

export default part2Version;
