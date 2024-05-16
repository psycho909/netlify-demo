const navBar = {
	setup() {
		let menuStatus = Vue.ref(false);
		let menuStatusToggle = () => {
			menuStatus.value = !menuStatus.value;
			if (menuStatus.value) {
				document.documentElement.classList.add("-ovh");
			} else {
				document.documentElement.classList.remove("-ovh");
			}
		};
		return { menuStatus, menuStatusToggle };
	},
	template: `
		<div class="nav-bar">
			<div class="nav-bar__wrap">
				<div class="nav-bar__head">
					<a class="nav-bar__logo"></a>
					<a href="javascript:;" class="nav-bar__toggle" :class="[menuStatus?'-close':'-open']" @click="menuStatusToggle">
						<span></span>
						<span></span>
						<span></span>
					</a>
				</div>
				<div class="nav-bar__content" :class="[menuStatus?'-open':'']">
					<ul class="nav-bar__menu-list">
						<li class="nav-bar__menu-item current"><a href="javascript:;">預先創角</a></li>
						<li class="nav-bar__menu-item"><a href="https://warsofprasia-event.beanfun.com/Event/E20240516Register/Index" target="_blank">事前預約</a></li>
						<li class="nav-bar__menu-item"><a href="英雄前哨戰" target="_blank">英雄前哨戰</a></li>
						<li class="nav-bar__menu-item"><a href="https://warsofprasia.beanfun.com/Main" target="_blank">前往官網</a></li>
					</ul>
					<div class="nav-bar__social-list" data-type="mb">
						<a href="https://forum.gamer.com.tw/A.php?bsn=71888" class="nav-bar__social-item" target="_blank" data-type="baha"></a>
						<a href="https://www.youtube.com/@user-warsofprasia" class="nav-bar__social-item" target="_blank" data-type="yt"></a>
						<a href="https://www.facebook.com/warsofprasia.tw" class="nav-bar__social-item" target="_blank" data-type="f"></a>
					</div>
				</div>
				<div class="nav-bar__social-list" data-type="pc">
					<a href="https://forum.gamer.com.tw/A.php?bsn=71888" class="nav-bar__social-item" target="_blank" data-type="baha"></a>
					<a href="https://www.youtube.com/@user-warsofprasia" class="nav-bar__social-item" target="_blank" data-type="yt"></a>
					<a href="https://www.facebook.com/warsofprasia.tw" class="nav-bar__social-item" target="_blank" data-type="f"></a>
				</div>
			</div>
		</div>
	`
};

export default navBar;
