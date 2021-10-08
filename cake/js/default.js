const LIMIT = 30;
var decoCount = 0;
const MAX_SCALE = 1.25;
const MIN_SCALE = 0.75;
let dropTarget;
let loading = {
	show: function () {
		$("#loadingProgress").show();
	},
	hide: function () {
		$("#loadingProgress").hide();
	},
};
// loadingProgress({
// 	loadedFN: function () {
// 		GetAccount();
// 	},
// 	autoHide: false,
// });
function createCookie(name, value, days) {
	var expires = "";
	var date = new Date();
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		var expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function EventGuide() {
	var step = 0;
	$(".step-box").addClass("show");
	$(".step").eq(step).addClass("show").siblings().removeClass("show");
	$(".step-next").on("click", function () {
		step += 1;
		if (step > 2) {
			$(".step-box").removeClass("show");
			GuideEnd();
			return;
		}
		$(".step").eq(step).addClass("show").siblings().removeClass("show");
	});
}
// 說明介紹
if (!readCookie("kr20211008")) {
	EventGuide();
	createCookie("kr20211008", 1);
}

// 選單切換
$(".menu-toggle").on("click", function () {
	$(".menu-list").toggle();
	if (trr) {
		trr.destroy();
	}
});

$(".menu-list__btn").on("click", function () {
	var _event = $(this).attr("data-btn");
	switch (_event) {
		case "qa":
			EventInfo();
			break;
		case "screenshot":
			ScreenShot(getDataUrl(), "一二三四五");
			break;
		case "reward":
			if (FindDecoSize() == LIMIT) {
				CakeMakeCheck();
			} else {
				CakeMakeError();
			}
			break;
		case "save":
			CakeSaveComplete();
			// getAllData();
			break;
		case "reset":
			CakeResetCheck();
			break;
	}
	$(".menu-list").toggle();
});
// 滾動條樣式
$(".decoration-content__cakes-box").mCustomScrollbar({
	setLeft: 0,
	axis: "x",
	theme: "dark",
	contentTouchScroll: true,
	advanced: { extraDraggableSelectors: ".decoration-content__cakes-box" },
});

// 裝飾區切換
$(".decoration-tab").on("click", function () {
	var tab = $(this).attr("data-tab");
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".decoration-content[data-content=" + tab + "]")
		.addClass("curr")
		.siblings()
		.removeClass("curr");
	if (tab == "cake") {
		$(".decoration-content__cakes-box").mCustomScrollbar("destroy");
		$(".decoration-content__cakes-box").mCustomScrollbar({
			setLeft: 0,
			axis: "x",
			theme: "dark",
			contentTouchScroll: true,
			advanced: { extraDraggableSelectors: ".decoration-content__cakes-box" },
		});
	} else {
		$(".decoration-content__decos-box").mCustomScrollbar("destroy");
		$(".decoration-content__decos-box").mCustomScrollbar({
			setLeft: 0,
			axis: "x",
			theme: "dark",
			contentTouchScroll: true,
			advanced: { extraDraggableSelectors: ".decoration-content__decos-box" },
		});
	}
});

// 蛋糕體
$(".decoration-content__cake").on("click", function () {
	var attrs = {};
	var id = $(this).find("span").attr("data-id");
	var rgb = $(this).find("span").attr("data-rgb");
	var src = $(this).find("span").attr("data-src");
	attrs.id = id;
	if (rgb) {
		attrs.RGB = JSON.parse(rgb);
	}
	attrs.src = src;
	$(this).addClass("on");
	$(".decoration-content__cake").not($(this)).removeClass("on");
	cakeStyle(attrs);
});

// 蛋糕canvas
var scale = window.innerWidth > 768 ? 1 : window.innerWidth / 768;
var canvasWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
var canvasHeight = window.innerWidth > 768 ? 604 : 604 * scale;
// 預載load圖片
var imgs = ["./images/static/cream.png", "./images/cake/firework.png", "./images/cake/grid.png", "./images/cake/marble.png", "./images/cake/rock.png", "./images/cake/sea.png", "./images/cake/white.png", "./images/cake/wood1.png", "./images/cake/wood2.png", "./images/deco/banana1.png", "./images/deco/bean.png", "./images/deco/blue.png", "./images/deco/bow.png", "./images/deco/candle0.png", "./images/deco/candle1.png", "./images/deco/candle11.png", "./images/deco/red.png", "./images/deco/yellow.png", "./images/static/dish.png", "./images/static/remove-icon.png"];
function preloadImage() {
	imgs.forEach(function (src, i) {
		var imgObj = new Image();
		imgObj.src = src;
	});
}
preloadImage();

var stage = new Konva.Stage({
	container: "container",
	width: canvasWidth,
	height: canvasHeight,
});
var cakeGroup = new Konva.Group({
	y: canvasHeight - 369 * scale,
	name: "cakeGroup",
	id: "cakeGroup",
});
var layer = new Konva.Layer();
var decoLayer = new Konva.Layer();

// rect();
dish();
// dish();
layer.add(cakeGroup);
stage.add(layer);
var tempLayer = new Konva.Layer();
stage.add(tempLayer);
// 垃圾桶
function removeIcon() {
	var imageObj1 = new Image();
	imageObj1.src = "./images/static/remove-icon.png";
	imageObj1.onload = function () {
		var removeIcon = new Konva.Image({
			x: canvasWidth - 8 * scale - this.width * scale,
			y: canvasHeight - this.height * scale - 8 * scale,
			width: this.width * scale,
			height: this.height * scale,
			name: "remove",
			id: "remove",
			zIndex: 2,
			src: "./images/static/remove-icon.png",
		});
		layer.add(removeIcon);
		removeIcon.image(imageObj1);
	};
}

removeIcon();
// 一層透明背景
function rect() {
	var box = new Konva.Rect({
		x: 0,
		y: 0,
		width: window.innerWidth > 768 ? 768 : window.innerWidth,
		height: canvasHeight * scale,
		id: "box",
		name: "rect",
	});
	layer.add(box);
}

// 底盤
function dish() {
	var dish = new Konva.Image({
		x: canvasWidth / 2 - (684 * scale) / 2,
		y: canvasHeight - 259 * scale,
		width: 684 * scale,
		height: 211 * scale,
		name: "dish",
		id: "dish",
		zIndex: 2,
		src: "./images/static/dish.png",
	});
	layer.add(dish);
	var imageObj1 = new Image();
	imageObj1.onload = function () {
		dish.image(imageObj1);
	};
	imageObj1.src = "./images/static/dish.png";
}
// 奶油層
function cream() {
	var cream = new Konva.Image({
		x: canvasWidth / 2 - (515 * scale) / 2,
		y: -60 * scale,
		width: 515 * scale,
		height: 247 * scale,
		name: "cream range",
		id: "cream",
		zIndex: 2,
		src: "./images/static/cream.png",
		fill: "red",
	});
	cakeGroup.add(cream);
	var imageObj1 = new Image();
	imageObj1.onload = function () {
		cream.image(imageObj1);
	};
	imageObj1.src = "./images/static/cream.png";
}

// 蛋糕底層
function cakeStyle(attrs = { RGB: [], src: "./images/cake/white.png", id: "white" }) {
	var { RGB, src, id } = attrs;
	if (stage.find(".cake")[0]) {
		if (RGB) {
			if (RGB.length > 0 && stage.findOne(".cake").attrs.src.match("white")) {
				stage.find(".cake")[0].setAttr("id", id);
				stage.find(".cake")[0].setAttr("RGB", RGB);
				filerImage(RGB);
				return;
			}
		}
		stage.find(".cake")[0].destroy();
	}
	var cake = new Konva.Image({
		x: canvasWidth / 2 - (475 * scale) / 2 + 2,
		y: 30 * scale,
		width: 475 * scale,
		height: 235 * scale,
		name: "cake range",
		src: src || "./images/cake/white.png",
		id: id || "white",
		RGB: RGB || [],
	});
	cakeGroup.add(cake);

	var imageObj1 = new Image();
	imageObj1.onload = function () {
		cake.image(imageObj1);
		if (RGB) {
			if (RGB.length > 0 && stage.findOne(".cake").attrs.src.match("white")) {
				stage.find(".cake")[0].setAttr("id", id);
				stage.find(".cake")[0].setAttr("RGB", RGB);
				filerImage(RGB);
				return;
			}
		}
	};
	imageObj1.src = src || "./images/cake/white.png";
	cream();
}
function filerImage(RGB) {
	var shape = stage.find(".cake")[0];
	shape.cache();
	shape.filters([Konva.Filters.RGB]);
	shape["red"](RGB[0]);
	shape["green"](RGB[1]);
	shape["blue"](RGB[2]);
}
function decoImage(attrs, type) {
	var { x, y, id, width, height, src, scaleX, scaleY, skewX, skewY, rotation, zIndex, src } = attrs;
	if (y - height / 2 > canvasHeight) {
		return;
	}
	if (trr) {
		trr.destroy();
	}
	var imageObj1 = new Image();
	imageObj1.src = src;
	imageObj1.onload = function () {
		var deco = new Konva.Image({
			x: x || 0,
			y: y || 0,
			width: width || this.width * scale,
			height: height || this.height * scale,
			tempWidth: width || this.width * scale,
			tempHeight: height || this.height * scale,
			name: "deco range",
			id: id,
			draggable: true,
			src: src,
			scaleX: scaleX || 1,
			scaleY: scaleY || 1,
			skewX: skewX || 0,
			skewY: skewY || 0,
			rotation: rotation || 0,
			fill: "green",
			dragBoundFunc: function (pos) {
				console.log(pos);
				// - this.attrs.width
				return {
					x: Math.max(0, Math.min(canvasWidth, pos.x)), // 修改
					y: Math.max(0, Math.min(canvasHeight, pos.y)), // 修改
				};
			},
		});
		layer.add(deco);
		deco.image(imageObj1);
		decoCount = FindDecoSize();
		if (haveIntersection(deco.attrs.id, stage.findOne("#remove"))) {
			removeDeco(deco.attrs.id);
			decoCount = FindDecoSize();
			return;
		}
		if (type == "loading") {
			if (deco.attrs.y < 0 || deco.attrs.y > $("#container").height() || deco.attrs.x < 0 || deco.attrs.x > $("#container").width()) {
				removeDeco(deco.attrs.id);
			}
			decoCount = FindDecoSize();
			return;
		}
		if (!CheckDecoAllBind(id)) {
			removeDeco(id);
			DecoWarning();
		}
	};

	if (zIndex) {
		stage.find("#" + id)[0].zIndex(zIndex);
	}
}

cakeStyle({ RGB: [247, 244, 223], src: "./images/cake/white.png", id: "white" });

var previousShape;
var dragDecoId;
var trr;
var doubleTap = false;
stage.on("tap", function (e) {
	if (e.target.attrs.name) {
		if (!e.target.attrs.name.match("deco")) {
			if (trr) {
				trr.destroy();
			}
			return;
		}
		if (trr) {
			trr.destroy();
		}
		var shape = stage.find("#" + e.target.attrs.id)[0];
		if (shape) {
			var tempWidth = e.target.attrs.tempWidth;
			var MAX_WIDTH = Math.abs(tempWidth * MAX_SCALE).toFixed(2);
			var MIN_WIDTH = Math.abs(tempWidth * MIN_SCALE).toFixed(2);
			trr = new Konva.Transformer({
				nodes: [shape],
				centeredScaling: true,
				keepRatio: true,
				name: "trr", // 修改
				id: "trr", // 修改
				// rotateEnabled: false,
				enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
				boundBoxFunc: function (oldBoundBox, newBoundBox) {
					if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
						return oldBoundBox;
					}
					if (Math.abs(newBoundBox.width) < MIN_WIDTH) {
						return oldBoundBox;
					}
					return newBoundBox;
				},
			});
			trr.on("transform", function (e) {
				if (e.target.attrs.width * e.target.scaleX() > MAX_WIDTH) {
					trr.stopTransform();
					var scaleX = MAX_WIDTH / e.target.attrs.width;
					e.target.scaleX(scaleX);
				}
				if (e.target.attrs.width * e.target.scaleX() < MIN_WIDTH) {
					trr.stopTransform();
					var scaleX = MAX_WIDTH / e.target.attrs.width;
					e.target.scaleX(scaleX);
				}
			});
			layer.add(trr);
		}
	} else {
		if (trr) {
			trr.destroy();
		}
	}
});

stage.on("dragstart", function (e) {
	e.target.moveTo(tempLayer);
	dragDecoId = "";
	dropTarget = "";
	dragDecoId = e.target.attrs.id;
});
stage.on("dragmove", function (evt) {
	var pos = stage.getPointerPosition();
	var shape = layer.getIntersection(pos);

	if (previousShape && shape) {
		if (previousShape !== shape) {
			// leave from old targer
			previousShape.fire(
				"dragleave",
				{
					type: "dragleave",
					target: previousShape,
					evt: evt.evt,
				},
				true
			);
			// enter new targer
			shape.fire(
				"dragenter",
				{
					type: "dragenter",
					target: shape,
					evt: evt.evt,
				},
				true
			);
			previousShape = shape;
		} else {
			previousShape.fire(
				"dragover",
				{
					type: "dragover",
					target: previousShape,
					evt: evt.evt,
				},
				true
			);
		}
	} else if (!previousShape && shape) {
		previousShape = shape;
		shape.fire(
			"dragenter",
			{
				type: "dragenter",
				target: shape,
				evt: evt.evt,
			},
			true
		);
	} else if (previousShape && !shape) {
		previousShape.fire(
			"dragleave",
			{
				type: "dragleave",
				target: previousShape,
				evt: evt.evt,
			},
			true
		);
		previousShape = undefined;
	}
});

stage.on("dragend", function (e) {
	var pos = stage.getPointerPosition();
	var shape = layer.getIntersection(pos);
	if (shape) {
		if (previousShape) {
			previousShape.fire(
				"drop",
				{
					type: "drop",
					target: previousShape,
					evt: e.evt,
				},
				true
			);
		}
	}

	previousShape = undefined;
	e.target.moveTo(layer);
	// console.log(e.target.attrs.id);
	var shape = stage.find("#" + e.target.attrs.id)[0];
	if (dropTarget) {
		if (dropTarget.attrs.id == "remove") {
			removeDeco(dragDecoId);
			return;
		}
		if (haveIntersection(dragDecoId, dropTarget) && e.target.attrs.name.match("range")) {
			if (haveIntersection(e.target.attrs.id, stage.findOne("#remove"))) {
				removeDeco(e.target.attrs.id);
				decoCount = FindDecoSize();
				return;
			}
			stage.find("#" + dragDecoId)[0].setAttr("d", "drop");
			RemovePreBounding(stage.find("#" + dragDecoId)[0].attrs.pre);
			return;
		}
	}
	if (haveIntersection(e.target.attrs.id, stage.findOne("#remove"))) {
		removeDeco(e.target.attrs.id);
		decoCount = FindDecoSize();
		return;
	}
	if (!CheckDecoAllBind(dragDecoId)) {
		removeDeco(dragDecoId);
		DecoWarning();
		return;
	}
});

stage.on("drop", function (e) {
	console.log("drop", e.target);
	dropTarget = e.target;
});

// 裝試物拖曳事件
var touchImg;
var touchTime;
var touchRun = false;
var touchDuration = 400;
$(".decoration-content__deco").on("touchstart", function (ev) {
	if (!touchRun) {
		clearTimeout(touchTime);
		if (FindDecoSize() >= LIMIT) {
			DecoLimitWarning();
			return;
		}
		if (trr) {
			trr.destroy();
		}
		touchTime = setTimeout(() => {
			var e = ev.originalEvent;
			touchImg = $(e.target).clone();
			touchImg[0].setAttribute("id", "touchImg");
			touchImg[0].style.left = e.changedTouches[0].clientX - e.target.clientWidth / 2 + "px";
			touchImg[0].style.top = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
			$("body").append(touchImg);
			touchRun = true;
		}, touchDuration);
	}
});
$(".decoration-content__deco").on("touchmove", function (ev) {
	if (touchRun) {
		clearTimeout(touchTime);
		if (FindDecoSize() >= LIMIT) {
			DecoLimitWarning();
			return;
		}
		if (trr) {
			trr.destroy();
		}
		ev.preventDefault();
		var e = ev.originalEvent;
		document.getElementById("touchImg").style.left = e.changedTouches[0].clientX - e.target.clientWidth / 2 + "px";
		document.getElementById("touchImg").style.top = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
	}
});
$(".decoration-content__deco").on("touchend", function (ev) {
	if (touchRun) {
		touchRun = false;
		clearTimeout(touchTime);
		if (FindDecoSize() >= LIMIT) {
			DecoLimitWarning();
			return;
		}
		var e = ev.originalEvent;
		var left = e.changedTouches[0].clientX - e.target.clientWidth / 2;
		var top = e.changedTouches[0].clientY - e.target.clientHeight / 2;
		var _container = $("#container").offset();
		var _containerWidth = $("#container").width();
		var _containerHeight = $("#container").height();
		if (top < _container.top || top + e.changedTouches[0].target.clientHeight > _container.top + _containerHeight || left > _container.left + _containerWidth || left < 0) {
			DecoWarning();
			document.getElementById("touchImg").style.left = left + "px";
			document.getElementById("touchImg").style.top = top + "px";
			document.getElementById("touchImg").style.opacity = 0;
			document.getElementById("touchImg").remove();
			return;
		}
		document.getElementById("touchImg").style.left = left + "px";
		document.getElementById("touchImg").style.top = top + "px";
		document.getElementById("touchImg").style.opacity = 0;
		document.getElementById("touchImg").remove();
		drag(e.changedTouches[0]);
	} else {
		clearTimeout(touchTime);
		touchTime = null;
		touchRun = false;
	}
});

function drag(ev) {
	var r = Math.random().toString(36).substring(7);
	var obj = {
		x: ev.pageX - ev.target.clientWidth / 2,
		y: ev.pageY - ev.target.clientHeight / 2 - document.getElementById("container").offsetTop,
		src: ev.target.dataset.src,
		id: ev.target.dataset.id + "_" + r,
		width: ev.target.clientWidth,
		height: ev.target.clientHeight,
	};
	decoImage(obj);
}

// 匯出base64
function getDataUrl() {
	return stage.toDataURL({ quality: 1, pixelRatio: 2 });
}

// 刪除單一
function removeDeco(id) {
	if (stage.find("#" + id)[0]) {
		setTimeout(() => {
			try {
				stage.find("#" + id)[0].destroy();
				decoCount = FindDecoSize();
				// 修改
				if (trr) {
					trr.destroy();
				}
			} catch (e) {}
		}, 0);
	}
}
// 清除畫面
function reset() {
	decoCount = 0;
	if (stage.find(".cake")[0]) {
		cakeStyle({ RGB: [247, 244, 223], src: "./images/cake/white.png", id: "white" });
	}
	if (stage.find(".deco")) {
		stage.find(".deco").forEach((d) => {
			d.destroy();
		});
	}
}

// 獲取所有config
function getAllData() {
	var data = {
		cake: {},
		deco: [],
	};
	if (stage.find(".cake")[0]) {
		data.cake.id = stage.find(".cake")[0].getAttr("id");
		data.cake.src = stage.find(".cake")[0].getAttr("src");
		data.cake.RGB = stage.find(".cake")[0].getAttr("RGB");
	}
	if (stage.find(".deco").length) {
		stage.find(".deco").forEach((d) => {
			data.deco.push(d.getAttrs());
		});
	}
	return data;
}

// 確認所有裝飾物有沒有放在區域
function CheckDecoAll(num) {
	var d = layer.children
		.map((v) => {
			if (v.attrs.name.match("deco")) {
				return v.attrs;
			}
		})
		.filter(Boolean);
	if (d.length >= 3) {
		return d.every((v) => v.d);
	}
	return false;
}

// 確認所有裝飾物有沒有相連
function CheckDecoAllBind(id) {
	if (haveIntersection(id, stage.find(".cream")[0])) {
		console.log("cream");
		stage.find("#" + id)[0].setAttr("d", "drop");
		stage.find("#" + id)[0].setAttr("trigger", "cream");
		return true;
	}
	if (haveIntersection(id, stage.find(".cake")[0])) {
		console.log("cake");
		stage.find("#" + id)[0].setAttr("d", "drop");
		stage.find("#" + id)[0].setAttr("trigger", "cream");
		return true;
	}
	if (!layer.children[layer.children.length - 2].attrs.name.match("trr")) {
		// 修改
		if (layer.children[layer.children.length - 2].attrs.name.match("deco") !== null) {
			var d = layer.children
				.map((v) => {
					if (v.attrs.name.match("deco")) {
						return v;
					}
				})
				.filter(Boolean);
			var _d = d.slice(0, d.length - 1);
			var dd = _d.map((v) => haveIntersection(id, v)).filter(Boolean);
			if (dd.length) {
				var _setTrigger = "";
				var _trigger = "";
				dd.forEach(function (deco) {
					_trigger = deco.getAttr("pre");
					_setTrigger += " " + deco.attrs.id;
					if (_trigger) {
						if (_trigger.match(id)) {
							return;
						} else {
							deco.setAttr("pre", _trigger + " " + id);
						}
					} else {
						deco.setAttr("pre", id);
					}
					GetStage("#" + id).setAttr("trigger", _setTrigger.trim());
				});
				stage.find("#" + id)[0].setAttr("d", "drop");
				return true;
			}
		}
	}
	console.log("no");
}

// 移除未相連裝飾品
function RemovePreBounding(pre) {
	if (!pre) {
		return;
	}
	var pres = pre.split(" ");
	pres.forEach((p) => {
		var target = stage.find("#" + p)[0];
		if (!target) {
			return;
		}
		layer.children.forEach((f) => {
			if (f.attrs.pre && f.attrs.pre.match(p)) {
				var _f = f.getAttr("pre").replace(p, "").trim();
				f.setAttr("pre", _f);
			}
		});
		var _pre = target.attrs.p;
		removeDeco(target.attrs.id);
		if (_pre) {
			setTimeout(() => {
				RemovePreBounding(_pre);
			}, 0);
			return;
		}
		layer.children.forEach((f) => {
			if (f.attrs.trigger && f.attrs.trigger.match("cream")) {
				if (!haveIntersection(f.attrs.id, stage.find("#cream")[0])) {
					removeDeco(f.attrs.id);
				}
			}
		});
		setTimeout(() => {
			CheckErrorBounding();
		}, 0);
	});
}

// 確認剩餘沒被刪除的
function CheckErrorBounding() {
	var d = layer.children
		.map((v) => {
			if (v.attrs.name.match("deco")) {
				return v;
			}
		})
		.filter(Boolean);
	var _filter = d.filter((v) => {
		if (v.attrs.trigger) {
			return v;
		}
	});
	_filter.forEach((f) => {
		var _t = f.attrs.trigger.split(" ");
		_t.forEach((t) => {
			if (!stage.find("#" + t)[0]) {
				if (f.attrs.pre) {
					RemovePreBounding(f.attrs.pre);
				}
				removeDeco(f.attrs.id);
			}
		});
	});
}

// loading Data
function loadInit(data) {
	var _data = JSON.parse(data);
	cakeStyle(_data.cake);
	_data.deco.forEach((deco) => {
		decoImage(deco, "loading");
	});
	$(".decoration-content__cake")
		.find("span[data-id=" + _data.cake.id + "]")
		.parent()
		.addClass("on");
	$(".decoration-content__cake")
		.not(
			$(".decoration-content__cake")
				.find("span[data-id=" + _data.cake.id + "]")
				.parent()
		)
		.removeClass("on");
}

// GetStage
function GetStage(el) {
	return stage.find(el)[0];
}

// 判斷位置
function haveIntersection(r1, r2) {
	r1 = stage.find("#" + r1)[0];
	r2 = r2;
	var r1E = r1.getClientRect();
	var r2E = r2.getClientRect();
	return !(r2E.x > r1E.x + r1E.width || r2E.x + r2E.width < r1E.x || r2E.y > r1E.y + r1E.height || r2E.y + r2E.height < r1E.y) ? r2 : false;
}

function FindDecoSize() {
	return layer.children.filter((v) => {
		if (v.attrs.name) {
			return v.attrs.name.match("deco");
		}
	}).length;
}
