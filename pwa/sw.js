self.addEventListener("install", (event) => {
	console.log("V1 installing…");
});

self.addEventListener("activate", (event) => {
	console.log("[Service Worker] Activating Service Worker ...", event);
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(
				keyList.map(function (key) {
					if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
						console.log("[Service Worker] Removing old cache.", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	return self.clients.claim();
});

self.addEventListener("fetch", (event) => {});
self.addEventListener("notificationclick", (event) => {
	const notification = event.notification;
	const action = event.action;
	const link = notification.data.link;
	const link_ok = notification.data.link_ok;
	const link_ng = notification.data.link_ng;
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
	console.log("notificationclick action is", action);
});

self.addEventListener("push", (event) => {
	console.log(event);
	console.log("[Service Worker] Push Received.");
	let title = "Server Push";
	let options = {
		body: "push TEST",
		icon: "./assets/images/android_048.png"
	};
	if (event.data) {
		options = event.data.json();
		title = options.title;
	}

	event.waitUntil(self.registration.showNotification(title, options));
});
