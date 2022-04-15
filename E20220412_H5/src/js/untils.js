var form = document.getElementById("form");
var name = form["name"];
var phone = form["phone"];
var email = form["email"];
var user = {
	name: name,
	phone: phone,
	email: email,
};
function validName(user) {
	var spanElement = document.getElementById("invalid-" + user.name.name);
	if (user.name.value.trim().length > 0) {
		if (spanElement) {
			user.name.parentElement.removeChild(spanElement);
		}
		return true;
	} else {
		if (spanElement) {
			return false;
		}
		var span = document.createElement("span");
		span.textContent = "請輸入姓名";
		span.id = "invalid-" + user.name.name;
		user.name.insertAdjacentElement("afterEnd", span);
		return false;
	}
}

function validPhone(user) {
	var v = /^(09)\d{8}$/;
	var spanElement = document.getElementById("invalid-" + user.phone.name);
	if (v.test(user.phone.value)) {
		if (spanElement) {
			user.phone.parentElement.removeChild(spanElement);
		}
		return true;
	} else {
		if (spanElement) {
			return false;
		}
		var span = document.createElement("span");
		span.textContent = "請確認手機號碼";
		span.id = "invalid-" + user.phone.name;
		user.phone.insertAdjacentElement("afterEnd", span);
		return false;
	}
}

function validEmail(user) {
	var v = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
	var spanElement = document.getElementById("invalid-" + user.email.name);
	if (v.test(user.email.value)) {
		if (spanElement) {
			user.email.parentElement.removeChild(spanElement);
		}
		return true;
	} else {
		if (spanElement) {
			return false;
		}
		var span = document.createElement("span");
		span.textContent = "請確認E-mail";
		span.id = "invalid-" + user.email.name;
		user.email.insertAdjacentElement("afterEnd", span);
		return false;
	}
}

function validate(obj, fn) {
	for (var i = 0; i < fn.length; i++) {
		if (fn[i](obj) === false) {
			return false;
		}
	}
	return true;
}
console.log(validate(user, [validName, validPhone, validEmail]));

// 防止連續點擊
function debounce(fn, interval) {
	var timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			fn.apply(this, arguments);
			timer = null;
		}, interval);
	};
}

// 可以連續點擊但會隔幾秒才送出
function throttle(fn, interval) {
	var timer = null;
	return function () {
		if (timer) {
			timer = null;
		}
		timer = setInterval(function () {
			fn.apply(this, arguments);
			timer = null;
		}, interval);
	};
}

// 判斷H5
function checkH5() {
	var useragent = navigator.userAgent;
	var reg = /BeaGo/gi;
	if (useragent.indexOf("BeaGo") > -1 || reg.test(useragent)) {
		return true;
	}
}

// 獲取網址 ?sec=part2
function getQuery() {
	var query = location.search.slice(1);
	var queryArr = query.split("&");
	var queryObj = {};
	queryArr.forEach(function (v, i) {
		queryObj[v.split("=")[0]] = v.split("=")[1];
	});
	return queryObj;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getTranslate3d(el) {
	var values = el.style.transform.split(/\w+\(|\);?/);
	if (!values[1] || !values[1].length) {
		return [];
	}
	return values[1].split(/,\s?/g);
}

// 確認Array
function checkArray(arr) {
	return Object.prototype.toString.call(arr).slice(8, -1) == "Array";
}
function checkObject(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1) == "Object";
}

function setCookieValue(name) {
	document.cookie = name + "=true";
}

function getCookieValue(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return "";
	}
}

function toTop() {
	$("body,html").animate(
		{
			scrollTop: 0,
		},
		600
	);
}

function targetScroll(target) {
	var _location = window.location;
	var _hash = _location.hash;
	var _query = _location.search;
	var query_obj = {};
	// 自己定義要滾到哪裡
	if (target) {
		$("html,boy").animate({
			scrollTop: $("[data-target=" + target + "]").offset().top,
		});
	}
	if (_hash) {
		var _id = _hash.replace("#", "");
	}
	// 設定query滾到哪裡
	if (_query) {
		var query = _query.substr(1).split("&");
		for (var i = 0; i < query.length; i++) {
			var query_pair = query[i].split("=");
			query_obj[query_pair[0]] = query_pair[1];
		}
		$("html,boy").animate({
			scrollTop: $("[data-target=" + query_obj["id"] + "]").offset().top,
		});
	}
}

// 獲取serverTime
function ServerTime() {
	var serverTime = new Date($.ajax({ async: false }).getResponseHeader("Date"));
	return {
		getTime: serverTime.getTime(),
		getMonth: serverTime.getMonth() + 1,
		getDate: serverTime.getDate(),
		getMinutes: serverTime.getMinutes(),
		full: serverTime.getMonth() + 1 + "/" + serverTime.getDate() + " " + serverTime.getHours() + ":" + (serverTime.getMinutes() < 10 ? "0" + serverTime.getMinutes() : serverTime.getMinutes()),
	};
}

function OpenFBApp(target, link, code) {
	var href = "";
	if (isMobile.any) {
		if (isMobile.apple.device) {
			href = "fb://profile/" + code;
		} else {
			href = "fb://page/" + code;
		}
	} else {
		href = link;
	}

	$(target).attr("href", href);
}

var Loading = {
	hide: function () {
		$("#loadingProgress").hide();
	},
	show: function () {
		$("#loadingProgress").show();
	},
};

// 千位分隔
function NumberAddPoint(num) {
	return String(Math.round(num)).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}

window.addEventListener("resize", getSizes, false);
function getSizes() {
	var zoom1 = ((window.outerWidth - 10) / window.innerWidth) * 100;
	var count = Math.ceil(zoom1) / 100;
	$("html").css("fontSize", 16 / count + "px");
}
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		return;
	}
});
