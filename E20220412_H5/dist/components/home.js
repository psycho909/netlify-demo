import lightbox from "../js/lightbox.js";
import until from "../js/utils.js";
let home = {
	template: `
    <!-- 主畫面 -->
    <div class="home">
        <a href="javascript:;" class="home__logo">LOGO</a>
        <!-- slogan -->
        <div class="home__slogan">甘苦人生 大逆轉</div>
        <!-- 活動時間 -->
        <div class="home__event-date"><span>{{eventDate}}</span></div>
        <!-- 三顆按鈕 -->
        <div class="home__btn-group">
            <a href="javascript:;" class="home__btn" @click="openLB" data-type="join">點我參加</a>
            <a href="javascript:;" class="home__btn" @click="openLB" data-type="reward">獎勵紀錄</a>
            <a href="javascript:;" class="home__btn" @click="openLB" data-type="notice">活動說明</a>
        </div>
    </div>
    `,
	setup() {
		const store = Vuex.useStore();
		const { MapShow } = until();
		const { RewardList, EventNotice, SelectName, MessageLB } = lightbox();
		const eventDate = Vue.ref("4/19 10:00 ~ 5/10 23:59");
		// SelectName();
		const openLB = (e) => {
			let type = e.target.dataset.type;
			switch (type) {
				// 點我參加
				case "join":
					MapShow(".map");
					return;
				// 獎勵紀錄
				case "reward":
					RewardList();
					return;
				// 活動說明
				case "notice":
					EventNotice();
					return;
			}
		};
		return { eventDate, openLB };
	}
};

export default home;
