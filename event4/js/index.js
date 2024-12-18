/* import */
import { topBar, navBar, intro, btnPlus } from "./common.js";
/* Common */
function setCookie(name, value = true, hours = 0.5) {
	let date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
}
function getCookie(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return false;
	}
}
//
$(document).ready(function () {
	// url
	const cdnUrl = "https://tw.hicdn.beanfun.com/beanfun/event/MapleStory/E20241218L/";
	// mobile
	const isMB = isMobile.any ? true : false;
	isMB ? $("body,.wrapper").addClass("mobile") : $("body,.wrapper").addClass("desktop");
	/* VM Set */
	const app = Vue.createApp({
		components: {
			"top-bar": topBar,
			"nav-bar": navBar,
			intro: intro
			// 'btn-plus': btnPlus,
		},
		setup() {
			$("body").addClass("ovh");
			//
			const store = Vuex.useStore();
			// loadingProgress
			loadingProgress({
				loadedFN: function () {
					$(".loadingProgress").fadeOut();
					if (!getCookie("EventIntroMS20241218")) {
						store.commit("introPlay", true);
						setTimeout(() => {
							store.commit("intro", false);
							$("body").removeClass("ovh");
							setCookie("EventIntroMS20241218");
							// init
							if (store.state.tkn) {
								store.dispatch("InsertUserData", { token: store.state.tkn });
							}
						}, 1000);
					} else {
						store.commit("introPlay", false);
						store.commit("intro", false);
						$("body").removeClass("ovh");
						if (store.state.tkn) {
							store.dispatch("InsertUserData", { token: store.state.tkn });
						}
					}
				},
				detectVideo: false,
				autoHide: false
			});
			return {};
		}
	});
	/* Vuex */
	// state
	const pageStates = {
		//
		tkn: $("#sdEventToken").val(),
		//
		isMB: isMB,
		//
		isNavShow: true,
		// intro
		isIntro: true,
		isIntroPlay: false,
		//
		lightbox: {
			character2: {
				isOpen: false,
				character: 0
			}
		},
		lightboxForm: {
			isOpen: false
		},
		// page2
		characters: {
			1: {
				name: "殺人鯨",
				text: `原本是喜歡惡作劇的黑暗精靈，後來被白魔法師變成人類，加入黑魔法師的麾下，有一個雙胞胎弟弟史烏。和史烏合體之後可以共鳴出更為強大的力量，合稱「翼之主」。`
			},
			2: {
				name: "史烏",
				text: `原本是喜歡惡作劇的黑暗精靈，後來被白魔法師變成人類，加入黑魔法師的麾下，有一個雙胞胎姊姊殺人鯨。和殺人鯨合體之後可以共鳴出更為強大的力量，合稱「翼之主」。`
			},
			3: {
				name: "希拉",
				text: `原本是納希沙漠-阿斯旺的大巫女，備受阿斯旺舉國的尊敬和王的喜愛。但為了永保年輕的容貌，背叛國家，加入黑魔法師陣營成為軍團長。`
			},
			4: {
				name: "凡雷恩",
				text: `原本是冰原雪域中的城池獅子王城的城主，妻子是伊菲亞，在一場慶典中相遇而一見鍾情。聯盟軍攻打進獅子王城，將他的人民、他的妻子殺害了，悲憤的凡雷恩決定復仇，利用黑魔法師賦予他的能力，剿滅了聯盟並成為了軍團長。`
			},
			5: {
				name: "威爾",
				text: `具有強烈的求知慾，外表看似是一位彬彬有禮的紳士，但實際上是一個城府極深的人。在數百年前，因景仰黑魔法師而成為了軍團長替他效勞。`
			},
			6: {
				name: "阿卡伊農",
				text: `軍團長中外貌最年長老的一位，嫉妒心極強，阿卡伊農身為女神的神官，卻遭到黑魔法師的蠱惑，成為了軍團長。`
			},
			7: {
				name: "惡魔殺手",
				text: `為了獲得力量守護母親與兄弟，而效忠黑魔法師，成為了軍團長。`
			},
			8: {
				name: "露希妲",
				text: `居住在櫻花處精靈族的少女，總是期望能得到精靈遊俠的認同。在某一次修練時，察覺了支配夢境的才能，在精靈族受到黑魔法師冰封的時候，感受到有股強大的力量召喚著她，下定了決心成為黑魔法師的手下。`
			},
			9: {
				name: "梅格耐斯",
				text: `一心追求強大的力量，為達目標不擇手段，在入侵了超新星的首都-赫力席姆受了重傷後，為了養傷的梅格耐斯，穿越了傳送門，從那天起梅格耐斯加入了黑魔法師的手下。`
			},
			10: {
				name: "戴米安",
				text: `被阿卡伊農製造的母親的幻象欺騙，並誘使戴米安成為黑魔法師的軍團長。`
			}
		}
	};
	// mutations // 同步方法
	const pageMutations = {
		// nav
		changeNavShow(state, payload) {
			state.isNavShow = payload;
		},
		// intro
		intro(state, payload) {
			state.isIntro = payload;
		},
		introPlay(state, payload) {
			state.isIntroPlay = payload;
		},
		// lightbox
		openLightbox(state, payload) {
			state.lightbox[payload.type].isOpen = true;
			state.lightbox[payload.type].character = payload.char;
		},
		closeLightbox(state, payload) {
			state.lightbox[payload].isOpen = false;
			state.lightbox[payload].character = 0;
		},
		// lightboxForm
		controlLightboxForm(state, payload) {
			state.lightboxForm.isOpen = payload;
		}
	};
	// getters // state運算
	const pageGetters = {
		isMBSuffix(state, getters) {
			// return (state.isMB) ? '-mb' : '-pc';
			return state.isMB ? "" : "";
		}
	};
	// actions // 非同步方法
	const pageActions = {
		// InsertUserData
		InsertUserData(context, payload) {
			let url = "/api/E20241218/InsertUserData";
			let data = {
				token: payload.token
			};
			axios
				.post(url, data)
				.then((res) => {
					$(".loadingProgress").hide();
					let resData = res.data;
					if (resData.code == 1) {
						gboxMain(1, resData.data.outCreateTime);
						context.dispatch("GetEventMediaSetting");
					} else if (resData.code == 2) {
						gboxMain(2, resData.data.outCreateTime);
					} else if (resData.code == -1) {
						gboxMsg(resData.message);
					} else if (resData.code == -2) {
						gboxMsg(resData.message, resData.url);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		// InsertUserReward
		InsertUserReward(context, payload) {
			let url = "/api/E20241218/InsertUserReward";
			let data = {
				token: context.state.tkn,
				name: payload.name,
				phone: "09" + payload.phone,
				email: payload.mail,
				address: payload.address
			};
			axios
				.post(url, data)
				.then((res) => {
					let resData = res.data;
					if (resData.code == 1) {
						gboxMsg("填寫成功");
						closeLightboxForm();
						setTimeout(() => {
							window.location = "../../E20241218/logout";
						}, 0);
					} else if (resData.code == -1) {
						gboxMsg(resData.message);
					} else if (resData.code == -2) {
						gboxMsg(resData.message, resData.url);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	//建立 store
	const pageStore = Vuex.createStore({
		state: {
			...pageStates
		},
		mutations: {
			...pageMutations
		},
		getters: {
			...pageGetters
		},
		actions: {
			...pageActions
		}
	});

	/* Components */
	app.component("btn-plus", btnPlus);
	app.component("page-0", {
		template: `
			<div class="page page-0" id="page-0">
				<div class="bg">
					<div class="bg-content">
						<video src="${cdnUrl}assets/video/bg-0.mp4" data-type="dt" autoplay muted playsinline loop></video>
						<img src="${cdnUrl}assets/image/page-0/bg-0-m.jpg" data-type="mb">
					</div>
					<div class="bg-dec"></div>
				</div>
				<div class="title-main"></div>
				<div class="btn btn-awards-mb" data-type="mb" @click="openAwardsMB"></div>
				<div class="awards" v-if="!isMB || isOpenAwardsMB">
					<div class="awards-title-1"></div>
					<div class="awards-items-1"></div>
					<div class="btn btn-items btn-items-1" :id="'btn-items-1' + isMBSuffix" @click="openGboxItems(1)"></div>
					<div class="awards-title-2"></div>
					<div class="awards-items-2"></div>
					<div class="btn btn-items btn-items-2" :id="'btn-items-2' + isMBSuffix" @click="openGboxItems(2)"></div>
					<a href="javascript:;" class="btn awards-link awards-detail"
						@click="openGboxRule"
						:id="'btn-rule' + isMBSuffix"></a>
					<div class="btn btn-close-awards-m"
						data-type="mb"
						@click="closeAwardsMB"></div>
				</div>
				<a href="../../E20241218/login/beanfun"
					class="btn btn-preorder"
					:id="'btn-preorder' + isMBSuffix"></a>
				<div class="btn-scroll" data-type="dt"></div>
				<btn-plus></btn-plus>
			</div>
		`,
		setup(props) {
			// store
			const store = Vuex.useStore();
			// isMB
			let isMB = Vue.computed(() => {
				return store.state.isMB;
			});
			// suffix
			let isMBSuffix = Vue.computed(() => {
				return store.getters.isMBSuffix;
			});
			// changeNavShow
			const changeNavShow = (control) => {
				store.commit("changeNavShow", control);
			};

			let isOpenAwardsMB = Vue.ref(false);
			function openAwardsMB() {
				if (isOpenAwardsMB.value) {
					closeAwardsMB();
					return;
				}
				isOpenAwardsMB.value = true;
				changeNavShow(false);
			}
			function closeAwardsMB() {
				isOpenAwardsMB.value = false;
				changeNavShow(true);
			}
			// MB
			if (isMB.value) {
				isOpenAwardsMB.value = true;
				changeNavShow(false);
			}
			//
			function openGboxItems(num) {
				if (num == 1) {
					gboxItems1();
				} else if (num == 2) {
					gboxItems2();
				}
			}
			function openGboxRule() {
				gboxRule();
			}
			return {
				isMB,
				isMBSuffix,
				openGboxItems,
				openGboxRule,
				openAwardsMB,
				isOpenAwardsMB,
				closeAwardsMB
			};
		}
	});
	app.component("page-1", {
		template: `
			<div class="page page-1" id="page-1">
				<div class="bg">
					<div class="bg-content"></div>
				</div>
				<div class="title fz0">記憶中的某頁</div>
				<div class="content">
					<div class="dec dec-0" data-type="mb"></div>
					<div class="dec dec-1" data-type="dt"></div>
					<div class="dec dec-2" data-type="dt"></div>
					<div class="dec dec-3" data-type="dt"></div>
					<div class="dec dec-4" data-type="dt"></div>
					<div class="dec dec-5" data-type="dt"></div>
				</div>
				<div class="btn btn-introduction fz0"
					@click="scrollToPage2"
					:id="'btn-introduction' + isMBSuffix">軍團長介紹</div>
				<div class="text fz0">coming soon</div>
				<div class="btn-scroll"></div>
			</div>
		`,
		setup(props) {
			// store
			const store = Vuex.useStore();
			// suffix
			let isMBSuffix = Vue.computed(() => {
				return store.getters.isMBSuffix;
			});
			function scrollToPage2() {
				let target = $(".page-2");
				let targetTop = target.offset().top;
				$("html,body").animate(
					{
						scrollTop: targetTop
					},
					300
				);
			}
			return {
				scrollToPage2,
				isMBSuffix
			};
		}
	});
	app.component("page-2", {
		template: `
			<div class="page page-2" id="page-2">
				<div class="bg">
					<div class="bg-content"></div>
					<div class="bg-dec" data-num="1" data-style="0" data-type="dt"></div>
					<div class="bg-dec" data-num="2" data-style="1" data-type="dt"></div>
					<div class="bg-dec" data-num="3" data-style="1" data-type="dt"></div>
					<div class="bg-dec" data-num="4" data-style="2" data-type="dt"></div>
					<div class="bg-dec" data-num="5" data-style="2" data-type="dt"></div>
					<div class="bg-dec" data-num="6" data-style="3" data-type="dt"></div>
				</div>
				<div class="title fz0">軍團長介紹</div>
				<div class="content">
					<div class="content-text font-notoSans" data-type="dt">
						<div class="character-name">{{characterData.name}}</div>
						<div class="character-text" v-html="characterData.text"></div>
					</div>
					<div class="content-image" data-type="dt">
						<div class="image" :data-char="characterNum"></div>
					</div>
					<div class="content-btns">
						<div class="btn-character"
							v-for="(item, index) in 10"
							:data-char="item"
							:class="{'active': !isMB && characterNum == item || !isMB && activeCharacter == item}">
						</div>
						<span class="btn-character-active"
							v-for="(item, index) in 10"
							:data-char="item"
							@mouseover="activeCharacter = item"
							@mouseout="activeCharacter = 0"
							@click="selectCharacter(item)"
							:id="'btn-character-' + item + isMBSuffix"></span>
					</div>
				</div>
			</div>
		`,
		setup(props) {
			// store
			const store = Vuex.useStore();
			// isMB
			let isMB = Vue.computed(() => {
				return store.state.isMB;
			});
			// isMBSuffix
			let isMBSuffix = Vue.computed(() => {
				return store.getters.isMBSuffix;
			});
			//
			let characterNum = Vue.ref(1);
			let characters = store.state.characters;
			let characterData = Vue.computed(() => {
				return characters[characterNum.value];
			});
			// hover
			let activeCharacter = Vue.ref(0);
			// click
			function selectCharacter(num) {
				characterNum.value = num;
				if (!isMB.value) return;
				// MB
				store.commit("openLightbox", {
					type: "character2",
					char: num
				});
			}
			return {
				isMB,
				isMBSuffix,
				characterNum,
				characterData,
				activeCharacter,
				selectCharacter
			};
		}
	});
	app.component("lightbox-character-2", {
		template: `
			<div class="lightbox lightbox-character-2"
				v-if="isOpenCharacter2"
				:data-char="characterNum">
				<div class="bg"></div>
				<div class="image">
					<div class="image-char" :data-char="characterNum"></div>
				</div>
				<div class="content font-notoSans">
					<div class="name">{{characterData.name}}</div>
					<div class="text" v-html="characterData.text"></div>
				</div>
				<div class="btn btn-close" @click="closeLightboxCharacter"></div>
			</div>
		`,
		setup(props) {
			// store
			const store = Vuex.useStore();
			// isOpen
			let isOpenCharacter2 = Vue.computed(() => {
				let isOpen = store.state.lightbox.character2.isOpen;
				if (isOpen) {
					$("body").addClass("ovh");
				}
				return isOpen;
			});
			let characterNum = Vue.computed(() => {
				return store.state.lightbox.character2.character;
			});
			let characterData = Vue.computed(() => {
				return store.state.characters[characterNum.value];
			});
			function closeLightboxCharacter() {
				store.commit("closeLightbox", "character2");
				$("body").removeClass("ovh");
			}
			//
			return {
				isOpenCharacter2,
				characterNum,
				characterData,
				closeLightboxCharacter
			};
		}
	});
	// lightboxForm
	app.component("lightbox-form", {
		template: `
			<div class="lightbox lightbox-form" v-if="isOpenForm">
				<div class="lightbox-form-wrap">
					<div class="btn btn-lightbox-close" @click="closeLightbox"></div>
					<div class="lightbox-form-content">
						<div class="lightbox-form-title">實體抽獎資料填寫</div>
						<div class="lightbox-form-row">
							<label>
								<span class="label">姓名：</span>
								<input type="text" placeholder=""
									v-model="formData.name"
									maxlength="20">
							</label>
						</div>
						<div class="lightbox-form-row">
							<label>
								<span class="label">手機：</span><span class="phone-prefix">09</span>
								<input type="tel" placeholder=""
									v-model="formData.phone"
									@input="checkInputNumberPhone"
									maxlength="8">
							</label>
						</div>
						<div class="lightbox-form-row">
							<label>
								<span class="label">信箱Email：</span>
								<input type="email" placeholder=""
									v-model="formData.mail"
									maxlength="200">
							</label>
						</div>
						<div class="lightbox-form-row">
							<label>
								<span class="label">寄件地址：</span>
								<input type="text" placeholder=""
									v-model="formData.address"
									maxlength="200">
							</label>
						</div>
						<div class="lightbox-form-row last-row">
							<label>
								<span class="checkbox-outer">
									<input type="checkbox"
										v-model="formData.isCheck">
									<span>V</span>
								</span>
								<span class="label">同意個資使用於抽獎活動</span>
							</label>

							<a href="javascript:;" class="btn btn-form"
								@click="submitForm"
								:id="'btn-form-submit' + isMBSuffix">送出抽獎資料</a>
						</div>
					</div>
				</div>
			</div>
		`,
		setup(props) {
			// store
			const store = Vuex.useStore();
			let isOpenForm = Vue.computed(() => {
				return store.state.lightboxForm.isOpen;
			});
			let formData = Vue.reactive({
				name: "",
				phone: "",
				mail: "",
				address: "",
				isCheck: false
			});
			// 電話處理
			function checkInputNumberPhone() {
				const rules = /^[0-9]+$/;
				let str = formData.phone;
				let arr = str.split("");
				for (let i = 0; i < arr.length; i++) {
					if (!rules.test(arr[i])) {
						str = str.slice(0, i);
						formData.phone = str;
						return;
					}
				}
			}
			// 驗證信箱
			function verifyInputEmail() {
				const rules = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
				if (formData.mail.search(rules) != -1) {
					return true;
				} else {
					return false;
				}
			}
			//
			function closeLightbox() {
				closeLightboxForm();
			}
			// 送出抽獎資料
			function submitForm() {
				if (formData.name == "") {
					gboxDefault("請輸入姓名");
				} else if (formData.phone == "") {
					gboxDefault("請輸入手機號碼");
				} else if (formData.mail == "") {
					gboxDefault("請輸入信箱");
				} else if (!verifyInputEmail()) {
					gboxDefault("請輸入正確的信箱");
				} else if (formData.address == "") {
					gboxDefault("請輸入寄件地址");
				} else if (!formData.isCheck) {
					gboxDefault("請勾選同意個資使用");
				} else {
					// 送出
					store.dispatch("InsertUserReward", Vue.toRaw(formData));
					// closeLightboxForm();
				}
			}
			let isMBSuffix = Vue.computed(() => {
				return store.getters.isMBSuffix;
			});
			return {
				isOpenForm,
				formData,
				checkInputNumberPhone,
				submitForm,
				closeLightbox,
				isMBSuffix
			};
		}
	});
	/* VM Mount */
	// 執行VM
	function afterInit() {
		app.use(pageStore);
		app.mount("#app");
	}
	afterInit();
	//
	function gboxDefault(text) {
		$.gbox.open(text, {
			addClass: "gbox-default",
			hasCloseBtn: true
		});
	}
	function gboxMsg(text, callback) {
		$.gbox.open(text ? text : "", {
			addClass: "gbox-default",
			hasCloseBtn: true,
			afterClose: callback
				? callback
				: function () {
						$.gbox.close();
				  }
		});
	}
	// gboxRule
	function gboxRule() {
		let html = `
			<ul>
				<span style="color:blue;">事前預約活動說明：</span>
				<br>
				2024/12/18 12:00 - 2025/01/07 23:59<br>
				《新楓之谷》 CHASER 改版即將登場，<span style="color:red;">立即預約</span>拿虛寶抽好禮！<br>
				<br>
				<li>需在指定時間內於活動網頁上登錄遊戲帳號，即完成<span style="color:red;">預先登錄流程</span>，並可獲得虛寶獎勵及實體贈品獎勵抽獎資格。</li>
				<li><span style="color:red;">虛寶獎勵</span>最晚於 2025/01/23前，陸續派發至遊戲中。</li>
				<li><span style="color:red;">實體獎勵</span>中獎名單將會於2024/12/27、2025/01/06、2025/01/10在「新楓之谷」官方網站與官方粉絲團公告，並透過手機簡訊通知中獎者，請中獎玩家屆時留意通知，若獎品價值達500元(含)以上，需於指定時間內完成中獎表單資料填寫。獎品預計於 2025/03/28 前，陸續寄出實體贈品獎勵，寄件地址為中獎人於參加活動時，填寫之通訊地址，實體贈品寄送僅限台灣地區（包含澎金馬）。</li>
				<li>欲獲得虛寶獎勵資格，需於 2025/01/07 23:59 前完成預約活動，且個人遊戲帳號中已存在角色，否則將無法成功領取。</li>
				<li>欲獲得實體獎勵抽獎資格，需於 2025/01/07 23:59 前完成預約活動，並且於預約網頁中詳閱本活動辦法及個人資料使用聲明之內容，同意提供後確認送出，務必注意抽獎資料的姓名、手機、E-mail、地址，需填寫正確。</li>
			</ul>
			<ul>
				<span style="color:blue;">注意事項：</span>
				<li><span style="color:red;">【新楓之谷CHASER事前預約活動】</span>獎勵將統一於 2025/01/23前，派發至遊戲中，逾期失效恕不補發。</li>
				<li>本活動所有遊戲虛寶獎勵，需於 2025/01/07 23:59 前創立並擁有「新楓之谷」之台灣伺服器有效遊戲帳號方可領獎；如遊戲帳號有遭停權、帳號刪除、移民或其他帳號失效情形之玩家均不具參加或領獎資格，敬請留意。</li>
				<li>本活動僅限台港澳地區民眾參與，實體贈品寄送僅限台灣地區（包含澎金馬），若有資料填寫錯誤、無法順利寄送等情況，將視同自願放棄資格，恕不另行通知。</li>
				<li>參與本活動領取實體或有價獎項，需依據官方領獎規則，實體或有價獎項價值達500元(含)以上，就必須提供申報中獎人年度綜合所得資料備存，待您該年度於遊戲橘子獲得的獎項超過1,000元(含)以上，則活動單位將依據所得稅法相關規定協助申報中獎者年度綜合所得。</li>
				<li>本活動獎品款式由主辦單位指定。參加者須於預約網頁中填妥個人相關收件資訊，如因參加者所填寫、登錄或提供之資料有誤、不同意填寫或無法辨識而影響其得獎權益，視為自動棄權，不具得獎資格，本公司恕不負責，贈品圖片僅供參考，請以實際物品為準。</li>
				<li>本活動獎品以公佈於本網站上之資料為準，如遇有不可抗拒之因素，本公司保留更換其他獎品之權利。獎品規格以實物為主，得獎者不得要求將贈品讓與他人，也不得要求變換或折換現金。本公司亦不須為得獎人領取、使用或行使各項獎品之任何後果負責。</li>
				<li>參加者於參加本活動前，請務必詳閱本活動辦法及個人資料使用聲明之內容。參加者參加本活動之同時，即視為表示已詳細閱覽並同意接受本活動之活動辦法（含各注意事項）、補充公告及其他相關要求之規範等（前述活動辦法及規範，以下統稱「活動規範」），參加者如有違反活動規範、不配合、從事不當或不法行為、有妨礙活動公正性之虞之行為、攻擊、詆毀主辦單位之虞及或情事發生（以下統稱「不當行為」），主辦單位得逕自取消其參加資格及或中獎資格，不另通知，並追回已發放之獎品，並就因此所生之損害向不當行為人請求損害賠償或採取其他司法程序。不當行為概由主辦單位認定，不另通知或說明解釋，參加者及中獎者不得異議並應自負相關法律責任。</li>
				<li>本活動參與者如因個人電腦、網路、電話或其他不可歸責於主辦單位之事由，而使參與本活動者所登錄之資料有遺失、錯誤、無法辨識或毀損，所導致資料無效之情況，主辦單位將不負任何法律責任，參加者亦不得異議。</li>
				<li>主辦單位有權檢視活動參加者之活動參與行為是否涉及人為操作、蓄意偽造、詐欺，或以任何其他不正當方式意圖以進行不實或虛偽參與行為，活動參加者因上述情形所獲得之活動資格及獎項，主辦單位保有取消得獎資格權利，並保留法律追訴權。若有達反常理或涉嫌不法之異常狀況者，或登錄資料不實或不正確，或有違反活動規範之行為，主辦單位保留變更、終止本活動及審核參加者參加活動資格之權利。</li>
				<li>凡參加本活動之消費者，將視同同意所有活動內容及虛寶、實體贈品發送方式。如本活動因不可抗力之特殊原因無法執行時，主辦單位有權決定取消、終止、修改或暫停本活動，修改訊息將於「新楓之谷」官方網站或官方粉絲團公告，不另行通知。本活動內容或虛擬寶物兌換之相關問題，請洽客服專線(02)2192-6100#1 或上「新楓之谷」遊戲官網查詢。</li>
				<li>主辦單位遊戲橘子數位科技股份有限公司亦保有隨時修正、暫停或終止活動之權利，變更內容將於「新楓之谷」官方網站或官方粉絲團公告，恕不另行通知。</li>
			</ul>
		`;
		$.gbox.open(html, {
			addClass: "gbox-rule",
			titleBar: "活動說明",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				$(".gbox-content").addClass("scrollbar");
			}
		});
	}
	function gboxRule2() {
		let html = `
			<ul>
				<span style="color:blue;">同意個人資料蒐集及使用：</span>
				<li>遊戲橘子數位科技股份有限公司 （下稱本公司）取得您的個人資料，目的在於個人資料保護法及相關法令之規定下，依本公司隱私權保護政策，蒐集、處理及利用您的個人資料。提醒您：如果您非完全行為能力人（如：未滿十八歲、受監護宣告），您必須告知法定代理人（如：父母）或監護人，由法定代理人或監護人陪同閱讀、瞭解本同意書內容，並取得法定代理人（如：父母、監護人）之允許始得進行，當您持續填寫您的個人資料，即表示您對本同意書所為之意思表示，均視為已取得法定代理人之事前同意。</li>
				<li>個人資料蒐集及使用目的：參與【新楓之谷CHASER事前預約活動】（下稱本活動），獲得實體獎勵抽獎資格，作為抽獎資格審核及中獎時的訊息通知與獎品寄送。</li>
				<li>個人資料之類別：姓名、手機、E-mail、地址，依據活動辦法所提供予本公司之個人資料。</li>
				<li>個人資料利用之期間：自【新楓之谷CHASER事前預約活動】之中獎名單公佈，並完成實體獎品寄送後停止利用，法律另有規定者則不在此限。</li>
				<li>個人資料利用之地區：實體贈品獎勵寄送僅限台灣地區（包含澎金馬）。</li>
				<li>個人資料利用之對象：由本公司用於舉辦本活動之特定目的（含通知、公佈及獎項寄送等）必要範圍內，依通常作業所必要之方式利用此個人資料。本活動網站公開之資料，公眾將可透過網際網路瀏覽參與活動所公開之資料或中獎資訊。</li>
				<li>個人資料利用之方式：書面、電子文件、電話、傳真、以自動化機器或其他非自動化之利用方式。</li>
				<li>您可依個人資料保護法第3條之規定，就您的個人資料向本公司︰<br>
					&nbsp;&nbsp;&nbsp;&nbsp;(1) 請求查詢或閱覽。<br>
					&nbsp;&nbsp;&nbsp;&nbsp;(2) 製給複製本。<br>
					&nbsp;&nbsp;&nbsp;&nbsp;(3) 請求補充或更正。<br>
					&nbsp;&nbsp;&nbsp;&nbsp;(4) 請求停止蒐集、處理及利用。<br>
					&nbsp;&nbsp;&nbsp;&nbsp;(5) 請求刪除。
				</li>
				<li>您可自由選擇是否提供本公司您的個人資料，但若您所提供之個人資料，經檢舉或本公司發現不足以確認您的身分真實性或其他個人資料冒用、盜用、資料不實、填寫錯誤、無法順利寄送等情形，將視同您自願放棄參加本活動實體獎勵抽獎資格，若有不便之處敬請見諒。</li>
				<li>參加者瞭解並同意符合個人資料保護法及相關法規之要求，具有書面同意本公司蒐集、處理及利用您的個人資料之效果。</li>
			</ul>
		`;
		$.gbox.open(html, {
			addClass: "gbox-rule gbox-rule2",
			titleBar: "實體抽獎注意事項",
			hasCloseBtn: true,
			afterOpen: function () {
				$(".gbox-content").addClass("scrollbar");
			},
			actionBtns: [
				{
					text: "立即參加",
					click: function () {
						openLightboxForm();
						$.gbox.close();
					}
				}
			]
		});
	}
	// gboxCards
	function gboxCards() {
		let contentCards = {
			1: [
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				}
			],
			2: [
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				}
			],
			3: [
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				}
			],
			4: [
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				}
			],
			5: [
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				},
				{
					cardId: 0
				}
			]
		};
		let title1 = '<div class="title" data-type="1"></div>';
		let title2 = '<div class="title" data-type="2"></div>';
		let title3 = '<div class="title" data-type="3"></div>';
		let title4 = '<div class="title" data-type="4"></div>';
		let title5 = '<div class="title" data-type="5"></div>';
		let content1Cards = contentCards[1]
			.map((item, index) => {
				return `<div class="content-card"><img src="${url}assets/image/lightbox/cards/card-${item.cardId}.png" alt=""></div>`;
			})
			.toString()
			.split(",")
			.join("");
		let content2Cards = contentCards[2]
			.map((item, index) => {
				return `<div class="content-card"><img src="${url}assets/image/lightbox/cards/card-${item.cardId}.png" alt=""></div>`;
			})
			.toString()
			.split(",")
			.join("");
		let content3Cards = contentCards[3]
			.map((item, index) => {
				return `<div class="content-card"><img src="${url}assets/image/lightbox/cards/card-${item.cardId}.png" alt=""></div>`;
			})
			.toString()
			.split(",")
			.join("");
		let content4Cards = contentCards[4]
			.map((item, index) => {
				return `<div class="content-card"><img src="${url}assets/image/lightbox/cards/card-${item.cardId}.png" alt=""></div>`;
			})
			.toString()
			.split(",")
			.join("");
		let content5Cards = contentCards[5]
			.map((item, index) => {
				return `<div class="content-card"><img src="${url}assets/image/lightbox/cards/card-${item.cardId}.png" alt=""></div>`;
			})
			.toString()
			.split(",")
			.join("");
		let content1 = `<div class="content" data-type="1">${content1Cards}</div>`;
		let content2 = `<div class="content" data-type="2">${content2Cards}</div>`;
		let content3 = `<div class="content" data-type="3">${content3Cards}</div>`;
		let content4 = `<div class="content" data-type="4">${content4Cards}</div>`;
		let content5 = `<div class="content" data-type="5">${content5Cards}</div>`;
		let html = title1 + content1 + title2 + content2 + title3 + content3 + title4 + content4 + title5 + content5;
		$.gbox.open(html, {
			addClass: "gbox-cards",
			titleBar: "卡牌內容",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				$(".gbox-content").addClass("scrollbar2");
			}
		});
	}
	// gboxItems1
	function gboxItems1() {
		let html = `
			<div class="title">週週開獎</div>
			<div class="text">預約越早 好禮抽越多</div>
			<div class="content">
				<div class="content-title">第一波抽獎 區段</div>
				<div class="content-text">2024/12/18-2024/12/24<br>得獎公告：2024/12/27</div>
				<div class="content-item" data-num="1-1"></div>
				<div class="content-title">第二波抽獎 區段</div>
				<div class="content-text">2024/12/25-2025/12/31<br>得獎公告：2025/01/06</div>
				<div class="content-item" data-num="1-2"></div>
				<div class="content-title">第三波抽獎 區段</div>
				<div class="content-text">2025/01/01-2025/01/07<br>得獎公告：2025/01/10</div>
				<div class="content-item" data-num="1-3"></div>
				<div class="notice">得獎公告將會於指定的日期，<br>公告在官方網站及官方Facebook社群，<br>並且會以簡訊通知得獎者，請留意通知。</div>
			</div>
		`;
		$.gbox.open(html, {
			addClass: "gbox-cards gbox-items gbox-items-1",
			titleBar: "",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				$(".gbox-content .content").addClass("scrollbar2");
			}
		});
	}
	// gboxItems2
	function gboxItems2() {
		let html = `
			<div class="title">即刻預約送好禮</div>
			<div class="text">迎接全新改版 虛寶獎勵拿起來!!</div>
			<div class="content">
				<div class="content-item" data-num="2-1"></div>
			</div>
		`;
		$.gbox.open(html, {
			addClass: "gbox-cards gbox-items gbox-items-2",
			titleBar: "",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				$(".gbox-content").addClass("scrollbar2");
			}
		});
	}
	// gboxMain
	function gboxMain(num, date) {
		let numIn = num;
		let dateIn = new Date(date);
		let html = `
			${dateIn.getFullYear()}年/${dateIn.getMonth() + 1}月/${dateIn.getDate()}日<br>
			已完成登入預約<br>
			2025年/1月/23日前<br>
			發放獎勵<br>
			<span class="text-main fz0">前往預約獎勵抽獎活動</span>
		`;
		$.gbox.open(html, {
			addClass: "gbox-default gbox-main",
			hasCloseBtn: true,
			actionBtns: [
				{
					text: "立即參加",
					click: function () {
						if (numIn == 1) {
							gboxRule2();
						} else {
							$.gbox.open(
								`
								已完成參加實體抽獎活動<br>
								將於2024/12/27、2025/01/06、2025/01/10<br>
								在官方網站與官方粉絲團公開得獎名單<br>
								<br>
								敬請期待
							`,
								{
									addClass: "gbox-default gbox-main",
									hasCloseBtn: true,
									afterClose: function () {
										window.location = "../../E20241218/logout";
									}
								}
							);
						}
					}
				}
			],
			afterOpen: function () {}
		});
	}
	// lightboxForm
	function openLightboxForm() {
		$("body").addClass("ovh");
		pageStore.commit("controlLightboxForm", true);
	}
	function closeLightboxForm() {
		$("body").removeClass("ovh");
		pageStore.commit("controlLightboxForm", false);
	}
});
