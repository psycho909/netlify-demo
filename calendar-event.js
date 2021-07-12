!(function (a) {
	var b = /iPhone/i,
		c = /iPod/i,
		d = /iPad/i,
		e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
		f = /Android/i,
		g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
		h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
		i = /Windows Phone/i,
		j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
		k = /BlackBerry/i,
		l = /BB10/i,
		m = /Opera Mini/i,
		n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
		o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
		p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
		q = function (a, b) {
			return a.test(b);
		},
		r = function (a) {
			var r = a || navigator.userAgent,
				s = r.split("[FBAN");
			if (("undefined" != typeof s[1] && (r = s[0]), (s = r.split("Twitter")), "undefined" != typeof s[1] && (r = s[0]), (this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }), (this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }), (this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }), (this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }), (this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }), (this.seven_inch = q(p, r)), (this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch), (this.phone = this.apple.phone || this.android.phone || this.windows.phone), (this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet), "undefined" == typeof window)) return this;
		},
		s = function () {
			var a = new r();
			return (a.Class = r), a;
		};
	"undefined" != typeof module && module.exports && "undefined" == typeof window ? (module.exports = r) : "undefined" != typeof module && module.exports && "undefined" != typeof window ? (module.exports = s()) : "function" == typeof define && define.amd ? define("isMobile", [], (a.isMobile = s())) : (a.isMobile = s());
})(this);
(function (exports) {
	var vConsole = new VConsole();
	var MS_IN_MINUTES = 60 * 1000;
	var CONFIG = {
		selector: ".calendar-event",
		duration: 60,
		texts: {
			title: "行事曆提醒",
			download: "Calendar-event.ics",
			google: "Google 活動行事曆提醒",
			ios: "IOS 活動行事曆提醒",
			outlook: "Outlook 活動行事曆提醒",
			ienoblob: "Sorry, your browser does not support downloading Calendar events.",
		},
	};
	var calendarData = {
		google: "",
		ios: "",
		outlook: "",
	};
	var ieCanDownload = "msSaveOrOpenBlob" in window.navigator;
	var ieMustDownload = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(navigator.userAgent);
	var calendarGenerators = {
		google: function (event) {
			var startTime, endTime;
			startTime = formatTime(event.start);
			endTime = formatTime(event.end);
			var href = encodeURI(["https://www.google.com/calendar/render", "?action=TEMPLATE", "&text=" + (event.title || ""), "&dates=" + (startTime || ""), "/" + (endTime || ""), "&ctz='Asia/Taipei'", "&details=" + (event.description || ""), "&location=" + (event.address || ""), "&sprop=&sprop=name:"].join(""));
			calendarData.google = href;
			return '<a class="calendar-google' + " " + event.cls + '" target="_blank" href="' + href + '">' + CONFIG.texts.google + "</a>";
		},
		ics: function (event, eClass, calendarName) {
			var startTime, endTime;
			startTime = formatTime(event.start);
			endTime = formatTime(event.end);
			var cal = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "URL:" + document.URL, "DTSTART:" + (startTime || ""), "DTEND:" + (endTime || ""), "SUMMARY:" + (event.title || ""), "DESCRIPTION:" + (event.description || ""), "LOCATION:" + (event.address || ""), "UID:" + (event.id || "") + "-" + document.URL, "END:VEVENT", "END:VCALENDAR"].join("\n");
			if (ieMustDownload) {
				return '<a class="' + eClass + '" onclick="ieDownloadCalendar(\'' + escapeJSValue(cal) + "')\">" + calendarName + "</a>";
			}

			var href = encodeURI("data:text/calendar;charset=utf8," + cal);
			calendarData.ics = href;
			calendarData.ios = href;
			calendarData.outlook = href;
			return '<a class="' + eClass + " " + event.cls + '" download="' + CONFIG.texts.download + '" href="' + href + '">' + calendarName + "</a>";
		},
		ios: function (event) {
			return this.ics(event, "calendar-ios", CONFIG.texts.ios);
		},
		outlook: function (event) {
			return this.ics(event, "calendar-outlook", CONFIG.texts.outlook);
		},
	};
	var formatTime = function (date) {
		return date.toISOString().replace(/-|:|\.\d+/g, "");
	};
	var getEndDate = function (start, duration) {
		return new Date(start.getTime() + duration * MS_IN_MINUTES);
	};
	var escapeJSValue = function (text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/\'/g, "\\'")
			.replace(/(\r?\n|\r)/gm, "\\n");
	};
	var generateMarkup = function (calendars) {
		var calendarBox = document.createElement("div");
		calendarBox.className = "calendar-box";

		Object.keys(calendars).forEach(function (services) {
			calendarBox.innerHTML += calendars[services];
		});

		addCSS();
		return calendarBox;
	};
	var addCSS = function () {
		if (!document.getElementById("calendar-css")) {
			document.getElementsByTagName("head")[0].appendChild(generateCSS());
		}
	};

	var generateCSS = function () {
		var styles = document.createElement("style");
		styles.id = "calendar-css";

		styles.innerHTML = ".calendar-event{position:relative;text-align:left}.calendar-event>span{display:none}";
		return styles;
	};
	var generateCalendar = function (event) {
		var useragent = navigator.userAgent;
		var reg = /BeaGo/gi;
		var google = "";
		var ios = "";
		var outlook = "";
		if (!isMobile.any) {
			google = calendarGenerators.google(event);
			outlook = calendarGenerators.outlook(event);
		} else {
			if (useragent.indexOf("BeaGo") > -1 || reg.test(useragent)) {
				console.log("BeaGo");
				return true;
			} else {
				console.log(useragent);
				console.log("No BeaGo!!!");
				if (isMobile.android.device) {
					return {
						google: google,
						ios: ios,
						outlook: outlook,
					};
				}
				if (isMobile.apple.device) {
					if (useragent.match("CriOS")) {
						google = calendarGenerators.google(event);
					} else {
						ios = calendarGenerators.ios(event);
						google = calendarGenerators.google(event);
					}
				}
			}
		}
		return {
			google: google,
			ios: ios,
			outlook: outlook,
		};
	};
	var sanitizeParams = function (params) {
		if (!params.data) {
			params.data = {};
		}
		if (params.data.end) {
			delete params.data.duration;
		} else {
			if (!params.data.duration) {
				params.data.duration = CONFIG.duration;
			}
		}
		if (params.data.duration) {
			params.data.end = getEndDate(params.data.start, params.data.duration);
		}

		params.data.tzstart = params.data.start;
		params.data.tzend = params.data.end;

		if (!params.data.title) {
			params.data.title = CONFIG.texts.title;
		}
		if (!params.data.download) {
			params.data.download = CONFIG.texts.download + ".ics";
		}
	};
	var validParams = function (params) {
		return params.data !== undefined && params.data.start !== undefined && (params.data.end !== undefined || params.data.allday !== undefined);
	};
	var parseCalender = function (elm) {
		var data = {},
			node;

		var cls = elm.className
			.split(" ")
			.filter(function (v) {
				return v != "calendar-box";
			})
			.join(" ");
		cls ? (data.cls = cls) : (data.cls = "");

		node = elm.querySelector(".google-name");
		if (node) CONFIG.texts.google = node.textContent;
		node = elm.querySelector(".ios-name");
		if (node) CONFIG.texts.ios = node.textContent;
		node = elm.querySelector(".outlook-name");
		if (node) CONFIG.texts.outlook = node.textContent;

		node = elm.querySelector(".start");
		if (node) data.start = new Date(node.textContent);

		node = elm.querySelector(".end");
		if (node) data.end = new Date(node.textContent);

		node = elm.querySelector(".duration");
		if (node) data.duration = 1 * node.textContent;

		node = elm.querySelector(".allday");
		if (node) data.allday = true;

		node = elm.querySelector(".title");
		if (node) data.title = node.textContent;

		node = elm.querySelector(".description");
		if (node) data.description = node.textContent;

		node = elm.querySelector(".address");
		if (node) data.address = node.textContent;
		if (!data.address) {
			node = elm.querySelector(".location");
			if (node) data.address = node.textContent;
		}

		node = elm.querySelector(".download");
		if (node) {
			data.download = node.textContent;
			CONFIG.texts.download = node.textContent + ".ics";
		}

		cal = createCalendar({ data: data });
		if (cal) elm.appendChild(cal);
		return cal;
	};
	exports.ieDownloadCalendar = function (cal) {
		if (ieCanDownload) {
			var blob = new Blob([cal], { type: "text/calendar" });
			window.navigator.msSaveOrOpenBlob(blob, CONFIG.texts.download);
		} else {
			alert(CONFIG.texts.ienoblob);
		}
	};
	exports.createCalendar = function (params) {
		return addToCalendar(params);
	};
	exports.addToCalendar = function (params) {
		if (params instanceof HTMLElement) {
			return parseCalender(params);
		}
		if (params instanceof NodeList) {
			var success = params.length > 0;
			Array.prototype.forEach.call(params, function (node) {
				success = success && addToCalendar(node);
			});
			return success;
		}
		sanitizeParams(params);
		if (!validParams(params)) {
			console.log("Event details missing.");
			return;
		}
		return generateMarkup(generateCalendar(params.data));
	};
	exports.calendarData = calendarData;
	exports.calendarInit = function () {
		addToCalendar(document.querySelectorAll(CONFIG.selector));
	};
	document.addEventListener("DOMContentLoaded", function (event) {
		addToCalendar(document.querySelectorAll(CONFIG.selector));
	});
})(this);
