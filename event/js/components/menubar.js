import useEventStore from "../store.js";
const menubar = {
	setup() {
		let menuStatus = Vue.ref(false);
		const store = useEventStore();
		const scrollTop = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		};
		const menuToggle = () => {
			menuStatus.value = !menuStatus.value;
		};
		const pageChange = (page) => {
			store.setCurrentPage(page);
		};
		return {
			scrollTop,
			menuStatus,
			menuToggle,
			pageChange,
		};
	},
	template: `
    <div class="menu-toggle" @click="menuToggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="menu" :class="[menuStatus?'open':'']">
        <div class="menu-close" @click="menuToggle"></div>
        <div class="menu-box">
            <div class="menu-logo-box"><a href="https://maplestory.beanfun.com/main" class="menu-logo" target="_blank"></a></div>
            <div class="menu-list">
                <a href="javascript:;" class="menu-list__link" @click="pageChange('page1')">活動介紹</a>
                <a href="javascript:;" class="menu-list__link" @click="pageChange('page2')">每日攻略</a>
                <a href="javascript:;" class="menu-list__link" @click="pageChange('page3')">合作商品</a>
                <a href="javascript:;" class="menu-list__link comming-soon">COMING</a>
                <a href="https://maplestory.beanfun.com/Artwork_Official" class="menu-list__link" target="_blank">特別活動</a>
            </div>
            <div class="menu-icon-group">
                <a href="https://maplestory.beanfun.com/main" class="menu-icon__h" target="_blank"></a>
                <a href="https://www.facebook.com/www.maplestory.msfans.com.tw" class="menu-icon__f" target="_blank"></a>
            </div>
            <div class="menu-status">
            <div class="menu-status__logout" v-else>
                <div class="menu-status__nickname">XXXXXXXXXXXX</div>
                <a href="../../logout.aspx" class="menu-status__btn-login">登出</a>
            </div>
            </div>
        </div>
        <a href="javascript:;" class="top top--pc" @click="scrollTop">TOP</a>
    </div>  
    <a href="javascript:;" class="top top--mb" @click="scrollTop">TOP</a>
    `,
};
export default menubar;
