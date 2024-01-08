import { MessageLB, PhoneErrorLB, OTPErrorLB, InviteErrorLB, RewardLB } from "../lightbox.js";
import { tabData, ListData } from "./eventData.js";

const event = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let swiper3 = Vue.ref(null);
		let currentTab = Vue.ref(1);
		let tabList = Vue.ref([]);
		let eventContent = Vue.ref([]);
		let handleTab = (seq) => {
			if (seq == currentTab.value) {
				return;
			}
			currentTab.value = seq;
			Vue.nextTick(() => {
				swiper3.value.update();
				swiper3.value.slideTo(0);
				// swiper3.value = new Swiper(".event-swiper", {
				// 	effect: "fade",
				// 	navigation: {
				// 		nextEl: ".sec3-swiper-button-next",
				// 		prevEl: ".sec3-swiper-button-prev"
				// 	},
				// 	pagination: {
				// 		el: ".sec3-swiper-pagination",
				// 		clickable: true
				// 	}
				// });
			});
		};
		Vue.nextTick(() => {
			if (tabData.length > 0) {
				swiper3.value = new Swiper(".event-swiper", {
					effect: "fade",
					loop: true,
					navigation: {
						nextEl: ".event-swiper-button-next",
						prevEl: ".event-swiper-button-prev"
					},
					pagination: {
						el: ".event-swiper-pagination",
						clickable: true
					}
				});
			}
			setTimeout(() => {
				gsap.to("html", {
					scrollTop: 0
				});
			}, 0);
		});

		Vue.onMounted(() => {
			if (tabData?.length > 0) {
				currentTab.value = tabData[0].Seq;
				tabList.value = [...tabData];
				eventContent.value = ListData;
			}
		});
		return {
			handleTab,
			currentTab,
			tabList,
			eventContent
		};
	},
	template: `<div class="section event" id="event">
    <div class="section-title event-title">極刻六轉</div>
        <div class="event-tab" v-if="tabList.length > 0">
            <a href="javascript:;" :id="tab.id" class="event-tab__item" :class="[currentTab === tab.Seq?'active':'']" @click="handleTab(tab.Seq)" v-for="(tab,i) in tabList"><span>{{tab.EventName}}</span></a>
        </div>
        <div class="event-box">
            <div class="event-swiper" :class="[tabList.length > 0?'':'comingsoon']">
                <div class="event-wrapper swiper-wrapper" v-if="tabList.length > 0">
                    <div class="event-slide swiper-slide" v-for="event in eventContent[currentTab]">
                        <div class="event-slide__source" style="--color: blue">
                            <img v-if="event.ImageUrl" :src="event.ImageUrl" alt="" />
                            <iframe v-if="event.YoutubeID" width="640" height="360" :src="'https://www.youtube.com/embed/'+event.YoutubeID+'?autoplay=1&mute=1'" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="event-slide__info" v-html="event.Description"></div>
                        <a :href="event.MoreUrl" class="event-slide__btn-more"  target="_blank" v-if="event.MoreUrl">瞭解更多</a>
                    </div>
                </div>
                <div class="event-swiper-button-prev"></div>
                <div class="event-swiper-button-next"></div>
                <div class="event-swiper-pagination"></div>
            </div>
            
        </div>
</div>`
};

export default event;
