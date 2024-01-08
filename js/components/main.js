import { SuperItemLB, MessageLB, PhoneErrorLB, OTPErrorLB, OTPLimitLB, OTPWaitLB, InviteErrorLB, RewardLB } from "../lightbox.js";
import { SendSMSAPI, CheckSMSAPI } from "../api.js";
import { addToSessionStorage, readFromSessionStorage, removeFromSessionStorage } from "../tool.js";
import store from "../store.js";
function isValidTWPhoneNumber(phoneNumber) {
	const pattern = /^(09(?!(9))\d{8})$/;
	return pattern.test(phoneNumber);
}
function debounce(func, delay) {
	let timerId;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}
function animateTitle(element) {
	const t1 = gsap.timeline();

	// Initial animation
	t1.to(element, {
		backgroundPosition: "-1400%",
		duration: 1,
		ease: SteppedEase.config(14),
		onComplete: repeatAnimation
	});

	function repeatAnimation() {
		setTimeout(() => {
			t1.restart();
		}, 5000);
	}
}
const main = {
	props: {
		login: {
			type: Boolean,
			default: false
		},
		mobile: {
			type: Boolean,
			default: false
		},
		cnt: {
			type: Number,
			default: 0
		},
		now: {
			type: Number,
			default: 0
		}
	},
	setup(props, context) {
		let api = false;
		let InvitationCode = Vue.ref("");
		let otp = Vue.ref("");
		let otpCheck = Vue.ref(false);
		let phoneCheck = Vue.ref(false);
		// 發送時間(建立時間)
		let SendMessageTime = Vue.ref(null);
		// 驗證碼有效時間
		let MessageEffectiveTime = Vue.ref(null);
		// 再次發送時間
		let ReSendTime = Vue.ref(null);
		let startTime = Vue.ref(null);
		let timer = Vue.ref(null);
		// 發送簡訊次數
		let MessageCnt = Vue.ref(0);
		let areaCode = Vue.ref([
			{ area: "台灣 +886", location: "TW" },
			{ area: "香港 +852", location: "HK" },
			{ area: "澳門 +853", location: "MAC" }
		]);
		let phoneNumber = Vue.ref("");
		let tempPhoneNumber = Vue.ref(null);
		let currentNumber = 0;
		Vue.watch(
			() => store.state.reset,
			function (newVal, oldVal) {
				otpCheck.value = false;
				phoneCheck.value = false;
				otp.value = "";
				phoneNumber.value = "";
			}
		);
		let reset = () => {
			otpCheck.value = false;
			phoneCheck.value = false;
			otp.value = "";
			phoneNumber.value = "";
			removeFromSessionStorage("InvitationCode");
			setTimeout(() => {
				$(".main-phone__area").niceSelect();
			}, 0);
		};
		function animateNumbers(targetNumber) {
			const duration = 1500;
			const steps = 50;
			const increment = targetNumber / steps;
			const delay = duration / steps;
			const num100000 = document.querySelector(".num100000");
			const num10000 = document.querySelector(".num10000");
			const num1000 = document.querySelector(".num1000");
			const num100 = document.querySelector(".num100");
			const num10 = document.querySelector(".num10");
			const num1 = document.querySelector(".num1");

			const interval = setInterval(() => {
				currentNumber += increment;
				if (currentNumber >= targetNumber) {
					clearInterval(interval);
					currentNumber = targetNumber;
				}
				if (currentNumber >= 10) {
					num10.classList.remove("hide");
				}
				if (currentNumber >= 100) {
					num100.classList.remove("hide");
				}
				if (currentNumber >= 1000) {
					num1000.classList.remove("hide");
				}
				if (currentNumber >= 10000) {
					num10000.classList.remove("hide");
				}
				if (currentNumber >= 100000) {
					num100000.classList.remove("hide");
				}
				const formattedNumber = ("000000" + Math.floor(currentNumber)).slice(-6);
				num100000.textContent = formattedNumber[0];
				num100000.setAttribute("data-value", formattedNumber[0]);
				num10000.textContent = formattedNumber[1];
				num10000.setAttribute("data-value", formattedNumber[1]);
				num1000.textContent = formattedNumber[2];
				num1000.setAttribute("data-value", formattedNumber[2]);
				num100.textContent = formattedNumber[3];
				num100.setAttribute("data-value", formattedNumber[3]);
				num10.textContent = formattedNumber[4];
				num10.setAttribute("data-value", formattedNumber[4]);
				num1.textContent = formattedNumber[5];
				num1.setAttribute("data-value", formattedNumber[5]);
			}, delay);
		}
		const targetPage = (target) => {
			let h = 0;
			if ($(".left-bar-top").css("display") == "none") {
				h = $(".top-bar").outerHeight(true);
			} else {
				h = $(".left-bar-top").outerHeight(true);
			}
			$("html, body").animate({
				scrollTop: $(`#${target}`).offset().top - h
			});
		};
		// 預約
		let sendPhone = () => {
			let location = document.querySelector("#area").value;
			if ($("#hfEvent1Status").val() == 0) {
				MessageLB("活動已結束");
				return;
			}

			if (tempPhoneNumber.value == phoneNumber.value) {
				if (MessageCnt.value >= 3) {
					OTPLimitLB();
					return;
				}
				if (props.now > +new Date(MessageEffectiveTime).value) {
					OTPWaitLB();
					return;
				}
				if (ReSendTime.value >= 0) {
					let currentTime = startTime.value;
					let reSendTime = ReSendTime.value;
					let timeDifference = reSendTime - currentTime;
					let minutes = Math.floor(timeDifference / 60000);
					let seconds = Math.round((timeDifference % 60000) / 1000);
					if (timeDifference > 0) {
						MessageLB(`請於${minutes}分鐘${seconds}秒後再重新嘗試`);
						return;
					}
				}
			}

			if (location == -1) {
				MessageLB("請選擇國碼");
				return;
			}
			if (isNaN(phoneNumber.value)) {
				PhoneErrorLB();
				return;
			}
			// TW
			if (location == "TW") {
				if (phoneNumber.value.length != 10) {
					PhoneErrorLB();
					return;
				} else {
					if (!isValidTWPhoneNumber(phoneNumber.value)) {
						PhoneErrorLB();
						return;
					}
				}
			}
			// MO
			if (location == "HK" && phoneNumber.value.length != 8) {
				PhoneErrorLB();
				return;
			}
			// HK
			if (location == "MAC" && phoneNumber.value.length != 8) {
				PhoneErrorLB();
				return;
			}
			let area = areaCode.value.find((item) => {
				return item.location == location;
			});
			$("#loadingProgress").show();
			if (api) {
				return;
			}
			api = true;
			SendSMSAPI({
				Location: location,
				Phone: phoneNumber.value,
				CountryCode: "",
				Token: $("#hfDataPhone").val()
			})
				.then((res) => {
					let { Code, Message, Url, Data } = res.data;
					api = false;
					if (Code == -1) {
						MessageLB(Message);
						$("#loadingProgress").hide();
						return;
					}
					if (Code == -2) {
						MessageLB(Message, Url);
						$("#loadingProgress").hide();
						return;
					}
					if (Message !== null) {
						MessageLB(Message);
					} else {
						MessageLB("OTP簡訊發送中");
					}
					tempPhoneNumber.value = phoneNumber.value;
					phoneCheck.value = true;
					MessageCnt.value = Data.Cnt;
					SendMessageTime.value = Data.SendMessageTime;
					MessageEffectiveTime.value = Data.MessageEffectiveTime;
					ReSendTime.value = +new Date(Data.ReSendTime);
					startTime.value = ReSendTime.value - 5 * 60 * 1000;
					timer.value = setInterval(() => {
						startTime.value += 1000;
						if (startTime.value >= ReSendTime.value) {
							clearInterval(timer.value);
						}
					}, 1000);
					_lt(
						"send",
						"cv",
						{
							type: "Conversion"
						},
						["86d5dfae-7df4-43ac-85d0-f4c46658a1c9"]
					);
					_tfa.push({ notify: "event", name: "lead", id: 1616767 });
				})
				.finally(() => {
					api = false;
					$("#loadingProgress").hide();
				});
		};

		let sendOTP = (type) => {
			let timeDifference;
			if (props.now > +new Date(MessageEffectiveTime).value) {
				OTPWaitLB();
				return;
			}
			if (type == 2) {
				if (ReSendTime.value >= 0) {
					let currentTime = startTime.value;
					let reSendTime = ReSendTime.value;
					let timeDifference = reSendTime - currentTime;
					let minutes = Math.floor(timeDifference / 60000);
					let seconds = Math.round((timeDifference % 60000) / 1000);
					if (timeDifference > 0) {
						MessageLB(`請於${minutes}分鐘${seconds}秒後再重新嘗試`);
						return;
					}
				}
			}
			if (otp.value.length == "") {
				OTPErrorLB();
				return;
			}
			if (otp.value.length < 8 || otp.value.length > 8) {
				OTPErrorLB();
				return;
			}
			if (api) {
				return;
			}
			api = true;
			let location = document.querySelector("#area").value;
			$("#loadingProgress").show();
			CheckSMSAPI({
				MessageNumber: otp.value,
				Location: location,
				Phone: phoneNumber.value,
				CountryCode: "",
				Token: $("#hfDataPhone").val()
			})
				.then((res) => {
					let { Code, Message, Url, Data } = res.data;
					api = false;
					if (Code == -1) {
						MessageLB(Message);
						$("#loadingProgress").hide();
						return;
					}
					if (Code == -2) {
						MessageLB(Message, Url);
						$("#loadingProgress").hide();
						return;
					}
					otpCheck.value = true;
					InvitationCode.value = Data.InvitationCode;
					addToSessionStorage("InvitationCode", Data.InvitationCode);
					store.commit("SET_RESET", false);
					_lt(
						"send",
						"cv",
						{
							type: "Verificationcode"
						},
						["86d5dfae-7df4-43ac-85d0-f4c46658a1c9"]
					);
				})
				.finally(() => {
					api = false;
					$("#loadingProgress").hide();
				});
		};
		let copyInvitationCode = () => {
			let text = InvitationCode.value;
			if (text) {
				navigator.clipboard
					.writeText(text)
					.then(() => {
						MessageLB("邀請碼已複製");
					})
					.catch((err) => {
						console.error("Failed to copy text: ", err);
					});
			}
		};
		let end = Vue.computed(() => {
			return $("#hfEvent1Status").val();
		});
		let SuperItem = () => {
			SuperItemLB();
		};
		Vue.watch(
			() => props.cnt,
			(val, oldVal) => {
				if (val != undefined) {
					animateNumbers(props.cnt);
				}
			}
		);
		Vue.nextTick(() => {});
		Vue.onMounted(() => {
			if (readFromSessionStorage("InvitationCode")) {
				otpCheck.value = true;
				phoneCheck.value = true;
				InvitationCode.value = readFromSessionStorage("InvitationCode");
			} else {
				$(".main-phone__area").niceSelect();
			}
			// 按下enter觸發sendPhone
			if (document.getElementById("phoneInput")) {
				document.getElementById("phoneInput").addEventListener("keypress", function (event) {
					if (event.keyCode === 13) {
						event.preventDefault();
						sendPhone();
					}
				});
				window.addEventListener(
					"keydown",
					debounce(function (event) {
						if (event.keyCode === 13) {
							sendPhone();
						}
					}, 1000)
				);
			}

			animateTitle(".main-slogan");
		});
		Vue.onUnmounted(() => {
			clearInterval(timer.value);
		});
		return {
			otp,
			otpCheck,
			areaCode,
			phoneNumber,
			sendPhone,
			sendOTP,
			phoneCheck,
			InvitationCode,
			copyInvitationCode,
			targetPage,
			end,
			ReSendTime,
			reset,
			SuperItem
		};
	},
	template: `<div class="section main" id="main">
	<a href="https://maplestory.beanfun.com/main" class="main-logo" target="_blank">logo</a>
	<div class="main-super-item">
		<a href="javascript:;" class="main-super-item__btn" @click="SuperItem"></a>
	</div>
	<div class="main-maple6"></div>
	<div class="main-accumulate">
		<div class="main-accumulate__list">
		<span class="main-accumulate__num num1" data-value="0"></span>
		<span class="main-accumulate__num hide num10" data-value=""></span>
		<span class="main-accumulate__num hide num100" data-value=""></span>
		<span class="main-accumulate__num hide num1000" data-value=""></span>
		<span class="main-accumulate__num hide num10000" data-value=""></span>
		<span class="main-accumulate__num hide num100000" data-value=""></span>
		</div>
	</div>
	<div class="main-slogan">六轉預約 抽百萬好禮</div>
	<div class="main-form" data-type="1" v-if="!otpCheck">
		<div class="main-slogan-item"></div>
		<div class="main-phone" v-if="end == 1">
			<select name="area" id="area" class="main-phone__area">
				<option value="-1">選擇國碼</option>
				<option :value="area.location" v-for="area in areaCode">{{area.area}}</option>
			</select>
			<input type="text" class="main-phone__input" inputmode="numeric" id="phoneInput" placeholder="輸入手機號碼快速預約" maxlength="10" v-model="phoneNumber" />
			<a href="javascript:;" class="main-phone__btn-reserve" @click="sendPhone"></a>
		</div>
		<div class="main-otp" v-if="phoneCheck && end == 1">
			<input type="text" class="main-otp__input" autocomplete="one-time-code" placeholder="請輸入OTP簡訊驗證碼" v-model="otp" maxlength="8" />
			<a href="javascript:;" class="main-otp__btn-submit" @click="sendOTP"></a>
		</div>
		<div class="main-reotp" v-if="phoneCheck">
				<span class="main-reotp__info-notice">※ 每日發送驗證碼上限為3次</span>
				<a href="javascript:;" class="main-reotp__btn-re" @click="sendPhone(2)">重新發送驗證碼</a>
			</div>
	</div>
	<div class="main-form" data-type="2" v-else>
		<div class="main-slogan-item"></div>
		<div class="main-info">
			<div>恭喜您完成六轉預約，已獲得抽獎資格</div>
			<div>欲領取虛寶獎請需於1/9 23:59前確認遊戲帳號內已存在角色，否則將無法成功領取。</div>
		</div>
		<div class="main-invite">
			<div class="main-invite__notice">立即領取邀請碼，完成任務再得活動專屬虛寶</div>
			<div class="main-invite__code-box">
				<div class="main-invite__code">
					{{InvitationCode}}
					<a href="javascript:;" class="main-invite__copy" @click="copyInvitationCode"></a>
				</div>
				<a href="javascript:;" class="btn-reset" @click="reset">輸入其他手機門號</a>
			</div>
			<div class="main-invite__next">繼續參加邀請碼任務</div>
			<a href="javascript:;" class="main-invite__scroll" @click="targetPage('invite')"></a>
		</div>
	</div>
</div>`
};

export default main;
