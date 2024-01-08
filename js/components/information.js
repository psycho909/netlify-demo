import { MessageLB, PhoneErrorLB, OTPErrorLB, InviteErrorLB, RewardLB } from "../lightbox.js";
let tabData = [
	{
		Seq: 1,
		EventName: "活動名十字活動名十1"
	},
	{
		Seq: 2,
		EventName: "活動名十字活動名十2"
	}
];
let ListData = {
	1: [
		{
			ImageUrl: "",
			YoutubeID: "BwIihGyetk0",
			Description: "A1介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		},
		{
			ImageUrl: "https://tw.hicdn.beanfun.com/beanfun/event/MapleStory/E20231115/assets/images/og-image.jpg",
			YoutubeID: "",
			Description: "B1介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		},
		{
			ImageUrl: "",
			YoutubeID: "",
			Description: "C1介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		},
		{
			ImageUrl: "",
			YoutubeID: "",
			Description: "D1介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		}
	],
	2: [
		{
			ImageUrl: "",
			YoutubeID: "",
			Description: "A2介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		},
		{
			ImageUrl: "",
			YoutubeID: "",
			Description: "B2介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		},
		{
			ImageUrl: "",
			YoutubeID: "",
			Description: "C2介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案介紹文案紹文案",
			MoreUrl: ""
		}
	]
};
const information = {
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
			swiper3.value = new Swiper(".event-swiper", {
				effect: "fade",
				navigation: {
					nextEl: ".event-swiper-button-next",
					prevEl: ".event-swiper-button-prev"
				},
				pagination: {
					el: ".event-swiper-pagination",
					clickable: true
				}
			});
			setTimeout(() => {
				gsap.to("html", {
					scrollTop: 0
				});
			}, 0);
		});

		Vue.onMounted(() => {
			currentTab.value = tabData[0].Seq;
			eventContent.value = ListData;
			tabList.value = [...tabData];
		});
		return {
			handleTab,
			currentTab,
			tabList,
			eventContent
		};
	},
	template: `<div class="section info">
    <div class="section-title event-title">極刻六轉</div>
        <div class="event-tab">
            <a href="javascript:;" class="event-tab__item" :class="[currentTab === tab.Seq?'active':'']" @click="handleTab(tab.Seq)" v-for="(tab,i) in tabList"><span>{{tab.EventName}}</span></a>
        </div>
        <div class="event-box">
            <div class="event-swiper">
                <div class="event-wrapper swiper-wrapper">
                    <div class="event-slide swiper-slide" v-for="event in eventContent[currentTab]">
                        <div class="event-slide__source" style="--color: blue">
                            <img v-if="event.ImageUrl" :src="event.ImageUrl" alt="" />
                            <iframe v-if="event.YoutubeID" width="640" height="360" :src="'https://www.youtube.com/embed/'+event.YoutubeID+'?autoplay=1&mute=1'" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="event-slide__info">{{event.Description}}</div>
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

export default information;
