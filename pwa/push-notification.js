let pushServiceWorkerRegistration;
let applicationServerPublicKey;
let consoleOutput;
consoleOutput = document.getElementById("output");

applicationServerPublicKey = "BBHEOQlx7PZJoHYSllCL8hEax2QMNCV82zTTwerVEo9UD5gm5q9r37U5jMdGVDbkm-Y4ZX7XVy0GOuuLK0uK_g8";

// granted 同意
// denied 拒絕
// default default

function registerPushServiceWorker() {
	navigator.serviceWorker
		.register("./sw.js")
		.then(function (serviceWorkerRegistration) {
			pushServiceWorkerRegistration = serviceWorkerRegistration;
			initializeUIState();
			writeToConsole("Push Service Worker has been registered successfully");
		})
		.catch(function (error) {
			writeToConsole("Push Service Worker registration has failed: " + error);
		});
}

function initializeUIState() {
	subscribeButton = document.getElementById("subscribe");
	subscribeButton.addEventListener("click", subscribeForPushNotifications);

	pushServiceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
		if (Notification.permission === "denied") {
			writeToConsole("Permission for Push Notifications has been denied");
		}
	});
}
function subscribeForPushNotifications() {
	if (applicationServerPublicKey) {
		subscribeForPushNotificationsInternal();
	} else {
		PushNotificationsController.retrievePublicKey()
			.then(function (retrievedPublicKey) {
				applicationServerPublicKey = retrievedPublicKey;
				writeToConsole("Successfully retrieved Public Key");

				subscribeForPushNotificationsInternal();
			})
			.catch(function (error) {
				writeToConsole("Failed to retrieve Public Key: " + error);
			});
	}
}

// PublicKey轉碼用
function urlB64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function writeToConsole(text) {
	var paragraph = document.createElement("p");
	paragraph.style.wordWrap = "break-word";
	paragraph.appendChild(document.createTextNode(text));

	consoleOutput.appendChild(paragraph);
}

function subscribeForPushNotificationsInternal() {
	let applicationServerKey;
	applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	pushServiceWorkerRegistration.pushManager
		.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
		.then(function (pushSubscription) {
			writeToConsole(JSON.stringify(pushSubscription));
			// PushNotificationsController.storePushSubscription(pushSubscription)
			// 	.then(function (response) {
			// 		if (response.ok) {
			// 			writeToConsole("Successfully subscribed for Push Notifications");
			// 		} else {
			// 			writeToConsole("Failed to store the Push Notifications subscrition on server");
			// 		}
			// 	})
			// 	.catch(function (error) {
			// 		writeToConsole("Failed to store the Push Notifications subscrition on server: " + error);
			// 	});
		})
		.catch(function (error) {
			if (Notification.permission === "denied") {
				writeToConsole("Permission for Push Notifications has been denied");
			} else {
				writeToConsole("Failed to subscribe for Push Notifications: " + error);
			}
		});
}
