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
	title: "測試推播功能V2", // 標題
	body: "測試推播功能IOS", // 內文
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

const subscription1 = { endpoint: "https://fcm.googleapis.com/fcm/send/dHhE04bFQwE:APA91bF9bMTZNsznioS1DW_PfIUJOwbxAbE26loDEIvHpArL7Cpgi1BJCnsKVxCb0zVCShxVRDDNqoBFBtdfkuPsBKuybrRx8unUaZzR-t3y2y3TfdB4AQtxtn9vgqFBUN8p0Mr7dFim", expirationTime: null, keys: { p256dh: "BPaAHxb89t0sGPAOCCxW-Ozd9dWl22ZQT4umYlHsoU96QYoe0jZVVWM8c03jsASiNI8r933omxONrcdT4vezg2I", auth: "6m_yPJQRpHVeNZZb_rMgsw" } };

const subscription2 = { endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAACniQvyB30ZOzItDIVyJbt4IYNZiwLLFVoVLmCyGMvvBGi2IlLojNX6wKgqjP%2bHRn3lf61AINgvRu2mSxTicFhClMm0PuQtGk9Mr2DWeJO3JVWsqHJCG5ZxVNrLle4d3WZMkKTLtKmCauP6zRxN6SNs0%2bn6cqRZrLXgOT4yPoE9QMI8L5PWzRhYLeORAoGqok4nRhJUoJFq6GVNdSfMrfNyfGy79Jw4UNFFGEM9bJA2DgchL0V%2bC4VtWXwSR3HaWNksi4%2bctGw%2f%2f8VCFApto8yyDLzYosT6bJhMLrP8NCqnHuB4LhHQIv5EWnGDWcWtJQzC7idYlAAvEL5WDOsaCRED", expirationTime: null, keys: { p256dh: "BGxKhmeaIoXpseRsUqlcyFRaICegFEwMkl1sYLtkgGsMxzbis7vm5wOlm-cAdpC9B59fnsz56n4KUGhG8ALgvqg", auth: "fVc3I5WJ2OO3HtkzL7tq3Q" } };
const subscription3 = { endpoint: "https://web.push.apple.com/QGUPe1a_tu4pvxyLO_0-wQlw1SV4iutBrrPPyGOlVq6L4U0I2jsohnzdjrQECuSsA2icEvVvtJVWW6wFbvAO10TQEERPWl9ddYSC9ZX9nW-Ve97KCCSKJ04GG8bVy4Vb8v5XRyCUdF2Pk64dOv7cfuj8-O7GPBTKww8_R608eqY", keys: { p256dh: "BB9NtJDjZs1vC0qyKvRgZxXaA50Seo-q6-r_wLRHwW-XrRpanfyptnLJKlCCPgwEPbYvovHEHnLAXZWLJaU4R3c", auth: "reEsfFYbayp1LOQzzltHlw" } };
const subscription4 = { endpoint: "https://web.push.apple.com/QO2eS3NHtctMGr69j-2poDggi4Zwzedd0KnNQ6HhIszhV15DfNxgm-R40aBnmbKH9KnYw0fP01yEYjVOvV1VX142rChEkJSmq5fCgdVPH2EPxqgZPLIxkrKFWZiQPWGC_zekEeouRv-MNpDrKT39sK2mG5iJJtv0r9oPfJ7p_bA", keys: { p256dh: "BH52ARUbKaS7hK59SxXA2q52Hs3SZMgBWH8WN8-KvFWFgV4GfJndR07RzQkpzkte7lpCQyyqv4i1RPcHfy5Tui0", auth: "5L52fDxXvbWyjiD7A9lFIg" } };
webpush.sendNotification(subscription4, JSON.stringify(options));
