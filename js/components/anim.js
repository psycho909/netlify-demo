function runAnimation(element) {
	const rect = element.getBoundingClientRect();
	const startX = 0; // 初始 x 座標
	const startY = 0; // 初始 y 座標
	const endX = -rect.x - 100; // 結束 x 座標
	const endY = rect.x + 100; // 結束 y 座標
	gsap.fromTo(
		element,
		{
			x: startX,
			y: startY,
			opacity: 1
		},
		{
			x: endX,
			y: endY,
			opacity: 0,
			duration: 3,
			ease: "power1.out",
			repeat: -1,
			repeatDelay: 2,
			onRepeat: () => {
				// 可在每次重複時執行的操作
			}
		}
	);
}

function MapleAnim() {
	const animMaples = document.querySelectorAll(".anim-maple");

	animMaples.forEach((animMaple, index) => {
		const spanElement = animMaple.querySelector("span");

		const tl = gsap.timeline({
			repeat: -1, // 無限重複
			repeatDelay: (Math.floor(Math.random() * 2) + 1) * index // 不同元素之間以2秒間隔重複
		});

		tl.fromTo(spanElement, { opacity: 1 }, { opacity: 0, duration: 0.5 }).fromTo(spanElement, { opacity: 0 }, { opacity: 1, duration: 0.5 });
	});
}

function createStarField() {
	var canvas, context, alpha;
	var cX, cY, tX, tY, mouseX, mouseY, density;
	var stars = [];
	var cameraDepth = 0;
	var enterWarp, warpStartDepth, warpTime, velocity;

	// define to 0 to brute force move all stars
	const cameraTrick = 1;

	// options
	const starCount = 1024;
	var initVelocity = -1.0;
	var termVelocity = -10.0;
	const topleft = 0;
	const trackMouse = 1;
	const focalPoint = 256;
	const sparcity = 1.0;
	const tailLength = 20;

	// depth modulo fucntion. custom
	function modulo(a) {
		// depth range is 1024
		const b = 1024;
		return a - b * Math.floor(a / b);
	}

	// handles negative numbers correctly
	function modulo2(a, b) {
		return a - b * Math.floor(a / b);
	}

	function Star(index) {
		// randomize a field -1024 to 1024 and positive z
		this.x = (Math.random() * 2048 - 1024) * sparcity;
		this.y = (Math.random() * 2048 - 1024) * sparcity;
		this.z = (starCount - 1 - index) / density;

		if (topleft == 1) {
			this.x = this.x + 1024;
			this.y = this.y + 1024;
		}
	}

	Star.prototype.move = function () {
		// dont really have to move all stars
		this.z = modulo(this.z + velocity);
	};

	Star.prototype.draw = function () {
		// compute depth perspective effect, cameraDepth is used when cameraTrick = 1
		var depth = focalPoint / (modulo(this.z + cameraDepth) + 1);
		var x = this.x * depth + cX;
		var y = this.y * depth + cY;
		var sz = 5 * depth;

		var alpha = 1; // 設置透明度範圍在 0.5 到 1 之間

		context.beginPath();
		context.arc(x, y, sz / 2, 0, Math.PI * 2);
		context.fillStyle = "rgba(231, 231, 231, " + alpha + ")"; // 使用隨機透明度
		context.fill();
	};

	Star.prototype.warpline = function () {
		var depth = modulo(this.z + cameraDepth) + 1;
		var depthStart = modulo(this.z + warpStartDepth) + 1;
		if (depth > depthStart && termVelocity < 0) depth = 1;
		if (depth < depthStart && termVelocity > 0) depthStart = 1;

		var invDepth = focalPoint / depth;
		var invDepthStart = focalPoint / depthStart;

		var x = this.x * invDepth + cX;
		var y = this.y * invDepth + cY;
		var sz = 5 * invDepth;

		var wx = this.x * invDepthStart + cX;
		var wy = this.y * invDepthStart + cY;
		var wsz = 5 * invDepthStart;

		// computed quadrant dictates what 2 edges we see in rendering the trail
		var top = this.y < 0 ? sz : 0;
		var left = this.x < 0 ? sz : 0;
		var alpha = (sz / 5.0 + 0.1) * 0.7;
		// 繪製圓圈而非方塊
		context.beginPath();
		context.arc(wx, wy, wsz / 2, 0, Math.PI * 2);
		context.fillStyle = termVelocity < 0 ? "rgba(64,128,192," + alpha + ")" : "rgba(192,64,32," + alpha + ")";
		context.fill();
	};

	function init() {
		// setup canvas and context
		canvas = document.getElementById("starfield");
		context = canvas.getContext("2d");
		// set canvas to be window dimensions
		resize();
		window.addEventListener("resize", resize);

		// compute center of screen (its really centre but for americans I change it)
		tX = cX = canvas.width / 2;
		tY = cY = canvas.height / 2;

		if (topleft == 1) {
			cX = 0;
			cY = 0;
		}

		density = starCount / 1024;
		for (let i = 0; i < starCount; i++) {
			stars[i] = new Star(i);
		}
		alpha = 6.0;
		enterWarp = false;
		velocity = initVelocity;
	}

	function animate() {
		// movement update
		move();
		// render update
		render();
		// trigger next frame
		requestAnimationFrame(animate);
	}

	function move() {
		if (enterWarp) {
			velocity *= 1.02;
			if (velocity < termVelocity && termVelocity < 0) velocity = termVelocity;
			if (velocity > termVelocity && termVelocity > 0) velocity = termVelocity;
			warpTime = warpTime + 1;
			if (warpTime > 140) enterWarp = false;
			if (warpTime > tailLength) warpStartDepth = modulo(warpStartDepth + velocity);
			// catchup time
			if (warpTime > 130) {
				warpStartDepth = modulo(warpStartDepth + (cameraDepth - warpStartDepth) * 0.3);
			}
		} else {
			// slow down
			var dv = velocity - initVelocity;
			velocity -= dv * 0.01;
		}
		// brute force move.. will replace with camera trick
		if (cameraTrick == 0) {
			for (let i = 0; i < stars.length; i++) {
				stars[i].move();
			}
		} else {
			// camera movement trick
			cameraDepth = modulo(cameraDepth + velocity);
		}

		var dx = tX - cX;
		var dy = tY - cY;
		var dist = Math.sqrt(dx * dx + dy * dy);

		if (dist != 0) {
			dx /= dist;
			dy /= dist;
		}
		dist = Math.min(dist, 512.0);

		cX = cX + dist * dx * 0.06125;
		cY = cY + dist * dy * 0.06125;
	}

	function render() {
		// brute force clear
		context.clearRect(0, 0, canvas.width, canvas.height);

		// draw all stars
		for (let i = 0; i < stars.length; i++) {
			var index = cameraTrick == 1 ? modulo2(i + 1 + Math.floor(cameraDepth) * density, stars.length) : i;
			// depending on direction of travel is order of drawing trails
			if (enterWarp && termVelocity <= 0) stars[index].warpline();
			stars[index].draw();
			if (enterWarp && termVelocity > 0) stars[index].warpline();
		}
	}

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		// 將 cX 和 cY 設置為視窗中央位置
		cX = canvas.width / 2;
		cY = canvas.height / 2;
	}

	function swapView() {
		// inverse the velocities
		initVelocity *= -1;
		termVelocity *= -1;
		velocity *= -1;
		// switch warplines
		if (enterWarp) {
			var tmp = cameraDepth;
			cameraDepth = warpStartDepth;
			warpStartDepth = tmp;
		}
		// change view point of travel
		if (termVelocity > 0) {
			cX = canvas.width - cX;
			cY = canvas.height - cY;
			tX = canvas.width - tX;
			tY = canvas.height - tY;
		} else {
			cX = canvas.width - cX;
			cY = canvas.height - cY;
			tX = mouseX;
			tY = mouseY;
		}
	}

	// entry point
	init();
	animate();
}
const anim = {
	setup() {
		Vue.onMounted(() => {
			MapleAnim();
			const animMeteorElements = document.querySelectorAll(".anim-meteor");
			animMeteorElements.forEach((element) => {
				runAnimation(element);
			});
			createStarField();
		});
	},
	template: `
    <canvas id="starfield"></canvas>
        <div class="section anim">
            <div class="anim-maple" data-anim="1"><span></span></div>
            <div class="anim-maple" data-anim="2"><span></span></div>
            <div class="anim-maple" data-anim="3"><span></span></div>
            <div class="anim-maple" data-anim="4"><span></span></div>
            <div class="anim-maple" data-anim="5"><span></span></div>
            <div class="anim-meteor" data-anim="0"></div>
            <div class="anim-meteor" data-anim="1"></div>
            <div class="anim-meteor" data-anim="2"></div>
            <div class="anim-meteor" data-anim="3"></div>
            <div class="anim-meteor" data-anim="4"></div>
            <div class="anim-meteor" data-anim="5"></div>
            <div class="anim-meteor" data-anim="6"></div>
            <div class="anim-meteor" data-anim="7"></div>
            <div class="anim-meteor" data-anim="8"></div>
            <div class="anim-meteor" data-anim="9"></div>
            <div class="anim-meteor" data-anim="10"></div>
            <div class="anim-meteor" data-anim="11"></div>
            <div class="anim-meteor" data-anim="12"></div>
            <div class="anim-meteor" data-anim="13"></div>
            <div class="anim-meteor" data-anim="14"></div>
        </div>
    `
};

export default anim;
