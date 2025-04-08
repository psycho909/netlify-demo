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

export function Sec2SlideLB(index) {
	var config = {
		addClass: "default lb-sec2",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
		afterOpen: function () {
			var swiper = new Swiper(".lb-slide__swiper", {
				loop: true,
				navigation: {
					nextEl: ".lb-slide__next",
					prevEl: ".lb-slide__prev",
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
			});
			swiper.slideTo(index);
			let txtItems = document.querySelectorAll(".lb-slide__txt-item");
			txtItems.forEach((item) => {
				item.classList.remove("active");
			});
			txtItems[index].classList.add("active");

			swiper.on("slideChange", function (swiper) {
				let index = swiper.activeIndex;
				txtItems.forEach((item) => {
					item.classList.remove("active");
				});
				txtItems[index].classList.add("active");
			});
		},
	};

	var HTML = `
	<div class="lb-slide">
		<div class="swiper lb-slide__swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide lb-slide__item">
					<picture>
						<source srcset="./assets/css/images/lb-pop-1-img-m.jpg" media="(max-width: 768px)" />
						<img src="./assets/css/images/lb-pop-1-img.jpg" alt="" />
					</picture>
				</div>
				<div class="swiper-slide lb-slide__item">
					<picture>
						<source srcset="./assets/css/images/lb-pop-2-img-m.jpg" media="(max-width: 768px)" />
						<img src="./assets/css/images/lb-pop-2-img.jpg" alt="" />
					</picture>
				</div>
				<div class="swiper-slide lb-slide__item">
					<picture>
						<source srcset="./assets/css/images/lb-pop-3-img-m.jpg" media="(max-width: 768px)" />
						<img src="./assets/css/images/lb-pop-3-img.jpg" alt="" />
					</picture>
				</div>
				<div class="swiper-slide lb-slide__item">
					<picture>
						<source srcset="./assets/css/images/lb-pop-4-img-m.jpg" media="(max-width: 768px)" />
						<img src="./assets/css/images/lb-pop-4-img.jpg" alt="" />
					</picture>
				</div>
				<div class="swiper-slide lb-slide__item">
					<picture>
						<source srcset="./assets/css/images/lb-pop-5-img-m.jpg" media="(max-width: 768px)" />
						<img src="./assets/css/images/lb-pop-5-img.jpg" alt="" />
					</picture>
				</div>
			</div>
		</div>
		<div class="lb-slide__next"></div>
	    <div class="lb-slide__prev"></div>
		<div class="swiper-pagination"></div>
	</div>
	<div class="lb-slide__txt">
		<div class="lb-slide__txt-item lb-slide__txt-item--1 active">
			<div class="lb-slide__txt-item--1-title"></div>
			<div class="lb-slide__txt-item--1-txt"></div>
		</div>
		<div class="lb-slide__txt-item lb-slide__txt-item--2">
			<div class="lb-slide__txt-item--2-title"></div>
			<div class="lb-slide__txt-item--2-txt"></div>
		</div>
		<div class="lb-slide__txt-item lb-slide__txt-item--3">
			<div class="lb-slide__txt-item--3-title"></div>
			<div class="lb-slide__txt-item--3-txt"></div>
		</div>
		<div class="lb-slide__txt-item lb-slide__txt-item--4">
			<div class="lb-slide__txt-item--4-title"></div>
			<div class="lb-slide__txt-item--4-txt"></div>
		</div>
		<div class="lb-slide__txt-item lb-slide__txt-item--5">
			<div class="lb-slide__txt-item--5-title"></div>
			<div class="lb-slide__txt-item--5-txt"></div>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}
