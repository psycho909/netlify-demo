var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var registrationToken = ["fLxX7lr5DT1YmOFJ1l5MdU:APA91bH8khGbO6DWPWYUkY5JcX3jyKKmPpVzPC9qoTSfzKZSiG49AyVaFZLCBjV3g9KYs43RcV6lx8Cyunt2qEukp0G5QGKUZkcrpM3HMH0xM4VWX_ZLoJTvWGkGXepR7l1Ro4Wx1mCv"];

const topic = "highScores";

let options = {
	title: "測試推播功能V2",
	body: "Node_JS_CONTENT"
};
const message = {
	data: {
		title: "測試推播功能V2",
		body: "Node_JS_CONTENT"
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
