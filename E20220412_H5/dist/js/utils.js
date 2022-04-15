// loadingProgress({
// 	loadedFN: function () {
// 		let curr = 0;
// 		let imgArr = [];
// 		let imgs = ["./images/dice/dice.png", "./images/fight/bg-fight.jpg", "./images/fight/btn-back.png", "./images/fight/btn-hit.png", "./images/fight/crit.png", "./images/fight/dice-bg.png", "./images/fight/fire1.png", "./images/fight/hit.png", "./images/fight/hp-bg.png", "./images/fight/success.png", "./images/map/1.png", "./images/map/2.png", "./images/map/3.png", "./images/map/4.png", "./images/map/5.png", "./images/map/6.png", "./images/map/7.png", "./images/map/btn-event-notice2.png", "./images/map/btn-reward-list2.png", "./images/map/cleared.png", "./images/map/hide.png", "./images/map/name-bg.png", "./images/map/name-bg-desc.png", "./images/map/path.png"];
// 		function preLoad(arr, i, path) {
// 			arr[i] = new Image();
// 			arr[i].src = path;
// 			arr[i].onload = function () {
// 				curr++;
// 				if (curr >= imgs.length) {
// 					loadingHide();
// 				}
// 			};
// 		}
// 		imgs.forEach(function (img, index) {
// 			preLoad(imgArr, index, img);
// 		});
// 	},
// 	autoHide: false,
// });

export default function () {
	const store = Vuex.useStore();
	// Loading顯示
	const loadingShow = () => {
		$("#loadingProgress").show();
	};
	// Loading隱藏
	const loadingHide = () => {
		$("#loadingProgress").hide();
	};
	const MapShow = (ele) => {
		gsap.set(ele, {
			display: "block"
		});
		gsap.to(ele, 0.5, {
			opacity: 1
		});
	};
	const MapHide = (ele) => {
		gsap.to(ele, 0.5, {
			opacity: 0,
			onComplete: function () {
				gsap.set(ele, {
					display: "none"
				});
			}
		});
	};
	return {
		MapShow,
		MapHide
	};
}
