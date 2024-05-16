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
CanvasSprite.prototype.PreLoad = function (path, name = "", fn) {
	var count = 0;
	var _this = this;
	return new Promise((resolve, reject) => {
		function generateFilenames(step, ...formats) {
			let filenames = [];

			formats.forEach((format) => {
				if (typeof format === "number") {
					// 处理数字格式
					for (let i = 0; i < step; i++) {
						filenames.push(format + i + ".png");
					}
				} else if (typeof format === "string") {
					// 处理字符串格式，包括带有前导零的情况
					const match = format.match(/([a-z_]+)(0*)(\d*)/i);
					const prefix = match[1];
					const leadingZeros = match[2];
					const startIndex = parseInt(match[3], 10) || 0;
					for (let i = 0; i < step; i++) {
						const numberPart = (startIndex + i).toString();
						const paddedNumber = leadingZeros.slice(numberPart.length) + numberPart;
						filenames.push(`${prefix}${paddedNumber}.png`);
					}
				}
			});

			return filenames;
		}
		generateFilenames(this.step, name).forEach((filename, i) => {
			this.imgArr[i] = new Image();
			this.imgArr[i].src = path + filename;
		});
		for (var i = 0; i < this.step; i++) {
			this.imgArr[i].onload = function () {
				_this.width = this.width;
				_this.height = this.height;
				if (fn && typeof fn.onProgress === "function") {
					fn.onProgress(count, _this.step);
				}
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					resolve(true);
					_this.Draw(0);
				}
			};
			this.imgArr[i].onerror = function () {
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
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
CanvasSprite.prototype.Loop = function () {
	clearInterval(this.loop);
	this.loop = setInterval(() => {
		if (this.index > this.step - 1) {
			this.index = 0;
		}
		this.Draw(this.index);

		this.index++;
	}, this.speed);
};
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
