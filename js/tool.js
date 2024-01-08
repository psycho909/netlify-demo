// Loading顯示
export function loadingShow() {
	$("body").addClass("ov-hidden");
	$("#loadingProgress").show();
}
// Loading隱藏
export function loadingHide() {
	$("body").removeClass("ov-hidden");
	$("#loadingProgress").hide();
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

// 增加資料到 sessionStorage
export function addToSessionStorage(key, value) {
	sessionStorage.setItem(key, value);
}

// 從 sessionStorage 讀取資料
export function readFromSessionStorage(key) {
	return sessionStorage.getItem(key);
}

// 從 sessionStorage 刪除資料
export function removeFromSessionStorage(key) {
	sessionStorage.removeItem(key);
}
export function CanvasSprite(target, step, speed) {
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
	$(this.el.canvas).addClass("loading");
};
CanvasSprite.prototype.PreLoad = function (path, name = "") {
	var count = 0;
	var _this = this;
	return new Promise((resolve, reject) => {
		for (var i = 0; i < this.step; i++) {
			// Calculate the current index for the image
			let currentIndex = parseInt(name, 10) + i;
			// Convert the new index back to a string, preserving leading zeros
			let newName = currentIndex.toString().padStart(name.length, "0");
			this.imgArr[i] = new Image();
			this.imgArr[i].src = path + newName + ".png";
			this.imgArr[i].onload = function () {
				_this.width = this.width;
				_this.height = this.height;
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					_this.Draw(0);
					resolve(true);
				}
			};
			this.imgArr[i].onerror = function () {
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					reject(true);
				}
			};
		}
	});
};
CanvasSprite.prototype.Run = function (callback) {
	clearInterval(this.loop);
	var _this = this;
	this.loop = setInterval(function () {
		if (_this.index > _this.step - 1) {
			_this.index = 0;
			clearInterval(_this.loop);
			if (callback) {
				callback();
			}
		}
		_this.Draw(_this.index);

		_this.index++;
	}, this.speed);
};
CanvasSprite.prototype.Loop = function (speedMultiplier = 0.5) {
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

// CanvasSprite.prototype.Loop = function () {
// 	cancelAnimationFrame(this.animationFrame);
// 	const _this = this;
// 	let then = performance.now();
// 	let fpsInterval = 1000 / this.speed;

// 	function animate(now) {
// 		_this.animationFrame = requestAnimationFrame(animate);

// 		const elapsed = now - then;

// 		if (elapsed > fpsInterval) {
// 			then = now - (elapsed % fpsInterval);

// 			_this.Draw(_this.index);
// 			_this.index = (_this.index + 1) % _this.step;
// 		}
// 	}

// 	animate(performance.now());
// };
CanvasSprite.prototype.Stop = function () {
	this.index = 0;
	clearInterval(this.loop);
	this.Draw(this.index);
};
CanvasSprite.prototype.Draw = function (index) {
	this.el.clearRect(0, 0, this.width, this.height);
	if (this.imgArr[index].complete) {
		this.el.drawImage(this.imgArr[index], 0, 0);
	}
};
