var pMap;
var MapOptions;
var messageBox = null;
var markers = new Array();
var LocMarker = null;
var addrcon;
var addrpoint = "";
// var TViewer = TViewer || new TViewerBase();
// 初始化地圖
function InitWnd() {
	var pOMap = document.getElementById("TGMap");
	pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826); //宣告TGOnlineMap地圖物件並設定坐標系統
	MapOptions = {
		backgroundColor: "#CCCCCC", //backgroundColor(設定地圖背景顏色)
		disableDefaultUI: true, //disableDefaultUI(是否關閉所有地圖物件)
		scrollwheel: true, //scrollwheel(是否允許使用者使用滑鼠滾輪縮放地圖)
		mapTypeControl: false, //mapTypeControl(是否開啟地圖類型控制項)
		navigationControl: false, //navigationControl(是否開啟縮放控制列)
		scaleControl: false, //scaleControl(是否開啟比例尺控制項)
		draggable: true, //draggable(設定地圖是否可被拖曳)
		keyboardShortcuts: true //keyboardShortcuts(設定是否可用鍵盤控制地圖)
	};
	pMap.setOptions(MapOptions);
	pMap.setZoom(7); //指定地圖層級
	$(".scrollMap-zoomText").text(pMap.getZoom());
	var { x, y } = pMap.getCenter();
	$(".top-info__map-current-info").text(`${x.toFixed(3)},${y.toFixed(3)}`);
	var aCurrentScale = (function () {
		var ps = TGOS.MapTypeScales.EPSG3826.scales;
		var pslen = ps.length;
		var mapLevel = parseInt(pMap.getTransformation().getMapLevel(), 10);
		return ps[pslen - mapLevel - 1];
	})();
	$(".top-info__map-scale-info").text(aCurrentScale);
	TGOS.TGEvent.addListener(pMap, "zoom_changed", function (e) {
		var aCurrentScale = (function () {
			var ps = TGOS.MapTypeScales.EPSG3826.scales;
			var pslen = ps.length;
			var mapLevel = parseInt(pMap.getTransformation().getMapLevel(), 10);
			return ps[pslen - mapLevel - 1];
		})();
		$(".top-info__map-scale-info").text(aCurrentScale);
	});
	TGOS.TGEvent.addListener(pMap, "mousemove", function (e) {
		//加入滑鼠單擊地圖事件監聽器
		var pt = e.point; //取得滑鼠點擊位置坐標
		var { x, y } = pt;
		$(".top-info__map-current-info").text(`${x.toFixed(3)},${y.toFixed(3)}`);
	});
}
function get_Envelope() {
	alert(pMap.getBounds()); //取出地圖的邊框Envelope物件
}
function set_Envelope() {
	var fixleft = Number(document.getElementById("fixleft").value);
	var fixtop = Number(document.getElementById("fixtop").value);
	var fixright = Number(document.getElementById("fixright").value);
	var fixbottom = Number(document.getElementById("fixbottom").value);
	pMap.fitBounds(new TGOS.TGEnvelope(fixleft, fixtop, fixright, fixbottom));
	//傳入Envelope物件以設定地圖的邊框範圍
	pMap.setZoom(4); //指定地圖層級
}
function MoveMap() {
	var X = Number(document.getElementById("txt_X").value);
	var Y = Number(document.getElementById("txt_Y").value);
	pMap.panBy(X, Y); //輸入坐標x,y，以此點做為平移基準，可對地圖進行平移
}
window.addEventListener("wheel", function (e) {
	$(".scrollMap-zoomText").text(pMap.getZoom());
});

function makeDraggable(element) {
	let isDragging = false;
	let initialX;
	let initialY;
	let offsetX = 0;
	let offsetY = 0;

	const initialLeft = parseInt(getComputedStyle(element).left, 10);
	const initialTop = parseInt(getComputedStyle(element).top, 10);
	element.style.left = initialLeft + "px";
	element.style.top = initialTop + "px";

	// 開始拖曳
	const startDragging = (e) => {
		isDragging = true;
		if (e.type === "touchstart") {
			initialX = e.touches[0].clientX;
			initialY = e.touches[0].clientY;
		} else {
			initialX = e.clientX;
			initialY = e.clientY;
		}
		offsetX = initialX - element.getBoundingClientRect().left;
		offsetY = initialY - element.getBoundingClientRect().top;
		element.style.cursor = "grabbing";
	};

	// 拖曳中
	const doDrag = (e) => {
		if (!isDragging) return;

		e.preventDefault();

		const currentX = e.type === "touchmove" ? e.touches[0].clientX - offsetX : e.clientX - offsetX;
		const currentY = e.type === "touchmove" ? e.touches[0].clientY - offsetY : e.clientY - offsetY;

		element.style.left = `${currentX}px`;
		element.style.top = `${currentY}px`;
	};

	// 停止拖曳
	const stopDragging = () => {
		isDragging = false;
		element.style.cursor = "grab";
	};

	element.addEventListener("mousedown", startDragging);
	element.addEventListener("touchstart", startDragging);

	document.addEventListener("mousemove", doDrag);
	document.addEventListener("touchmove", doDrag, { passive: false });

	document.addEventListener("mouseup", stopDragging);
	document.addEventListener("touchend", stopDragging);
}

const boxes = document.querySelectorAll(".fixed-box");
boxes.forEach(makeDraggable);
let type;
$(".menu-item").on("click", function () {
	type = $(this).data("target");
	// $("#" + type).draggable();
	if ($("#" + type).is(":visible")) {
		$("#" + type).hide();
		return;
	}
	$("#" + type).show();
	$(".fixed-box")
		.not("#" + type)
		.hide();
});
$(".fixed-box__close").on("click", function () {
	$(this).closest(".fixed-box").hide();
});

$(".scrollMap-btn").on("click", function () {
	let type = $(this).data("type");
	let zoom = pMap.getZoom();
	if (type === "zoomIn") {
		zoom = zoom + 1;
		if (zoom >= 19) {
			return;
		}
		pMap.setZoom(zoom);
	}
	if (type === "zoomOut") {
		zoom = zoom - 1;
		if (zoom <= 1) {
			return;
		}
		pMap.setZoom(zoom);
	}
	$(".scrollMap-zoomText").text(pMap.getZoom());
});

// 分析
$("#analyze-select").on("change", function () {
	let type = $(this).val();
	$(".analyze-item").removeClass("show");
	if (type === "1") {
		$(".analyze-item--1").addClass("show");
	}
	if (type === "2") {
		$(".analyze-item--2").addClass("show");
	}
	if (type === "3") {
		$(".analyze-item--3").addClass("show");
	}
});

function getTextaddrloc(inputValue) {
	clearAll();
	//------------------地址定位---------------------
	var Add = inputValue; //取得文字輸入框內的地址
	var LService = new TGOS.TGLocateService(); //宣告一個新的定位服務
	var request = {
		//設定定位所需的參數, 使用address進行地址定位
		address: Add
	};
	LService.locateTWD97(request, function (result, status) {
		//進行定位查詢, 並指定回傳資訊為TWD97坐標系統
		if (status != "OK") {
			//確認該查詢地址是否可以查詢成功
			alert("請輸入地址"); //若該地址無法進行查詢則顯示錯誤狀態碼
			return;
		} else {
			addrpoint = result[0].geometry.location; //利用geometry.location取得地址點位(TGPoint)
			LocMarker = new TGOS.TGMarker(pMap, addrpoint, addrcon); //繪出地址定位點
			pMap.setCenter(addrpoint); //指定地圖起始中心點坐標
		}
	});
}

function clearAll() {
	if (LocMarker) {
		LocMarker.setMap(null); //假設地圖上已存在查詢後得到的地址標記點, 則先行移除
		LocMarker = null;
	}

	if (markers.length > 0) {
		//假設地圖上已存在查詢後得到的標記點, 則先行移除
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
	}
}
// ==================== 地名搜尋 ====================
$(".search-btn").on("click", function () {
	let inputValue = $(".search-input").val();
	getTextaddrloc(inputValue);
});

const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keydown", function (event) {
	// Check if the pressed key is the Enter key (key code 13)
	if (event.keyCode === 13) {
		const inputValue = searchInput.value;
		getTextaddrloc(inputValue);
		// Perform your search operation here
	}
});
// ==================== 圖層 ====================
let layer = [];
$(".layer-input").on("change", function () {
	$(this).each(function () {
		let type = $(this).val();
		if ($(this).prop("checked")) {
			layer.push(type);
		} else {
			layer.splice(layer.indexOf(type), 1);
		}
	});
});

// ==================== 分析 ====================
// 分析功能區塊
let analyzeType1 = 7; // 環域分析
let analyzeType2 = 7; // 道路關聯性
let analyzeType3 = -1; // 密度關聯性

// 環域分析
$(".analyze-item--1 .analyze-range__btn[data-type='minus']").on("click", function () {
	analyzeType1--;
	if (analyzeType1 < 0) {
		return;
	}
	$(".analyze-item--1 .analyze-range__info").text(analyzeType1);
});
$(".analyze-item--1 .analyze-range__btn[data-type='plus']").on("click", function () {
	analyzeType1++;
	$(".analyze-item--1 .analyze-range__info").text(analyzeType1);
});
// 執行分析
$(".analyze-item--1 .analyze-range__submit").on("click", function () {
	// 區域
	let area = $(".analyze-item--1 .analyze-area__select").val();
});

// 道路關聯性
$(".analyze-item--2 .analyze-range__btn[data-type='minus']").on("click", function () {
	analyzeType2--;
	if (analyzeType2 < 0) {
		return;
	}
	$(".analyze-item--2 .analyze-range__info").text(analyzeType2);
});

$(".analyze-item--2 .analyze-range__btn[data-type='plus']").on("click", function () {
	analyzeType2++;
	$(".analyze-item--2 .analyze-range__info").text(analyzeType2);
});
// 執行分析
$(".analyze-item--2 .analyze-range__submit").on("click", function () {
	// 區域
	let area = $(".analyze-item--2 .analyze-area__select").val();
});

// 執行分析
$(".analyze-item--3 .analyze-range__submit").on("click", function () {
	// 區域
	let area = $(".analyze-item--3 .analyze-area__select").val();
	// 行政區
	let range = $(".analyze-item--3 .analyze-range__select").val();
});

// 阻止手機縮放
document.addEventListener("gesturestart", function (event) {
	// 阻止兩指縮放畫面
	event.preventDefault();
});
