import { Notice, MessageLB, Mission, RemoveTitle, Guide, SelectCreated } from "../lightbox.js";
import { GetUserCharacterData, InsertTitleLog, UpdateTitleLog } from "../api.js";
import { CanvasSprite } from "../canvas.js";
import useEventStore from "../store.js";
const { storeToRefs } = Pinia;
// Guide();
// SelectCreated();
const create = {
	setup() {
		let stopTimer;
		let swiper = Vue.ref(null);
		let splide = Vue.ref(null);
		let canvasArr = Vue.ref([]);
		let api = Vue.ref(false);
		const store = useEventStore();
		const timer = Vue.ref({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
		const { titleData } = storeToRefs(store);
		let coolDownSec = Vue.ref("60");
		function handleOrientationChange() {
			var orientation = window.orientation || window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation;
			if (orientation.angle !== undefined) {
				orientation = orientation.angle;
			}
			setTimeout(() => {
				if (document.documentElement.clientWidth <= 768) {
					if (isMobile.any) {
						splide.value = new Splide(".splide", {
							type: "loop",
							padding: "20%",
							pagination: false,
							arrows: false,
							classes: {
								prev: "splide__arrow--prev create-hold__item-prev",
								next: "splide__arrow--next create-hold__item-next"
							}
						});

						splide.value.mount();
					}
				} else {
					if (splide.value !== null) {
						splide.value.destroy();
					}
				}
			}, 200);
		}
		Vue.watch(
			() => store.titleData,
			() => {
				if (window.screen.width <= 768) {
					if (isMobile.any) {
						Vue.nextTick(() => {
							splide.value.refresh();
							splide.value.go(0);
						});
					}
				}
			}
		);
		// 數字轉換
		const formattedTime = Vue.computed(() => {
			return {
				hours: timer.value.hours.toString().padStart(2, "0"),
				minutes: timer.value.minutes.toString().padStart(2, "0"),
				seconds: timer.value.seconds.toString().padStart(2, "0"),
				completed: timer.value.completed
			};
		});
		// 優化SVG讀取
		function quickCountdown() {
			return new Promise((resolve) => {
				let remaining = 9;
				timer.value.seconds = "09";
				const updateTimer = () => {
					const formattedSeconds = remaining.toString().padStart(2, "0");
					timer.value.seconds = formattedSeconds;

					if (remaining > 0) {
						setTimeout(updateTimer, 10);
					} else {
						resolve("倒數結束");
					}
					remaining -= 1;
				};

				updateTimer();
			});
		}
		// 倒數計時
		function countdown(initialSeconds, onUpdate) {
			let now = new Date().getTime();
			let endTime = now + initialSeconds * 1000; // Convert seconds to milliseconds and add to current time
			let frameId;
			function stop() {
				if (frameId) {
					cancelAnimationFrame(frameId);
					frameId = null;
				}
			}
			function updateTimer() {
				now = new Date().getTime();
				const distance = endTime - now;
				if (distance < 0) {
					onUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
					stop();
					return;
				}
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);
				onUpdate({ days, hours, minutes, seconds, completed: true });
				frameId = requestAnimationFrame(updateTimer);
			}
			function start(newMinutes) {
				if (newMinutes !== undefined) {
					now = new Date().getTime();
					endTime = now + newMinutes * 60 * 1000;
				}
				if (!frameId) {
					updateTimer();
				}
			}
			start();
			return { start, stop };
		}

		// 刪除稱號
		const deleteItem = (Seq) => {
			// 打開lightbox確認是否刪除
			RemoveTitle(Seq);
		};
		// 稱號招喚
		const rollItem = () => {
			// 冷卻中
			if (formattedTime.value.completed) {
				return;
			}
			// 限制最多三個
			if (titleData.value.length >= 3) {
				MessageLB("持有的稱號已達上限，<br/>請先刪除1個稱號再進行召喚。");
				return;
			}
			// 停止計時器
			if (stopTimer) {
				stopTimer.stop();
			}

			// 冷卻開始
			stopTimer = countdown("2024-03-30 00:00:00", (update) => {
				timer.value = update;
			});

			// 1.打API稱號招喚並跳頁
			$("#loadingProgress").show();
			InsertTitleLog(store.token).then((res) => {
				$("#loadingProgress").hide();
				let { code, message, listData, url } = res.data;
				if (code != 1) {
					MessageLB(message);
					return;
				}
				if (code == -2) {
					MessageLB(message, url);
					return;
				}
				store.setTitleData(listData);
				store.setCurrentPage("plunder");
				console.log("rollItem");
			});
		};
		const MissionLB = () => {
			let data = [];
			Mission(data);
		};
		const slideToGo = (page) => {
			splide.value.go(page);
		};
		Vue.onMounted(() => {
			quickCountdown();
			stopTimer = countdown(coolDownSec.value, (update) => {
				timer.value = update;
			});
			window.addEventListener("orientationchange", handleOrientationChange);
			if (window.innerWidth <= 768) {
				if (isMobile.any) {
					splide.value = new Splide(".splide", {
						type: "loop",
						padding: "20%",
						pagination: false,
						arrows: false,
						classes: {
							prev: "splide__arrow--prev create-hold__item-prev",
							next: "splide__arrow--next create-hold__item-next"
						}
					});

					splide.value.mount();
				}
			}
		});

		// 組件卸載時停止計時器
		Vue.onUnmounted(() => {
			if (stopTimer) {
				stopTimer.stop();
			}
			window.removeEventListener("orientationchange", handleOrientationChange);
		});
		return { Notice, deleteItem, rollItem, titleData, formattedTime, MissionLB, canvasArr, deleteItem, slideToGo };
	},
	template: `
		<div class="create-content">
			<div class="create-title"><span></span></div>
			<div class="create-event">
				<div class="create-pre">
					<div class="create-pre__title">角色名稱</div>
					<div class="create-pre__name-box"><div class="create-pre__name">角色名稱最多十個文字</div><a href="javascript:;" class="create-pre__btn-logout">登出</a></div>
					<div class="create-pre__realm">
						<span>扭曲的黃金港01</span>
					</div>
				</div>
				<div class="create-event-content">
					<div class="create-action">
						<div class="create-countdown__title">獲取冷卻時間</div>
						<div class="create-countdown__time-box">
							<!-- 時 -->
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="hour" :data-num="formattedTime.hours[0]"></i>
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="hour" :data-num="formattedTime.hours[1]"></i>
							<i class="create-countdown__time-num icon--num-style2 i--colon">:</i>
							<!-- 分 -->
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="min" :data-num="formattedTime.minutes[0]"></i>
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="min" :data-num="formattedTime.minutes[1]"></i>
							<i class="create-countdown__time-num icon--num-style2 i--colon">:</i>
							<!-- 秒 -->
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="sec" :data-num="formattedTime.seconds[0]"></i>
							<i class="create-countdown__time-num icon--num icon--num-style2" data-type="sec" :data-num="formattedTime.seconds[1]"></i>
						</div>
						<a href="javascript:;" class="create-action__btn-protect" :class="[formattedTime.completed?'-disabled':'']" @click="rollItem"><div class="line"></div>召換天命</a>
					</div>
					<div class="create-hold">
						<div class="create-hold__box splide">
							<div class="create-hold__swiper swiper splide__track">
								<div class="create-hold__list swiper-wrapper splide__list">
									<div class="swiper-slide splide__slide" v-for="i in titleData">
										<div class="create-hold__item" :data-type="i.TitleLevel">
											<template v-if="i.TitleLevel == 0">
												<div class="create-hold__name">尚未持有天命</div>
											</template>
											<template v-else>
												<div class="create-hold__name">{{i.TitleName}}</div>
												<a href="javascript:;" class="create-hold__btn-set btn-common" @click="deleteItem(i)">捨棄天命</a>
											</template>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="create-hold__item-prev" @click="slideToGo('-1')"></div>
						<div class="create-hold__item-next" @click="slideToGo('+1')"></div>
					</div>
				</div>
			</div>

			<div class="create-left">
				<div class="create-task">
					<div class="create-pre">
						<div class="create-pre__title">角色名稱</div>
						<div class="create-pre__name">角色名稱最多十個文字</div>
						<div class="create-pre__realm">
							<span>扭曲的黃金港01</span>
						</div>
						<a href="javascript:;" class="create-pre__btn-logout">登出</a>
					</div>
					<div class="create-task__list">
						<div class="create-task__content">
							<div class="create-task__item complete">
								<div class="create-task__item-info">
									<span>持有3個天命(3/3)</span>
									<span>一般坐騎召喚券5張</span>
								</div>
								<span class="create-task__item-notice"></span>
							</div>
							<div class="create-task__item">
								<div class="create-task__item-info">
									<span>持有3個天命(3/3)</span>
									<span>一般坐騎召喚券5張</span>
								</div>
								<span class="create-task__item-notice"></span>
							</div>
							<div class="create-task__item">
								<div class="create-task__item-info">
									<span>持有3個天命(3/3)</span>
									<span>一般坐騎召喚券5張</span>
								</div>
								<span class="create-task__item-notice"></span>
							</div>
							<div class="create-task__item">
								<div class="create-task__item-info">
									<span>持有3個天命(3/3)</span>
									<span>一般坐騎召喚券5張</span>
								</div>
								<span class="create-task__item-notice"></span>
							</div>
							<div class="create-task__item">
								<div class="create-task__item-info">
									<span>持有3個天命(3/3)</span>
									<span>一般坐騎召喚券5張</span>
								</div>
								<span class="create-task__item-notice"></span>
							</div>
						</div>
					</div>
				</div>
				<a href="javascript:;" class="create-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
			</div>
			<div class="create-btn__notice-box"><a href="javascript:;" class="create-btn__notice btn-common" @click="()=>Notice()">注意事項</a></div>
			<a href="javascript:;" class="create-btn__mission" @click="MissionLB"></a>
			
		</div>
	`
};

export default create;
