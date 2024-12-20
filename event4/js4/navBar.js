const navBar = {
	setup() {
		let isNavOpen = Vue.ref(false);
		return {
			isNavOpen
		};
	},
	template: `
        <div class="nav-bar"
            :class="{'active': isNavOpen}">
            <div class="btn btn-nav-control fz0" @click="isNavOpen = !isNavOpen" id="btn-nav">開關</div>
            <nav class="nav">
                <ul>
                    <li class="btn btn-nav"><a href="./class.html" id="btn-nav-index">事前預約</a></li>
                    <li class="btn btn-nav"><a href="./class2.html" id="btn-nav-class">職業改編</a></li>
                    <li class="btn btn-nav"><a href="./class3.html" id="btn-nav-more">更多活動</a></li>
                </ul>
            </nav>
        </div>
    `
};

export default navBar;
