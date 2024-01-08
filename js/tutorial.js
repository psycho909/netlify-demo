import topbar from "./components/topbar.js";
import leftbar from "./components/leftbar.js";
import anim from "./components/anim.js";
import imgLoading from "./components/imgLoading.js";
let app = Vue.createApp({
	setup() {
		let imgloading = Vue.ref(false);
		let regSwiper = Vue.ref(null);
		let installSwiper = Vue.ref(null);
		Vue.nextTick(() => {
			regSwiper.value = new Swiper(".reg-swiper", {
				// effect: "fade",
				navigation: {
					nextEl: ".reg-swiper-button-next",
					prevEl: ".reg-swiper-button-prev"
				},
				pagination: {
					el: ".reg-swiper-pagination",
					clickable: true
				}
			});
			installSwiper.value = new Swiper(".install-swiper", {
				// effect: "fade",
				navigation: {
					nextEl: ".install-swiper-button-next",
					prevEl: ".install-swiper-button-prev"
				},
				pagination: {
					el: ".install-swiper-pagination",
					clickable: true
				}
			});
		});
		const targetPage = (target) => {
			let h = 0;
			if ($(".left-bar-top").css("display") == "none") {
				h = $(".top-bar").outerHeight(true) + Math.abs(parseInt($(".tutorial-title").css("top")));
			} else {
				h = $(".left-bar-top").outerHeight(true) + Math.abs(parseInt($(".tutorial-title").css("top")));
			}
			$("html, body").animate({
				scrollTop: $(`#${target}`).offset().top - h
			});
		};
		Vue.onMounted(() => {
			$("#loadingProgress").show();
			const myComponent = imgLoading();
			myComponent
				.checkAllBackgroundImagesLoaded()
				.then(async (isLoaded) => {
					imgloading.value = true;
					$("#loadingProgress").hide();
				})
				.catch((error) => {
					console.error("Error loading media:", error);
					$("#loadingProgress").hide();
					imgloading.value = true;
				});
		});
		return {
			targetPage,
			imgloading
		};
	},
	components: {
		topbar,
		leftbar,
		anim
	}
});
app.mount("#app");
