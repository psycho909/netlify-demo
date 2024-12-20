const store = Vuex.createStore({
	state: {
		character: {
			isOpen: false,
			char: 0
		}
	},
	mutations: {
		openLightbox(state, payload) {
			state.character.isOpen = payload.isOpen;
			state.character.char = payload.char;
		}
	}
});

export default store;
