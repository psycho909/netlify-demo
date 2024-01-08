const leftbar = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		status: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		let openMenu = Vue.ref(false);
		let toggle = (status) => {
			if (status) {
				openMenu.value = status;
			} else {
				openMenu.value = !openMenu.value;
			}
		};
		Vue.watch(
			() => props.status,
			(val) => {
				openMenu.value = false;
			}
		);
		Vue.nextTick(() => {});
		return {
			openMenu,
			toggle
		};
	},
	template: `
	<div class="left-bar-top">
		<a href="javascript:;" class="left-bar-open" @click="toggle(true)"></a>
	</div>
	<div class="left-bar" :class="[openMenu == 'true' || openMenu == true ?'open':'']">
		<a href="javascript:;" class="left-bar-toggle" @click="toggle()"></a>
		<a href="javascript:;" class="left-bar-close" @click="toggle(false)"></a>
		<div class="left-bar__list">
			<slot></slot>
		</div>
		<slot name="lg"></slot>
		<div class="left-bar__icon-list">
			<a href="https://maplestory.beanfun.com/main" target="_blank" class="left-bar__icon icon-home"></a>
			<a href="https://www.youtube.com/@TWmaplestory" target="_blank" class="left-bar__icon icon-yt"></a>
			<a href="https://www.facebook.com/www.maplestory.msfans.com.tw" target="_blank" class="left-bar__icon icon-f"></a>
		</div>
	</div>`
};

export default leftbar;
