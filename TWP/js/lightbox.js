import pinia from "./pinia.js";
import useEventStore from "./store.js";
import { InsertUserDataAndCharacter } from "./api.js";

export function MessageLB(msg, url, callback) {
	// const store = useEventStore(pinia);
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
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
				}
			}
		]
	});
}

// index 警告
export function Warning() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "是，已滿十八歲",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "否，離開",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="warning-icon"></div>
		<div class="warning-content">
			<p>你即將進入遊戲之內容</p>
			<p>需買十八歲方可瀏覽</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// index 注意事項
export function Notice() {
	var config = {
		addClass: "default w840 notice",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			document.documentElement.style.overflow = "hidden";
			$(".notice-content").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true
				}
				// advanced: { extraDraggableSelectors: ".notice-content" }
			});
		},
		afterClose: function () {
			document.documentElement.style.overflow = "auto";
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="notice-title">注意事項</div>
		<div class="notice-content">
			<ol class="notice-list">
			<li class="notice-list__item">每個帳號最多僅可選擇1組伺服器並預先搶占1個角色名稱。</li>
			<li class="notice-list__item">伺服器與角色名稱一經確認後，將無法進行修改。</li>
			<li class="notice-list__item">搶占的角色名需在遊戲上市14天以內於遊戲中完成角色創立，若未於期限內使用，搶占的角色名稱與選定的伺服器資訊將會自動刪除，亦無法獲得任務獎勵。</li>
			<li class="notice-list__item">完成搶占後，重新登入活動頁即可查詢已選定的伺服器與搶占的角色名稱。</li>
			<li class="notice-list__item">每獲取1個稱號後需再等待24小時，方可再次獲取稱號。</li>
			<li class="notice-list__item">每個帳號最多可擁有3個稱號，若想再次獲取需先刪除1個已持有的稱號。</li>
			<li class="notice-list__item">活動結束前，若將已經達成任務條件的稱號刪除，則需在活動結束時再次滿足任務需要的稱號，才可獲得任務獎勵。</li>
			<li class="notice-list__item">任務獎勵將於上市30天內發送至預創角色的信箱之中，若未在信件發送後30天內領取獎勵，信件獎勵將會自動刪除且不再補發。</li>
			<li class="notice-list__item">活動時間為2024/05/16 15:00~2024/06/06 12:00為止。</li>
			<li class="notice-list__item">活動開始起，所有參與本活動玩家將視同同意本活動最後公告之內容。</li>
			<li class="notice-list__item">玩家如因個人線路不穩導致斷線或連接失敗等問題，或因其他非可歸責於本公司之事由，本公司將一概不負任何責任，活動亦將照常舉行且不另作其他補償。</li>
			<li class="notice-list__item">活動所標示之各項達成條件，將依本公司系統紀錄之數據為主，而非玩家自行判定是否達成活動條件。</li>
			</ol>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇領域
// 選擇領域 - 未搶佔
export function SelectNot() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱尚未被搶佔</p>
			<p>是否搶先獲得此角色名稱?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 已佔領
export function SelectPlundered() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱已被搶佔</p>
			<p>發起搶奪即有機會可搶奪該名稱</p>
			<p>是否進行搶奪?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 搶奪成功
export function SelectPlunderSuccess() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "設定為預創角色",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<p>已成功搶奪角色名稱</p>
			<div class="select-realm-name select-realm-name--my">角色名稱最多十個文字</div>
			<p class="red">*72小時後該名稱將可被他人搶奪</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 搶奪失敗
export function SelectPlunderFailed() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-text">搶奪失敗</div>
			<p>名稱已受到保護，</p>
			<p>請於保護消失後再次嘗試搶奪</p>
			<div class="plunder-protect-time-box">
				<span class="plunder-protect-time__icon"></span>
				<div class="plunder-protect-time__num-box">
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="hour" data-num="0"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="hour" data-num="3"></i>
					<i class="plunder-protect-time__num icon--num-style1 i--colon"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="min" data-num="1"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="min" data-num="6"></i>
					<i class="plunder-protect-time__num icon--num-style1 i--colon"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="sec" data-num="5"></i>
					<i class="plunder-protect-time__num icon--num icon--num-style1" data-type="sec" data-num="9"></i>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇領域 - 未創立
export function SelectCreate(data) {
	const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					store.setCurrentPage("create");
					$.gbox.close();
					// 打API
					// InsertUserDataAndCharacter(data).then((res) => {
					// 	$("#loadingProgress").hide();
					// 		let { code, message, listData,url } = res.data;
					// 		if (code == -1) {
					// 			MessageLB(message);
					// 			return;
					// 		}
					// 	if(code == -2){
					// 		MessageLB(message,url);
					// 		return;
					// 	}
					// SelectCreated(data);
					// });
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<div class="select-realm-name">角色名稱最多十個文字</div>
			<p>名稱尚未被使用</p>
			<p>是否使用該名稱創立角色?</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇領域 - 創立成功
export function SelectCreated(data) {
	const store = useEventStore(pinia);
	var config = {
		addClass: "default lb-select",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "召換天命",
				class: "btn",
				click: function () {
					store.setCurrentPage("create");
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="select-realm-content">
			<p class="select-realm-p select-realm-p--18">已成功創立角色名稱</p>
			<div class="select-realm-box">
				<div class="select-realm__group select-realm__world">
					<span class="select-realm__world-icon"></span>
					<span class="select-realm__world-name">扭曲的黃金港 1</span>
				</div>
			</div>
			<div class="select-realm-name">台灣南波萬</div>
			<p>前往稱號加冕，獲得更多獎勵</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 預創角色
// 預創角色 - 保護
export function PreProtect() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="preprotect-content">
			<p>是否將此名稱套用24小時保護狀態?</p>
			<div class="preprotect-name">角色名稱最多十個文字</div>
			<p>若選擇的名稱仍有剩餘保護時間，</p>
			<p class="red">再次套用時僅會獲得24小時保護時間，</p>
			<p>剩餘保護時間不會進行累加。</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 預創角色 - 技能冷卻中
export function PreCD() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="preprotect-content">
			<div class="preprotect-text">技能冷卻中</div>
			<p>請等冷卻時間結束後，重新嘗試</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色
// 搶奪角色 - 搶奪成功
export function PlunderSuccess(data) {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-plunder-content">
			<p>已成功獲得天命</p>
			<div class="lb-plunder-name">角色名稱最多十個文字</div>
			<p>每隔24小時可獲得新的稱號，</p>
			<p>收集稱號完成任務取得更多獎勵吧！</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色 - 已被搶奪
export function Plundered() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-plunder-content">
			<p>角色名稱已被搶奪</p>
			<div class="lb-plunder-name">角色名稱最多十個文字</div>
			<p class="red">系統已自動給與『無名之輩01』角色名稱</p>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 搶奪角色 - 搶奪失敗
export function PlunderFailed() {
	// const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="plunder-content">
			<div class="plunder-name plunder-name--mb">搶奪失敗</div>
			<p>名稱已受到保護，</p>
			<p>請於保護消失後再次嘗試搶奪</p>
			<div class="plunder-protect-time-box">
				<span class="plunder-protect-time__icon"></span>
				<div class="plunder-protect-time__num-box">
					<i class="plunder-protect-time__num" data-type="hour" data-num="0"></i>
					<i class="plunder-protect-time__num" data-type="hour" data-num="3"></i>
					<i class="plunder-protect-time__num i--colon"></i>
					<i class="plunder-protect-time__num" data-type="min" data-num="1"></i>
					<i class="plunder-protect-time__num" data-type="min" data-num="6"></i>
					<i class="plunder-protect-time__num i--colon"></i>
					<i class="plunder-protect-time__num" data-type="sec" data-num="5"></i>
					<i class="plunder-protect-time__num" data-type="sec" data-num="9"></i>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 任務內容
export function Mission() {
	let msg = `
	<div class="lb-mission__content">
		<div class="lb-mission__list">
			<div class="lb-mission__item complete">
				<span>活動結束後每持有1個紫色天命</span>
				<span>可獲得一般造型召喚券5張</span>
			</div>
			<div class="lb-mission__item">
				<span>活動結束後每持有1個紫色天命</span>
				<span>可獲得一般造型召喚券5張</span>
			</div>
			<div class="lb-mission__item">
				<span>活動結束後每持有1個紫色天命</span>
				<span>可獲得一般造型召喚券5張</span>
			</div>
			<div class="lb-mission__item">
				<span>活動結束後每持有1個紫色天命</span>
				<span>可獲得一般造型召喚券5張</span>
			</div>
		</div>
	</div>
	`;
	$.gbox.open(msg, {
		addClass: "default lb-mission",
		hasCloseBtn: true,
		hasActionBtn: false
	});
}

// 捨棄天命
export function RemoveTitle(Seq) {
	const store = useEventStore(pinia);
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn",
				click: function () {
					store.removeTitle(Seq);
					$.gbox.close();
				}
			},
			{
				text: "返回",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-plunder-content">
			<p>是否捨棄天命</p>
			<div class="lb-plunder-name">角色名稱最多十個文字</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 需強制出現跳窗告知玩家如何遊玩，且點擊按鈕後即可關閉跳窗(無需幫玩家抽取稱號)
export function Guide() {
	function handleOrientationChange() {
		var orientation = window.orientation || window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation;
		if (orientation.angle !== undefined) {
			orientation = orientation.angle;
		}
		setTimeout(() => {
			switch (orientation) {
				case 0:
					if (document.documentElement.clientWidth <= 768) {
						if (isMobile.any) {
							$(".lb-guide-step").mCustomScrollbar({
								theme: "light",
								contentTouchScroll: true,
								mouseWheel: {
									preventDefault: true
								}
							});
						}
					} else {
						$(".lb-guide-step").mCustomScrollbar("destroy");
					}
					break;
				case 90:
				case -90:
					if (document.documentElement.clientWidth <= 768) {
						if (isMobile.any) {
							$(".lb-guide-step").mCustomScrollbar({
								theme: "light",
								contentTouchScroll: true,
								mouseWheel: {
									preventDefault: true
								}
							});
						}
					} else {
						$(".lb-guide-step").mCustomScrollbar("destroy");
					}
					break;
				case 180:
					if (document.documentElement.clientWidth <= 768) {
						if (isMobile.any) {
							$(".lb-guide-step").mCustomScrollbar({
								theme: "light",
								contentTouchScroll: true,
								mouseWheel: {
									preventDefault: true
								}
							});
						}
					} else {
						$(".lb-guide-step").mCustomScrollbar("destroy");
					}
					break;
			}
		}, 200);
	}
	var config = {
		addClass: "default lb-guide",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			document.documentElement.style.overflow = "hidden";
			// 在頁面加載時綁定事件監聽器
			window.addEventListener("orientationchange", handleOrientationChange);
			if (document.documentElement.clientWidth <= 768) {
				if (isMobile.any) {
					$(".lb-guide-step").mCustomScrollbar({
						theme: "light",
						contentTouchScroll: true,
						mouseWheel: {
							preventDefault: true
						}
					});
				}
			}
		},
		afterClose: function () {
			document.documentElement.style.overflow = "auto";
			window.removeEventListener("orientationchange", handleOrientationChange);
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "馬上進入稱號加冕",
				class: "btn lb-create-btn",
				click: function () {
					document.documentElement.style.overflow = "auto";
					window.removeEventListener("orientationchange", handleOrientationChange);
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-guide-content">
			<div class="lb-guide-title">活動說明</div>
			<div class="lb-guide-step">
				<div class="lb-guide-step__item" data-step="1">
					<div class="lb-guide-step__item-title"></div>
					<div class="lb-guide-step__item-text">
						<span>點擊獲取稱號，</span>
						<span>將隨機獲得一個稱號。</span>
					</div>
					<div class="lb-guide-step__item-content"></div>
				</div>
				<div class="lb-guide-step__item" data-step="2">
					<div class="lb-guide-step__item-title" data-step="2"></div>
					<div class="lb-guide-step__item-text">
						<span>確認持有稱號狀態，</span>
						<span>或選擇捨棄稱號。</span>
					</div>
					<div class="lb-guide-step__item-content"></div>
				</div>
				<div class="lb-guide-step__item" data-step="3">
					<div class="lb-guide-step__item-title"></div>
					<div class="lb-guide-step__item-text">
						<span>達成任務條件，</span>
						<span>將可獲得獎勵。</span>
					</div>
					<div class="lb-guide-step__item-content"></div>
				</div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}
