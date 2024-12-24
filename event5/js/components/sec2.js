import { sec2Slides } from "../config/data.js";

let sec2 = {
	setup() {
		const sec2Swiper = Vue.ref(null);
		const tabs = Vue.ref(sec2Slides);
		const currentIndex = Vue.ref(0);
		const handleClick = (index) => {
			currentIndex.value = index;
			sec2Swiper.value.update();
			sec2Swiper.value.slideTo(0);
		};
		Vue.onMounted(() => {
			sec2Swiper.value = new Swiper(".sec2-swiper", {
				slidesPerView: 1,
				loop: true,
				navigation: {
					nextEl: ".sec2-button-next",
					prevEl: ".sec2-button-prev"
				},
				pagination: {
					el: ".sec2-pagination",
					clickable: true
				}
			});
		});
		return {
			tabs,
			currentIndex,
			handleClick
		};
	},
	template: `
	<section class="sec sec2" data-anchor="sec2">
		<div class="sec-info">
			<div class="sec-title sec2-title1">HD 畫質提升</div>
			<div class="sec-title sec2-title2">以高畫質的內容呈現，連小細節都變得清晰且精緻。</div>
			<div class="sec2-content sec-content">
				<div class="sec2-tab">
					<a
						href="javascript:;"
						v-for="(tab, index) in tabs"
						:key="index"
						:class="{ 'sec2-tab__item': true, 'active': currentIndex === index }"
						@click="handleClick(index)"
					>
						{{ tab.title }}
					</a>
				</div>
				<div class="sec2-swiper swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(image, index) in tabs[currentIndex].images" :key="index">
							<img :src="image.src1" />
							<img :src="image.src2" />
						</div>
					</div>
				</div>
				<div class="sec2-pagination swiper-pagination"></div>
				<div class="sec2-button-next swiper-button-next"></div>
				<div class="sec2-button-prev swiper-button-prev"></div>
			</div>
		</div>
	</section>
    `
};

export default sec2;
