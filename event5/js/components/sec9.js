import { LBVideo } from "../lightbox.js";
import { sec9Slides } from "../config/data.js";
let sec9 = {
	setup() {
		const slides = Vue.ref(sec9Slides);
		const sec9Swiper = Vue.ref(null);
		let handleVideoClick = (data) => {
			LBVideo(data);
		};
		Vue.onMounted(() => {
			if (isMobile.any) {
				sec9Swiper.value = new Swiper(".sec9-swiper", {
					grabCursor: true,
					effect: "creative",
					loop: true,
					centeredSlides: true,
					slidesPerView: "auto",
					creativeEffect: {
						prev: {
							translate: ["-60%", "-60%", -800]
						},
						next: {
							translate: ["60%", "-60%", -800]
						}
					},
					navigation: {
						nextEl: ".sec9-button-next",
						prevEl: ".sec9-button-prev"
					}
				});
			} else {
				sec9Swiper.value = new Swiper(".sec9-swiper", {
					effect: "coverflow",
					grabCursor: true,
					centeredSlides: true,
					loop: true,
					speed: 600,
					slidesPerView: "auto",
					coverflowEffect: {
						rotate: 0,
						stretch: 120,
						depth: 500,
						modifier: 1,
						slideShadows: false
					},
					navigation: {
						nextEl: ".sec9-button-next",
						prevEl: ".sec9-button-prev"
					}
				});
			}
		});
		return { slides, handleVideoClick };
	},
	template: `
    <section class="sec sec9" data-anchor="sec9">
        <div class="sec-info">
            <div class="sec-title sec9-title1">天堂REMASTERED 等你回歸</div>
            <div class="sec-title sec9-title2">重新敲響，潛藏深處的回憶之中</div>
            <div class="sec9-content sec-content">
                <div class="sec9-swiper swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                            <div class="sec9-slide__img" @click="handleVideoClick(slide)"><img :src="slide.image" alt="" /></div>
                        </div>
                    </div>
                </div>
                <div class="sec9-button-next swiper-button-next"></div>
                <div class="sec9-button-prev swiper-button-prev"></div>
            </div>
        </div>
    </section>
    `
};

export default sec9;
