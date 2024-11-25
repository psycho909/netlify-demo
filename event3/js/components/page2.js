import { MessageLB, LBGuide, LBSelectGame, LBLogin, LBLoginSuccess, LBWarm, LBSDataShare, LBSGetSn, LBLogout } from "../lightbox.js";
import useEventStore from "../store.js";
import { drawShareImage, getBase64Image, downloadImage } from "../share.js";
import { ShareAchv } from "../api.js";

const page2 = {
	setup() {
		const store = useEventStore();
		let game = Vue.computed(() => store.game);
		let viewdata_id = Vue.computed(() => store.viewdata_id);
		let sn = Vue.computed(() => store.sn);
		let gameList = Vue.computed(() => store.gameList);
		let achievement = Vue.computed(() => store.achievement);
		let gameAccount = Vue.computed(() => store.gameAccount);
		let formattedAchievements = Vue.ref({});
		let sharedAchievements = Vue.ref([]); // 儲存 share 為 true 的項目
		let newShare = Vue.ref([]);
		let shareUrl = Vue.computed(() => store.shareUrl);
		let swiper = null;
		// 註解: 領取抽獎序號
		let handleGetSn = () => {
			LBSGetSn(sn.value);
		};
		// 註解: 分享成就
		let handleShare = () => {
			LBSDataShare(game.value, sharedAchievements.value, shareUrl.value);
		};
		// 註解: 掛載
		Vue.onMounted(() => {
			// 註解: 顯示loading
			document.querySelector("#loadingProgress").style.display = "block";
			// 註解: 如果遊戲列表為空，則關閉loading
			if (gameList.value.length == 0) {
				document.querySelector("#loadingProgress").style.display = "none";
				return;
			}
			// 註解: 取得分享成就列表
			const shareList = gameList.value.achvShareList.split(",").map(Number);
			// 註解: 使用正則表達式找出所有 achvDataTitle 屬性
			Object.keys(gameList.value).forEach((key) => {
				const match = key.match(/^achvDataTitle(\d+)$/);
				if (match) {
					const index = match[1]; // 獲得數字索引

					// 檢查是否要隱藏此成就
					let shouldHide = false;
					if (!achievement.value.isBind) {
						// gameSeq 2,5,9 不顯示5,6成就
						if ([2, 5, 9].includes(store.gameSeq)) {
							shouldHide = index === "5" || index === "6";
						} else {
							// 其他遊戲不顯示6,7成就
							shouldHide = index === "6" || index === "7";
						}
					}

					// 檢查 achvDataTitle 是否為空字串且不應該隱藏
					if (gameList.value[`achvDataTitle${index}`] !== "" && !shouldHide) {
						const achievementData = {
							Title: gameList.value[`achvDataTitle${index}`],
							Unit: gameList.value[`achvDataUnit${index}`],
							T: achievement.value[`dataLog0${index}T`],
							L: achievement.value[`dataLog0${index}L`],
							Y: Number(achievement.value[`dataLog0${index}Y`]) > 9999 ? "9999" : Number(achievement.value[`dataLog0${index}Y`]) < -100 ? "-100" : Number(achievement.value[`dataLog0${index}Y`]),
							share: shareList.includes(Number(index))
						};

						formattedAchievements.value[index] = achievementData;

						// 若 share 為 true，則加入到 sharedAchievements 陣列中
						if (achievementData.share) {
							sharedAchievements.value.push(achievementData);
						}
					}
				}
			});
			// 註解: 繪製成就卡片
			Vue.nextTick(() => {
				swiper = new Swiper(".page2-swiper", {
					slidesPerView: 1,
					loop: true,
					effect: "fade",
					pagination: {
						el: ".page2-swiper__pagination",
						clickable: true
					},
					navigation: {
						nextEl: ".page2-swiper__button-next",
						prevEl: ".page2-swiper__button-prev"
					}
				});
			});
			// 註解: 設定成就卡片資料
			newShare.value.cardData = sharedAchievements.value.map((item) => ({
				Title: item.Title,
				show2024: true,
				show2023: true,
				L: `${item.L}${item.Unit}`,
				T: `${item.T}${item.Unit}`,
				Y: item.Y.toString()
			}));
			// 註解: 設定logo
			newShare.value.logo = game.value;
			// 註解: 如果已經有分享網址，則關閉loading
			if (shareUrl.value) {
				document.querySelector("#loadingProgress").style.display = "none";
				return;
			}
		});
		return { handleGetSn, handleShare, LBGuide, game, formattedAchievements, sharedAchievements, gameAccount, gameList, viewdata_id };
	},
	template: `
    <div class="page2">
        <div class="page2-header">
            <div class="page2-header__logo" :id="viewdata_id" :data-game="game"></div>
            <div class="page2-header__box">
                <div class="page2-header__title">個人成長報告</div>
                <div class="page2-header__account">{{gameAccount}}</div>
            </div>
        </div>
        <div class="page2-personal" :class="{ 'no-achievement': gameList.length == 0 }">
            <div class="page2-swiper">
                <div class="page2-swiper__wrapper swiper-wrapper">
                    <div class="page2-swiper__item swiper-slide" :data-game="game" v-for="(achievement, index) in formattedAchievements" :key="index">
                        <div class="page2-swiper__title"><span v-html="achievement.Title"></span></div>
                        <div class="page2-swiper__year" data-type="2024">
                            <span>2024年度</span>
                            <span>{{ achievement.T }}{{ achievement.Unit }}</span>
                        </div>
                        <div class="page2-swiper__grow">
                            <span>成長率</span>
                            <span>{{ achievement.Y }}</span>
                            <span>%</span>
                        </div>
                        <div class="page2-swiper__year" data-type="2023">
                            <span>2023年度</span>
                            <span>{{ achievement.L }}{{ achievement.Unit }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page2-swiper__button-next swiper-button-next"></div>
            <div class="page2-swiper__button-prev swiper-button-prev"></div>
            <div class="page2-swiper__pagination swiper-pagination"></div>
        </div>
        <!-- 活動按鈕 -->
        <div class="page2-event">
            <a href="javascript:;" class="page2-event__item" data-type="sn" @click="handleGetSn">領取抽獎序號</a>
            <a href="javascript:;" class="page2-event__item" data-type="share" @click="handleShare">分享</a>
        </div>
        <!-- 外導連結banner -->
        <div class="page2-banner">
            <a href="https://bean.fun/周年慶來簽到" class="page2-banner__item" data-type="else2" target="_blank" rel="noopener noreferrer">簽到簿加碼抽獎</a>
            <a href="https://www.facebook.com/gamania.fans/videos/1435441310746215/" class="page2-banner__item" data-type="else1" target="_blank" rel="noopener noreferrer">周年慶主活動入口</a>
        </div>
        <!-- 活動說明 -->
        <a href="javascript:;" class="page2-guide" @click="LBGuide">活動說明</a>
        <canvas id="shareCanvas" style="display: none;"></canvas>
    </div>
    `
};

export default page2;
