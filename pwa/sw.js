// let CACHE_NAME = "static-v2";
// // 安裝時
// self.addEventListener("install", (event) => {
// 	console.log(`${CACHE_NAME} installing…`);
// 	// 可以直接觸發activate事件
// 	self.skipWaiting();
// 	//
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => {
// 			cache.addAll([]);
// 		})
// 	);
// });

// // 安裝後觸發
// self.addEventListener("activate", (event) => {
// 	console.log("[Service Worker] Activating Service Worker ...", event);
// 	event.waitUntil(
// 		caches.keys().then(function (keys) {
// 			return Promise.all(
// 				keys.map(function (key) {
// 					if (key !== CACHE_NAME) {
// 						console.log("[SW] 刪除舊的快取");
// 						return caches.delete(key);
// 					}
// 				})
// 			);
// 		})
// 	);
// 	return self.clients.claim();
// });

// // 在頁面上有觸發到request時
// self.addEventListener("fetch", (event) => {
// 	console.log("[Service Worker] fetch", event);
// });

self.addEventListener("notificationclose", (event) => {
	const notification = event.notification;
	navigator.setAppBadge(0);
	notification.close();
	console.log("notificationclose");
});
// 點擊推播觸發
self.addEventListener("notificationclick", (event) => {
	const notification = event.notification;
	const action = event.action;
	const link = notification.data.link;
	const link_ok = notification.data.link_ok;
	const link_ng = notification.data.link_ng;
	console.log("notificationclick");
	navigator.setAppBadge(0);
	switch (action) {
		case "yes":
			if (link_ok) {
				clients.openWindow(link_ok);
			}
			break;
		case "no":
			if (link_ng) {
				clients.openWindow(link_ng);
			}
			break;
		case "close":
			break;
		default:
			if (link) {
				clients.openWindow(link);
			}
			break;
	}

	notification.close();
	console.log("[Service Worker] notificationclick action is", action);
});

// 發佈推播可以觸發
self.addEventListener("push", (event) => {
	console.log(event);
	console.log("[Service Worker] Push Received.");
	navigator.setAppBadge(1);
	if (event.data) {
		options = event.data.json();
		title = options.title;
	}

	event.waitUntil(self.registration.showNotification(title, options));
});
