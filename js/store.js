// import { GetInitData } from "./api.js";
import { MessageLB } from "./lightbox.js";
const store = new Vuex.createStore({
	state: {
		Cnt: 0,
		RewardType: {
			Cnt: 0,
			RewardInvite1Type: 0,
			RewardInvite3Type: 0,
			RewardInvite6Type: 0,
			RewardInvite10Type: 0
		},
		Token: "",
		login: false,
		reset: false,
		inviteCnt: 0,
		img1: false,
		img2: false,
		init: false
	},
	mutations: {
		SET_INIT(state, data) {
			state.init = data;
		},
		SET_IMG1(state, data) {
			state.img1 = data;
		},
		SET_IMG2(state, data) {
			state.img2 = data;
		},
		SET_INVITE_CNT(state, data) {
			state.inviteCnt = data;
		},
		SET_RESET(state, data) {
			if (data) {
				state.reset = +new Date();
				sessionStorage.removeItem("InvitationCode");
			} else {
				state.reset = false;
			}
		},
		SET_LOGIN(state, data) {
			state.login = data;
		},
		SET_DATA(state, data) {
			if (data?.Cnt) {
				if (data.Cnt > 1000000) {
					state.Cnt = 999999;
				} else {
					state.Cnt = data.Cnt;
				}
			} else {
				state.Cnt = 0;
			}
			if (data?.RewardType) {
				state.RewardType = data?.RewardType;
				if (state.RewardType.Cnt > 10) {
					state.RewardType.Cnt = 10;
				} else {
					state.RewardType.Cnt = state.RewardType.Cnt;
				}
			} else {
				state.RewardType = {
					RewardInvite1Type: 0,
					RewardInvite1Type: 0,
					RewardInvite1Type: 0,
					RewardInvite1Type: 0
				};
			}
			if (data?.Token) {
				if (data.Token != undefined || data.Token != null) {
					state.Token = data?.Token;
				}
			}
		},
		SET_REWARD_TYPE(state, data) {
			state.RewardType = data.RewardType;
			if (state.RewardType.Cnt > 10) {
				state.RewardType.Cnt = 10;
			} else {
				state.RewardType.Cnt = state.RewardType.Cnt;
			}
		}
	},
	actions: {
		// async GetInitDataAPI({ commit, state }, data) {
		// 	$("#loadingProgress").show();
		// 	GetInitData(data)
		// 		.then((res) => {
		// 			let { Code, Message, Url, Data } = res;
		// 			if (Code == -1) {
		// 				MessageLB(Message);
		// 				$("#loadingProgress").hide();
		// 				return;
		// 			}
		// 			if (Code == -2) {
		// 				MessageLB(Message, Url);
		// 				$("#loadingProgress").hide();
		// 				return;
		// 			}
		// 			commit("SET_DATA", Data);
		// 			return { Code, Message, Url, Data };
		// 		})
		// 		.finally(() => {
		// 			$("#loadingProgress").hide();
		// 		});
		// }
	}
});

export default store;
