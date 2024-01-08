import {} from "../tool.js";
import {} from "../api.js";
import { MessageLB } from "../lightbox.js";

const sec3 = {
	props: {
		mobile: {
			type: Boolean,
			default: false,
		},
		anim: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		let swiper3 = Vue.ref(null);
		let eventContent = Vue.ref([]);
		let loading = Vue.ref(true);
		let handleTab = (seq) => {
			if (seq == currentTab.value) {
				return;
			}
			currentTab.value = seq;
			loading.value = true;
			emit("showLoading", true);
			GetEventBannerList(seq).then((res) => {
				let { Code, ListData, Message, Url } = res.data;
				if (Code != 1) {
					emit("showLoading", false);
					MessageLB(Message, Url);
					return;
				}

				eventContent.value = [...ListData];
				Vue.nextTick(() => {
					loading.value = false;
					swiper3.value = new Swiper(".sec3-flim-swiper", {
						effect: "fade",
						navigation: {
							nextEl: ".sec3-swiper-button-next",
							prevEl: ".sec3-swiper-button-prev",
						},
						pagination: {
							el: ".sec3-swiper-pagination",
							clickable: true,
						},
					});
				});
				emit("showLoading", false);
			});
		};
		Vue.nextTick(() => {});
		Vue.onMounted(() => {
			GetEventCategory()
				.then((res) => {
					let { Code, ListData, Message, Url } = res.data;
					if (Code != 1) {
						MessageLB(Message, Url);
						return;
					}
					if (ListData.length) {
						return GetEventBannerList(ListData[0].Seq);
					} else {
						return false;
					}
				})
				.then((res) => {
					if (res) {
						let { Code, ListData, Message, Url } = res.data;
						if (Code != 1) {
							MessageLB(Message, Url);
							return;
						}
						eventContent.value = [...ListData];
						loading.value = false;
						swiper3.value = new Swiper(".sec3-flim-swiper", {
							effect: "fade",
							navigation: {
								nextEl: ".sec3-swiper-button-next",
								prevEl: ".sec3-swiper-button-prev",
							},
							pagination: {
								el: ".sec3-swiper-pagination",
								clickable: true,
							},
						});
					}
				})
				.catch(() => {
					// emit("showLoading", false);
				});
		});
		return {
			eventContent,
			loading,
		};
	},
	template: `<div class="sec sec3" id="sec3">
    <div class="sec3-content">
        <div class="sec3-flim-box">
            <div class="sec3-flim-swiper-box">
                <div class="sec3-flim-swiper" :class="[loading?'loading':'']" v-if="tabList.length">
                    <div class="sec3-flim-wrapper swiper-wrapper">
                        <div class="sec3-flim-slide swiper-slide" v-for="event in eventContent">
                            <div class="sec3-flim-slide__source" style="--color: blue">
                                <img v-if="event.ImageUrl" :src="event.ImageUrl" alt="" />
                                <iframe v-if="event.YoutubeID" width="640" height="360" :src="'https://www.youtube.com/embed/'+event.YoutubeID+'?autoplay=1&mute=1'" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div class="sec3-flim-slide__info">{{event.Description}}</div>
                            <a :href="event.MoreUrl" class="sec3-flim-slide__btn" target="_blank" v-if="event.MoreUrl">瞭解更多</a>
                        </div>
                    </div>
                    <div v-if="eventContent.length > 1" class="sec3-swiper-pagination"></div>
                    <div v-if="eventContent.length > 1" class="sec3-swiper-button-prev"></div>
                    <div v-if="eventContent.length > 1" class="sec3-swiper-button-next"></div>
                </div>
				<div class="sec3-flim-comming" v-else></div>
            </div>
        </div>
    </div>
</div>`,
};

export default sec3;
