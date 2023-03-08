const webpush = require("web-push");

const vapidKeys = {
	publicKey: "BBHEOQlx7PZJoHYSllCL8hEax2QMNCV82zTTwerVEo9UD5gm5q9r37U5jMdGVDbkm-Y4ZX7XVy0GOuuLK0uK_g8",
	privateKey: "pvtClY5PantLiuYyYUTZ45UH_ECxNg3PipwIyPqpgs8"
};

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);

webpush.setVapidDetails("mailto:psychosocial909@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const options = {
	icon: "https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20230104/assets/maple-story-logo@3x-8fe07918.png", // 網站icon圖示
	title: "測試推播功能V1", // 標題
	body: "測試推播功能", // 內文
	image: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png", // 推播大圖
	data: {
		link: "https://world-flipper.beanfun.com/", // 直接點通知的連結
		link_ok: "https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20230104/index.html", // 參加
		link_ng: "https://tw.beanfun.com/" // 不參加
	},
	requireInteraction: true, // 直到用戶點擊或關閉才會關閉
	badge: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png",
	actions: [
		// 按鈕
		{
			action: "yes",
			title: "參加",
			icon: "./assets/images/img_ok.png"
		},
		{
			action: "no",
			title: "不參加",
			icon: "./assets/images/img_ng.png"
		}
	]
};

const subscription = {
	endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAABdilSpHDyQCFKlZAhjfO7fyyORvGUKT7%2fA8MK%2bPHgqWIT%2bjFHWU5g4PKU8kXOhnz6vA3n8tupfhCK1TxBljrdwLDWeLXa9AlCu1yRGt3qMXpDpcl3vMfJ1cNNq22QWdd8gvqxmxdOtjpdZInsWNYjX%2fV%2bNXH6ziLf%2bJqUEEYnxyJkiunV%2be0bEm07UyV3GZ5pmNi8vSBVWKYv9dCOzWLF2AuiAe%2bjqmTjgIntfA%2fJtxq4ffkpoV0AkykRGDahLNdzmtwMH%2fp3czXuM2aFNWNwTmWlZlH0qBqNrRTq%2fsH1xpFRm3BjSzxUDz%2f5vzbVM8GV6rw%2fQhJN4sdqywdvXk8jK",
	expirationTime: null,
	keys: {
		p256dh: "BOKcagDgrewVjbh2scGX_6zfzqXfrXPYgaUDoRwFkU-lH6nXrK3QkHUyaRmmx5gjNW0QzV0jofQVtBCLffRj8SY",
		auth: "q9EeAk_i7fN80rJ_HJwSFQ"
	}
};

const subscription2 = { endpoint: "https://fcm.googleapis.com/fcm/send/ecY80BWlMxI:APA91bGJR0f4fbHSW5zTpKokA8GvsuQhIVmJplaFX05bbQ4TJTo-bmci5eeR_vdlv5aT1Ur90OR_vzIYdWGRc_CoQgzHGXKiugjl5h1l-vLvbEWaf6LCwCH_JVcSPAN5wuwMMQQZnRNh", expirationTime: null, keys: { p256dh: "BKPbyRkchLut-D5__yJzavYPkPH8b0Zpda-5MsN9fwaZhf_K2SzML7LPcmFY9762MZiCRuFgkBaKgi_v5NWKpYA", auth: "87Lnx7BFx_w9wdKO2xTaVA" } };

webpush.sendNotification(subscription2, JSON.stringify(options));
