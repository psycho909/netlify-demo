function drawShare(shareList, diceCnt) {
	var device = isMobile.any ? "mb" : "pc";
	var s = isMobile.any ? window.innerWidth / 768 : 1;
	var timer;
	var stop = false;
	var box = isMobile.any ? 125 * s : 157;
	var fz = isMobile.any ? 28 * s : 18;
	var paddingTop = isMobile.any ? 14 * s : 16;
	var itemMaxWidth = isMobile.any ? 81 * s : 100;
	var bgW = isMobile.any ? 718 * s : 898;
	var bgH = isMobile.any ? 922 * s : 913;
	// var lockW = isMobile.any ? 22 * s : 27;
	// var lockH = isMobile.any ? 30 * s : 38;
	var timesBgW = 193 * s;
	var timesBgH = 136 * s;
	var diceBgW = 200 * s;
	var diceBgH = 284 * s;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = isMobile.any ? 718 * s : 898;
	canvas.height = isMobile.any ? (922 + paddingTop) * s : 913 + paddingTop;
	var width = canvas.width;
	var height = canvas.height;
	var imgPath = "https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E20210311/images/";
	// var imgPath="./images/"
	// var imgPath = "https://alpha-tw.beanfun.com/3KO/removable/pchome/images/";
	// var lockXY = {
	// 	pc: [
	// 		[52, 163],
	// 		[716, 163],
	// 		[52, 420],
	// 		[716, 420],
	// 		[52, 678],
	// 		[716, 678],
	// 	],
	// 	mb: [
	// 		[s * 45, s * 160 + paddingTop],
	// 		[s * 575, s * 160 + paddingTop],
	// 		[s * 45, s * 395 + paddingTop],
	// 		[s * 575, s * 395 + paddingTop],
	// 		[s * 45, s * 638 + paddingTop],
	// 		[s * 575, s * 638 + paddingTop],
	// 	],
	// };
	var itemXY = {
		pc: [
			[76, 182],
			[736, 182],
			[736, 447],
			[736, 708],
			[76, 708],
			[76, 447],
		],
		mb: [
			[s * 56, s * 182 + paddingTop],
			[s * 586, s * 182 + paddingTop],
			[s * 586, s * 420 + paddingTop],
			[s * 586, s * 660 + paddingTop],
			[s * 56, s * 660 + paddingTop],
			[s * 56, s * 420 + paddingTop],
		],
	};
	var textXY = {
		pc: [
			[120, 346],
			[784, 346],
			[784, 605],
			[784, 865],
			[120, 865],
			[120, 605],
		],
		mb: [
			[s * 93, s * 310 + paddingTop],
			[s * 623, s * 310 + paddingTop],
			[s * 623, s * 545 + paddingTop],
			[s * 623, s * 788 + paddingTop],
			[s * 93, s * 788 + paddingTop],
			[s * 93, s * 545 + paddingTop],
		],
	};
	// var lockGroup = [];
	var itemGroup = [];
	var textGroup = [];

	shareList.forEach(function (v, i) {
		var lockImg = v.flag != 0 ? imgPath + "btn-lock-on.png" : imgPath + "btn-lock-off.png";
		var itemName = "";
		if (v.name == null) {
			itemName = "";
		} else {
			itemName = v.name;
		}
		// lockGroup.push(new drawImage(ctx, lockImg, lockXY[device][i][0], lockXY[device][i][1], lockW, lockH));
		itemGroup.push(new drawImage(ctx, imgPath + v.img, itemXY[device][i][0], itemXY[device][i][1]));
		textGroup.push(new drawText(ctx, itemName, textXY[device][i][0], textXY[device][i][1]));
	});

	if (device == "mb") {
		var bg = new drawImage(ctx, imgPath + "m-lb-sh_are-bg.png", 0, 0 + paddingTop, bgW, bgH);
		var timesBg = new drawImage(ctx, imgPath + "m-lb-times-bg.png", s * 0, s * 0, timesBgW, timesBgH);
		var timesNum = new drawText(ctx, diceCnt, s * 93, s * 90, "#fff", 30 * s);
		var diceBg = new drawImage(ctx, imgPath + "dice1.png", s * 260, s * 520, diceBgW, diceBgH);
	} else {
		var bg = new drawImage(ctx, imgPath + "lb-sh_are-bg.png", 0, 0 + paddingTop, bgW, bgH);
		var timesBg = new drawImage(ctx, imgPath + "lb-times-bg.png", 0, 0, timesBgW, timesBgH);
		var timesNum = new drawText(ctx, diceCnt, 93, 95, "#fff", 25);
		var diceBg = new drawImage(ctx, imgPath + "dice1.png", 350, 540, diceBgW, diceBgH);
	}

	function drawImage(target, name, x, y, w, h) {
		this.image = new Image();
		// this.image.setAttribute("crossOrigin", "anonymous");
		this.image.src = name + "?tamp=" + new Date().valueOf();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.target = target;
		this.update = function () {
			if (this.w) {
				this.target.drawImage(this.image, this.x, this.y, this.w, this.h);
			} else {
				var itemW = this.image.naturalWidth;
				var itemH = this.image.naturalHeight;
				if (itemW > itemMaxWidth) {
					this.target.drawImage(this.image, this.x, this.y, (itemMaxWidth / itemW) * itemW, (itemMaxWidth / itemH) * itemH);
				} else {
					if (device == "mb") {
						this.target.drawImage(this.image, this.x, this.y, itemW * s, itemH * s);
					} else {
						this.target.drawImage(this.image, this.x, this.y, itemW, itemH);
					}
				}
			}
		};
	}

	function drawText(target, text, x, y, color, f) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.target = target;
		this.color = color;
		this.f = f;
		this.update = function () {
			var totalSize = this.target.measureText(this.text).width;
			var line = "";
			if (this.color) {
				this.target.font = "bold " + this.f + "px 微軟正黑體";
				this.target.fillStyle = this.color;
			}
			if (totalSize > box) {
				var t = Math.floor(box / fz);
				var len = Math.ceil(this.text.length / t);
				for (var i = 0; i < len; i++) {
					line = this.text.substr(t * i, t);
					this.target.fillText(line, this.x, this.y + i * fz);
				}
			} else {
				this.target.fillText(this.text, this.x, this.y);
			}
		};
	}

	this.draw = function () {
		ctx.clearRect(0, 0, width, height);
		ctx.font = fz + "px 微軟正黑體";
		ctx.fillStyle = "#5ed0ff";
		ctx.textAlign = "center";
		bg.update();

		for (var i = 0; i < 6; i++) {
			// lockGroup[i].update();
			itemGroup[i].update();
			textGroup[i].update();
		}
		timesBg.update();
		timesNum.update();
		diceBg.update();
		var _this = this;
		if (stop) {
			ctx.clearRect(0, 0, width, height);
			clearTimeout(timer);
		} else {
			timer = setTimeout(function () {
				_this.draw();
			}, 1000 / 60);
		}
	};
	this.stopDraw = function () {
		stop = true;
	};
}
