function debounce(fn, delay) {
	var timeoutID = null;
	return function (args) {
		var that = this;
		var _args = args;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {
			fn.call(that, _args);
		}, delay);
	};
}

function Exchange(code) {}

// fn : 放需要debounce的function
var debouncedLog = debounce(fn, 300);

// code : 傳function裡面的參數
debouncedLog(code);
