const store = new Vuex.createStore({
	state: {
		ajax: false,
		User: {
			Token: "",
			StarAccount: "",
			MainAccount: "",
			GameAccount: "",
			CharacterId: "",
			CharacterName: "",
		},
		TotalDice: 10,
		Boss: {
			BossLevel: 2,
			BossHealth: 0,
			BossTotalHealth: 0,
		},
		ItemList: [],
	},
	mutations: {
		AJAX_TOGGLE(state) {
			state.ajax = !state.ajax;
		},
		USER_UPDATE(state, payload) {
			state.User = payload;
		},
		USER_UPDATE_ACCOUNT(state, payload) {
			state.User.GameAccount = payload;
		},
		BOSS_INIT(state, payload) {
			state.Boss.BossLevel = payload.BossLevel;
			state.Boss.BossHealth = payload.BossHealth;
			state.Boss.BossTotalHealth = payload.BossTotalHealth;
		},
		BOSS_HEATH(state, payload) {
			state.Boss.BossHealth = payload;
		},
		DICE_UPDATE(state, payload) {
			state.TotalDice = payload.dice;
		},
		ITEM_LIST_UPDATE(state, payload) {
			state.ItemList = payload;
		},
	},
	actions: {
		ajaxToggle({ commit }) {
			commit("AJAX_TOGGLE");
		},
		userUpdate({ commit }, data) {
			commit("USER_UPDATE", data);
		},
		userUpdateAccount({ commit }, data) {
			commit("USER_UPDATE_ACCOUNT", data);
		},
		bossInit({ commit }, data) {
			let BossInfo = {
				BossLevel: 0,
				BossHealth: 0,
				BossTotalHealth: 0,
			};
			let BossHP = [10, 30, 50, 70, 100, 100, 100];
			BossInfo.BossLevel = data.BossLevel;
			BossInfo.BossHealth = data.BossHealth;
			BossInfo.BossTotalHealth = BossHP[data.BossLevel - 1];
			commit("BOSS_INIT", BossInfo);
		},
		bossUpdateHeath({ commit }, data) {
			commit("BOSS_HEATH", data);
		},
		diceUpdate({ commit }, data) {
			commit("DICE_UPDATE", data);
		},
		itemListUpdate({ commit }, data) {
			commit("ITEM_LIST_UPDATE", data);
		},
	},
});

export default store;
