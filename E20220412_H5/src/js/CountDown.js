function Time(time) {
	var end = +new Date(time);
	var timeInterval;
	var endCallback;
	var runCallback;
	var timeObj = {
		d: 0,
		h: 0,
		m: 0,
		s: 0,
		start() {
			timeInterval = setInterval(function () {
				var nowTime = +new Date();
				var leftTime = parseInt(end - nowTime);
				d = parseInt(leftTime / (24 * 60 * 60 * 1000));
				h = parseInt((leftTime / (60 * 60 * 1000)) % 24);
				m = parseInt((leftTime / (60 * 1000)) % 60);
				s = parseInt((leftTime / 1000) % 60);
				if (leftTime <= 0) {
					endCallback();
					clearInterval(timeInterval);
				} else {
					runCallback();
				}
			}, 1000);
			return this;
		},
		run(fn) {
			runCallback = fn;
			return this;
		},
		endRun(fn) {
			endCallback = fn;
			return this;
		},
	};
	return timeObj;
}
Time("2020/12/30 10:30:00")
	.start()
	.run(function () {
		console.log(s);
	})
	.endRun(function () {
		console.log("end");
	});
