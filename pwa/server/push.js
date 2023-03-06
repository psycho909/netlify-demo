const webpush = require("web-push");

const vapidKeys = {
	publicKey: "BNQHuP7l1ZCdQpZGPcjT5aY7co1r3nJcYFzhMRy6P4OEf2vwyYXs7E2dueG4Rfpg_FTK0OBW70XwpqnVk8uJEb0",
	privateKey: "zzxlcDMxwJXLFFwiZX9NPaQCVAq9fSRg0V0C9jNHcEs"
};

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);
const browserKeys = {
	p256dh: "BLQn-ln16VmC6C1PDRb3YabktLjDjUs77rhoGSDWBtgxN2JUDISk988gbb4xHVOlpCNOVPImhgUe9Qds8UmGdWE",
	auth: "aT9Vv6kVO7kw7aohNdxcuA"
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
	endpoint: "https://wns2-ln2p.notify.windows.com/w/?token=BQYAAAAR2qT6J%2bVeaO%2bRDG92fNosa7FNhR1oEAzcnmfrWk%2bWzMsXWgCjp84vIdUooO6pIdC2oGgM56Oy%2fpaBDI6ZitBUtKaYB0TH6xyD4BOzL109rrvgD%2buxK2cA%2faJlBx5Tcob8dNEJqMc3sfpUQio1sjkqscT%2fYnvFDxGdzRimac1c1DCf9h%2bpXL0vjldi%2baumu7xPSGTbaCy1w8IJALosLHy%2baBLBqTjXK2nWSwwof3BD7Y7FwY83dy3IbRnZzVD3YdDErX4rfl9AcJs1VXOGcCoH2%2fnYNifTAC8%2fnqmrg9VH8nGD2VHVjErIB5Vsw19EUOsYKg75b3uqz8Iy9BObd7IR",
	expirationTime: null,
	keys: {
		p256dh: browserKeys.p256dh,
		auth: browserKeys.auth
	}
};

webpush.sendNotification(subscription, JSON.stringify(options));
