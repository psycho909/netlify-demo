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

export function createLeafAnimation(options = {}) {
	// 預設配置
	const config = {
		objCnt: 20,
		dx: 0,
		dy: 0.3,
		dispersion: 2,
		swingX: 1.2,
		swingY: 0,
		cycleX: 1,
		cycleY: 1,
		imgBaseSizeW: 96,
		imgBaseSizeH: 96,
		scaleMax: 1,
		scaleMin: 0.5,
		rootImg: "https://lwi.nexon.com/maplestory/2024/1121_demonSlayer_7473AA30E74CE34A/exception/",
		imgSrc: ["leaf_1.png", "leaf_2.png"],
		accelerate: 100,
		alpha: 0,
		rotate: 1,
		canvasWidth: 1920,
		canvasHeight: 1036,
	};

	// 合併用戶配置
	Object.assign(config, options);

	// 內部狀態變量
	let canvas,
		ctx,
		images = [],
		particles = [],
		imagesLoaded = 0;
	let currentDx = config.dx,
		currentDy = config.dy;
	let currentSwingX = config.swingX,
		currentSwingY = config.swingY;
	let currentCycleX = config.cycleX,
		currentCycleY = config.cycleY;
	let rotationValues = [];

	// 初始化函數
	function initialize(canvasElement) {
		canvas = canvasElement;
		ctx = canvas.getContext("2d");
		canvas.width = config.canvasWidth;
		canvas.height = config.canvasHeight;

		// 加載圖片
		config.imgSrc.forEach((src, index) => {
			const img = new Image();
			img.src = config.rootImg + src;
			img.onload = () => {
				images[index] = img;
				imagesLoaded++;
				if (imagesLoaded === config.imgSrc.length) {
					createParticles();
				}
			};
		});
	}

	// 創建粒子
	function createParticles() {
		particles = Array.from({ length: config.objCnt }, () => {
			const scale = Math.ceil(100 * (Math.random() * (config.scaleMax - config.scaleMin) + config.scaleMin)) / 100;
			const imageIndex = Math.floor(Math.random() * config.imgSrc.length);

			return {
				posx: Math.round(Math.random() * config.canvasWidth),
				posy: Math.round(Math.random() * config.canvasHeight * 2),
				anglex: Math.ceil(Math.random() * config.dispersion),
				angley: Math.ceil(Math.random() * config.dispersion),
				sizew: config.imgBaseSizeW * scale,
				sizeh: config.imgBaseSizeH * scale,
				speed: scale,
				deg: Math.floor(360 * Math.random()),
				deg2: Math.floor(20 * Math.random()),
				img: images[imageIndex],
			};
		});

		startAnimation();
	}

	// 平滑更新值
	function smoothUpdateValue(current, target) {
		const change = (Math.abs(current - target) / 100) * config.accelerate;
		const newValue = current - target < 0 ? current + change : current - change;
		return Math.round(1000 * newValue) / 1000;
	}

	// 更新動畫參數
	function updateAnimationParameters() {
		const parameters = [
			{ current: "currentDx", target: "dx" },
			{ current: "currentDy", target: "dy" },
			{ current: "currentSwingX", target: "swingX" },
			{ current: "currentSwingY", target: "swingY" },
			{ current: "currentCycleX", target: "cycleX" },
			{ current: "currentCycleY", target: "cycleY" },
		];

		parameters.forEach((param) => {
			if (eval(param.current) !== config[param.target]) {
				eval(`${param.current} = smoothUpdateValue(${param.current}, config.${param.target})`);
			}
		});
	}

	// 動畫循環
	function animate() {
		ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
		updateAnimationParameters();

		particles.forEach((particle, index) => {
			ctx.save();

			// 更新粒子角度和位置
			particle.deg = particle.deg >= 360 ? 0 : particle.deg + 0.5;
			updateParticlePosition(particle);

			// 透明度設置
			if (config.alpha === 1) {
				ctx.globalAlpha = particle.speed;
			}

			// 邊界檢查
			handleBoundaries(particle);

			// 粒子旋轉
			if (config.rotate === 1) {
				rotateParticle(index, particle);
			}

			// 繪製粒子
			ctx.drawImage(particle.img, particle.posx, particle.posy, particle.sizew, particle.sizeh);

			ctx.restore();
		});

		window.requestAnimationFrame(animate);
	}

	// 更新粒子位置
	function updateParticlePosition(particle) {
		particle.posx += particle.speed * currentDx * particle.anglex + Math.sin((Math.PI / 180) * particle.deg * config.cycleX) * particle.speed * currentSwingX;

		particle.posy += particle.speed * currentDy * particle.angley + Math.sin((Math.PI / 180) * particle.deg * config.cycleY) * particle.speed * currentSwingY;
	}

	// 處理粒子邊界
	function handleBoundaries(particle) {
		const boundaryChecks = [
			{
				condition: currentDx > 0 && particle.posx > config.canvasWidth + config.imgBaseSizeW,
				resetX: 0 - config.imgBaseSizeW,
				resetY: Math.round(Math.random() * config.canvasHeight),
			},
			{
				condition: currentDx < 0 && particle.posx < 0 - config.imgBaseSizeW,
				resetX: config.canvasWidth + config.imgBaseSizeW,
				resetY: Math.round(Math.random() * config.canvasHeight),
			},
			{
				condition: currentDy > 0 && particle.posy > config.canvasHeight + config.imgBaseSizeH,
				resetY: 0 - config.imgBaseSizeH,
				resetX: Math.round(Math.random() * config.canvasWidth),
			},
			{
				condition: currentDy < 0 && particle.posy < 0 - config.imgBaseSizeH,
				resetY: config.canvasHeight + config.imgBaseSizeH,
				resetX: Math.round(Math.random() * config.canvasWidth),
			},
		];

		boundaryChecks.forEach((check) => {
			if (check.condition) {
				particle.posx = check.resetX !== undefined ? check.resetX : particle.posx;
				particle.posy = check.resetY !== undefined ? check.resetY : particle.posy;
			}
		});
	}

	// 旋轉粒子
	function rotateParticle(index, particle) {
		particle.deg2 = particle.deg2 <= 0 ? 360 : particle.deg2 - 0.01;
		rotationValues[index] = Math.floor(100 * Math.sin(particle.deg2)) / 100;

		const centerX = particle.posx + particle.sizew / 2;
		const centerY = particle.posy + particle.sizew / 2;

		ctx.translate(centerX, centerY);
		ctx.rotate((30 * rotationValues[index] * Math.PI) / 180);
		ctx.translate(-centerX, -centerY);
	}

	// 開始動畫
	function startAnimation() {
		animate();
	}

	// 返回初始化函數，供外部調用
	return initialize;
}
export function scale() {
	// 獲取要縮放的元素
	const scaleElement = document.getElementById("scale");

	// 獲取當前視窗寬度
	const windowWidth = document.documentElement.clientWidth;

	// 計算縮放比例（基於2560px的寬度）
	const scaleFactor = windowWidth / 2560;

	// 獲取文檔根元素的最小寬度
	const rootElement = document.documentElement;
	const rootStyles = window.getComputedStyle(rootElement);
	const minWidth = parseFloat(rootStyles.getPropertyValue("min-width"));

	// 根據條件應用縮放
	if (windowWidth <= 2560) {
		// 當視窗寬度小於等於2560px時，按比例縮放
		scaleElement.style.transform = `scale(${scaleFactor})`;
	} else if (windowWidth > 2560 && windowWidth > minWidth) {
		// 當視窗寬度大於2560px且大於最小寬度時，不縮放（比例為1）
		scaleElement.style.transform = "scale(1)";
	}
	// 隱含的else：如果窗口寬度小於等於最小寬度，不做任何處理
}
// 使用範例
// const initLeafAnimation = createLeafAnimation({
//     objCnt: 30,  // 自定義粒子數量
//     imgSrc: ['custom_leaf1.png', 'custom_leaf2.png']  // 自定義圖片
// });
//
// const canvas = document.getElementsByClassName("particle")[0];
// initLeafAnimation(canvas);
export function ZoomAdapter({ baseWidth = 1920, elementSelector = "body", debounceDelay = 100 } = {}) {
	function adjustZoom() {
		// 獲取要縮放的元素
		const scaleElement = document.querySelector(elementSelector);

		// 獲取當前視窗寬度
		const windowWidth = document.documentElement.clientWidth;

		// 計算縮放比例（基於baseWidth的寬度）
		const scaleFactor = windowWidth / baseWidth;

		// 獲取文檔根元素的最小寬度
		const rootElement = document.documentElement;
		const rootStyles = window.getComputedStyle(rootElement);
		const minWidth = parseFloat(rootStyles.getPropertyValue("min-width"));

		// 根據條件應用縮放
		if (windowWidth <= baseWidth) {
			// 當視窗寬度小於等於baseWidth時，按比例縮放
			// scaleElement.style.transform = `scale(${scaleFactor})`;
			scaleElement.style.zoom = scaleFactor;
		} else if (windowWidth > baseWidth && windowWidth > minWidth) {
			// 當視窗寬度大於baseWidth且大於最小寬度時，不縮放（比例為1）
			// scaleElement.style.transform = "scale(1)";
			scaleElement.style.zoom = 1;
		}
		// 隱含的else：如果窗口寬度小於等於最小寬度，不做任何處理
	}

	function debounce(func, delay) {
		let timeout;
		return () => {
			clearTimeout(timeout);
			timeout = setTimeout(func, delay);
		};
	}

	// 初始化縮放
	adjustZoom();

	// 監聽視窗大小變化
	window.addEventListener(
		"resize",
		debounce(() => adjustZoom(), debounceDelay)
	);
}
