const { defineStore, storeToRefs } = Pinia;

const useEventStore = defineStore("Event", {
	state: () => ({
		Token: "",
		login: false,
		Count: 0,
		TotalCount: 0,
		currentPage: "page1",
	}),
	actions: {
		setToken(token) {
			this.Token = token;
		},
		setLogin(login) {
			this.login = login;
		},
		setData(data) {
			this.Count = data.Count;
			this.TotalCount = data.TotalCount;
		},
		setCurrentPage(page) {
			this.currentPage = page;
		},
	},
});

export default useEventStore;
