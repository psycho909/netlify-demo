function copyLink(target, copy) {
	var clipboard = new ClipboardJS(target, {
		text: function () {
			return copy;
		},
	});
	clipboard.on("success", function (e) {
		$.gbox.open("已複製連結");
		clipboard.destroy();
	});
}
var Share = {
	getMeta: function () {
		var meta = document.getElementsByTagName("meta");
		var desc;
		for (var i = 0; i < meta.length; i++) {
			if (meta[i].name === "description") {
				desc = meta[i].content;
			}
		}
		return desc;
	},
	fb: function (url) {
		var t = "";
		if (isMobile.any) {
			var winRef = window.open(url, "_blank");
			winRef.location = "http://www.facebook.com/sharer/sharer.php?u=" + url;
		} else {
			window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(t), "sharer", "toolbar=0,status=0,width=626,height=436");
		}
	},
	mobileShare: function (target, url) {
		var url = url || location.href;
		var t = this.getMeta();
		var title = document.getElementsByTagName("title")[0].innerHTML;
		var shareData = {
			url: url, // 要分享的 URL
			title: title, // 要分享的標題
			text: t, // 要分享的文字內容
		};
		if (isMobile.any) {
			if (navigator.share) {
				navigator.share(shareData);
			} else {
				copyLink(target, url);
			}
		} else {
			this.fb(url);
		}
	},
};
