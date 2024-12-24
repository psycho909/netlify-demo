export function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

export function LBImage(image) {
	let HTML = `<div class="lb-image__box"><img src="${image}" alt="" /></div>`;
	$.gbox.open(HTML, {
		addClass: "default lb-image ",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

export function LBVideo(data) {
	let HTMLContent;

	if (data.yt) {
		HTMLContent = `<div class="lb-video__box">
			<iframe src="https://www.youtube.com/embed/${data.yt}?enablejsapi=1&amp;origin=https%3A%2F%2Falpha-tw.beanfun.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
		</div>`;
	} else if (data.fb) {
		HTMLContent = `<div class="lb-video__box">
			<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=${data.fb}&show_text=false&width=560&t=0"        width="560" 
        height="314" 
        style="border:none;overflow:hidden" 
        scrolling="no" 
        frameborder="0" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
		</div>`;
	}
	$.gbox.open(HTMLContent, {
		addClass: "default lb-video",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

export function LBRole(data) {
	let HTML = `<div class="lb-role__box">
		<div class="lb-role__body" data-role="${data.role}">
			<div class="lb-role__title">${data.title}</div>
			<div class="lb-role__text">${data.text}</div>
		</div>
	</div>`;
	$.gbox.open(HTML, {
		addClass: "default lb-role",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}
