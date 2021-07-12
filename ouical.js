(function (exports) {
	var MS_IN_MINUTES = 60 * 1000;
	var escapeJSValue = function (text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/\'/g, "\\'")
			.replace(/(\r?\n|\r)/gm, "\\n");
	};
	var formatTime = function (date) {
		return date.toISOString().replace(/-|:|\.\d+/g, "");
	};

	var calculateEndTime = function (event) {
		return event.end ? formatTime(event.end) : formatTime(new Date(event.start.getTime() + event.duration * MS_IN_MINUTES));
	};

	var calendarGenerators = {
		google: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);

			var href = encodeURI(["https://calendar.google.com/calendar/render", "?action=TEMPLATE", "&text=" + (event.title || ""), "&dates=" + (startTime || ""), "/" + (endTime || ""), "&details=" + (event.description || ""), "&sprop=&sprop=name:"].join(""));
			return href;
		},

		ics: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);
			var cal = ["BEGIN:VCALENDAR", "PRODID:Calendar", "VERSION:2.0", "BEGIN:VEVENT", "CLASS:PUBLIC", "DESCRIPTION:" + (event.description || ""), "DTSTART:" + (startTime || ""), "DTEND:" + (endTime || ""), "SUMMARY:" + (event.title || ""), "TRANSP:TRANSPARENT", "BEGIN:VALARM", "ACTION:DISPLAY", "SUMMARY:" + (event.title || ""), "DESCRIPTION:" + (event.description || ""), "TRIGGER:-PT10M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\n");

			// return escapeJSValue(cal);
			return cal;
		},

		ical: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);

			var href = encodeURI("data:text/calendar;charset=utf8," + ["BEGIN:VCALENDAR", "PRODID:Calendar", "VERSION:2.0", "BEGIN:VEVENT", "CLASS:PUBLIC", "DESCRIPTION:" + (event.description || ""), "DTSTART:" + (startTime || ""), "DTEND:" + (endTime || ""), "SUMMARY:" + (event.title || ""), "TRANSP:TRANSPARENT", "BEGIN:VALARM", "ACTION:DISPLAY", "SUMMARY:" + (event.title || ""), "DESCRIPTION:" + (event.description || ""), "TRIGGER:-PT10M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\n"));

			return href;
		},
		ios: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);

			var href = encodeURI("data:text/calendar;charset=utf8," + ["BEGIN:VCALENDAR", "PRODID:Calendar", "VERSION:2.0", "BEGIN:VEVENT", "CLASS:PUBLIC", "DESCRIPTION:" + (event.description || ""), "DTSTART:" + (startTime || ""), "DTEND:" + (endTime || ""), "SUMMARY:" + (event.title || ""), "TRANSP:TRANSPARENT", "BEGIN:VALARM", "ACTION:DISPLAY", "SUMMARY:" + (event.title || ""), "DESCRIPTION:" + (event.description || ""), "TRIGGER:-PT10M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\n"));

			return href;
		},
		outlook: function (event) {
			return this.ics(event);
		},
		outlooklive: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);
			var href = encodeURI(["https://outlook.live.com/calendar/0/deeplink/compose?", "?path=/calendar/action/compose&rru=addevent", "&subject=" + (event.title || ""), "&startdt=" + (startTime || ""), "&enddt=" + (endTime || ""), "&body=" + (event.description || "")].join(""));

			return href;
		},
	};

	var generateCalendars = function (event) {
		return {
			google: calendarGenerators.google(event),
			ical: calendarGenerators.ical(event),
			ios: navigator.userAgent.match("CriOS") ? calendarGenerators.google(event) : calendarGenerators.ios(event),
			outlook: calendarGenerators.outlook(event),
			outlooklive: calendarGenerators.outlooklive(event),
			ics: calendarGenerators.ics(event),
		};
	};

	// Make sure we have the necessary event data, such as start time and event duration
	var validParams = function (params) {
		return params.data !== undefined && params.data.start !== undefined && (params.data.end !== undefined || params.data.duration !== undefined);
	};

	exports.createCalendar = function (params) {
		if (!validParams(params)) {
			console.log("Event details missing.");
			return;
		}

		return generateCalendars(params.data);
	};
})(this);

function calender(e) {
	return new this(e);
}

document.addEventListener("DOMContentLoaded", function () {
	var elementA = document.createElement("a");
	var userAgent = navigator.userAgent;
	elementA.className = "gama-calender";

	var targetScript = document.getElementById("gama-calender");
	var calenderData = {
		title: targetScript.getAttribute("title") || "",
		start: new Date(targetScript.getAttribute("start")) || "",
		end: new Date(targetScript.getAttribute("end")) || "",
		description: targetScript.getAttribute("description") || "",
	};

	var myCalendar = createCalendar({
		data: calenderData,
	});

	var calenderEvent = "";
	var device;
	if (userAgent.indexOf("Android") > -1) {
		calenderEvent = myCalendar.google;
		device = "android";
	}
	if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
		var _chrome = userAgent.match("CriOS");
		if (!_chrome) {
			calenderEvent = myCalendar.ical;
			device = "iphone safari";
		} else {
			calenderEvent = myCalendar.google;
			device = "iphone chrome";
		}
	}
	device ? (elementA.href = calenderEvent) : (elementA.href = "javascript:;");
	document.getElementsByTagName("body")[0].insertAdjacentElement("beforeEnd", elementA);
	calender = {
		android: myCalendar.google,
		outlook: myCalendar.outlook,
		ios: myCalendar.ical,
		google: myCalendar.google,
		outlooklive: myCalendar.outlooklive,
		device: device,
		ics: myCalendar.ics,
		ical: myCalendar.ical,
	};
});
