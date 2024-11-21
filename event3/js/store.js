const { defineStore, storeToRefs } = Pinia;

const useEventStore = defineStore("Event", {
	state: () => ({
		Token: "",
		login: false,
		game: "dn",
		gameSeq: 1,
		achievement: { seq: 0, gameSeq: 1, sn: "2222    ", gameAccount: "SDtest", dataLog01T: "1", dataLog01L: "1", dataLog01Y: "1", dataLog02T: "2", dataLog02L: "2", dataLog02Y: "2", dataLog03T: "3", dataLog03L: "3", dataLog03Y: "3", dataLog04T: "4", dataLog04L: "4", dataLog04Y: "4", dataLog05T: "5", dataLog05L: "5", dataLog05Y: "5", dataLog06T: "6", dataLog06L: "6", dataLog06Y: "6", dataLog07T: "7", dataLog07L: "7", dataLog07Y: "7", imageUrl: null, isBind: true },
		gameList: { seq: 1, gameName: "新龍之谷", gameLogo: "assets\\image\\logo-c\\logo-DN.png", gameIconUrl: "https://dragonnest.beanfun.com/Main", gameExplanation: "", serviceCode: "611653", serviceRegion: "VA", gameStatus: 2, achvDataTitle1: "通關關卡次數", achvDataUnit1: "次", achvDataTitle2: "從交易所獲得金幣數", achvDataUnit2: "個", achvDataTitle3: "通關巢穴次數", achvDataUnit3: "次", achvDataTitle4: "強化道具成功總次數", achvDataUnit4: "次", achvDataTitle5: "花費的金幣數", achvDataUnit5: "個", achvDataTitle6: "我一日不登就難受（年度登入平台總次數）", achvDataUnit6: "次", achvDataTitle7: "錢錢都變成了快樂～（年度總儲值金額）", achvDataUnit7: "元", achvExplanation: "", achvShareList: "2,4,5     ", isFirst: 0 },
		sn: "2222",
		gameAccount: "SDtest",
		page: "page1",
		shareUrl: "https://127.0.0.1:44303/E2024Anniversary/Share?Seq=4",
		viewdata_id: ""
	}),
	actions: {
		setToken(token) {
			this.Token = token;
		},
		setLogin(login) {
			this.login = login;
		},
		setGame(game) {
			this.game = game;
		},
		setGameSeq(gameSeq) {
			this.gameSeq = gameSeq;
		},
		setAchievement(achievement) {
			this.achievement = achievement;
		},
		setGameList(gameList) {
			this.gameList = gameList;
		},
		setSn(sn) {
			this.sn = sn;
		},
		setGameAccount(gameAccount) {
			this.gameAccount = gameAccount;
		},
		setPage(page) {
			this.page = page;
		},
		setShareUrl(shareUrl) {
			this.shareUrl = shareUrl;
		},
		setViewdataId(viewdata_id) {
			this.viewdata_id = viewdata_id;
		}
	}
});

export default useEventStore;
