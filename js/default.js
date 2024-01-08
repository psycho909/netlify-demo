import { MessageLB, SelectCharacter, PrizeTipLB } from "./lightbox.js";
import loading from "./components/loading.js";
import topbar from "./components/topbar.js";
import leftbar from "./components/leftbar.js";
import anim from "./components/anim.js";
import main from "./components/main.js";
import reserve from "./components/reserve.js";
import invite from "./components/invite.js";
import event from "./components/event.js";
import notice from "./components/notice.js";
import imgLoading from "./components/imgLoading.js";
import part2Version from "./components/part2Version.js";
import part2Video from "./components/part2Video.js";
import part3Event from "./components/part3Event.js";
import part3Main from "./components/part3Main.js";
import store from "./store.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import { FindGameWorldAPI, GetInitDataAPI } from "./api.js";

if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
function animateTitle(element) {
	const t1 = gsap.timeline();

	// Initial animation
	t1.to(element, {
		backgroundPosition: "-1400%",
		duration: 1,
		ease: SteppedEase.config(14),
		onComplete: repeatAnimation
	});

	function repeatAnimation() {
		setTimeout(() => {
			t1.restart();
		}, 5000);
	}
}

let app = Vue.createApp({
	setup() {
		let token = Vue.ref("");
		let imgloading = Vue.ref(false);
		let num = Vue.ref(0);
		let cnt = Vue.computed(() => store.state.Cnt);
		let login = Vue.computed(() => store.state.login);
		let timer = Vue.ref(null);
		let now = Vue.ref(0);
		let status = Vue.ref(0);
		let part2 = false;
		let part3 = false;
		now.value = +new Date($("#hfServerTimeNow").val());
		timer = setInterval(() => {
			now.value += 1000;
		}, 1000);
		const targetPage = (target) => {
			let h = 0;
			if (target != "part2") {
				if ($(".left-bar-top").css("display") == "none") {
					h = $(".top-bar").outerHeight(true);
				} else {
					h = $(".left-bar-top").outerHeight(true);
				}
			}

			if (target == "part2" && isMobile.any) {
				if ($(".left-bar-top").css("display") == "none") {
					h = $(".top-bar").outerHeight(true);
				} else {
					h = $(".left-bar-top").outerHeight(true);
				}
			}
			$("html, body").animate({
				scrollTop: $(`#${target}`).offset().top - h
			});
			status.value = +new Date();
		};
		let time = Vue.computed(() => {
			let come = +new Date($("#hfLoginRewardDate").val());
			if (now.value >= come) {
				return true;
			} else {
				return false;
			}
		});
		let reset = () => {
			store.commit("SET_RESET", true);
		};
		let LoginBtn = () => {
			window.localStorage.setItem("invite", "true");
			window.location.href = "./Login.aspx";
		};
		let LogoutBtn = () => {
			deleteCookie("MapleEvent");
			window.location.href = "../../Logout/Logout.aspx";
		};
		Vue.watch(
			() => store.state.img2,
			(newVal, oldVal) => {
				if (newVal == true) {
					loadingHide();
					if (location.hash.includes("part2")) {
						targetPage("part2");
					}
				}
			}
		);
		Vue.onMounted(async () => {
			let cookie = getCookie("MapleEvent");
			let url;
			loadingShow();

			const myComponent = imgLoading();
			myComponent
				.checkAllBackgroundImagesLoaded()
				.then(async (isLoaded) => {
					imgloading.value = true;
					store.commit("SET_IMG1", true);
					// 選取所有的 .section-title 元素
					const sectionTitles = document.querySelectorAll(".section-title");
					let triggeredElements = []; // 用來追蹤已觸發的元素
					// 創建 IntersectionObserver 實例
					const observer = new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting && !triggeredElements.includes(entry.target)) {
									animateTitle(entry.target);
									triggeredElements.push(entry.target); // 將已觸發的元素添加到列表中
								}
							});
						},
						{ threshold: 0.5 }
					); // 調整 threshold 值以符合你的需求

					// 監視所有的 .section-title 元素
					sectionTitles.forEach((title) => {
						observer.observe(title);
					});

					if ($("#hfData").val() || cookie) {
						if (cookie) {
							token.value = cookie;
						} else {
							token.value = $("#hfData").val();
						}

						url = location.href.split("?")[0];
						history.pushState({}, 0, url);
						setCookie("MapleEvent", token.value);
						let GetInitData = await GetInitDataAPI(token.value);
						store.commit("SET_DATA", GetInitData.Data);
						loadingShow();
						if (GetInitData.Code == 2) {
							FindGameWorldAPI(token.value)
								.then((res) => {
									let { Code, ListData, Url, Message } = res.data;
									store.commit("SET_INIT", true);
									if (part2) {
										if (store.state.img1 && store.state.img2) {
											loadingHide();
										}
									} else {
										loadingHide();
									}

									if (Code == -1) {
										MessageLB(Message);
										return;
									}
									if (Code == -2) {
										MessageLB(Message, Url);
										return;
									}
									SelectCharacter(ListData);
								})
								.finally(() => {
									store.commit("SET_INIT", true);
									if (part2) {
										if (store.state.img1 && store.state.img2) {
											loadingHide();
										}
									} else {
										loadingHide();
									}
								});
						} else {
							if (window.localStorage.getItem("invite") != null) {
								let h = 0;
								if ($(".left-bar-top").css("display") == "none") {
									h = $(".top-bar").outerHeight(true);
								} else {
									h = $(".left-bar-top").outerHeight(true);
								}
								$("html, body").animate({
									scrollTop: $(`#invite`).offset().top - h
								});
								window.localStorage.removeItem("invite");
							}
							store.commit("SET_DATA", GetInitData.Data);
							store.commit("SET_LOGIN", true);
							if (part2) {
								if (store.state.img2) {
									loadingHide();
								}
							} else {
								loadingHide();
							}
						}
					} else {
						let GetInitData = await GetInitDataAPI(token.value);
						store.commit("SET_INIT", true);
						store.commit("SET_DATA", GetInitData.Data);
						if (part2) {
							if (store.state.img2) {
								loadingHide();
							}
						} else {
							loadingHide();
						}
					}
				})
				.catch((error) => {
					console.error("Error loading media:", error);
					imgloading.value = true;
					store.commit("SET_IMG1", true);
					if (part2) {
						if (store.state.img2) {
							loadingHide();
						}
					} else {
						loadingHide();
					}
				});
		});
		Vue.onUnmounted(() => {
			clearInterval(timer);
		});
		return {
			imgloading,
			num,
			login,
			cnt,
			targetPage,
			now,
			status,
			reset,
			LoginBtn,
			LogoutBtn
		};
	},
	components: {
		loading,
		topbar,
		leftbar,
		anim,
		"page-main": main,
		"page-reserve": reserve,
		"page-invite": invite,
		"page-event": event,
		"page-notice": notice,
		"part2-version": part2Version,
		"part2-video": part2Video,
		"part3-event": part3Event,
		"part3-main": part3Main
	}
});
app.use(store);
app.mount("#app");
