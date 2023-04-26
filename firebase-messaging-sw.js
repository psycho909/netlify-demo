importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");
const firebaseConfig = {
	apiKey: "AIzaSyATDnYgGrq-D_C3Q8-q67a89rYjaSq_z5A",
	authDomain: "learn-for-web-push-a81dd.firebaseapp.com",
	projectId: "learn-for-web-push-a81dd",
	storageBucket: "learn-for-web-push-a81dd.appspot.com",
	messagingSenderId: "5848025284",
	appId: "1:5848025284:web:f2444f656e68836eeb6191"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function (payload) {
// 	console.log("[firebase-messaging-sw.js] Received background message ", payload);
// 	// Customize notification here
// 	const notificationTitle = "Background Message Title";
// 	const notificationOptions = {
// 		body: "Background Message body.",
// 		icon: "/firebase-logo.png"
// 	};

// 	self.registration.showNotification(notificationTitle, notificationOptions);
// });

messaging.onBackgroundMessage(function (payload) {
	console.log("[firebase-messaging-sw.js] Received background message ", payload);
	// Customize notification here
	// const notificationTitle = "Background Message Title";
	// const notificationOptions = {
	// 	body: "Background Message body.",
	// 	icon: "/firebase-logo.png"
	// };

	if (payload.data) {
		options = payload.data.body;
		title = payload.data.title;
	}
	self.registration.showNotification(title, options);
});
