const lotteryLoading = {
	mounted() {
		$("body").addClass("ov-hidden");
	},
	destroyed() {
		$("body").removeClass("ov-hidden");
	},
	template: `
        <div class="loading lotteryLoading"></div>
    `
};

export default lotteryLoading;
