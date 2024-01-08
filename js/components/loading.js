let loading = {
	props: {
		showLoading: {
			type: Boolean,
			default: false
		},
		init: {}
	},
	setup() {
		Vue.onMounted(()=>{
			
		})
		return {
			
		}
	},
	template: `<div v-show="showLoading" id="loadingProgress" class="loadingProgress init"><slot></slot></div>`
};

export default loading;
