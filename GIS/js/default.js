var pMap;
var MapOptions;
var messageBox = null;
var markers = new Array();
var LocMarker = null;
let LocateMarker = null;
var addrcon;
var addrpoint = "";
let pData = {};
var styles = [];
var polygon = null;
let markerImg, pTGMarker;
function ExecuteComplexLocate(aSearchData, aResultBoxId, aRowClassName, aTop, pageNumber) {
	var _this = this;
	if (aSearchData == "" || aSearchData == "請輸入地標或地址") {
		alert("複合式定位", "請輸入地標或地址", "error");
		return;
	}
	pageNumber = pageNumber ? pageNumber : 1;
	var LService = new TGOS.TGLocate();
	var request = { center: pMap.getCenter(), requestText: aSearchData, pageNumber: pageNumber ? pageNumber : 1, geometryInfo: true };
	LService.complexLocate(request, pMap.getCoordSys(), function (results, status, featureCount, pages) {
		console.log(results);
		if (status != TGOS.TGLocatorStatus.OK && status != TGOS.TGLocatorStatus.TOO_MANY_RESULTS) {
			if (pageNumber == 1) {
				alert("複合式定位", "查無此地標或地址", "error");
			}
		} else {
			console.log("In");
			var $SearchResultBox = $("#" + aResultBoxId);
			if (pageNumber == 1) {
				$SearchResultBox.empty().hide();
			}
			if (results.length == 1 && results[0].type == "coord") {
				var aItem = results[0];
				var info = { name: "點位", x: aItem.geometry.location.x, y: aItem.geometry.location.y };
				var $aRow = $('<div class="' + aRowClassName + '"  title="點擊我定位" style="display:none;"><div style="feft; "><div style="color: #000;  font-size: 13px;  line-height: 1.2;">' + info.name + '</div><div style="  color: #ccc;  font-size: 12px;  line-height: 1.6;">' + aItem.county + "  " + aItem.town + "</div></div></div>");
				$aRow.data("info", info);
				$SearchResultBox.append($aRow);
			} else {
				for (var i = 0; i < results.length; i++) {
					var aItem = results[i];
					var info = { name: aItem.name, x: aItem.geometry.location.x, y: aItem.geometry.location.y };
					var $aRow = $('<div class="' + aRowClassName + '"  title="點擊我定位"><div style="feft; "><div style="color: #000;  font-size: 13px;  line-height: 1.2;">' + info.name + '</div><div style="  color: #ccc;  font-size: 12px;  line-height: 1.6;">' + aItem.county + "  " + aItem.town + "</div></div></div>");
					$aRow.data("info", info);
					$SearchResultBox.append($aRow);
				}
			}
			$SearchResultBox
				.css({ top: aTop })
				.data({ pageNumber: pageNumber, pages: pages })
				.off("scroll")
				.scroll(function () {
					var $this = $(this),
						_pageNumber = $this.data("pageNumber"),
						_pages = $this.data("pages"),
						_height = $this.height(),
						_scrollHeight = $this.prop("scrollHeight"),
						_maxScrollHeight = _scrollHeight - _height - 20,
						_least = 0;
					if (_maxScrollHeight - $this.scrollTop() <= _least) {
						_pageNumber = _pageNumber + 1;
						if (_pageNumber <= _pages) {
							ExecuteComplexLocate(aSearchData, aResultBoxId, aRowClassName, aTop, _pageNumber);
						}
					}
				})
				.fadeIn()
				.find("." + aRowClassName)
				.off("click")
				.click(function () {
					var $this = $(this),
						info_ = $this.data("info");
					var pt = new TGOS.TGPoint(info_.x, info_.y);

					if (LocateMarker) {
						LocateMarker.setMap(null);
					}
					LocateMarker = new TGOS.TGMarker(pMap, new TGOS.TGPoint(0, 0));
					LocateMarker.setTitle(info_.name);
					// LocateMarker.setIcon(new TGOS.TGImage("https://map.tgos.tw/TGOSCloud/Resources/Project/Images/Address_Blue.png", new TGOS.TGSize(37, 35), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(18, 35)));
					LocateMarker.setPosition(pt);
					LocateMarker.setZIndex(1);
					LocateMarker.setVisible(true);
					LocateMarker.setClickable(true);
					LocateMarker.Tag = { info: info_ };
					pMap.setCenter(pt);
					pMap.setZoom(12);
					var setPosition = new TGOS.TGLocateService();
					setPosition.setCenter(pMap, pt);
					// showComplexLocateMessageBox(info_);
					TGOS.TGEvent.addListener(LocateMarker, "click", function (o) {
						var info = o.target.Tag.info;
						console.log(info);
						// showComplexLocateMessageBox(info);
					});
					$SearchResultBox.empty().hide();
					// function showComplexLocateMessageBox(info) {
					// 	var message = "地址：" + info.name + "<br>X坐標：" + info.x + "<br>Y坐標：" + info.y;
					// 	if (info.name == "點位") {
					// 		message = "X坐標：" + info.x + "<br>Y坐標：" + info.y;
					// 	}
					// 	message = message + "<br><div style='padding: 5px;font-size: 13px;border: 1px solid #ccc;width: 280px;font-family: '微軟正黑體';' data-Px='" + info.x + "' data-Py='" + info.y + "'><a  class='selectS messageBox-RoadPath' eType='RoadPath_S' style='cursor:pointer;border-right:1px solid #ccc; padding:2px 5px;'>設為起點</a><a   class='selectP messageBox-RoadPath'  eType='RoadPath_P' style='cursor:pointer;border-right:1px solid #ccc; padding:2px 5px;'>設為必經點</a><a   class='selectX messageBox-RoadPath'  eType='RoadPath_Error' style='cursor:pointer;border-right:1px solid #ccc; padding:2px 5px;'>設為障礙點</a><a  class='selectE messageBox-RoadPath'  eType='RoadPath_E' style='cursor:pointer; padding:2px 5px;'>設為終點</a></div>";
					// 	if (_this._LocateMessageBox) {
					// 		_this._LocateMessageBox.close(TViewer._TMap);
					// 	}
					// 	var InfoWindowOptions = { maxWidth: 400, pixelOffset: new TGOS.TGSize(0, -23), zIndex: 1 };
					// 	_this._LocateMessageBox = new TGOS.TGInfoWindow(message, new TGOS.TGPoint(info.x, info.y), InfoWindowOptions);
					// 	_this._LocateMessageBox.open(TViewer._TMap);
					// 	$(".messageBox-RoadPath")
					// 		.off("click")
					// 		.click(function () {
					// 			var $this = $(this);
					// 			var eType = $this.attr("eType");
					// 			popMenuExecute(eType, new TGOS.TGPoint(info.x, info.y));
					// 		});
					// }
				});
			if (results.length == 1 && results[0].type == "coord") {
				$SearchResultBox.find("." + aRowClassName).click();
			}
		}
	});
}

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

// 滾輪縮放
window.addEventListener("wheel", function (e) {
	$(".scrollMap-zoomText").text(pMap.getZoom());
});

// 拖曳
function makeDraggable(element) {
	let isDragging = false;
	let initialX;
	let initialY;
	let offsetX = 0;
	let offsetY = 0;

	// 開始拖曳
	const startDragging = (e) => {
		if (e.target.classList.contains("fixed-box__title")) {
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
		}
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

// 選單
let type;
$(".menu-item").on("click", function () {
	$("#SearchResultBox").empty().hide();
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

// 地址定位
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
	// getTextaddrloc(inputValue);
	ExecuteComplexLocate($("#BaseToolBar_MQuery").val(), "SearchResultBox", "SearchResultRow", 28);
});

const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keydown", function (event) {
	// Check if the pressed key is the Enter key (key code 13)
	if (event.keyCode === 13) {
		const inputValue = searchInput.value;
		// getTextaddrloc(inputValue);
		ExecuteComplexLocate($("#BaseToolBar_MQuery").val(), "SearchResultBox", "SearchResultRow", 28);
		// Perform your search operation here
	}
});
$("#BaseToolBar_MQuery").on("input", function () {
	let val = $(".search-input").val();
	if (val.length == 0) {
		$("#SearchResultBox").empty().hide();
	}
});
// ==================== 圖層 ====================
function drawGeoJson(data) {
	if (layer.length == 0) {
		return;
	}
	layer.forEach(function (item) {
		if (item["pData"]) {
			return;
		}
		// 建立幾何圖層物件
		item["pData"] = new TGOS.TGData({ map: pMap });
		// 載入 GeoJSON 資料
		item["pData"].loadGeoJson(item["path"], { idPropertyName: "GEOJSON" }, function (graphic) {
			// 設定圖層樣式
			for (var i = 0; i < graphic.length; i++) {
				item["pData"].overrideStyle(graphic[i], item["style"]);
			}

			// 設定呈現幾何圖層物件的地圖物件
			item["pData"].setMap(pMap);
		});
		$(".tgoverlay").css("opacity", $("#sliderRange").val());
	});
}

let layer = [];
$(".layer-input").on("change", function () {
	$(this).each(function () {
		let type = $(this).val();
		let list = {};
		if (type === "a") {
			list = {
				path: "./河川測站.geojson",
				pData: null,
				style: {
					fillColor: "#FF0000",
					strokeColor: "#FF0000",
					strokeWeight: 1,
					fillOpacity: 0.8
				},
				type
			};
		}
		if (type === "b") {
			list = {
				path: "./testJson.json",
				pData: null,
				style: {
					fillColor: "#fc6f6f",
					strokeColor: "#fc6f6f",
					strokeWeight: 1,
					fillOpacity: 0.8
				},
				type
			};
		}
		if (type === "c") {
			list = {
				path: "./全台縣市區域.geojson",
				pData: null,
				style: {
					fillColor: "#03db6b",
					strokeColor: "#03db6b",
					strokeWeight: 1,
					fillOpacity: 0.8
				},
				type
			};
		}
		if (type === "d") {
			list = {
				path: "./bike.json",
				pData: null,
				style: {
					fillColor: "#000bff",
					strokeColor: "#000bff",
					strokeWeight: 1,
					fillOpacity: 0.8
				},
				type
			};
		}
		if ($(this).prop("checked")) {
			layer.push(list);
		} else {
			let index = layer.findIndex((item) => item.type === type);
			layer[index]["pData"].clearAll();
			layer = layer.filter((item) => item.type !== type);
		}
	});
	drawGeoJson(layer);
});

$("#sliderRange").on("change", function () {
	$(".tgoverlay").css("opacity", $(this).val());
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
