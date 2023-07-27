const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
//ET
const urlParams = new URLSearchParams(window.location.search);
const ET = urlParams.get("ET");
//Token
let Token = $("#hid_UD").val();
//中獎清單
let List;
//獎勵等級
let Level;

let init = function () {
	//清QS
	history.pushState(null, "", location.href.split("?")[0]);
	if ($("#hid_UD").val() === "") {
		//未登入
		$(".lottery").addClass("hide");
	} else {
		//已登入
		$(".login").addClass("hide");
	}
};

// width="644.5" height="743.5"
let cWidth = 688,
	cHeight = 800;

if (window.innerWidth < 768) {
	$("#draw").attr("width", cWidth * (window.innerWidth / 768));
	$("#draw").attr("height", cHeight * ((cWidth * (window.innerWidth / 768)) / cWidth));
} else {
	$("#draw").attr("width", cWidth);
	$("#draw").attr("height", cHeight);
}

//文字無法選取
document.addEventListener("selectstart", function (e) {
	e.preventDefault();
});

//開抽
function lottery(type) {
	$("body").addClass("ov-hidden");
	let level, itemClass;

	if (type == 1) {
		level = "blue";
		itemClass = 1;
	} else if (type == 2) {
		level = "purple";
		itemClass = 2;
	} else {
		let num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		if (Level.indexOf("A") == -1) {
			//藍爆
			if (num > 60) {
				itemClass = 4;
			} else {
				itemClass = 3;
			}
		} else {
			//紫爆
			if (num > 60) {
				itemClass = 5;
			} else {
				itemClass = 3;
			}
		}

		if (itemClass == 3) {
			level = "orange";
		} else if (itemClass == 4) {
			level = "blue";
		} else if (itemClass == 5) {
			level = "purple";
		}
	}

	$(".mirror").removeClass("blue");
	$(".mirror").removeClass("orange");
	$(".mirror").removeClass("purple");
	$(".mirror").addClass(level);

	//清空video
	$(".video").empty();
	//建立video
	let ele;
	ele = `<video id="video" crossorigin="Anonymous" src="https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230727_Mabinogi_LiveEvent/assets/css/img/${itemClass}.mp4" type="video/mp4" playsinline></video>`;
	$(".video").append(ele);

	//起霧鏡面圖
	const image = new Image();
	image.crossOrigin = "Anonymous";
	image.src = "https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230727_Mabinogi_LiveEvent/assets/css/img/mirror-mist-" + level + ".png";

	image.addEventListener("load", function () {
		//背景
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	});

	let isDraw = false;
	//滑鼠&手機裝置事件
	canvas.onmousedown = function () {
		isDraw = true;
	};

	canvas.ontouchstart = function () {
		isDraw = true;
	};

	canvas.onmouseup = function () {
		isDraw = false;
		videoStep1(itemClass);
	};

	canvas.ontouchend = function () {
		isDraw = false;
		videoStep1(itemClass);
	};

	canvas.onmousemove = function (e) {
		if (isDraw) {
			let x = e.offsetX;
			let y = e.offsetY;
			ctx.beginPath();
			ctx.arc(x, y, 15, 0, 2 * Math.PI);
			ctx.globalCompositeOperation = "destination-out";
			ctx.fill();
			ctx.closePath();
		}
	};

	canvas.ontouchmove = function (e) {
		let content = document.getElementById("mirror");
		if (isDraw) {
			let x = e.touches[0].clientX - content.offsetLeft;
			let y = e.touches[0].clientY - content.offsetTop;
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.globalCompositeOperation = "destination-out";
			ctx.fill();
			ctx.closePath();
		}
	};
}

//清除畫布
function clear() {
	ctx.globalCompositeOperation = "source-over";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//video階段1
function videoStep1(type) {
	var state = false;
	$(".video").addClass("show");
	$(".video").removeClass("state");
	//播放video
	let video1 = document.getElementById("video");
	video1.play();

	video1.onended = function () {
		state = true;
		if (type < 4) {
			$(".video").removeClass("show");
			loadingShow();
			$(".animateContent").toggleClass("hide");
			clear();
			rewardBox(List);
		} else {
			if (state) {
				loadingShow();
				//清空video
				$(".video").empty();
				$(".video").addClass("show");
				$(".video").addClass("state");

				setTimeout(function () {
					//建立video
					let ele;
					ele = `<video id="video" crossorigin="Anonymous" src="https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230727_Mabinogi_LiveEvent/assets/css/img/6.mp4" type="video/mp4" playsinline muted></video>`;
					$(".video").append(ele);
					let video2 = document.getElementById("video");
					video2.currentTime = 0.001;

					$("#video").click(function () {
						videoStep2();
					});
				}, 100);

				setTimeout(function () {
					loadingHide();
				}, 500);
			}
		}
	};
}

//video階段2
function videoStep2() {
	var state = false;
	$(".video").removeClass("state");

	//播放video
	let video3 = document.getElementById("video");
	video3.play();

	video3.onended = function () {
		loadingShow();
		$(".video").removeClass("show");
		$(".animateContent").toggleClass("hide");
		clear();
		rewardBox(List);
	};
}

//抽獎點擊
$(".lottery").click(function () {
	exchangeApi({
		ET: ET,
		Token: Token
	});
});

//關閉抽獎畫面
$(".closeBtn").click(function () {});

//audio
// const audio = document.getElementById("player");
// $(".playBtn").click(function () {
//     if ($(this).hasClass("mute")) {
//         audio.play();
//         $(this).removeClass("mute");
//     } else {
//         audio.pause();
//         $(this).addClass("mute");
//     }
// });

// loadingProgress控制
function loadingHide() {
	$("#loadingProgress").hide();
}

function loadingShow() {
	$("#loadingProgress").show();
}

//設定cookie
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//取得cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

//兌換
let exchangeApi = function (obj) {
	loadingShow();
	let data = {
		Code: 1,
		Data: {
			list_Item: [{ ItemLevel: "S" }]
		}
	};
	let res = data;
	if (res.Code == 1) {
		List = res.Data.list_Item;
		Level = List.map((x) => x.ItemLevel);
		clear();
		$(".animateContent").toggleClass("hide");
		if (Level.indexOf("S") != -1) {
			setTimeout(function () {
				lottery(3);
			}, 1);
		} else if (Level.indexOf("A") != -1) {
			setTimeout(function () {
				lottery(2);
			}, 1);
		} else {
			setTimeout(function () {
				lottery(1);
			}, 1);
		}

		loadingHide();
	}
};
init();
