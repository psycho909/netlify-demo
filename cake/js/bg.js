var step = 0;
const LIMIT = 30;
var decoCount = 0;
const MAX_SCALE = 1.25;
const MIN_SCALE = 0.75;
let bindWaring = false;
let loading = {
	show: $("#loadingProgress").show(),
	hide: $("#loadingProgress").show(),
};
// 說明介紹
if (false) {
	$(".step-box").addClass("show");
	$(".step").eq(step).addClass("show").siblings().removeClass("show");
	$(".step-next").on("click", function () {
		step += 1;
		if (step > 2) {
			$(".step-box").removeClass("show");
			return;
		}
		$(".step").eq(step).addClass("show").siblings().removeClass("show");
	});
}

// 選單切換
$(".menu-toggle").on("click", function () {
	$(".menu-list").toggle();
});

$(".menu-list__btn").on("click", function () {
	var _event = $(this).attr("data-btn");
	switch (_event) {
		case "qa":
			EventInfo();
			break;
		case "screenshot":
			if (CheckDecoAll(3)) {
				stage.find("#remove")[0].hide();
				ScreenShot(getDataUrl(), "一二三四五");
			} else {
				CakeScreenError();
			}
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

rect();
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
		if (id == "cake-white") {
			if (RGB.length > 0) {
				filerImage(RGB);
				return;
			}
		}
		if (RGB) {
			if (RGB.length > 0 && stage.find(".cake")[0].getAttr("id") == "white") {
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
			if (RGB.length > 0 && stage.find(".cake")[0].getAttr("id") == "white") {
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
function decoImage(attrs) {
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
			dragBoundFunc: function (pos) {
				return {
					x: Math.max(0, Math.min(canvasWidth - this.attrs.width, pos.x)),
					y: Math.max(0, Math.min(canvasHeight - this.attrs.height, pos.y)),
				};
			},
		});
		layer.add(deco);
		deco.image(imageObj1);
		decoCount = FindDecoSize();
		// DrawPoint({ x: x + width / 2, y: y + height / 2 });
		console.log(id);

		if (layer.getIntersection({ x: x + width / 2, y: y + height / 2 }).attrs.name.match("range")) {
			stage.find("#" + id)[0].setAttr("d", "drop");
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
stage.on("click tap", function (e) {
	console.log(e.currentTarget.pointerPos);
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
	dragDecoId = e.target.attrs.id;
	bindWaring = false;
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
	// stage.x = 300;
	// stage.y = 300;
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
	var shape = stage.find("#" + e.target.attrs.id)[0];

	if (bindWaring) {
		if (!CheckDecoAllBind(dragDecoId)) {
			RemoveNoBounding(dragDecoId);
			removeDeco(dragDecoId);
			DecoWarning();
		}
	} else {
		stage.find("#" + dragDecoId)[0].setAttr("d", "drop");
		RemoveNoBounding(dragDecoId);
	}
});

stage.on("drop", function (e) {
	if (e.target.attrs.id == "remove") {
		removeDeco(dragDecoId);
		return;
	}
	if (!e.target.attrs.name.match("range")) {
		bindWaring = true;
		return;
	}
});

// 裝試物拖曳事件
var touchImg;
$(".decoration-content__deco").on("touchstart", function (ev) {
	if (FindDecoSize() >= LIMIT) {
		DecoLimitWarning();
		return;
	}
	var e = ev.originalEvent;
	touchImg = $(e.target).clone();
	touchImg[0].setAttribute("id", "touchImg");
	touchImg[0].style.left = e.changedTouches[0].clientX - e.target.clientWidth / 2 + "px";
	touchImg[0].style.top = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
	$("body").append(touchImg);
});
$(".decoration-content__deco").on("touchmove", function (ev) {
	if (FindDecoSize() >= LIMIT) {
		DecoLimitWarning();
		return;
	}
	ev.preventDefault();
	var e = ev.originalEvent;
	document.getElementById("touchImg").style.left = e.changedTouches[0].clientX - e.target.clientWidth / 2 + "px";
	document.getElementById("touchImg").style.top = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
});
$(".decoration-content__deco").on("touchend", function (ev) {
	if (FindDecoSize() >= LIMIT) {
		DecoLimitWarning();
		return;
	}
	var e = ev.originalEvent;
	document.getElementById("touchImg").style.left = e.changedTouches[0].clientX - e.target.clientWidth / 2 + "px";
	document.getElementById("touchImg").style.top = e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
	document.getElementById("touchImg").style.opacity = 0;
	document.getElementById("touchImg").remove();
	drag(e.changedTouches[0]);
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
	return stage.toDataURL();
}

// 刪除單一
function removeDeco(id) {
	setTimeout(() => {
		stage.find("#" + id)[0].destroy();
	}, 0);
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
	if (CheckBounding(id, stage.find(".cream")[0])) {
		stage.find("#" + id)[0].setAttr("d", "drop");
		console.log("cream");
		return true;
	}
	if (layer.children[layer.children.length - 2].attrs.name.match("deco") !== null) {
		console.log("children");
		var d = layer.children
			.map((v) => {
				if (v.attrs.name.match("deco")) {
					return v;
				}
			})
			.filter(Boolean);
		var _d = d.slice(0, d.length - 1);
		var dd = _d.map((v) => CheckBounding(id, v)).filter(Boolean);
		if (dd.length) {
			var _setTrigger = "";
			dd.forEach(function (deco) {
				var _trigger = deco.getAttr("trigger");
				_setTrigger += deco.attrs.id;
				if (_trigger) {
					deco.setAttr("trigger", _trigger + " " + id);
				} else {
					deco.setAttr("trigger", id);
				}
				GetStage("#" + id).setAttr("trigger", _setTrigger);
			});
			stage.find("#" + id)[0].setAttr("d", "drop");
			return true;
		}
	}
}

// 移除沒有相連的裝飾品
function RemoveNoBounding(id) {
	var _trigger = layer.children.filter((f) => {
		if (f.attrs.trigger) {
			return f.attrs.trigger.match(id);
		}
	});
	if (_trigger.length) {
		var removeDecoId = [];
		var NoBounding = _trigger
			.map(function (t) {
				if (!CheckBounding(id, t)) {
					var _temp = t.getAttr("trigger");
					var _replace = _temp.replace(id, "").trim();
					t.setAttr("trigger", _replace);
					return t;
				}
			})
			.filter(Boolean);
		NoBounding.forEach((v) => {
			if (!CheckBounding(v.attrs.id, stage.find(".cream")[0])) {
				removeDeco(v.attrs.id);
				removeDecoId.push(v.attrs.id);
			}
		});
		setTimeout(() => {
			RemoveSomeNoBounding(removeDecoId);
		}, 0);
	}
}

function CheckErrorBounding() {
	var d = layer.children
		.map((v) => {
			if (v.attrs.name.match("deco")) {
				return v;
			}
		})
		.filter(Boolean);
	var _filter = d.filter((v) => {
		if (!v.attrs.trigger) {
			return v;
		}
	});
	_filter.forEach((f) => {
		if (!CheckBounding(f.attrs.id, stage.find(".cream")[0])) {
			removeDeco(f.attrs.id);
		}
	});
}

// loading Data
function loadInit(data) {
	var data = '{"cake":{"id":"wood1","src":"./images/cake/wood1.png","RGB":[]},"deco":[{"x":280.6389510341813,"y":244.46318031252548,"width":87,"height":93,"tempWidth":87,"tempHeight":93,"name":"deco range","id":"face_9t46ma","draggable":true,"src":"./images/deco/face.png","scaleX":1.4662310589784215,"scaleY":1.4662310589784229,"skewX":-8.262764647907206e-16,"skewY":0,"rotation":-47.19340437347327,"image":{}},{"x":208.6859836160665,"y":247.81451361977273,"width":99,"height":86,"tempWidth":99,"tempHeight":86,"name":"deco range","id":"bow_60zz","draggable":true,"src":"./images/deco/bow.png","scaleX":1.0209874539599875,"scaleY":1.0209874539599848,"skewX":0,"skewY":0,"rotation":23.050665226659174,"image":{}},{"x":459.0768268738022,"y":317.54487033885744,"width":65,"height":89,"tempWidth":65,"tempHeight":89,"name":"deco range","id":"banana2_3rmzz","draggable":true,"src":"./images/deco/banana2.png","scaleX":0.7426016899274408,"scaleY":0.7426016899274407,"skewX":-3.1457078738749225e-18,"skewY":0,"rotation":-1.3795935102504215,"image":{}},{"x":538.5136042321675,"y":207.10466226490334,"width":99,"height":86,"tempWidth":99,"tempHeight":86,"name":"deco range","id":"bow_9ila2","draggable":true,"src":"./images/deco/bow.png","scaleX":1.020263384032566,"scaleY":1.0202633840325621,"skewX":1.0665608264610273e-16,"skewY":0,"rotation":49.459475276137326,"image":{}},{"x":158.0150895608072,"y":164.77173803339898,"width":64,"height":58,"tempWidth":64,"tempHeight":58,"name":"deco range","id":"bean_j680hb","draggable":true,"src":"./images/deco/bean.png","scaleX":1.592374590497202,"scaleY":1.592374590497202,"skewX":0,"skewY":0,"rotation":1.1912705406703274,"image":{}}]}';

	var _data = JSON.parse(data);
	console.log(_data);
	cakeStyle(_data.cake);
	_data.deco.forEach((deco) => {
		decoImage(deco);
	});
}

// GetStage
function GetStage(el) {
	return stage.find(el)[0];
}

function CheckBounding(id, target) {
	var el = stage.find("#" + id)[0];
	var elX = el.getAbsolutePosition().x;
	var elY = el.getAbsolutePosition().y;
	var elWidth = el.attrs.width;
	var elHeight = el.attrs.height;
	var targetX = target.getAbsolutePosition().x;
	var targetY = target.getAbsolutePosition().y;
	var targetWidth = target.attrs.width;
	var targetHeight = target.attrs.height;
	if (elX + elWidth >= targetX && elX + elWidth < targetX + targetWidth) {
		if (elY + elHeight >= targetY && elY <= targetY + targetHeight) {
			console.log("on1");
			return target;
		}
	}

	if (elX >= targetX && elX + elWidth <= targetX + targetWidth) {
		if (elY + elHeight >= targetY && elY <= targetY + targetHeight) {
			console.log("on2");
			return target;
		}
	}
	if (elX >= targetX && elX <= targetX + targetWidth) {
		if (elY + elHeight >= targetY && elY <= targetY + targetHeight) {
			console.log("on3");
			return target;
		}
	}
}

function RemoveSomeNoBounding(removeDecoId) {
	var removeDecoId = removeDecoId || [];
	var removeDecoTemp = [];
	var d = layer.children
		.map((v) => {
			if (v.attrs.name.match("deco")) {
				return v;
			}
		})
		.filter(Boolean);
	for (var i = 0; i < removeDecoId.length; i++) {
		for (var j = 0; j < d.length; j++) {
			if (!d[j].attrs.trigger) {
				continue;
			}
			if (d[j].attrs.trigger.match(removeDecoId[i])) {
				removeDecoTemp.push(d[j]);
			}
		}
	}
	removeDecoId = [];
	removeDecoTemp.forEach((r) => {
		if (!CheckBounding(r.attrs.id, stage.find(".cream")[0])) {
			removeDeco(r.attrs.id);
			removeDecoId.push(r.attrs.id);
		}
	});
	if (removeDecoId.length) {
		setTimeout(() => {
			RemoveSomeNoBounding(removeDecoId);
		}, 0);
	}
	CheckErrorBounding();
	return false;
}

function DrawPoint({ x = 0, y = 0 }) {
	var circle = new Konva.Circle({
		x: x,
		y: y,
		radius: 5,
		fill: "red",
	});

	layer.add(circle);
}

function FindDecoSize() {
	return layer.children.filter((v) => v.attrs.name.match("deco")).length;
}
