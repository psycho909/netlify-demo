export function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			if (url) window.location.href = url;
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				target: false,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				},
			},
			{
				text: "取消",
				class: "btn-cancel",
				click: function () {
					$.gbox.close();
				},
			},
		],
	});
}

export function ComingSoonLB() {
	var config = {
		addClass: "default lb-comingsoon",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `<div class="lb-comingsoon-content"></div>`;
	$.gbox.open(HTML, config);
}

export function VideoLB(video) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	let HTMLContent = `<div class="lb-video__box">
	<iframe src="https://www.youtube.com/embed/${video}?mute=1&autoplay=1" 
			frameborder="0" 
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
			allowfullscreen="false">
	</iframe>
</div>`;
	$.gbox.open(HTMLContent, config);
}
