import { SelectCharacter, FindCharacter, GetInitData } from "./api.js";
import pinia from "./pinia.js";
import useEventStore from "./store.js";

export function MessageLB(msg, url, callback) {
	$.gbox.open(`<div class="lb-msg-content">${msg}</div>`, {
		addClass: "default lb-coming",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			useEventStore(pinia).Count++;
			// if (url) window.location.href = url;
			// else {
			// 	$.gbox.close();
			// 	if (callback) {
			// 		callback();
			// 	}
			// }
		},
	});
}
// 04_參加活動角色
export function SelectCharacterLB(data) {
	let obj = {
		GameWorldId: -1,
		CharacterId: -1,
	};
	let GameWorldHTML = `<option value="-1">請選擇伺服器</option>`;
	let CharacterHTML = `<option value="-1">請選擇角色</option>`;
	var config = {
		addClass: "default lb-gameworld",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: async function () {
			await deleteCookie("MapleEvent");
			window.location.href = "../../Logout/Logout.aspx";
		},
		afterOpen: function () {
			// $(".lb-select").niceSelect();
			$("#GameWorldId").on("change", function () {
				obj.GameWorldId = $(this).val();
				if ($(this).val() == -1) {
					return;
				}
				CharacterHTML = `<option value="-1">請選擇角色</option>`;
				$("#loadingProgress").show();
				FindCharacter({ GameWorldId: obj.GameWorldId, Token: getCookie("MapleEvent") })
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
						// $(".lb-select").niceSelect("update");
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
				text: "送出",
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
					SelectCharacter({ GameWorldId: obj.GameWorldId, CharacterId: obj.CharacterId, Token: getCookie("MapleEvent") })
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
							store.setLogin(true);
							$.gbox.close();
						})
						.finally(() => {
							$("#loadingProgress").hide();
						});
				},
			},
		],
	};

	data.forEach((gameWorld, index) => {
		GameWorldHTML += `<option value="${gameWorld.GameWorldId}">${gameWorld.GameWorldName}</option>`;
	});
	var HTML = `
		<div class="lb-gameworld-content">
			<div class="lb-gameworld-text-box">
				<div class="lb-gameworld-text-group">請選擇欲參加活動</div>
				<div class="lb-gameworld-text-group">
					<span>的</span>
					<span>角</span>
					<span>色</span>
				</div>
			</div>
			<div class="lb-gameworld-box">
				<select name="GameWorldId" id="GameWorldId" class="lb-select">${GameWorldHTML}</select>
				<div class="error GameWorldId-error"></div>
			</div>
			<div class="lb-gameworld-box">
				<select name="CharacterId" id="CharacterId" class="lb-select"><option value="-1">請選擇角色</option></select>
				<div class="error CharacterId-error"></div>
			</div>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 中獎記錄查詢
export function LotteryLogLB(list) {
	var config = {
		addClass: "default lb-lottery-log",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
		afterOpen: function () {
			$(".lb-lottery-log-list-box").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				mouseWheel: {
					preventDefault: true,
				},
				advanced: { extraDraggableSelectors: ".lb-lottery-log-list-box" },
			});
		},
	};
	let HTML = "";
	let LogHTML = "";
	list.forEach((item, index) => {
		LogHTML += `
			<div class="lb-lottery-log-list__box">
				<div class="lb-lottery-log-list__item">${item.ItemName}x${item.ItemCount}</div>
				<div class="lb-lottery-log-list__item">${item.CreateTime}</div>
			</div>
		`;
	});
	HTML = `
	<div class="lb-lottery-log-title">帳號</div>
	<div class="lb-lottery-log-account">XXXXXXXXXXXXXXXXXXXX</div>
	<div class="lb-lottery-log-text-box">
		<div class="lb-lottery-log-text-group">道具</div>
		<div class="lb-lottery-log-text-group">
			<span>獲</span>
			<span>取</span>
			<span>記</span>
			<span>錄</span>
		</div>
	</div>
	<div class="lb-lottery-log-list-box"><div class="lb-lottery-log-list">${LogHTML}</div></div>
	`;
	$.gbox.open(HTML, config);
}
// 一起出發冒險
export function GoLotteryLB(item) {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};
	let HTML = `
	<div class="lb-lottery-content">
		<div class="lb-lottery-text-box">
			<div class="lb-lottery-text-group">
				<span>恭</span>
				<span>喜</span>
				<span>獲</span>
				<span>得</span>
			</div>
			<div class="lb-lottery-text-group">卡勒馬永遠的輪迴星火x2</div>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// COMING SOON
export function ComingSoonLB() {
	var config = {
		addClass: "default lb-coming",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};
	let HTML = `
	<div class="lb-coming-content">
		<div class="lb-coming-text-box">
			<div class="lb-coming-text-group">coming</div>
			<div class="lb-coming-text-group">
				<span>s</span>
				<span>o</span>
				<span>o</span>
				<span>n</span>
			</div>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}
