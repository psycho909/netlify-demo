export default function imgLoading() {
	let count = 0;

	function extractImageUrl(backgroundImage) {
		const regex = /url\(['"]?([^'"]+?)['"]?\)/;
		const match = backgroundImage.match(regex);
		return match ? match[1] : null;
	}

	function checkAllBackgroundImagesLoaded() {
		return new Promise((resolve, reject) => {
			const elements = document.querySelectorAll("*");
			const mediaLoadPromises = Array.from(elements).map((element) => {
				return new Promise((innerResolve, innerReject) => {
					const backgroundImage = window.getComputedStyle(element).backgroundImage;
					const tagName = element.tagName.toLowerCase();
					count++;
					if (tagName === "video") {
						element.addEventListener("loadeddata", innerResolve);
						element.addEventListener("error", innerResolve); // Optional: handle video loading errors
					} else if (backgroundImage && backgroundImage !== "none") {
						const imageUrl = extractImageUrl(backgroundImage);
						if (imageUrl) {
							const image = new Image();
							image.onload = innerResolve;
							image.onerror = innerResolve;
							image.src = imageUrl;
						}
					} else {
						innerResolve(); // If element is not a video or doesn't have a background image, resolve immediately
					}
				});
			});

			Promise.all(mediaLoadPromises)
				.then(() => {
					console.log("All media loaded", count);
					resolve(true);
				})
				.catch((error) => {
					console.error("Some media failed to load:", error);
					reject(error);
				});
		});
	}

	return {
		checkAllBackgroundImagesLoaded
	};
}
