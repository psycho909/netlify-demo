import { sec8Slides } from "../config/data.js";
let sec8 = {
	setup() {
		const slides = Vue.ref(sec8Slides);
		const sec8Swiper = Vue.ref(null);
		Vue.onMounted(() => {
			sec8Swiper.value = new Swiper(".sec8-swiper", {
				navigation: {
					nextEl: ".sec8-button-next",
					prevEl: ".sec8-button-prev"
				},
				loop: true,
				effect: "fade",
				pagination: {
					el: ".sec8-pagination",
					clickable: true
				}
			});
		});
		return { slides };
	},
	template: `
    <section class="sec sec8" data-anchor="sec8">
        <div class="sec-info">
            <div class="sec-title sec8-title1">殷海薩機制介紹</div>
            <div class="sec-title sec8-title2">經驗值與寶物的加持</div>
            <div class="sec8-content sec-content">
                <div class="sec8-swiper swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                            <div class="sec8-slide__img">
                                <picture>
                                    <source media="(max-width: 768px)" :srcset="slide.image.mobile" />
                                    <source media="(min-width: 769px)" :srcset="slide.image.desktop" />
                                    <img :src="slide.image.desktop" alt="Image" />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sec8-button-next swiper-button-next"></div>
                <div class="sec8-button-prev swiper-button-prev"></div>
                <div class="sec8-pagination swiper-pagination"></div>
                <a href="https://tw-event.beanfun.com/Lineage/EventAD/EventAD.aspx?EventADID=6928" target="_blank" class="sec8-btn">殷海薩機制說明</a>
            </div>
        </div>
    </section>
    `
};

export default sec8;
