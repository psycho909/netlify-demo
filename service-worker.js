self.addEventListener("install", (event) => {
	console.log("V1 installing…");
});
self.addEventListener("activate", (event) => {
	console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
	console.log("now fetch!");
	console.log(event.request);
	event.respondWith(
		//當有重複的請求時，就直接拿cache裡的response當回應，沒有的話就送出請求，並且把回應存到cache裡
		caches.match(event.request).then(function (response) {
			return (
				response ||
				fetch(event.request).then((res) =>
					// 存 caches 之前，要先打開 caches.open(dataCacheName)
					caches.open(dataCacheName).then(function (cache) {
						// cache.put(key, value)
						// 下一次 caches.match 會對應到 event.request
						cache.put(event.request, res.clone());
						return res;
					})
				)
			);
		})
	);
});
