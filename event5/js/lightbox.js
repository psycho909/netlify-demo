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
		// 處理 YouTube 影片
		HTMLContent = `<div class="lb-video__box">
            <iframe src="https://www.youtube.com/embed/${data.yt}?enablejsapi=1&amp;origin=https%3A%2F%2Falpha-tw.beanfun.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>`;
	} else if (data.fb) {
		// 處理 Facebook 影片
		HTMLContent = `
            <div id="fb-root"></div>
            <div class="lb-video__box">
                <div class="fb-video" 
                     data-href="${data.fb}" 
                     data-width="560" 
                     data-height="314" 
                     data-allowfullscreen="false">
                </div>
            </div>`;
	}

	// 開啟彈窗
	$.gbox.open(HTMLContent, {
		addClass: "default lb-video",
		hasCloseBtn: true,
		hasActionBtn: false
	});

	// 確保 Facebook SDK 已加載
	if (data.fb) {
		if (!window.FB) {
			(function (d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			})(document, "script", "facebook-jssdk");
		}

		// 初始化 Facebook SDK 並解析 fb-video
		window.fbAsyncInit = function () {
			FB.init({
				appId: "YOUR_APP_ID", // 如果沒有應用程式 ID，可以留空
				xfbml: true,
				version: "v17.0"
			});
			FB.XFBML.parse(); // 解析 fb-video 標籤
		};
	}
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
