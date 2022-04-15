// target:目標$("target")
// fps:sprite的圖片數量設定
// endCallback:結束時的callback
// reCallback:重新初始化的callback
function animSprite(target, fps, endCallback, reCallback) {
	if (target.attr("data-anim") === undefined) {
		target.animateSprite({
			fps: fps,
			loop: false,
			complete: function () {
				if (target.css("backgroundPosition") !== "0px 0px") {
					if (endCallback) {
						endCallback();
					}
				}
			},
		});
	} else {
		target.css("background-position", "0 0");
		target.attr("data-anim", false);
		if (reCallback) {
			reCallback();
		}
		target.animateSprite("restart");
	}
}

// 骰子動畫
function animSprite(obj, callback) {
	var _data = {
		target: "",
		fps: 60,
		steps: 12,
		loop: false,
	};
	for (var o in obj) {
		_data[o] = obj[o];
	}
	var time = null;
	var fpsTotal = 0;
	var times = 0;
	if (_data.target.attr("data-anim") === undefined || _data.target.attr("data-anim") === "false") {
		_data.target.attr("data-anim", true);
	} else {
		return;
	}
	function animRun(obj, callback) {
		fpsTotal++;
		if (fpsTotal >= obj.steps && !obj.loop) {
			clearTimeout(time);
			obj.target.attr("data-anim", false);
			obj.target.css("transform", "translateX(0%)");
			if (callback) {
				callback();
			}
		} else {
			time = setTimeout(function () {
				if (fpsTotal >= obj.steps) {
					times = 0;
					fpsTotal = 0;
				} else {
					times += 100 / obj.steps;
				}
				obj.target.css("transform", "translateX(-" + times + "%)");
				animRun(obj, callback);
			}, 1000 / obj.fps);
		}
	}
	animRun(_data, callback);
}

var isAjax = true;
$(".start").on("click", function () {
	if (!isAjax) return;
	isAjax = false;
	animWrap($(".sprite-img"), 22, function () {
		$.ajax({
			url: "https://randomuser.me/api/",
			dataType: "json",
			success: function (data) {
				isAjax = true;
				var user = data.results[0];
				$("#user").text(user.name.first + " " + user.name.last);
			},
		});
	});
});
var t1 = gsap.timeline();
var t1Anim = false;
function BoatAnim() {
	var steps = 13;
	var bgx = -steps * 100 + "%";
	var s = 0.1;
	if (t1.repeat() === 0) {
		if (!t1.isActive()) {
			t1.set(".event-boat-bg", {
				backgroundPosition: 0,
			});
			t1.to(".event-boat-bg", s * steps, {
				backgroundPosition: bgx,
				ease: SteppedEase.config(steps),
				onComplete: function () {
					t1.set(".event-boat-bg", {
						backgroundPosition: 0,
					});
				},
			});
		} else {
			t1.restart();
		}
	}
	if (t1.repeat() === -1 && !t1Anim) {
		t1Anim = true;
		t1.set(".event-boat-bg", {
			backgroundPosition: 0,
		});
		t1.to(".event-boat-bg", s * steps, {
			backgroundPosition: bgx,
			ease: SteppedEase.config(steps),
			onComplete: function () {
				t1.set(".event-boat-bg", {
					backgroundPosition: 0,
				});
			},
		});
	}
}
