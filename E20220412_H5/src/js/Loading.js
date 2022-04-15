var Loading = {
	loadingTime: "",
	i: 0,
	body: document.querySelector("body"),
	start: function () {
		var _this = this;
		var loadingHTML = '<div class="loading-module"><div class="loading"></div></div>';
		this.body.insertAdjacentHTML("afterbegin", loadingHTML);

		this.loadingTime = setInterval(function () {
			_this.i++;
			document.querySelector(".loading").style.cssText = "-ms-transform:rotate(" + _this.i + "deg);-webkit-transform:rotate(" + _this.i + "deg);transform:rotate(" + _this.i + "deg);";
		}, 5);
	},
	stop: function () {
		clearInterval(this.loadingTime);
		this.body.removeChild(document.querySelector(".loading-module"));
	},
};
