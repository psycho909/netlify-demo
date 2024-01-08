import { SelectCharacterAPI, FindCharacterAPI } from "./api.js";
import { setCookie, getCookie, deleteCookie } from "./tool.js";
import store from "./store.js";

export function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 02_手機號碼錯誤
export function PhoneErrorLB() {
	var HTML = `格式錯誤！<br/>請重新輸入手機號碼`;
	$.gbox.open(HTML, {
		addClass: "default default600",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 03_驗證碼錯誤
export function OTPErrorLB() {
	var HTML = `您的OTP驗證碼輸入錯誤，<br/>請重新確認！`;
	$.gbox.open(HTML, {
		addClass: "default default600",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 04_虛寶未領取
export function PrizeTipLB() {
	var HTML = `<div class="lb-text"><span>貼心提醒：</span></div>
	<div class="lb-text"><span>您尚有虛寶未領取，</span><span>記得至個人達成進度上</span></div>
	<div class="lb-text"><span>點擊您的虛寶獎勵，謝謝！</span></div>
	`;
	$.gbox.open(HTML, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 05_邀請碼輸入錯誤
export function InviteErrorLB() {
	var HTML = `<div class="lb-text"><span>查無此邀請碼，</span><span>請確認您輸入的邀請碼無誤，</span></div>
	<div class="lb-text"><span>若尚未領取可至預約活動參加</span></div>
	<a href="javascript:;" class="lb-btn-join">立即參加</a>
	`;
	$.gbox.open(HTML, {
		addClass: "default lb-invite-error",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			document.querySelector(".lb-btn-join").addEventListener("click", function () {
				$("html, body").animate({
					scrollTop: $(`#main`).offset().top
				});
				$.gbox.close();
			});
		}
	});
}

// 06_領獎
export function RewardLB() {
	var HTML = `菇菇寶貝正在運送虛寶，<br/>
	請於15分鐘後至遊戲內領取，謝謝！
	`;
	$.gbox.open(HTML, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 29_OTP超過上限
export function OTPLimitLB() {
	var HTML = `已超過今日驗證次數上限，<br/>
	請於00:00後再重新嘗試
	`;
	$.gbox.open(HTML, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 30_驗證碼已失效
export function OTPWaitLB() {
	var HTML = `您好，驗證碼已失效，請於5分鐘後重新輸入手機號碼寄送驗證碼`;
	$.gbox.open(HTML, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 31_查看新版本虛寶圖
export function NewRewardLB() {
	var HTML = `此虛寶獎勵將統一於1/24前派發至遊戲中，屆時請點擊禮物箱進行確認！`;
	$.gbox.open(HTML, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}
// 04_參加活動角色
export function SelectCharacter(data) {
	let obj = {
		GameWorldId: -1,
		CharacterId: -1
	};
	let GameWorldHTML = `<option value="-1">請選擇伺服器</option>`;
	let CharacterHTML = `<option value="-1">請選擇角色</option>`;
	var config = {
		addClass: "default default3",
		titleBar: "請選擇欲參加活動的角色",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: async function () {
			await deleteCookie("MapleEvent");
			window.location.href = "../../Logout/Logout.aspx";
		},
		afterOpen: function () {
			$(".lb-select").niceSelect();
			$("#GameWorldId").on("change", function () {
				obj.GameWorldId = $(this).val();
				if ($(this).val() == -1) {
					return;
				}
				CharacterHTML = `<option value="-1">請選擇角色</option>`;
				$("#loadingProgress").show();
				FindCharacterAPI({ GameWorldId: obj.GameWorldId, Token: getCookie("MapleEvent") })
					.then((res) => {
						let { Code, ListData, Url, Message } = res.data;
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
						obj.CharacterId = -1;
						ListData.forEach((gameWorld, index) => {
							CharacterHTML += `<option value="${gameWorld.CharacterId}">${gameWorld.CharacterName}</option>`;
						});
						$("#CharacterId").html(CharacterHTML);
						$(".lb-select").niceSelect("update");
					})
					.finally(() => {
						$("#loadingProgress").hide();
					});
			});
			$("#CharacterId").on("change", function () {
				obj.CharacterId = $(this).val();
			});
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-submit",
				click: function () {
					let valid = true;
					if (obj.GameWorldId == -1) {
						$(".GameWorldId-error").html("請選擇伺服器");
						valid = false;
					} else {
						$(".GameWorldId-error").html("");
					}
					if (obj.CharacterId == -1) {
						valid = false;
						$(".CharacterId-error").html("請選擇角色");
					} else {
						$(".CharacterId-error").html("");
					}
					if (!valid) {
						return;
					}
					$("#loadingProgress").show();
					SelectCharacterAPI({ GameWorldId: obj.GameWorldId, CharacterId: obj.CharacterId, Token: getCookie("MapleEvent") })
						.then((res) => {
							let { Code, ListData, Data, Url, Message } = res.data;
							if (Code == -1) {
								$("#loadingProgress").hide();
								MessageLB(Message);
								return;
							}
							if (Code == -2) {
								$("#loadingProgress").hide();
								MessageLB(Message, Url);
								return;
							}
							store.commit("SET_DATA", Data);
							store.commit("SET_LOGIN", true);
							$.gbox.close();
						})
						.finally(() => {
							$("#loadingProgress").hide();
						});
					// $.gbox.close();
				}
			}
		]
	};

	data.forEach((gameWorld, index) => {
		GameWorldHTML += `<option value="${gameWorld.GameWorldId}">${gameWorld.GameWorldName}</option>`;
	});
	var HTML = `
		<div class="lb-select-box">
			<select name="GameWorldId" id="GameWorldId" class="lb-select">${GameWorldHTML}</select>
			<div class="error GameWorldId-error"></div>
		</div>
		<div class="lb-select-box">
			<select name="CharacterId" id="CharacterId" class="lb-select"><option value="-1">請選擇角色</option></select>
			<div class="error CharacterId-error"></div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

export function gashNotice() {
	let html = `
	<div class="gash-title">《橘子支付領取注意事項》</div>
	<div class="notice-content">
		<ol class="notice-content__ol">
			<li class="notice-content__li">
			須從beanfun!申請/登入橘子支付會員：
				<ul className="notice-content__ul">
					<li class="notice-content__ul-li">註1：申請-註冊beanfun!並完成錢包-橘子支付實名認證成功</li>
					<li class="notice-content__ul-li">註2：登入-從beanfun!點選「錢包-橘子支付」完成手機驗證</li>
				</ul>
			</li>
			<li class="notice-content__li">
				beanfun! 橘子支付支援付款方式：
				<ul className="notice-content__ul">
					<li class="notice-content__ul-li">銀行信用卡：支援任一銀行VISA、MasterCard、JCB等卡別。</li>
					<li class="notice-content__ul-li">銀行連結帳戶：土地銀行、中華郵政、中國信託、 玉山銀行、台新銀行、台中銀行、兆豐銀行、永豐銀行、第一銀行、新光銀行、彰化銀行，另可設定自動儲值。</li>
					<li class="notice-content__ul-li">現金儲值：可至全家便利商店FamiPort、美廉社現金儲值。</li>
				</ul>
			</li>
			<li class="notice-content__li">本活動如贈與紅利、回饋金或零用金予使用者，您同意本公司於兌換之特定目的必要範圍內(含申報課稅等事宜)得將您個人資料提供予本活動商品或服務之參加廠商進行蒐集、處理及利用。</li>
			<li class="notice-content__li">本活動贈送之7-ELEVEN零用金1元等同於新臺幣1元，可於7-ELEVEN消費時100％折抵訂單金額；本活動之7-ELEVEN零用金不得使用於菸酒或其他法令不得促銷之商品，合作通路之促銷商品如無法使用7-ELEVEN零用金折抵，將以通路官方公告為準。</li>
			<li class="notice-content__li">若因交易失敗、退款、取消交易、帳務爭議或有其他不可歸責於橘子支付之事由，導致交易未完成者，將視同活動對象自願放棄回饋資格。議或有其他不可歸責於橘子支付之事由，導致交易未完成者，將視同活動對象自願放棄回饋資格。</li>
			<li class="notice-content__li">本活動依橘子支付系統紀錄之交易時間序限量回饋，如達活動總回饋上限，將停止活動優惠，不另行公告或通知。</li>
			<li class="notice-content__li">中獎者需依中華民國稅法規定申報機會中獎稅及所得稅，若得獎者不願提供相關資料或未如期繳納應繳稅額或其他可歸責得獎者事由致無法完成領獎手續等相關事宜者，即視為自動放棄中獎資格。</li>
			<li class="notice-content__li">依個人資料保護法規定，您瞭解並同意本公司為抽獎及行銷活動之目的內進行蒐集、處理及利用個人資料(僅限電話、email等資訊)。參加者如欲閱覽、變更、刪除個資或要求主辦單位停止蒐集、處理及利用個人資料，請通知橘子支付。</li>
			<li class="notice-content__li">若有因電腦、網路、電話、技術或其他不可歸責於本公司之事由，而使您登錄之資料有延遲、遺失、錯誤、無法辨識或毀損之情況，本公司不負擔任何法律責任。其他未盡事宜，悉依中華民國相關法令及本公司會員條款辦理。且橘子支行動支付(股)公司保留隨時修改、變更、終止本活動與替換其他等值贈品之權利，詳細活動內容請以橘子支付官方網站最新消息為主。</li>
			<li class="notice-content__li">會員若有beanfun!註冊等相關問題請洽， beanfun!客服專線(02)2192-6100選2-beanfun!。</li>
			<li class="notice-content__li">會員若有beanfun!橘子支付申請、登入或交易相關問題， 請洽橘子支付客服專線(02)2192-6100選5-橘子支付。</li>
		</ol>
	</div>
	`;
	$.gbox.open(html, {
		addClass: "default lb-gash",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 05_邀請碼輸入錯誤
export function SuperItemLB() {
	var HTML = `
	<div class="super-item-content">
		<div class="super-item-title"></div>
		<div class="super-item-box">
			<div class="super-item-title1"></div>
			<div class="super-item-list"></div>
		</div>
		<div class="super-item-box super-item-date">
			<div class="super-item-title2"></div>
			<div class="super-item-text">即日起~2024/04/01 23:59</div>
		</div>
		<div class="super-item-box">
			<div class="super-item-title3"></div>
			<div class="super-item-text">
				<p>Step1. 遊戲中點選「購物商城」</p>
				<p>Step2. 點擊畫面右上角「優惠券」</p>
				<p>Step3. 輸入序號【NEWAGEWK】立即獲得</p>
			</div>
		</div>
		<div class="super-item-doll"></div>
	</div>
	`;
	$.gbox.open(HTML, {
		addClass: "default lb-super-item",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}
