import { LBImage } from "../lightbox.js";
import { sec4Slides } from "../config/data.js";
let sec4 = {
	setup() {
		const slides = Vue.ref(sec4Slides);
		const sec4Swiper = Vue.ref(null);
		Vue.onMounted(() => {
			sec4Swiper.value = new Swiper(".sec4-swiper", {
				effect: "coverflow",
				grabCursor: true,
				centeredSlides: true,
				loop: true,
				speed: 600,
				slidesPerView: "auto",
				coverflowEffect: {
					rotate: 0,
					stretch: 120,
					depth: 180,
					modifier: 1,
					slideShadows: false
				},
				navigation: {
					nextEl: ".sec4-button-next",
					prevEl: ".sec4-button-prev"
				},
				pagination: {
					el: ".sec4-pagination",
					clickable: true
				}
			});
		});
		//	跳窗
		let handleImageClick = (event) => {
			LBImage(event.target.getAttribute("src"));
		};
		return {
			slides,
			handleImageClick
		};
	},
	template: `
	<section class="sec sec4" data-anchor="sec4">
		<div class="sec-info">
			<div class="sec-title sec4-title1">經典與現代UI的雙重選擇</div>
			<div class="sec-title sec4-title2">回鍋玩家、新手玩家都輕鬆適應!</div>
			<div class="sec4-content sec-content">
				<div class="sec4-swiper swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="slide in slides">
							<div class="sec4-slide__img" @click="handleImageClick"><img :src="slide.image" alt="" /></div>
						</div>
					</div>
				</div>
				<div class="sec4-button-next swiper-button-next"></div>
				<div class="sec4-button-prev swiper-button-prev"></div>
				<div class="sec4-pagination swiper-pagination"></div>
			</div>
		</div>
	</section>
    `
};

export default sec4;
