// Loading顯示
export function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
export function loadingHide() {
	$("#loadingProgress").hide();
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

export function CanvasSprite(target, step, frameWidth, frameHeight, speed) {
	this.frameWidth = frameWidth || 800; // 預設值為 800，如果未提供則使用預設值
	this.frameHeight = frameHeight || 800; // 預設值為 800，如果未提供則使用預設值
	this.imgArr = [];
	this.index = 0;
	this.loop = false;
	this.target = target;
	this.el = null;
	this.step = step;
	this.width = 0;
	this.height = 0;
	this.speed = speed || step / 2;
	this.Init();
}
CanvasSprite.prototype.Init = function () {
	this.el = this.target[0].getContext("2d");
	this.el.imageSmoothingEnabled = false;
	$(this.el.canvas).addClass("loading");
};
CanvasSprite.prototype.PreLoad = function (spriteImagePath) {
	var _this = this;
	return new Promise((resolve, reject) => {
		this.imgArr[0] = new Image();
		this.imgArr[0].src = spriteImagePath;
		this.imgArr[0].onload = function () {
			_this.width = this.width;
			_this.height = this.height / _this.step; // 確保高度是單個動畫幀的高度
			$(_this.el.canvas).removeClass("loading");
			_this.Draw(0);
			resolve(true);
		};
		this.imgArr[0].onerror = function () {
			$(_this.el.canvas).removeClass("loading");
			reject(true);
		};
	});
};
CanvasSprite.prototype.Run = function (durationInSeconds = 1) {
	clearInterval(this.loop);
	const _this = this;
	let startTime = performance.now();
	let stepInterval = (durationInSeconds * 1000) / this.step;

	return new Promise((resolve, reject) => {
		function runAnimation(now) {
			const elapsed = now - startTime;

			if (elapsed > stepInterval * _this.index) {
				_this.Draw(_this.index);
				_this.index++;
			}

			if (_this.index < _this.step) {
				requestAnimationFrame(runAnimation);
			} else {
				_this.index = 0;
				resolve(); // 當動畫完成時解決 Promise
			}
		}
		requestAnimationFrame(runAnimation);
	});
};

CanvasSprite.prototype.Loop = function (speedMultiplier = 1.5) {
	cancelAnimationFrame(this.animationFrame);
	const _this = this;
	let then = performance.now();
	// 根據速度乘數調整 fpsInterval
	let fpsInterval = 1000 / this.speed / speedMultiplier;

	function animate(now) {
		_this.animationFrame = requestAnimationFrame(animate);

		const elapsed = now - then;

		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);

			_this.Draw(_this.index);
			_this.index = (_this.index + 1) % _this.step;
		}
	}

	animate(performance.now());
};
CanvasSprite.prototype.Stop = function () {
	this.index = 0;
	cancelAnimationFrame(this.animationFrame); // 取消動畫幀請求
	this.Draw(this.index); // 繪製第一幀（或任何應該顯示的幀）
};

CanvasSprite.prototype.Draw = function (index) {
	// 清除整個 canvas
	this.el.clearRect(0, 0, this.el.canvas.width, this.el.canvas.height);

	let xPos = this.frameWidth * index; // 使用對象屬性來計算當前幀的 x 軸位置
	// 從 sprite 圖片中提取正確的部分來顯示
	this.el.drawImage(this.imgArr[0], xPos, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
};
export function getAndRemoveQueryStringInsensitive(key) {
	// 假設當前URL是 https://example.com/login/callback?{key}=value
	// 首先，創建一個URL對象
	const currentUrl = new URL(window.location.href);

	// 使用URLSearchParams獲取查詢參數
	const searchParams = new URLSearchParams(currentUrl.searchParams);
	const normalizedKey = key.toLowerCase();
	let keyValue = null;

	// 遍歷所有查詢參數，無視大小寫進行匹配
	for (const [paramKey, paramValue] of searchParams) {
		if (paramKey.toLowerCase() === normalizedKey) {
			keyValue = paramValue;
			searchParams.delete(paramKey); // 刪除匹配到的參數
			break; // 假設每個鍵在URL中只出現一次
		}
	}

	// 更新瀏覽器的URL，但不重新加載頁面
	// 由於原始的searchParams已經被修改，所以這裡直接更新search部分
	currentUrl.search = searchParams.toString();
	window.history.pushState({}, "", currentUrl);

	// 返回該鍵的值
	return keyValue;
}

export function isValidString(input) {
	// 正則表達式匹配特殊符號、空格、注音符號、全形英文字符和數字
	// 特殊符號範圍根據需求可自行調整
	// 注音符號範圍為 \u3105-\u312F，全形英文範圍為 \uFF21-\uFF3A (大寫) 和 \uFF41-\uFF5A (小寫)，數字範圍為 0-9
	const forbiddenPattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\u3105-\u312F\uFF21-\uFF3A\uFF41-\uFF5A\d]+/;

	return !forbiddenPattern.test(input);
}
