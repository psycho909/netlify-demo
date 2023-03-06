const webpush = require("web-push");

const vapidKeys = {
	publicKey: "BNQHuP7l1ZCdQpZGPcjT5aY7co1r3nJcYFzhMRy6P4OEf2vwyYXs7E2dueG4Rfpg_FTK0OBW70XwpqnVk8uJEb0",
	privateKey: "zzxlcDMxwJXLFFwiZX9NPaQCVAq9fSRg0V0C9jNHcEs"
};

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);
const browserKeys = {
	p256dh: "BHDIOfWYemiv3owB5cBhMHkAMVhzoXvLrBiQNIAHeBYNifCBKVyLGeEmMBeTQTeeobzNlqnbSrNbIvDPo0PIJUM",
	auth: "LIxTv_Il336gW12qC73acw"
};

webpush.setVapidDetails("mailto:psychosocial909@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

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
	endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAAB7g1TciKObjdLq5sTV92dWxoOjQZOYzIxTNWP0k4fhtQYDdIK%2fBIy2D2QArE4hTwTq9wXsSBlFGl9vCqHJeFidQCsal%2f5aQHIPCorNig8tmaPnWHX60QObUpXhN1ZDzOUprUJIdqqhqYVoZ3zP%2bvTHAN6JazV2g464XbuHUZb19Rzj9%2fOq8R%2fFKdvMbkTpC3r4ktlXC1kwlXUu4dLrXjHZwSo7mU6rozLS1Abr%2f4b05BKW4tCh3FGmDbZ0VPD6Mqih2Jf9A5xhKU3VSudEmjzPJZWbyZf6KV79Dy5Na6JBZfwNiwb1j5gBZV22N6Ma6RXqsO7KUXK4fh8xa4w9KGYg",
	expirationTime: null,
	keys: {
		p256dh: browserKeys.p256dh,
		auth: browserKeys.auth
	}
};

webpush.sendNotification(subscription, JSON.stringify(options));
