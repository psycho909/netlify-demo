const webpush = require("web-push");

const vapidKeys = {
	publicKey: "BBHEOQlx7PZJoHYSllCL8hEax2QMNCV82zTTwerVEo9UD5gm5q9r37U5jMdGVDbkm-Y4ZX7XVy0GOuuLK0uK_g8",
	privateKey: "pvtClY5PantLiuYyYUTZ45UH_ECxNg3PipwIyPqpgs8"
};

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);
const browserKeys = {
	p256dh: "BOKcagDgrewVjbh2scGX_6zfzqXfrXPYgaUDoRwFkU-lH6nXrK3QkHUyaRmmx5gjNW0QzV0jofQVtBCLffRj8SY",
	auth: "q9EeAk_i7fN80rJ_HJwSFQ"
};

webpush.setVapidDetails("mailto:psychosocial909@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const options = {
	icon: "assets/images/android_048.png",
	title: "測試推播功能V1",
	body: "測試推播功能",
	image: "https://scontent.ftpe7-1.fna.fbcdn.net/v/t31.0-8/21273134_10156585628499554_8520027102111869914_o.jpg?oh=9d7bcbc999c161f5ce778e361a4b9ea4&oe=5A47D9EE",
	data: {
		link: "https://tw.beanfun.com/",
		link_ok: "https://tw.beanfun.com/",
		link_ng: "https://tw.beanfun.com/"
	},
	requireInteraction: true,
	actions: [
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
		p256dh: browserKeys.p256dh,
		auth: browserKeys.auth
	}
};

webpush.sendNotification(subscription, JSON.stringify(options));
