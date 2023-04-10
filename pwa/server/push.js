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

const subscription2 = { endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAABWKAJq4UVqsjLWNSNqrlolCv94voaUWkfjHPwpftPuPrAYeQD4a6lzPLzy033ai85JQOmW8sqnpr%2fTqYajVs%2fxiaEQBNtPciZU%2f%2f2mwuHy%2f2c558oJ5DqNYVkZqz9sKRusVXhxFBxw8MrHNEawbVvYitWEWYYzV7xZ9DOnHrQhRyE2sM6r8owpcExZuIinCWYdeV30QIgj38GxxtiCf0vFtVab%2frTAivXuLYgme9kRXdCn42ZKI6wJ89q7K661m7cLqcfCxiuPodaezN9GzeZyd6ad2d1AkSmW%2bnSlD0K6QFUsNqn7pmdlw9JLT%2f00h466TZSpzHl1BHeq90lUroex", expirationTime: null, keys: { p256dh: "BCV2rv4e8urCbSnxeiKvNRPtJ3HWk64ORgAjv0MOzjZj2BoXs08ekuMzyzaEDVcv7DpCToYsH-UtPt9HZ0Yh1eQ", auth: "i8l6mqZKFXFKe4ujyNZ_Vg" } };
const subscription3 = { endpoint: "https://web.push.apple.com/QGUPe1a_tu4pvxyLO_0-wQlw1SV4iutBrrPPyGOlVq6L4U0I2jsohnzdjrQECuSsA2icEvVvtJVWW6wFbvAO10TQEERPWl9ddYSC9ZX9nW-Ve97KCCSKJ04GG8bVy4Vb8v5XRyCUdF2Pk64dOv7cfuj8-O7GPBTKww8_R608eqY", keys: { p256dh: "BB9NtJDjZs1vC0qyKvRgZxXaA50Seo-q6-r_wLRHwW-XrRpanfyptnLJKlCCPgwEPbYvovHEHnLAXZWLJaU4R3c", auth: "reEsfFYbayp1LOQzzltHlw" } };

webpush.sendNotification(subscription3, JSON.stringify(options));
