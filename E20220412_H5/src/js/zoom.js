window.addEventListener(
	"resize",
	function () {
		getSizes(768, 1334);
	},
	false
);
function getSizes(w = 768, h = 1334) {
	// 手機板時滿版
	if (isMobile.any) {
		var zoom = window.outerWidth / width;
		var zoom2 = window.innerHeight / zoom;
		let zoom1;
		if (zoom2 < height) {
			zoom1 = window.innerHeight / height;
		} else {
			zoom1 = window.outerWidth / width;
		}
		$("html").css("fontSize", 16 * zoom1 + "px");
	} else {
		// 防止瀏覽器縮放改變
		let zoom1 = ((window.outerWidth - 10) / window.innerWidth) * 100;
		var count = Math.ceil(zoom1) / 100;
		$("html").css("fontSize", 16 / count + "px");
	}
}
getSizes(768, 1334);
