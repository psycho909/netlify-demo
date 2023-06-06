let loading = {
	props: {
		showLoading: {
			type: Boolean,
			default: false
		},
		num: {}
	},
	setup() {
		let loadRef = Vue.ref(null);

		return {
			loadRef
		};
	},
	template: `<div v-show="showLoading" id="loadingProgress" class="loadingProgress init" ref="loadRef"><slot></slot></div>`
};

export default loading;
