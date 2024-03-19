import { ComingSoonLB } from "../lightbox.js";
const page3 = {
	setup() {
		return { ComingSoonLB };
	},
	template: `
    <div class="wrap page3">
        <div class="content page3-content">
            <div class="page3-content-title"></div>
            <div class="page3-content-img"></div>
            <a href="javascript:;" class="page3-content-btn" @click="()=>ComingSoonLB()">更多詳細資訊</a>
            <div class="event-copy-right">©Natsume Akatsuki, Kurone Mishima/KADOKAWA/KONOSUBA3 Partners</div>
        </div>
    </div>
    `,
};

export default page3;
