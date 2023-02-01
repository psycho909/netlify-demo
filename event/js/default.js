import store from "./store.js";
import { MessageLB, NoOTP, GoService, Completed, PhoneWarn, PhoneError, Already, Ready } from "./lightbox.js";
// Loading顯示
function loadingShow() {
	$("#loadingProgress").show();
}
// Loading隱藏
function loadingHide() {
	$("#loadingProgress").hide();
}
// Ready();
// $("input").on("input", function (e) {
// 	let value = e.target.value;
// 	let reg = value.match(/^\d+$/);
// 	if (reg == null) {
// 		e.target.value = "";
// 		return;
// 	}
// if (e.target.nextElementSibling == null) {
// 	return;
// }
// 	_.debounce(function (e) {
// 		e.target.nextElementSibling.focus();
// 	}, 400)(e);
// });
// MessageLB("錯誤");
let app = new Vue({
	el: "#app",
	store,
	data() {
		return {
			step1: 0,
			step2: 0,
			status: {},
			intervalId1: null,
			intervalId2: null,
			step1Phone: "",
			step1PhoneStatus: 1,
			step1PhoneError: 0,
			step1OTP: "",
			step1Num: 0,
			step1OTPStatue: 1,
			step1OTPError: "",
			step1OTPErrorNum: 0,
			step2Phone: "",
			step2PhoneStatus: 1,
			step2PhoneError: "",
			step2OTP: "",
			step2Num: 0,
			step2OTPStatue: 1,
			step2OTPError: "",
			step2OTPErrorNum: 0,
		};
	},
	mounted() {
		// this.intervalId1 = setInterval(this.countdown1, 1000);
	},
	computed: {
		getStatus() {
			return this.$store.state.status;
		},
	},
	methods: {
		NoOTP() {
			NoOTP();
		},
		countdown1() {
			if (this.step1 <= 1) {
				clearInterval(this.intervalId1);
				this.intervalId1 = null;
				return;
			}
			this.step1--;
		},
		countdown2() {
			if (this.step2 <= 1) {
				clearInterval(this.intervalId2);
				this.intervalId2 = null;
				return;
			}
			this.step2--;
		},
		reOTP(type) {
			if (type == "step1") {
				this.step1Num++;
				if (this.step1Num > 5) {
					this.step1OTPError = "※已達本日驗證簡訊發送上限，請聯繫客服";
					return;
				}
				if (this.step1 > 0) {
					return;
				}
				this.step1 = 60;
				this.intervalId1 = setInterval(this.countdown1, 1000);
			}
			if (type == "step2") {
				this.step2Num++;
				if (this.step2Num > 5) {
					this.step2OTPError = "※已達本日驗證簡訊發送上限，請聯繫客服";
					return;
				}
				if (this.step2 > 0) {
					return;
				}
				this.step2 = 60;
				this.intervalId2 = setInterval(this.countdown2, 1000);
			}
		},
		phoneCheck(type, e) {
			let value = e.target.value;
			let reg = /^\d+$/.test(value);
			if (type == "step1") {
				if (!reg) {
					this.step1PhoneError = "※號碼輸入錯誤，請重新輸入!";
					this.step1PhoneStatus = 1;
				} else {
					this.step1PhoneStatus = 2;
					this.step1PhoneError = "";
				}
			}
			if (type == "step2") {
				if (!reg) {
					this.step2PhoneError = "※號碼輸入錯誤，請重新輸入!";
					this.step2PhoneStatus = 1;
				} else {
					this.step2PhoneStatus = 2;
					this.step2PhoneError = "";
				}
			}
		},
		phoneSubmit(type) {
			if (type == "step1") {
				if (this.step1PhoneStatus != 2) {
					return;
				}
				this.step1PhoneStatus = 3;
			}
			if (type == "step2") {
				if (this.step2PhoneStatus != 2) {
					return;
				}
				this.step2PhoneStatus = 3;
			}
		},
		otpCheck(type, e) {
			let value = e.target.value;
			let reg = /^\d+$/.test(value);
			var keyEvt = e.originalEvent;
			if (e.type == "keyup") {
				if (!(e.ctrlKey && e.key == "z")) {
					if (value != "" && reg) {
						if (e.target.nextElementSibling != null) {
							e.target.nextElementSibling.focus();
						}
					} else if ((e.key != "Tab" && e.key != "Delete" && e.keyCode != 37 && e.keyCode != 39) || (e.ctrlKey && e.key == "z") || e.keyCode == 32) {
						if (isMobile.any) {
							e.target.value = "";
							e.preventDefault();
						}
					}
				}
			}
			if (e.type == "keydown") {
				if (/^[0-9]+$/.test(e.key) && !(e.ctrlKey && e.key == "z")) {
					//
				} else if (e.key == "Backspace") {
					if (value == "") {
						e.target.previousElementSibling.focus();
					}
				} else if (e.ctrlKey || e.key == "v") {
				} else if ((e.key != "Tab" && e.key != "Delete" && e.keyCode != 37 && e.keyCode != 39) || (e.ctrlKey && e.key == "z") || e.keyCode == 32) {
					e.target.value = "";
					e.preventDefault();
				}
			}

			if (type == "step1") {
				this.step1OTP = "";
				this.$refs.otp1.forEach((v, i) => {
					this.step1OTP += v.value;
				});
				if (this.step1OTP.length == 6) {
					this.step1OTPStatue = 2;
				} else {
					this.step1OTPStatue = 1;
				}
			}
			if (type == "step2") {
				this.step2OTP = "";
				this.$refs.otp2.forEach((v, i) => {
					this.step2OTP += v.value;
				});
				if (this.step2OTP.length == 6) {
					this.step2OTPStatue = 2;
				} else {
					this.step2OTPStatue = 1;
				}
			}
		},
		otpSubmit(type) {
			if (type == "step1") {
				if (this.step1OTPStatue != 2 || this.step1OTPErrorNum == 5) {
					return;
				}
				MessageLB(this.step1OTP);
				this.step1OTPError = "";
				this.step1OTPErrorNum += 1;
				this.step1OTPError = `※驗證碼輸入錯誤，請重新輸入(${this.step1OTPErrorNum}/5)`;
				if (this.step1OTPErrorNum > 5) {
					this.step1OTPError = "※輸入錯誤次數過多，暫時無法提供此服務，請於60分鐘後再試";
				}
				this.step1OTPErrorNum = 0;
				this.step1OTPStatue = 3;
			}
			if (type == "step2") {
				if (this.step2OTPStatue != 2 || this.step2OTPErrorNum == 5) {
					return;
				}
				this.step2OTPError = "";
				this.step2OTPErrorNum += 1;
				this.step2OTPError = `※驗證碼輸入錯誤，請重新輸入(${this.step2OTPErrorNum}/5)`;
				if (this.step2OTPErrorNum > 5) {
					this.step2OTPError = "※輸入錯誤次數過多，暫時無法提供此服務，請於60分鐘後再試";
				}
				this.step2OTPErrorNum = 0;
				this.step2OTPStatue = 3;
			}
		},
		onFocus(e) {
			e.target.select();
		},
		onPaste(type, index, e) {
			var evtIdx = index;
			var aryIdx = 0;
			var clipboardDataObj = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
			var copiedText = clipboardDataObj.getData("Text");
			var copiedTextAry = copiedText.split("");
			var _this = this;
			if (!/^[0-9]+$/.test(copiedText)) {
				if (type == "step1") {
					this.step1OTPError = "";
					this.step1OTPError = "格式錯誤，貼上的文字不可包含數字以外的字元";
				}
				if (type == "step2") {
					this.step2OTPError = "";
					this.step2OTPError = "格式錯誤，貼上的文字不可包含數字以外的字元";
				}
				e.target.value = "";
				return;
			}
			if (type == "step1") {
				this.step1OTP = "";
				this.$refs.otp1.forEach((v, i) => {
					if (evtIdx == i) {
						if (copiedTextAry[aryIdx] != undefined) {
							evtIdx++;
							this.$refs.otp1[i].value = copiedTextAry[aryIdx];
							aryIdx++;
							setTimeout(function () {
								_this.$refs.otp1[i].focus();
							});
						}
					}
					this.step1OTP += v.value;
				});
				if (this.step1OTP.length == 6) {
					this.step1OTPStatue = 2;
				} else {
					this.step1OTPStatue = 1;
				}
			}
			if (type == "step2") {
				this.step2OTP = "";
				this.$refs.otp2.forEach((v, i) => {
					if (evtIdx == i) {
						if (copiedTextAry[aryIdx] != undefined) {
							evtIdx++;
							this.$refs.otp2[i].value = copiedTextAry[aryIdx];
							aryIdx++;
							setTimeout(function () {
								_this.$refs.otp2[i].focus();
							});
						}
					}
					this.step2OTP += v.value;
				});
				if (this.step2OTP.length == 6) {
					this.step2OTPStatue = 2;
				} else {
					this.step2OTPStatue = 1;
				}
			}
		},
	},
});
