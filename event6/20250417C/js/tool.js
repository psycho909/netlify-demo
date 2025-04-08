// Loading顯示
export function loadingShow() {
	document.querySelector("#loadingProgress").style.display = "block";
}
// Loading隱藏
export function loadingHide() {
	document.querySelector("#loadingProgress").style.display = "none";
}
// 刪除Cookie
export function deleteCookie(name) {
	return new Promise((resolve, reject) => {
		// 將Cookie的過期日期設為過去的時間，使其失效
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		// 檢查Cookie是否已刪除
		if (!getCookie(name)) {
			resolve();
		} else {
			reject("無法刪除Cookie");
		}
	});
}
// 增加Cookie
export function setCookie(name, value = true, hours = 1) {
	let date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
}
// 獲取Cookie
export function getCookie(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return false;
	}
}
export const imgLoading = async (data) => {
	let urlList = [];
	let promiseAll = [];
	let count = 0;
	let all = document.querySelectorAll("*");
	let ignore = ["SCRIPT", "STYLE", "HEAD", "HEAD", "TITLE", "META", "HTML"];
	let regex = /url\("([^"]+)"\)/;
	let promise = (imgUrl) => {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.src = imgUrl;
			img.onload = function () {
				count++;
				resolve(true);
			};
			img.onerror = function () {
				count++;
				resolve(false);
			};
		});
	};

	all.forEach(function (v, i) {
		if (ignore.indexOf(v.tagName) > -1) {
			return;
		}
		if (v.tagName == "IMG") {
			urlList.push(v.src);
		}
		if (window.getComputedStyle(v, "::before").backgroundImage !== "none") {
			let matches = window.getComputedStyle(v, "::before").backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
		if (window.getComputedStyle(v, "::after").backgroundImage !== "none") {
			let matches = window.getComputedStyle(v, "::after").backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
		if (window.getComputedStyle(v).backgroundImage !== "none") {
			let matches = window.getComputedStyle(v).backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
	});
	for (let i = 0; i < urlList.length; i++) {
		let p = await promise(urlList[i]);
		promiseAll.push(p);
		data.countNum(count, urlList.length);
	}
	return await Promise.all(promiseAll);
};

/**
 * 說明: 更新視頻元素的寬度和高度，以保持原始寬高比
 * @returns
 * updateScreenSize()
 */
export function updateScreenSize() {
	var targetWidth, targetHeight, videoElement, videoWidth, videoHeight, newWidth, newHeight;

	// 獲取窗口的寬度和高度
	targetWidth = window.innerWidth;
	targetHeight = window.innerHeight;

	// 重新定義並檢查取得視頻元素
	videoElement = document.querySelector("video"); // 假設視頻元素是 <video> 標籤
	if (!videoElement) {
		console.warn("Video element not found");
		return;
	}

	// 獲取視頻元素的原始寬度和高度
	videoWidth = videoElement.videoWidth;
	videoHeight = videoElement.videoHeight;

	// 確保視頻的寬高比有效
	if (!videoWidth || !videoHeight) {
		console.warn("Invalid video dimensions");
		return;
	}

	// 計算新寬度和高度，保持視頻的原始寬高比
	if (targetWidth / targetHeight < videoWidth / videoHeight) {
		// 當窗口的寬高比小於視頻的寬高比時，以高度為基準計算寬度
		newWidth = (targetHeight * videoWidth) / videoHeight;
		newHeight = targetHeight;
	} else {
		// 當窗口的寬高比大於或等於視頻的寬高比時，以寬度為基準計算高度
		newWidth = targetWidth;
		newHeight = (targetWidth * videoHeight) / videoWidth;
	}
	// 設置視頻元素的寬度和高度
	videoElement.style.width = `${newWidth}px`;
	videoElement.style.height = `${newHeight}px`;
}

/**
 * 說明: 檢查所有視頻是否已經加載完成
 * callback: 回調函數
 * @param {*} callback
 * @returns
 * checkAllVideosLoaded(function(isLoaded) {})
 */
export function checkAllVideosLoaded(callback) {
	var videos = document.querySelectorAll("video");
	var videosCount = videos.length;
	var loadedCount = 0;

	if (videosCount === 0) {
		console.warn("No video elements found");
		callback(true); // 沒有視頻元素，認為已經加載完成
		return;
	}

	function onVideoLoaded() {
		loadedCount++;
		if (loadedCount === videosCount) {
			callback(true); // 所有視頻元素已經加載完成
		}
	}

	videos.forEach(function (video) {
		if (video.readyState >= 2) {
			// 如果視頻已經加載
			onVideoLoaded();
		} else {
			// 為尚未加載的視頻添加事件監聽器
			video.addEventListener("loadeddata", onVideoLoaded);
		}
	});
}

/**
 * 說明: 檢查視頻是否已經播放完畢
 * videoElement: 視頻元素
 * callback: 回調函數
 * detectVideoEnd($(".layer-page video")[0],function(){
 *    console.log("Video ended");
 * })
 */
export function detectVideoEnd(videoElement, callback) {
	if (!videoElement) {
		console.warn("Video element not found");
		return;
	}

	videoElement.addEventListener("ended", function () {
		callback();
	});
}

/**
 * 說明: 檢查網址的hash值是否符合目標hash值
 * targetHash: 目標hash值
 * @param {*} targetHash
 * @returns
 */
export function checkHash(targetHash) {
	var hash = window.location.hash;

	if (hash === targetHash || hash === "") {
		return true;
	} else {
		return false;
	}
}
/**
 * 說明：獲取網址的hash值
 * @param {string} hash
 */
export function getHash() {
	var hash = window.location.hash;

	if (hash) {
		return hash;
	} else {
		return "";
	}
}

// 說明: 獲取網址參數
// 傳入key值，回傳對應的value，並轉小寫
export function getUrlSearchParams(params) {
	let param = new URL(location.href).searchParams.get(params.toLowerCase());
	if (param) {
		let lan_param = param.toLowerCase();
		return lan_param;
	} else {
		return false;
	}
}

export function getUrlParam(param) {
	let url = window.location.href;
	// 創建一個URL對象
	const urlObject = new URL(url);

	// 首先檢查常規查詢參數
	const queryParam = urlObject.searchParams.get(param);
	if (queryParam !== null) {
		return queryParam;
	}

	// 如果在常規查詢參數中沒有找到，檢查hash部分
	const hashPart = urlObject.hash.slice(1); // 移除開頭的 '#'

	// 檢查hash是否包含查詢參數
	const queryIndex = hashPart.indexOf("?");
	if (queryIndex !== -1) {
		const hashQuery = hashPart.slice(queryIndex + 1);
		const hashParams = new URLSearchParams(hashQuery);
		return hashParams.get(param);
	}

	// 如果都沒有找到，返回null
	return null;
}

// 取得影片資訊
export const getVideoMetadata = (url, data) => {
	return new Promise((resolve) => {
		const video = document.createElement("video");
		video.onloadedmetadata = () => {
			data.videoWidth = video.videoWidth;
			data.videoHeight = video.videoHeight;
		};
		video.oncanplaythrough = () => {
			resolve(url);
		};
		video.src = url;
	});
};

export class VideoController {
	constructor(videoElement) {
		if (!(videoElement instanceof HTMLVideoElement)) {
			throw new Error("必須提供有效的視頻元素");
		}
		this.video = videoElement;
		this.callbacks = {
			play: [],
			pause: [],
			complete: [],
			end: [],
		};
		this.initEventListeners();
	}

	initEventListeners() {
		this.video.addEventListener("play", () => {
			this.callbacks.play.forEach((callback) => callback());
		});

		this.video.addEventListener("pause", () => {
			this.callbacks.pause.forEach((callback) => callback());
		});

		this.video.addEventListener("ended", () => {
			this.callbacks.complete.forEach((callback) => callback());
			this.callbacks.end.forEach((callback) => callback());
		});
	}

	play() {
		if (this.video.readyState >= 2) {
			this.video.play();
		} else {
			this.video.addEventListener(
				"canplay",
				() => {
					this.video.play();
				},
				{ once: true }
			);
		}
	}

	pause() {
		this.video.pause();
	}

	onPlay(callback) {
		if (typeof callback === "function") {
			this.callbacks.play.push(callback);
		}
	}

	onPause(callback) {
		if (typeof callback === "function") {
			this.callbacks.pause.push(callback);
		}
	}

	onComplete(callback) {
		if (typeof callback === "function") {
			this.callbacks.complete.push(callback);
		}
	}

	onEnd(callback) {
		if (typeof callback === "function") {
			this.callbacks.end.push(callback);
		}
	}
}

export class AlphaVideoPlayer {
	static DEFAULT_CONFIG = {
		width: 1200,
		height: 600,
		fps: 60,
		preloadTime: 0.5,
		transitionTime: 0.1,
		loop: false,
		muted: true,
		crossOrigin: "anonymous",
	};

	constructor(videoConfigs, options = {}) {
		this.options = { ...AlphaVideoPlayer.DEFAULT_CONFIG, ...options };

		// 初始化畫布
		this.canvas = document.querySelector(this.options.el);
		this.canvas.width = this.options.width;
		this.canvas.height = this.options.height;
		this.ctx = this.canvas.getContext("2d");

		// 初始化狀態
		this.videos = [];
		this.currentIndex = 0;
		this.isTransitioning = false;
		this.currentInterval = null;
		this.isPlaying = false;

		this.initializeVideos(videoConfigs);
	}

	initializeVideos(videoConfigs) {
		videoConfigs.forEach((config, index) => {
			// 合併默認配置和用戶配置
			const videoConfig = {
				preloadTime: this.options.preloadTime,
				transitionTime: this.options.transitionTime,
				loop: this.options.loop,
				transitionTo: index + 1,
				...config,
			};

			const video = document.createElement("video");
			video.width = this.options.width;
			video.height = this.options.height;
			video.crossOrigin = this.options.crossOrigin;
			video.muted = this.options.muted;
			video.style.display = "none";
			const source = document.createElement("source");
			source.src = config.src;
			source.type = "video/mp4";

			video.appendChild(source);
			document.body.appendChild(video);

			this.videos.push({
				element: video,
				...videoConfig,
			});
		});
	}

	drawAlphaVideo(video) {
		const { width, height } = this.options;
		this.ctx.clearRect(0, 0, width, height);

		// Original video part
		this.ctx.drawImage(video, 0, 0, width, height, 0, 0, width, height);

		// Alpha channel part
		const alphaCanvas = document.createElement("canvas");
		alphaCanvas.width = width;
		alphaCanvas.height = height;
		const alphaCtx = alphaCanvas.getContext("2d");
		alphaCtx.drawImage(video, 0, height, width, height, 0, 0, width, height);

		const originalFrame = this.ctx.getImageData(0, 0, width, height);
		const alphaFrame = alphaCtx.getImageData(0, 0, width, height);
		const originalData = originalFrame.data;
		const alphaData = alphaFrame.data;

		for (let i = 0; i < originalData.length; i += 4) {
			originalData[i + 3] = alphaData[i];
		}

		this.ctx.putImageData(originalFrame, 0, 0);
	}

	preloadVideos(callback) {
		let loadedCount = 0;
		this.videos.forEach(({ element }) => {
			element.load();
			element.oncanplaythrough = () => {
				loadedCount++;
				if (loadedCount === this.videos.length) {
					callback();
				}
			};
		});
	}

	playVideo(index) {
		if (index >= this.videos.length) {
			index = 0;
		}

		const currentVideo = this.videos[index];
		const video = currentVideo.element;
		const nextIndex = currentVideo.transitionTo;

		if (this.currentInterval) {
			clearInterval(this.currentInterval);
		}

		this.isPlaying = true;
		video.play();

		this.currentInterval = setInterval(() => {
			if (!video.paused && !video.ended && this.isPlaying) {
				this.drawAlphaVideo(video);

				// Prepare next video
				if (!this.isTransitioning && !currentVideo.loop && video.currentTime >= video.duration - currentVideo.preloadTime) {
					this.isTransitioning = true;

					// 檢查是否有下一個視頻
					if (this.videos[nextIndex]) {
						const nextVideo = this.videos[nextIndex].element;
						nextVideo.currentTime = 0;
						nextVideo.play().then(() => nextVideo.pause());
					}
				}

				// Transition to next video
				if (!currentVideo.loop && video.currentTime >= video.duration - currentVideo.transitionTime) {
					this.isTransitioning = false;
					this.currentIndex = nextIndex;

					// 檢查是否有下一個視頻
					if (this.videos[nextIndex]) {
						this.playVideo(nextIndex);
					} else {
						this.stop();
					}
				}
			}

			// Handle loop
			if (video.ended && currentVideo.loop) {
				video.currentTime = 0;
				video.play();
			}
		}, 1000 / this.options.fps);
	}

	start() {
		return new Promise((resolve) => {
			this.preloadVideos(() => {
				this.videos[0].element.currentTime = 0;
				this.playVideo(0);
				resolve(); // 當視頻開始播放時解析 Promise
			});
		});
	}

	pause() {
		this.isPlaying = false;
		this.videos[this.currentIndex].element.pause();
	}

	resume() {
		if (!this.isPlaying) {
			this.isPlaying = true;
			this.videos[this.currentIndex].element.play();
		}
	}

	stop() {
		this.isPlaying = false;
		if (this.currentInterval) {
			clearInterval(this.currentInterval);
		}
		this.videos.forEach(({ element }) => {
			element.pause();
			element.currentTime = 0;
		});
	}
}
