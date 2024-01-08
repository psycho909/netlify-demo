import { MessageLB, PhoneErrorLB, OTPErrorLB, InviteErrorLB, RewardLB, NewRewardLB } from "../lightbox.js";
import { AddInviteCodeAPI, GetRewardAPI, GetInitDataAPI } from "../api.js";
import store from "../store.js";

const invite = {
	props: {
		login: {
			type: Boolean,
			default: false
		},
		mobile: {
			type: Boolean,
			default: false
		},
		now: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		let api = false;
		let InviteCode = Vue.ref("");
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
		let setInviteCode = () => {
			if ($("#hfEvent2Status").val() == 0) {
				MessageLB("活動已結束");
				return;
			}
			if (InviteCode.value.length == 0) {
				MessageLB("請輸入邀請碼");
				return;
			}
			if (api) {
				return;
			}
			api = true;
			$("#loadingProgress").show();
			AddInviteCodeAPI({
				Token: store.state.Token,
				InviteCode: InviteCode.value
			})
				.then(async (res) => {
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
					if (Code == 2) {
						InviteErrorLB();
						$("#loadingProgress").hide();
						return;
					}
					if (Message !== null) {
						MessageLB(Message);
					} else {
						MessageLB("邀請碼輸入成功");
					}
					InviteCode.value = "";
					// let GetInitData = await GetInitDataAPI(token.value);
					// store.commit("SET_DATA", GetInitData.Data);
					store.commit("SET_REWARD_TYPE", Data);
				})
				.finally(() => {
					api = false;
					$("#loadingProgress").hide();
				});
		};
		let getReward = (data, Kind, type) => {
			if (type == 1 && $("#hfEvent2Status").val() == 0 && data == 1) {
				MessageLB("活動已結束");
				return;
			}
			if (type == 2 && $("#hfEvent2Status").val() == 0 && data != 0) {
				NewRewardLB();
				return;
			}
			if (type == 2 && data != 0) {
				NewRewardLB();
				return;
			}
			if (data != 1) {
				return;
			}
			if (api) {
				return;
			}
			api = true;
			$("#loadingProgress").show();
			GetRewardAPI({
				Token: store.state.Token,
				Kind
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
					if (Code != 1) {
						MessageLB(Message);
						$("#loadingProgress").hide();
						return;
					}
					if (type == 1) {
						RewardLB(Data);
					} else {
						NewRewardLB(Data);
					}

					store.commit("SET_DATA", Data);
				})
				.finally(() => {
					api = false;
					$("#loadingProgress").hide();
				});
		};
		let LoginBtn = () => {
			window.localStorage.setItem("invite", "true");
			window.location.href = "./Login.aspx";
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
		Vue.nextTick(() => {});
		return {
			InviteCode,
			setInviteCode,
			getReward,
			RewardType1,
			RewardType2,
			LoginBtn,
			time,
			end,
			inviteCnt
		};
	},
	template: `<div class="section invite" id="invite">
    <div class="section-title invite-title">邀請碼任務</div>
	<div class="invite-date">
		<span>2023/12/6 12:00 -2024/1/9 23:59</span>
		<span>《新楓之谷》楓寶獨家任務開跑，快來收集預約邀請碼，獲得專屬虛寶吧！</span>
	</div>
    <!-- 未登入 -->
    <div class="invite-content" data-type="1" v-if="!login">
        <div class="invite-content__text">
			<ol class="invite-content__ol">
				<li class="invite-content__li">活動期間內，於本網頁登入遊戲帳號，並至此任務區輸入任一「好友邀請碼」，完成指定進度即獲可得對應的虛寶獎勵！</li>
				<li class="invite-content__li">一組邀請碼僅能使用一次，快揪你的親朋好友一起來預約，取得更多邀請碼吧！</li>
			</ol>
		</div>
        <div class="invite-content__item-list">
            <div class="invite-content__item-li" data-cnt="1">
                <div class="invite-content__item-image-1">
                    <span></span>
                </div>
                <div class="invite-content__item-name">整形欄位<br/>擴充券x1</div>
            </div>
            <div class="invite-content__item-li" data-cnt="3">
                <div class="invite-content__item-image-1">
                    <span></span>
                </div>
                <div class="invite-content__item-name">髮型欄位<br/>擴充券x1</div>
            </div>
            <div class="invite-content__item-li" data-cnt="6">
                <div class="invite-content__item-image-1">
                    <span></span>
                </div>
                <div class="invite-content__item-name">橘子支付<br/>零用金66元</div>
            </div>
            <div class="invite-content__item-li" data-cnt="10">
                <div class="invite-content__item-image-1">
                    <span></span>
                </div>
                <div class="invite-content__item-name">蘑菇時裝<br/>選擇交換劵x1</div>
            </div>
        </div>
        <a href="javascript:;" class="invite-btn-login" @click="LoginBtn">立即登入</a>
    </div>
    <!-- 已登入 -->
    <div class="invite-content" data-type="2" v-else>
        <div class="invite-enter" v-if="end == 1">
            <input type="text" class="invite-enter__input" placeholder="輸入邀請碼" maxlength="36" v-model="InviteCode" />
            <a href="javascript:;" class="invite-btn-submit" @click="setInviteCode">確認</a>
        </div>
		<div class="invite-content__text">
			<ol class="invite-content__ol">
				<li class="invite-content__li">活動期間內，於本網頁登入遊戲帳號，並至此任務區輸入任一「好友邀請碼」，完成指定進度即獲可得對應的虛寶獎勵！</li>
				<li class="invite-content__li">一組邀請碼僅能使用一次，快揪你的親朋好友一起來預約，取得更多邀請碼吧！</li>
			</ol>
		</div>
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
</div>`
};

export default invite;
