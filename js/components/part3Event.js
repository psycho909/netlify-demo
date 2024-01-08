import { MessageLB, PhoneErrorLB, OTPErrorLB, InviteErrorLB, RewardLB, NewRewardLB } from "../lightbox.js";

import store from "../store.js";
const part3Event = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		login: {
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
	setup(props) {
		let currentNumber = 0;
		let api = false;
		let limitItem = Vue.reactive([
			{ image: "", name: "獎項文字獎項文字", type: 1, RewardInviteType: 0, RewardInvite1Type: 0 },
			{ image: "", name: "獎項文字獎項文字", type: 3, RewardInviteType: 0, RewardInvite3Type: 0 },
			{ image: "", name: "獎項文字獎項文字", type: 6, RewardInviteType: 0, RewardInvite6Type: 0 },
			{ image: "", name: "獎項文字獎項文字", type: 10, RewardInviteType: 0, RewardInvite10Type: 0 }
		]);
		let newItem = Vue.ref([
			{ cnt: 1, image: "", name: "整形欄位<br/>擴充券x1", type: 1, RewardInviteType: 0, RewardInvite1Type: 0 },
			{ cnt: 3, image: "", name: "髮型欄位<br/>擴充券x1", type: 3, RewardInviteType: 0, RewardInvite3Type: 0 },
			{ cnt: 6, image: "", name: "橘子支付<br/>零用金66元", type: 6, RewardInviteType: 0, RewardInvite6Type: 0 },
			{ cnt: 10, image: "", name: "蘑菇時裝選擇<br/>交換券x1", type: 10, RewardInviteType: 0, RewardInvite10Type: 0 }
		]);
		let time = Vue.computed(() => {
			let come = +new Date($("#hfLoginRewardDate").val());
			if (props.now >= come) {
				return true;
			} else {
				return false;
			}
		});
		let end = Vue.computed(() => {
			return $("#hfEvent2Status").val();
		});
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
		Vue.watch(
			() => props.cnt,
			(val, oldVal) => {
				if (val != undefined) {
					animateNumbers(props.cnt);
				}
			}
		);
		let LoginBtn = () => {
			window.localStorage.setItem("invite", "true");
			window.location.href = "./Login.aspx";
		};
		let getReward = (data, Kind, type) => {
			if (type == 2 && $("#hfEvent2Status").val() == 0 && data != 0) {
				NewRewardLB();
				return;
			}
			if (type == 2 && data != 0) {
				NewRewardLB();
				return;
			}
		};
		let RewardType1 = Vue.computed(() => {
			return limitItem.map((item) => {
				for (const key in item) {
					if (key !== "image" && key !== "name" && key !== "type") {
						item[key] = store.state.RewardType[key] || 0;
						item["RewardInviteType"] = store.state.RewardType[key] || 0;
					}
				}
				return item;
			});
		});
		let RewardType2 = Vue.computed(() => {
			return newItem.value.map((item) => {
				for (const key in item) {
					if (key !== "image" && key !== "name" && key !== "type" && key !== "cnt") {
						item[key] = store.state.RewardType[key] || 0;
						item["RewardInviteType"] = store.state.RewardType[key] || 0;
					}
				}
				return item;
			});
		});
		let inviteCnt = Vue.computed(() => {
			if (store.state.RewardType.Cnt > 10) {
				return 10;
			} else {
				return store.state.RewardType.Cnt;
			}
		});

		let headOpen = (e) => {
			e.target.parentElement.classList.toggle("on");
		};

		let linkLB = () => {
			MessageLB("實體獎勵中獎名單將於2024/01/17於本活動網頁公告並以手機簡訊通知中獎者");
		};
		return {
			LoginBtn,
			RewardType1,
			RewardType2,
			LoginBtn,
			time,
			end,
			inviteCnt,
			headOpen,
			getReward,
			linkLB
		};
	},
	template: `<div id="part3" class="section part3-event">
        <div class="section-title part3-event-title">全民六轉</div>
        <div class="part3-event-box">
            <div class="part3-event-head" @click="headOpen">查看預約人數</div>
            <div class="part3-event-body">
                <div class="part3-event-content">
                    <div class="part3-event-content__inner">
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
                        <a href="javascript:;" class="part3-event-btn" @click="linkLB">看中獎名單</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="part3-event-box">
            <div class="part3-event-head" @click="headOpen">我的邀請任務</div>
            <div class="part3-event-body">
                <div class="part3-event-content">
                <div class="part3-event-content__inner">
                        <a href="javascript:;" class="part3-event-login" @click="LoginBtn" v-if="!login">立即登入</a>
                        <div class="invite-content" data-type="2" v-else>
                        	<div class="invite-content__prize-box">
                                <div class="invite-content__prize-progress" :data-cnt="inviteCnt">
                                <div class="point1" data-cnt="1"></div>
                                <div class="point1" data-cnt="3"></div>
                                <div class="point1" data-cnt="6"></div>
                                <div class="point1" data-cnt="10"></div>
                                <div class="point2" data-cnt="2"></div>
                                <div class="point2" data-cnt="4"></div>
                                <div class="point2" data-cnt="5"></div>
                                <div class="point2" data-cnt="7"></div>
                                <div class="point2" data-cnt="8"></div>
                                <div class="point2" data-cnt="9"></div>
                            </div>
							<div class="invite-content__prize-list2">
								<div class="invite-content__prize-list2-title">
									<span>1/24前</span>
									<span>發放</span>
								</div>
								<div class="invite-content__prize-list2-item" :class="[time?'time':'']" :data-type="reward.RewardInviteType" :data-cnt="reward.cnt" v-for="reward in RewardType2" @click="getReward(reward.RewardInviteType,reward.type,2)">
									<div class="invite-content__prize-image"><span></span></div>
									<div class="invite-content__prize-name" v-html="reward.name"></div>
								</div>
							</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
};

export default part3Event;
