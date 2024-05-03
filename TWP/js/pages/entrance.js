import { Notice } from "../lightbox.js";
import useEventStore from "../store.js";
const entrance = {
	setup() {
		const store = useEventStore();
		const toLogin = () => {
			// https://galaxy.beanfun.com/webapi/view/login/{銀河配發之專案代碼}?redirect_url={接 收登入完成之網址}
			store.setCurrentPage("login");
		};
		return { Notice, toLogin };
	},
	template: `
	<div class="entrance-content">
		<div class="entrance-logo"></div>
		<div class="entrance-slogan"></div>
		<div class="entrance-date"></div>
		<a href="javascript:;" class="entrance-btn__in" @click="toLogin">立即爭奪</a>
		<a href="javascript:;" class="entrance-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
	</div>
	`
};

export default entrance;
