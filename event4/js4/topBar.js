const topBar = {
	setup() {
		return {};
	},
	template: `
    <div class="top-bar">
        <div class="content">
            <a href="https://maplestory.beanfun.com/main" id="btn-logo" target="_blank" rel="noreferrer noopener" class="logo fz0">新楓之谷</a>
            <div class="links">
                <a href="https://www.instagram.com/maplestory_tw" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gig" id="btn-i_g"></a>
                <a href="https://www.facebook.com/www.maplestory.msfans.com.tw" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gfb" id="btn-f_b"></a>
                <a href="https://www.youtube.com/user/TWmaplestory/videos" target="_blank" rel="noreferrer noopener" class="btn btn-link btn-link-gyt" id="btn-y_t"></a>
            </div>
        </div>
    </div>
    `
};

export default topBar;
