$(".account-list").mCustomScrollbar({
	theme: "light",
	contentTouchScroll: true,
	mouseWheel: {
					preventDefault: true
				},
	advanced: { extraDraggableSelectors: ".account-list" },
});
