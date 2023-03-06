const webpush = require("web-push");

const vapidKeys = {
	publicKey: "BNQHuP7l1ZCdQpZGPcjT5aY7co1r3nJcYFzhMRy6P4OEf2vwyYXs7E2dueG4Rfpg_FTK0OBW70XwpqnVk8uJEb0",
	privateKey: "zzxlcDMxwJXLFFwiZX9NPaQCVAq9fSRg0V0C9jNHcEs"
};

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);
const browserKeys = {
	p256dh: "BGr2w1OG-DRZrvyIUhCRkH7PhFTOP79UU7O92ovsk5QhQ3mJ8Xy6akhexQ_LfGoIPWIAufQHrCBL-oEdpgJKx1M",
	auth: "vwPlnreQjnkNFiziRNgQcA"
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
	endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAACATWo9rtBM5uDgC3f1FZvag2x5CuaU8f4QJW1S7nOSjYweyQIsgM9Jss%2bTV868XQo7h1GYx%2bh7hvoe%2bdKER%2bokB1G1o6MXBiPOHU4eqcTltiHzZZm%2f2t0yO5S2UbA9YezNWNkQBoGZsqcV%2bfdSQLM8WDLkECf3cVwRr2XsX1%2f9KrFrKDVJ16UgeIJCub5jbKZxkpGiWDV%2bkXNsw%2fB6LzS%2b0PPFQxskTU2mlWF2BlNUkvMVOzu84aO43Zlzn5v2JQsd%2bEo2LYAW5lo1eqpkH%2bdblFoJ9QZ6BBtBYmYJYECms0ZXg3ENGABRMrZO2Kp19lFILeR7rz3pcmQH%2bkSKq23b",
	expirationTime: null,
	keys: {
		p256dh: browserKeys.p256dh,
		auth: browserKeys.auth
	}
};

webpush.sendNotification(subscription, JSON.stringify(options));
