let top = {
	setup() {
		const toTop = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		};
		return {
			toTop
		};
	},
	template: `
        <a href="javascript:;" class="top" @click="toTop"></a>
    `
};

export default top;
