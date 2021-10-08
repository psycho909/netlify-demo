var defaultObj = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "切換帳號",
			class: "btn-change",
			click: function () {
				$.gbox.close();
			},
		},
		{
			text: "我要領",
			class: "btn-confirm",
			click: function () {
				$.gbox.close();
			},
		},
	],
};
// 未完成蛋糕裝飾
function CakeScreenError() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};
	var text = `
        <div>
            <p>裝飾物至少要放3個(含)以上</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// 裝飾物數量超過
function DecoLimitWarning() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>裝飾物上限使用30個。</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// 裝飾物提醒
function DecoWarning() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>裝飾物請放在裝飾範圍內並且</p>
            <p>需與蛋糕體或其他裝飾物相連哦。</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// DecoWarning();

// 教學結束
function GuideEnd() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "裝飾蛋糕GO!",
				class: "btn-go",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>教學結束!</p>
            <p>如果忘記了可以於</p>
            <p>活動說明再看一次唷!</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// GuideEnd()

// 蛋糕截圖
function ScreenShot(base64, account) {
	var screenshotObj = {
		addClass: "screenshot",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
			stage.find("#remove")[0].show();
		},
	};
	var html = `
        <div class="screenshot-content">
            <div class="screenshot-cake">
                <img src="${base64}" alt="" />
            </div>
            <div class="screenshot-account">
                <div class="screenshot-account-box">
					<span>蛋糕師傅：</span>
					<span>${account}</span>
                </div>
            </div>
        </div>
        <div class="screenshot-notice">
            <p>*請使用手機內建截圖功能!</p>
            <p>截圖後到跑跑粉絲團參加</p>
            <p>【誰是六星級的蛋糕師傅!?】的活動吧! </p>
            <p>烈焰馬拉松 V1會獎落誰家呢!?</p>
        </div>
    `;
	$.gbox.open(html, screenshotObj);
}

// ScreenShot();

// 蛋糕重製1
function CakeResetCheck() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "我再想想",
				class: "btn-think",
				click: function () {
					$.gbox.close();
				},
			},
			{
				text: "確定",
				class: "btn-success-pink",
				click: function () {
					Save($(".account-info").text(), {}, "reset");
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>是否確定要將蛋糕清空?</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// CakeResetCheck();
// 蛋糕重製2
function CakeResetComplete() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>蛋糕已重置，</p>
            <p>快來重新裝飾你的蛋糕吧！</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// CakeResetComplete();

// 蛋糕存檔
function CakeSaveComplete() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>蛋糕已保存。</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 已領取
function RewardComplete(date) {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>獎勵已於</p>
			<p>${date}領取</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 完成蛋糕1
function CakeMakeCheck() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "先不要",
				class: "btn-no",
				click: function () {
					$.gbox.close();
				},
			},
			{
				text: "我要領",
				class: "btn-confirm",
				click: function () {
					Exchange($(".account-info").text());
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>恭喜完成雙十國慶蛋糕!</p>
			<p>是否要領取</p>
			<p>「國慶日慶祝蛋糕50個」呢？</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 完成蛋糕2
function CakeMakeComplete() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>獎勵將於2小時後</p>
			<p>發放至遊戲內禮物盒。</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 未完成蛋糕
function CakeMakeError() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};
	var text = `
        <div>
            <p>裝飾物至少要放3個(含)以上</p>
			<p>並且按下儲存才能領取獎勵!</p>
			<p>快來裝飾你的國慶蛋糕吧!</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 活動辦法1&2
function EventInfo(type) {
	var defaultObj = {
		addClass: "default event-info",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {
			$(".event-info__list-box").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				advanced: { extraDraggableSelectors: ".event-info__list-box" },
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
	};
	if (type == "account") {
		defaultObj.actionBtns = [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					GetAccount();
				},
			},
		];
	}
	if (type == "qa") {
		defaultObj.actionBtns = [
			{
				text: "裝飾教學",
				class: "btn-guide",
				click: function () {
					$.gbox.close();
					EventGuide();
				},
			},
			{
				text: "切換帳號",
				class: "btn-change",
				click: function () {
					GetAccount();
				},
			},
		];
	}
	var text = `
        <div>
            <p>活動說明</p>
			<div class="event-info__list-box">
				<ul class="event-info__list">
					<li class="event-info__li">
						<span>活動時間：</span>
						<span>10/8(五) 10:00 ~ 10/22(五) 09:59</span>
					</li>
					<li class="event-info__li">
						<span>活動方式：歡慶雙十國慶，來DIY你</span>
						<span>的專屬蛋糕，裝飾物裝飾三個(含)以</span>
						<span>上即可領取獎勵，每個遊戲帳號皆可</span>
						<span>領取一次。</span>
					</li>
					<li class="event-info__li">
						<span>活動獎勵：國慶日慶祝蛋糕50個。</span>
					</li>
					<li class="event-info__li">
						<span>每個遊戲帳號皆可參加。</span>
					</li>
					<li class="event-info__li">
						<span>蛋糕體顏色點擊即可更換，僅能選擇</span>
						<span>一種；裝飾物上限使用30個。</span>
					</li>
					<li class="event-info__li">
						<span>裝飾完3個(含)以上的裝飾物時記得要</span>
						<span>從選單中按下儲存，領獎燈才會亮起</span>
						<span>唷！</span>
					</li>
					<li class="event-info__li">
						<span>【誰是六星級的蛋糕師傅！？】活動</span>
						<span>請上跑跑卡丁車官方粉絲團查看。</span>
					</li>
					<li class="event-info__li">
						<span>主辦方保留隨時修改、變更、暫停或</span>
						<span>終止本活動內容之權利，並以官方網</span>
						<span>站公告為準。若有其他未盡事宜，悉</span>
						<span>依主辦方相關規定或解釋。</span>
					</li>
				</ul>
			</div>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// EventInfo();

// 完成參加1&2
function JoinComplete() {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>參加完成!</p>
			<p>快來製作自己專屬的</p>
			<p>雙十國慶蛋糕吧!</p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}

// 請選擇遊戲帳號
function SelectAccount(data) {
	var defaultObj = {
		addClass: "default select-account",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			$(".select-account__list-box").mCustomScrollbar({
				theme: "light",
				contentTouchScroll: true,
				advanced: { extraDraggableSelectors: ".select-account__list-box" },
			});
			$(".menu-list__btn[data-btn=reward]").attr("data-reward", "none");
			$(".account-info").attr("data-date", "");
			$(".select-account__error").text("");
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "活動說明",
				class: "btn-info",
				click: function () {
					EventInfo("account");
				},
			},
			{
				text: "下一步",
				class: "btn-next",
				click: function () {
					if (!$(".select-account__radio:checked").val()) {
						$(".select-account__error").text("請選擇參加活動的遊戲帳號");
						return;
					}
					if ($(".select-account__radio:checked").parent().find(".select-account__reward-date").length) {
						$(".menu-list__btn[data-btn=reward]").attr("data-reward", "complete");
						$(".account-info").attr("data-date", $(".select-account__radio:checked").parent().find(".select-account__reward-date").text());
					}
					$(".select-account__error").text("");
					SetAccount($(".select-account__radio:checked").val());
					$.gbox.close();
				},
			},
		],
	};
	var accountHTML = "";
	data.forEach(function (j) {
		accountHTML += `
			<label for="${j.ServiceAccountID}" class="select-account__label">
				<input id="${j.ServiceAccountID}" type="radio" class="select-account__radio" name="account" value="${j.ServiceAccountID}" />
				<span class="select-account__style"></span>
				<span class="select-account__text">${j.ServiceAccountDisplayName}</span>
				${j.Date != "" && j.Date != null ? `<div class="select-account__reward"><span class="select-account__reward-date">${j.Date}</span><span>已領獎</span></div>` : ""}
			</label>
		`;
	});
	var text = `
        <div>
            <p>請選擇欲參與活動的遊戲帳號!</p>
			<div class="select-account__list-box">
				${accountHTML}
			</div>
			<p class="color-red">*虛寶將會發送至選定的遊戲帳號內。</p>
			<p class="select-account__error"></p>
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
// SelectAccount();
function GboxError(text, msg) {
	var msgHTML = "";
	if (msg) {
		msgHTML = `<p>${msg}</p>`;
	}
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-success-yellow",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};
	var text = `
        <div>
            <p>${text}</p>
			${msgHTML}
        </div>
    `;
	$.gbox.open(text, defaultObj);
}
