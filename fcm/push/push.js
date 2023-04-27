var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

<<<<<<< HEAD
let mobile = "dtQfb3iOegYgqTuXsxNIqG:APA91bHnIJ9_2UHuBaotk81aNqadLSy6aIly-bg80x1izxVZ0-26fuADjRA4scGqrwXt-ThNVv7QnqhC0CmSRPR2I_4Tklu62cj6J8JEjUPxfe0Mw9TQ7GfHAwZGqd033xzEf8og8-Rx";
var registrationToken = ["dtQfb3iOegYgqTuXsxNIqG:APA91bHnIJ9_2UHuBaotk81aNqadLSy6aIly-bg80x1izxVZ0-26fuADjRA4scGqrwXt-ThNVv7QnqhC0CmSRPR2I_4Tklu62cj6J8JEjUPxfe0Mw9TQ7GfHAwZGqd033xzEf8og8-Rx", "fLxX7lr5DT1YmOFJ1l5MdU:APA91bH8khGbO6DWPWYUkY5JcX3jyKKmPpVzPC9qoTSfzKZSiG49AyVaFZLCBjV3g9KYs43RcV6lx8Cyunt2qEukp0G5QGKUZkcrpM3HMH0xM4VWX_ZLoJTvWGkGXepR7l1Ro4Wx1mCv", "c3ujiiUGp2OdGzdXtzjx5W:APA91bEnkS-kDJ6SuSCxYqREqIhd6qyxQdCwJU9_2nLDtzVMfzCV7D74CNOedltOtnz-OPsGyL9JghfwKlfwBOs2GPtSpc1EjmAf4_-JHM8tFes4TWYooMXENUfjaZXYsRkTymlK2aJa"];

const topic = "highScores";

let options = {
=======
var registrationToken = ["eZr7w2VuO_oHU4Rnz7K1lL:APA91bFOCDBKrWzmJBMm8H3DhB8tOYLYBQmqMLT_BqlYyTEO6yFhJDiLo8k78DmpjZxHLIbJ0YU5z9g2H1TgagjLOVC1TqFfpbiaX4kA9R_ggogYgnirweua1f5w5G7CZFliukrblEs5"];

const topic = "highScores";

var options = {
>>>>>>> 552a6c24ae45b366e62a95a982f7652fb5aa0391
	icon: "https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20230104/assets/maple-story-logo@3x-8fe07918.png",
	body: "Node_JS_CONTENT",
	image: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png",
	title: "測試推播功能V2",
	badge: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1606431240888.png"
};
const message = {
	data: {
		title: "測試推播功能V2",
<<<<<<< HEAD
		options: JSON.stringify(options)
=======
		options: options
>>>>>>> 552a6c24ae45b366e62a95a982f7652fb5aa0391
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
