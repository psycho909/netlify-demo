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

const subscription1 = { endpoint: "https://fcm.googleapis.com/fcm/send/dHhE04bFQwE:APA91bF9bMTZNsznioS1DW_PfIUJOwbxAbE26loDEIvHpArL7Cpgi1BJCnsKVxCb0zVCShxVRDDNqoBFBtdfkuPsBKuybrRx8unUaZzR-t3y2y3TfdB4AQtxtn9vgqFBUN8p0Mr7dFim", expirationTime: null, keys: { p256dh: "BPaAHxb89t0sGPAOCCxW-Ozd9dWl22ZQT4umYlHsoU96QYoe0jZVVWM8c03jsASiNI8r933omxONrcdT4vezg2I", auth: "6m_yPJQRpHVeNZZb_rMgsw" } };

const subscription2 = { endpoint: "https://fcm.googleapis.com/fcm/send/evLHLM_fRtk:APA91bFFxIgzFMk9Jl7oHajWJ0q8Kd0UssVAxIRgChb_eV-NaVNcpX9wB57_c4Zj_Pp6Qh73R-oScI52foU104l9gRBqAr935g62Wtoiv3xLi2boGhLeEWn8HJCeKAVufBZTtCOAyuJB", expirationTime: null, keys: { p256dh: "BPYtPuuFK7tfeAsPHIM_G1TwSUWCK85_J2jE3tfD5OOG_OPFH_rQtBykNDmcnbdcKPUk4FEeSTinMvtjWIAk2rg", auth: "f-ZH8SzieeAcqSp4UsssrA" } };

webpush.sendNotification(subscription2, JSON.stringify(options));
