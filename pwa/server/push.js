const webpush = require("web-push");

// const vapidKeys = {
// 	publicKey: "BCbxmHiLr34gdRLP6C945vyAqNbTR31KP7D7SosYou-Rg7KAys1EK24U2zAUWqoei6UKVO8aIc5-CIMlvsQ8XtA",
// 	privateKey: "5FnKKzhTZx2Jzn3zbIH3JMOCWp_0a9CeZXSBMPLvvtg"
// };

const vapidKeys = webpush.generateVAPIDKeys();
const browserKeys = {
	p256dh: "BHDIOfWYemiv3owB5cBhMHkAMVhzoXvLrBiQNIAHeBYNifCBKVyLGeEmMBeTQTeeobzNlqnbSrNbIvDPo0PIJUM",
	auth: "LIxTv_Il336gW12qC73acw"
};

webpush.setVapidDetails("mailto:denhuang@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const options = {
	icon: "assets/images/android_048.png",
	body: "Angular 測試工作坊 9月23日(六)",
	image: "https://scontent.ftpe7-1.fna.fbcdn.net/v/t31.0-8/21273134_10156585628499554_8520027102111869914_o.jpg?oh=9d7bcbc999c161f5ce778e361a4b9ea4&oe=5A47D9EE",
	data: {
		link: "https://www.facebook.com/groups/augularjs.tw/",
		link_ok: "https://www.facebook.com/events/188912961650574/?acontext=%7B%22ref%22%3A%224%22%2C%22feed_story_type%22%3A%22370%22%2C%22action_history%22%3A%22null%22%7D",
		link_ng: "https://www.facebook.com/groups/angularstudygroup/"
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
	endpoint: "https://fcm.googleapis.com/fcm/send/fwNbCkZtyr0:APA91bF-tttRSH0KBHuZ3lGehkd7kcNzWOfAVTKeXp4cYUURgq2bEkTkCtLQAvrzDZ7q_N7on0ved-Ss9SGLRYGm61D2rkmPe2R2EUnLn7s1y7Fwrjts2I-qM94SQINyJA4VBV5spTdy",
	expirationTime: null,
	keys: {
		p256dh: browserKeys.p256dh,
		auth: browserKeys.auth
	}
};

webpush.sendNotification(subscription, JSON.stringify(options));
