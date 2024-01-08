const topbar = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		Vue.nextTick(() => {});
		return {};
	},
	template: `<div class="top-bar">
	<a href="https://maplestory.beanfun.com/main" class="top-bar__logo" target="_blank"></a>
	<div class="icon-group">
		<slot></slot>
		<a href="https://maplestory.beanfun.com/main" target="_blank" class="top-bar__icon icon-home"></a>
		<a href="https://www.youtube.com/@TWmaplestory" target="_blank" class="top-bar__icon icon-yt"></a>
		<a href="https://www.facebook.com/www.maplestory.msfans.com.tw" target="_blank" class="top-bar__icon icon-f"></a>
	</div>
</div>`
};

export default topbar;
