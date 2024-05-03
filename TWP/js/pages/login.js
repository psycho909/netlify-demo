const login = {
	setup() {
		return {};
	},
	template: `
	<div class="login-content">
		<div class="login-title">選擇帳號</div>
		<div class="login-btn-list">
			<a href="javascript:;" class="login-btn__item" data-type="bf">beanfun</a>
			<a href="javascript:;" class="login-btn__item" data-type="apple">apple</a>
			<a href="javascript:;" class="login-btn__item" data-type="google">google</a>
			<a href="javascript:;" class="login-btn__item" data-type="f">f</a>
		</div>
		<div class="login-notice login-notice--pc">
			<div class="login-notice--zh">
				<p>登入成功後，Gamania會將你所登入的帳號、電子郵件</p>
				<p>和使用者名稱等資訊，提供給「波拉西亞戰記」使用。</p>
			</div>
			<div class="login-notice--en">
				<p>After successful login, Gamania will provide the account,</p>
				<p>email and user name information to "Wars of Prasia".</p>
			</div>
		</div>
		<div class="login-notice login-notice--mb">
			<div class="login-notice--zh">
				<p>登入成功後，</p>
				<p>Gamania會將你所登入的帳號、電子郵件和使用</p>
				<p>者名稱等資訊，提供給「波拉西亞戰記」使用。</p>
			</div>
			<div class="login-notice--en">
				<p>After successful login, Gamania will provide</p>
				<p>the account,email and user name</p>
				<p>information to "Wars of Prasia".</p>
			</div>
		</div>
	</div>
	`
};

export default login;
