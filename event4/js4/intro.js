const intro = {
	props: {
		isIntro: {
			type: Boolean,
			default: true
		},
		isIntroPlay: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return {};
	},
	template: `
        <div class="intro" v-if="isIntro">
            <div class="intro-content" data-type="dt" v-if="isIntroPlay"></div>
            <div class="intro-content" data-type="mb" v-if="isIntroPlay"></div>
        </div>
    `
};

export default intro;
