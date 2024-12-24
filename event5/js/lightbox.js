export function LBVideo(data) {
	let HTMLContent;

	if (data.yt) {
		HTMLContent = `<div class="lb-video__box">
            <iframe src="https://www.youtube.com/embed/${data.yt}?enablejsapi=1&amp;origin=https%3A%2F%2Falpha-tw.beanfun.com" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="">
            </iframe>
        </div>`;
	} else if (data.fb) {
		HTMLContent = `
            <div id="fb-root"></div>
            <div class="lb-video__box">
                <div class="fb-video" 
                     data-href="${data.fb}" 
                     data-allowfullscreen="false"
					 >
                </div>
            </div>`;
	}

	// 載入 Facebook SDK 的函數
	const loadFacebookSDK = () => {
		return new Promise((resolve, reject) => {
			if (window.FB) {
				resolve();
				return;
			}

			// 設定 callback
			window.fbAsyncInit = function () {
				FB.init({
					appId: "YOUR_APP_ID",
					xfbml: true,
					version: "v17.0"
				});
				FB.Event.subscribe("xfbml.ready", function (msg) {
					if (msg.type === "video") {
						msg.instance.mute();
					}
				});
				resolve();
			};

			// 載入 SDK
			const js = document.createElement("script");
			js.id = "facebook-jssdk";
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			js.onerror = reject;

			const fjs = document.getElementsByTagName("script")[0];
			fjs.parentNode.insertBefore(js, fjs);
		});
	};

	// 初始化 Facebook 影片
	const initFacebookVideo = async () => {
		try {
			await loadFacebookSDK();
			// 確保元素已經在 DOM 中
			setTimeout(() => {
				if (window.FB) {
					FB.XFBML.parse();
				}
			}, 100);
		} catch (error) {
			console.error("Failed to initialize Facebook video:", error);
		}
	};

	// 開啟彈窗
	$.gbox.open(HTMLContent, {
		addClass: "default lb-video",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			if (data.fb) {
				initFacebookVideo();
			}
		}
	});
}
