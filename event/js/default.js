// fullpage 換頁動畫
function m(t) {
	t = t - 1;
	var e = $(".sec" + t + "-con .sec-inner2");
	gsap.to(e, {
		delay: 1,
		scale: 1,
		opacity: 1,
		filter: "blur(0px) grayscale(0%)",
		duration: 0.5,
		ease: "power1.in",
	});
}

// window.location.href = "#info";
function animIn(t) {
	var title = $(".sec" + t + "-title");
	var tab = $(".sec" + t + "-info");
	var bg = $(".bg" + t);
	gsap.to(title, {
		marginTop: 0,
		opacity: 1,
		duration: 1,
		ease: "easeInOutCubic",
	});
	gsap.to(tab, {
		opacity: 1,
		duration: 1,
		ease: "easeInOutCubic",
	});
	gsap.to(bg, {
		scale: 1,
		duration: 1,
		ease: "easeInOutCubic",
	});
}
function animOut(t) {
	var bg = $(".bg" + t);
	gsap.set(bg, {
		scale: 1.5,
	});
}
var loading = false;
loadingProgress({
	loadedFN: function () {
		var footer = $(".UNI-footer").clone();
		if (!isMobile.any) {
			$(".UNI-footer").remove();
			$(".sec6-con .sec-inner").append(footer);
		}
	},
	detectVideo: false,
	autoHide: false,
});
if (!isMobile.any) {
	$("#fullpage").fullpage({
		menu: "#menu",
		anchors: ["section1", "section2", "section3", "section4", "section5", "section6"],
		scrollingSpeed: 500,
		scrollOverflow: true,
		scrollOverflowReset: true,
		keyboardScrolling: false,
		css3: false,
		afterLoad: function (origin, destination) {
			$(".sec-anim").attr("style", "");
			$(".bg").attr("style", "");
			animOut(destination);
			switch (destination) {
				case 1:
					function charMove(t, n, r) {
						var e = $(".sec1-con");
						if (e[0]) {
							var o = t.pageX - e.offset().left;
							var i = t.pageY - e.offset().top;
							gsap.to(n, {
								duration: 0.3,
								x: ((o - e.width() / 2) / e.width()) * r,
								y: ((i - e.height() / 2) / e.height()) * r,
								ease: "none",
							});
						}
					}
					gsap.to(".sec1-con .sec-anim", {
						opacity: 1,
						stagger: 0.2,
						duration: 0.5,
						ease: "power3.out",
						onComplete: function () {
							if (!isMobile.any) {
								$(".sec1-con").on("mousemove", function (e) {
									charMove(e, ".sec1-char1", -50);
									charMove(e, ".sec1-char2", 25);
									charMove(e, ".sec1-char3", 50);
								});
							}
						},
					});
					gsap.to(".sec1-logo, .sec1-slogan", {
						rotateX: 0,
						duration: 0.5,
						stagger: 0.2,
						ease: "power3.out",
					});
					break;
				case 2:
					$(".bg").fadeOut("fast");
					$(".bg2").fadeIn();
					$(".bg2 .video-bg video")[0].play();
					animIn(destination);
					$.fn.fullpage.setAllowScrolling(true);
					break;
				case 3:
					$(".bg").fadeOut("fast");
					$(".bg3").fadeIn();
					animIn(destination);
					break;
				case 4:
					$(".bg").fadeOut("fast");
					$(".bg4").fadeIn();
					$(".bg4 .video-bg video")[0].play();
					animIn(destination);
					break;
				case 5:
					$(".bg").fadeOut("fast");
					$(".bg5").fadeIn();
					$(".bg5 .video-bg video")[0].play();
					animIn(destination);
					break;
				case 6:
					$(".bg").fadeOut("fast");
					$(".bg6").fadeIn();
					animIn(destination);
					break;
			}
			if (!isMobile.any) {
				destination < 2 ? $("#menu,.logo,.btn-top").fadeOut("fast") : $("#menu,.logo,.btn-top").fadeIn("fast");
			} else {
				destination < 2 ? $(".btn-top").fadeOut("fast") : $(".btn-top").fadeIn("fast");
			}
		},
		onLeave: function (index) {},
	});
} else {
	$(".btn-top").on("click", function () {
		$("body,html").animate({
			scrollTop: 0,
		});
	});
}

// 右側選單控制
function setMenuPos() {
	if ($(window).scrollTop() > 40) {
		$(".menu").css({ top: "0" });
	} else {
		$(".menu").css({ top: 40 - $(window).scrollTop() + "px" });
	}
}
setMenuPos();

$(window).on("scroll", function () {
	setMenuPos();
});

$(".menu .wrap").mCustomScrollbar({
	autoHideScrollbar: true,
	scrollInertia: 100,
});

$(".toggle").on("click", function () {
	if (!$(this).is(".closed")) {
		$(this).addClass("closed");
		$(".menu").addClass("hide");
	} else {
		$(this).removeClass("closed");
		$(".menu").removeClass("hide");
	}
});
loadingProgress({
	loadedFN: function () {},
	detectVideo: false,
	autoHide: true,
});
