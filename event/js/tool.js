export const endEvent = "2023/6/20 00:00";
export const removeCalenderTime = "2023/6/20 12:00";
export const surveyCake = "https://survey.beanfun.com/s/0DGl3";
export const step2Event = [
	{
		title: "究極燃燒",
		info: "等級練1送2，升等速度狂飆300%，直衝LV250！",
		link: "",
		img: "./assets/css/images/sec2/sec2-pop1.png",
		show: false,
		calender: {
			text: "6/20 究極燃燒，等級突破就是現在！",
			begin: "2023/6/20 00:00",
			end: "2020/6/20 23:59"
		}
	},
	{
		title: "溫餐廳",
		info: "活動限定地圖〈溫餐廳〉熱鬧開張，和冒險夥伴一起盡情探索吧！",
		link: "",
		img: "./assets/css/images/sec2/sec2-pop2.png",
		show: false,
		calender: {
			text: "6/20 溫餐廳，熱鬧開張！",
			begin: "2023/6/20 00:00",
			end: "2020/6/20 23:59"
		}
	},
	{
		title: "卡莉的旅程",
		info: "新職業〈卡莉〉席捲登場,快來享受全新冒險吧！",
		link: "",
		img: "./assets/css/images/sec2/sec2-pop3.png",
		show: false,
		calender: {
			text: "7/5 全新職業-卡莉，席捲登場！",
			begin: "2023/7/5 15:00",
			end: "2020/7/5 23:59"
		}
	},
	{
		title: "桃花境咖凌",
		info: "新地圖〈桃花境〉開放！超強Boss〈咖凌〉等你征服！",
		link: "",
		img: "./assets/css/images/sec2/sec2-pop4.jpg",
		show: false,
		calender: {
			text: "8/9 桃花境咖凌，等你征服！",
			begin: "2023/8/9 00:00",
			end: "2020/8/9 23:59"
		}
	}
];

export function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
export function loadingHide() {
	$("#loadingProgress").hide();
}
export function CanvasSprite(target, step, speed) {
	this.imgArr = [];
	this.index = 0;
	this.loop = false;
	this.target = target;
	this.el = null;
	this.step = step;
	this.width = 0;
	this.height = 0;
	this.speed = speed || step / 2;
	this.Init();
}
CanvasSprite.prototype.Init = function () {
	this.el = this.target[0].getContext("2d");
	$(this.el.canvas).addClass("loading");
};
CanvasSprite.prototype.PreLoad = function (path, name = "") {
	var count = 0;
	var _this = this;
	return new Promise((resolve, reject) => {
		for (var i = 0; i < this.step; i++) {
			let numPart = name.substring(name.lastIndexOf("_") + 1);
			let newName = name.replace(numPart, i.toString().padStart(numPart.length, "0"));
			this.imgArr[i] = new Image();
			this.imgArr[i].src = path + newName + ".png";
			this.imgArr[i].onload = function () {
				_this.width = this.width;
				_this.height = this.height;
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					_this.Draw(0);
					resolve(true);
				}
			};
			this.imgArr[i].onerror = function () {
				++count;
				if (count == _this.step) {
					$(_this.el.canvas).removeClass("loading");
					reject(true);
				}
			};
		}
	});
};
CanvasSprite.prototype.Run = function (callback) {
	clearInterval(this.loop);
	var _this = this;
	this.loop = setInterval(function () {
		if (_this.index > _this.step - 1) {
			_this.index = 0;
			clearInterval(_this.loop);
			if (callback) {
				callback();
			}
		}
		_this.Draw(_this.index);

		_this.index++;
	}, this.speed);
};
CanvasSprite.prototype.Loop = function () {
	clearInterval(this.loop);
	this.loop = setInterval(() => {
		if (this.index > this.step - 1) {
			this.index = 0;
		}
		this.Draw(this.index);

		this.index++;
	}, this.speed);
};
CanvasSprite.prototype.Stop = function () {
	this.index = 0;
	clearInterval(this.loop);
	this.Draw(this.index);
};
CanvasSprite.prototype.Draw = function (index) {
	this.el.clearRect(0, 0, this.width, this.height);
	if (this.imgArr[index].complete) {
		this.el.drawImage(this.imgArr[index], 0, 0);
	}
};
export function particlesBg(id) {
	particlesJS(id, {
		particles: {
			number: {
				value: 40,
				density: {
					enable: false,
					value_area: 0
				}
			},
			color: {
				value: "#fff"
			},
			shape: {
				type: "image", //[image,circle,star...]如果是image以下不管用
				stroke: {
					width: 1, //筆畫
					color: "#f0f" //筆畫顏色
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src: "./assets/css/images/gold.png",
					width: 28,
					height: 28
				}
			},
			opacity: {
				value: 0.5,
				random: false,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 5, //產生大小
				random: false, //隨機
				anim: {
					enable: false, //產生閃爍
					speed: 40,
					size_min: 1,
					sync: false
				}
			},
			line_linked: {
				enable: false //是否產生連線
			},
			move: {
				enable: true, //true
				speed: 3, //移動速度
				direction: "bottom-top", //移動方向
				random: true,
				straight: false, //是否隨著方向固定移動
				out_mode: "out", //移動出視窗
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 1200
				}
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: false
				},
				onclick: {
					enable: false
				},
				resize: true
			},
			modes: {
				repulse: {
					distance: 200,
					duration: 0.4
				},
				remove: {
					particles_nb: 10
				}
			}
		},
		retina_detect: true
	});
}
