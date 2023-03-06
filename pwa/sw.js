self.addEventListener("install", (event) => {
	console.log("V1 installing…");

	// cache a cat SVG
	event.waitUntil(caches.open("static-v1").then((cache) => cache.add("./images/dog.jpg")));
});

self.addEventListener("activate", (event) => {
	console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);

	// serve the horse SVG from the cache if the request is
	// same-origin and the path is '/dog.svg'
	if (url.origin == location.origin && url.pathname == "/images/dog.jpg") {
		event.respondWith(caches.match("./images/dog.cat"));
	}
});
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
