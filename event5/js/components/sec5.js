import { LBVideo } from "../lightbox.js";

let sec5 = {
	setup() {
		let handleVideoClick = (yt) => {
			LBVideo(yt);
		};
		return { handleVideoClick };
	},
	template: `
    <section class="sec sec5" data-anchor="sec5">
        <div class="sec-info">
            <div class="sec-title sec5-title1">PSS輔助系統</div>
            <div class="sec-title sec5-title2">擺脫時間限制，更便利的輔助工具</div>
            <div class="sec5-content sec-content">
                <div class="sec5-tab">
                    <a href="https://tw-event.beanfun.com/Lineage/EventAD/EventAD.aspx?EventADID=6934" target="_blank" class="sec5-tab__item" data-tab="1">PPS概要介紹</a>
                    <a href="https://tw-event.beanfun.com/Lineage/EventAD/EventAD.aspx?EventADID=6937" target="_blank" class="sec5-tab__item" data-tab="2">各項功能介紹</a>
                    <a href="待補" target="_blank" class="sec5-tab__item" data-tab="3">實際使用</a>
                </div>
                <a href="javascript:;" class="sec5-video" @click="handleVideoClick('C9ILnSQ7-')"></a>
            </div>
        </div>
    </section>
    `
};

export default sec5;
