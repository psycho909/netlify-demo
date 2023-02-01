const store = new Vuex.Store({
	state: {
		name: "Store",
		status: 1,
	},
	mutations: {
		CHANGE_STATUS(state, payload) {
			state.status = payload;
		},
	},
	actions: {},
});

export default store;
