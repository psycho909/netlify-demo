import { LBRole } from "../lightbox.js";
import { sec7Slides } from "../config/data.js";
let sec7 = {
	setup() {
		const cards = Vue.ref(sec7Slides);
		const sec7Swiper = Vue.ref(null);

		let handleRoleClick = (data) => {
			LBRole(data);
		};

		Vue.onMounted(() => {
			sec7Swiper.value = new Swiper(".sec7-swiper", {
				// spaceBetween: 26,
				slidesPerView: "auto",
				loop: true,
				navigation: {
					nextEl: ".sec7-button-next",
					prevEl: ".sec7-button-prev"
				}
			});
		});
		return { cards, handleRoleClick };
	},
	template: `
    <section class="sec sec7" data-anchor="sec7">
        <div class="sec-info">
            <div class="sec-title sec7-title1">職業介紹</div>
            <div class="sec-title sec7-title2">多元職業，領略不同戰鬥風采</div>
            <div class="sec7-content sec-content">
                <div class="sec7-swiper swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="card in cards">
                            <div class="sec7-card" :data-role="card.role" @click="handleRoleClick(card)">
                                <div class="sec7-card__body">
                                    <div class="sec7-card__title">{{card.title}}</div>
                                    <div class="sec7-card__text">{{card.text}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sec7-button-next swiper-button-next"></div>
                <div class="sec7-button-prev swiper-button-prev"></div>
            </div>
        </div>
    </section>
    `
};

export default sec7;
