var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var registrationToken = ["eZr7w2VuO_oHU4Rnz7K1lL:APA91bFOCDBKrWzmJBMm8H3DhB8tOYLYBQmqMLT_BqlYyTEO6yFhJDiLo8k78DmpjZxHLIbJ0YU5z9g2H1TgagjLOVC1TqFfpbiaX4kA9R_ggogYgnirweua1f5w5G7CZFliukrblEs5"];

const topic = "highScores";

var options = {
	icon: "https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20230104/assets/maple-story-logo@3x-8fe07918.png",
	body: "Node_JS_CONTENT",
	image: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png",
	title: "測試推播功能V2",
	badge: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png"
};
const message = {
	data: {
		title: "測試推播功能V2",
		options: options
	},
	topic: topic
};
admin
	.messaging()
	.subscribeToTopic(registrationToken, topic)
	.then(function (response) {
		console.log("Successfully sent message:", response);
	})
	.catch(function (error) {
		console.log("Error sending message:", error);
	});

admin
	.messaging()
	.send(message)
	.then((response) => {
		// Response is a message ID string.
		console.log("Successfully sent message:", response);
	})
	.catch((error) => {
		console.log("Error sending message:", error);
	});
