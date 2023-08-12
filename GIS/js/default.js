var pMap;
var MapOptions;
var messageBox = null;
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
		mapTypeControlOptions: {
			//mapTypeControlOptions(指定提供的地圖類型)
			mapTypeIds: [TGOS.TGMapTypeId.ROADMAP, TGOS.TGMapTypeId.F2IMAGE],
			//mapTypeId(設定地圖控制項中欲顯示之底圖圖磚類型按鈕
			//上行範例只提供福衛混和地圖及福衛二號衛星影像兩類)
			//若不設定則預設顯示所有類型的底圖圖磚按鈕供使用者切換
			controlPosition: TGOS.TGControlPosition.RIGHT_TOP,
			//controlPosition(設定地圖類型控制項在地圖的位置)
			mapTypeControlStyle: TGOS.TGMapTypeControlStyle.DEFAULT
			//mapTypeControlstyle(設定地圖類型控制項樣式)
			//(可設定參數有：DEFAULT / HORIZONTAL_BAR / DROPDOWN_MENU)
		},
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
const vConsole = new VConsole();
