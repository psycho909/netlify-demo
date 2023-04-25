var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var registrationToken = ["eOVOd-6k2m68RkUU9zJ8jV:APA91bESU582PNK9jPCrtn4-Kdl-v-5NGBafw8gjLIjqLZYt_w3Ff15UwB-WobaAkwme01h-9g3fKFiQL00xLc4ahG_m_beTUSvYPc3h9s1qiT-ifXZ9KDwa7hhxdIOcDb1gYEPJALv1"];

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
