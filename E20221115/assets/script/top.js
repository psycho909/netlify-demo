const top = {
	methods: {
		toTop() {
			$("body,html").animate({
				scrollTop: 0
			});
		}
	},
	template: `<a href="javascript:;" class="top" @click="toTop"></a>`
};

export default top;
