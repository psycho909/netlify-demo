function Gallery(className, movie, scroll = true) {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		clickBgClose: true,
		afterOpen: function () {
			if (scroll == true) {
				$(".lb-pop").mCustomScrollbar({
					theme: "light",
					contentTouchScroll: true,
					mouseWheel: {
						preventDefault: true,
					},
					advanced: { extraDraggableSelectors: ".lb-pop" },
				});
			}
			if (movie) {
				$(".lb-info video")[0].play();
			}
		},
		afterClose: function () {
			$.gbox.close();
		},
	};
	defaultObj.addClass = `default ${className}`;
	if (movie) {
		movie = `./assets/css/video/${movie}.mp4`;
	}
	var HTML = `<div class="lb-content lb-pop"><div class="lb-info">${movie ? '<video src="' + movie + '" muted autoplay playsinline webkit-playsinline loop></video>' : ""}</div></div>`;
	$.gbox.open(HTML, defaultObj);
}

$(".lb-btn").on("click", function () {
	let pop = $(this).attr("data-pop");
	let movie = $(this).attr("data-movie");
	let scroll = $(this).attr("data-scroll");
	Gallery(pop, movie, scroll);
});
