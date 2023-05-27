let loading = {
	props: {
		showLoading: {
			type: Boolean,
			default: false
		}
	},
	setup() {},
	template: `<div v-show="showLoading" id="loadingProgress" class="loadingProgress"></div>`
};

export default loading;
