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
self.addEventListener("notificationclick", function (event) {
	var notification = event.notification;
	var action = event.action;

	console.log(notification);

	if (action === "confirm") {
		console.log("Confirm was chosen");
		notification.close();
	} else {
		console.log(action);
		notification.close();
	}
});
