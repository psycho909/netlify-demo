import lightbox from "../js/lightbox.js";
import until from "../js/utils.js";
let bossMap = {
	template: `
    <!-- map -->
    <div class="map">
        <!-- 腳色名稱 -->
        <div class="map__name">一二三四五六七八九十</div>

        <!-- 小格點 -->
        <div class="map__path"></div>
        <!-- 各關BOSS -->
        <div class="map__boss-list">
            <template v-for="boss in BossListComputed">
                <div class="map__boss" :class="[boss.Clear?'cleared':'',boss.Show?'show':'']" :data-boss="boss.BossLevel" @click="fightBoss">{{boss.name}}</div>
            </template>
        </div>

        <!-- 兩顆按鈕 -->
        <div class="map__btn-group">
            <a href="javascript:;" class="map__btn" @click="openLB" data-type="reward">獎勵紀錄</a>
            <a href="javascript:;" class="map__btn" @click="openLB" data-type="notice">活動說明</a>
        </div>
    </div>
    `,
	setup() {
		const { RewardList, EventNotice, LevelWasComplete, MessageLB } = lightbox();
		const { MapShow } = until();
		const store = Vuex.useStore();
		let BossList = Vue.reactive([
			{ BossLevel: 1, Clear: false, Show: false, name: "黑龍" },
			{ BossLevel: 2, Clear: false, Show: false, name: "沙龍" },
			{ BossLevel: 3, Clear: false, Show: false, name: "黑妖玖月" },
			{ BossLevel: 4, Clear: false, Show: false, name: "赤風之龍" },
			{ BossLevel: 5, Clear: false, Show: false, name: "冰晶龍" },
			{ BossLevel: 6, Clear: false, Show: false, name: "鐵匠" },
			{ BossLevel: 7, Clear: false, Show: false, name: "交易所長" }
		]);
		const BossListComputed = Vue.computed(() => {
			if (store.state.Boss.BossLevel == 7 && store.state.Boss.BossHealth == 0) {
				for (let i = 1; i < store.state.Boss.BossLevel; i++) {
					BossList[i - 1].Show = true;
					BossList[i - 1].Clear = true;
				}
				BossList[store.state.Boss.BossLevel - 1].Show = true;
				BossList[store.state.Boss.BossLevel - 1].Clear = true;
			} else {
				for (let i = 1; i < store.state.Boss.BossLevel; i++) {
					BossList[i - 1].Show = true;
					BossList[i - 1].Clear = true;
				}
				BossList[store.state.Boss.BossLevel - 1].Show = true;
			}
			return BossList;
		});
		const fightBoss = (e) => {
			let curr = e.target;
			if (curr.classList.contains("show") && !curr.classList.contains("cleared")) {
				let boss = curr.dataset.boss;
				// BossInit(boss, 8);
				MapShow(".fight");
			} else {
				LevelWasComplete();
			}
		};
		const openLB = (e) => {
			let type = e.target.dataset.type;
			switch (type) {
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
		return {
			BossListComputed,
			openLB,
			fightBoss
		};
	}
};

export default bossMap;
