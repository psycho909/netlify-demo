import { MessageLB } from "./lightbox.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import headerBar from "./components/headerBar.js";
import navBar from "./components/navBar.js";
import sec1 from "./components/sec1.js";
import sec2 from "./components/sec2.js";
import sec3 from "./components/sec3.js";
import sec4 from "./components/sec4.js";
import sec5 from "./components/sec5.js";
import sec6 from "./components/sec6.js";
import sec7 from "./components/sec7.js";
import sec8 from "./components/sec8.js";
import sec9 from "./components/sec9.js";
// MessageLB();
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

document.querySelector(".top").addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// Vue3
const app = Vue.createApp({
	components: {
		"header-bar": headerBar,
		"nav-bar": navBar,
		sec1: sec1,
		sec2: sec2,
		sec3: sec3,
		sec4: sec4,
		sec5: sec5,
		sec6: sec6,
		sec7: sec7,
		sec8: sec8,
		sec9: sec9
	},
	setup() {
		let _destination, _direction, _anchorLink;
		let sec1Anim, sec2Anim, sec3Anim, sec4Anim, sec5Anim, sec6Anim, sec7Anim, sec8Anim, sec9Anim;

		Vue.onMounted(() => {
			if (!isMobile.any) {
				setTimeout(() => {
					document.querySelector(".nav-item[data-sec='sec1']").addEventListener("click", function () {
						this.classList.toggle("on");
					});
					sec1Anim = gsap.timeline({ paused: !0 }).addLabel("start").from(
						".sec1-title",
						{
							y: "-=50",
							duration: 0.7,
							opacity: 0,
							ease: "power4.easeIn"
						},
						"start+=0.8"
					);
					sec2Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec2-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec2-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec2-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec3Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec3-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec3-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec3-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						)
						.from(
							".image_01",
							{
								x: "+=100",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						)
						.from(
							".image_02",
							{
								x: "-=100",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						)
						.from(
							".image_03",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						)
						.from(
							".arrow_center",
							{
								width: 0,
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						)
						.from(
							".arrow_bottom",
							{
								width: 0,
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						)
						.from(
							".spot_line_L",
							{
								x: "+=250",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						)
						.from(
							".spot_line_R",
							{
								x: "-=250",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						)
						.from(
							".light",
							{
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=1.2"
						);
					sec4Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec4-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec4-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec4-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec5Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec5-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec5-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec5-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec6Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec6-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec6-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec6-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec7Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec7-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec7-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec7-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec8Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec8-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec8-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec8-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					sec9Anim = gsap
						.timeline({ paused: !0 })
						.addLabel("start")
						.from(
							".sec9-title1",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0"
						)
						.from(
							".sec9-title2",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.4"
						)
						.from(
							".sec9-content",
							{
								y: "-=50",
								duration: 0.7,
								opacity: 0,
								ease: "power4.easeIn"
							},
							"start+=0.8"
						);
					$("#app").fullpage({
						menu: "#nav",
						anchors: ["sec1", "sec2", "sec3", "sec4", "sec5", "sec6", "sec7", "sec8", "sec9"],
						sectionSelector: ".sec",
						afterLoad: function (anchorLink, destination) {
							if (destination <= 5 && document.querySelector(".nav-item[data-sec='sec1']").classList.contains("on")) {
								document.querySelector(".nav-item[data-sec='sec1']").classList.add("on");
							} else {
								document.querySelector(".nav-item[data-sec='sec1']").classList.remove("on");
							}
							if (destination > 1) {
								$(".top").addClass("active");
							} else {
								$(".top").removeClass("active");
							}
							if (_direction == "up" && destination == 9) {
								return;
							}
							switch (destination) {
								case 1:
									_anchorLink = anchorLink;
									sec1Anim.play(0);
									break;
								case 2:
									_anchorLink = anchorLink;
									sec2Anim.play(0);
									break;
								case 3:
									_anchorLink = anchorLink;
									sec3Anim.play(0);
									break;
								case 4:
									_anchorLink = anchorLink;
									sec4Anim.play(0);
									break;
								case 5:
									_anchorLink = anchorLink;
									sec5Anim.play(0);
									break;
								case 6:
									_anchorLink = anchorLink;
									sec6Anim.play(0);
									break;
								case 7:
									_anchorLink = anchorLink;
									sec7Anim.play(0);
									break;
								case 8:
									_anchorLink = anchorLink;
									sec8Anim.play(0);
									break;
								case 9:
									_anchorLink = anchorLink;
									sec9Anim.play(0);
									break;
								case 10:
									console.log(anchorLink);
									if (anchorLink == "footer" && _anchorLink == undefined) {
										sec9Anim.play(0);
									} else {
										_anchorLink = "sec9";
									}
									break;
							}
						},
						onLeave: function (origin, destination, direction) {
							_direction = direction;
							if (destination > 1) {
								$(".top").addClass("active");
							} else {
								$(".top").removeClass("active");
							}
							if (direction == "down" && destination == 10) {
								return;
							}
							if (direction == "up" && destination == 9) {
								return;
							}
							switch (destination) {
								case 1:
									sec1Anim.pause(0);
									break;
								case 2:
									sec2Anim.pause(0);
									break;
								case 3:
									sec3Anim.pause(0);
									break;
								case 4:
									sec4Anim.pause(0);
									break;
								case 5:
									sec5Anim.pause(0);
									break;
								case 6:
									sec6Anim.pause(0);
									break;
								case 7:
									sec7Anim.pause(0);
									break;
								case 8:
									sec8Anim.pause(0);
									break;
								case 9:
									sec9Anim.pause(0);
									break;
							}
						}
					});
				}, 0);
			}
		});
	}
});

app.mount("#app");

document.querySelector(".top").addEventListener("click", () => {
	if (isMobile.any) {
		window.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		$.fn.fullpage.moveTo(1);
	}
});
