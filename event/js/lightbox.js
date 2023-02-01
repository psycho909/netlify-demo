var config = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "text1",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
		{
			text: "text2",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
	],
};

function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default lb1",
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
				},
			},
		],
	});
}

function LB1(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "text1",
				class: "enable",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};

	var HTML = ``;
	$.gbox.open(HTML, config);
}

function LB2(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-warning"></div>
		<div class="lb-msg">您的進階驗證為「身分證」或「多重驗證」<br/>請聯繫客服更改手機號碼</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">聯繫客服</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 門號已驗證三個點帳
function PhoneWarn(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-warning"></div>
		<div class="lb-msg">該組門號已驗證三個點帳<br/>無法順利變更手機門號<br/>請直接聯繫客服</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">聯繫客服</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 門號不符規範
function PhoneError(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-warning"></div>
		<div class="lb-msg">該門號不符規範<br/>請重新輸入或直接聯繫客服</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">聯繫客服</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 不符合活動資格
function Already(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-title">恭喜</div>
		<div class="lb-msg">
			成功索取快速升級券 <br />獲得樂豆點抽獎資格
		</div>
		<div class="lb-sub-text">2023/3/20 一起升級！不見不散！</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">回首頁</a>
			<a href="javascript:;" class="lb-btn__text">了解更多活動內容</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 完成
function Ready(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-title">即將完成！</div>
		<div class="lb-form-group">
			<div class="lb-input__box">
				<div class="lb-input__title">您的原進階驗證門號為</div>
				<input id="old-val" type="text" class="lb-input__control" value="0988555555" />
			</div>
			<div class="lb-input__box">
				<div class="lb-input__title">即將改為</div>
				<input id="new-val" type="text" class="lb-input__control" value="0911234566" />
			</div>
			<label class="lb-checkbox__box" for="check">
				<input id="check" type="checkbox" class="lb-checkbox__control" />
				<div class="lb-checkbox__style">確認更改我的進階驗證門號</div>
			</label>
		</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">領取快速升級券</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 完成
function Completed(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-title">恭喜</div>
		<div class="lb-msg">
			成功索取快速升級券 <br />獲得樂豆點抽獎資格
		</div>
		<div class="lb-sub-text">2023/3/20 一起升級！不見不散！</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">回首頁</a>
			<a href="javascript:;" class="lb-btn__text">了解更多活動內容</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 聯繫客服
function GoService(msg, url, callback) {
	var config = {
		addClass: "default lb1",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
	};

	var HTML = `
		<div class="lb-warning"></div>
		<div class="lb-msg">您的進階驗證為「身分證」或「多重驗證」<br/>請聯繫客服更改手機號碼</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">聯繫客服</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

// 收不到驗證碼嗎？
function NoOTP(msg, url, callback) {
	var config = {
		addClass: "default lb2",
		hasCloseBtn: false,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		},
		afterOpen: function () {
			document.querySelector(".lb-btn__text").addEventListener("click", function () {
				$.gbox.close();
			});
		},
		actionBtns: [
			{
				text: "text1",
				class: "enable",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};

	var HTML = `
		<div class="lb-warning"></div>
		<div class="lb-title">收不到驗證碼嗎？</div>
		<div class="lb-msg">
			<ol class="lb-list">
				<li class"lb-list__li">請確認手機門號可以正常收發簡訊。</li>
				<li class"lb-list__li">請確認手機訊號是否正常。</li>
				<li class"lb-list__li">請稍待片刻確認是否為收發延遲或嘗試重新操作。</li>
				<li class"lb-list__li">請確認是否下載阻擋簡訊相關APP。</li>
				<li class"lb-list__li">請再次確認手機號碼是否填寫正確無誤，格式須為【09_八碼數字】。</li>
				<li class"lb-list__li">手機簡訊收發快慢會因電信公司或所在的收訊品質有所影響。</li>
				<li class"lb-list__li">若一直無法順利取得驗證碼，請先確認門號是否有設定「拒收廣告簡訊」，因此導致無法收到驗證碼簡訊。</li>
			</ol>
		</div>
		<div class="gbox-action">
			<a href="javascript:;" class="gbox-btn enable">手機無法收取簡訊</a>
			<a href="javascript:;" class="lb-btn__text">繼續使用手機驗證</a>
		</div>
	`;
	$.gbox.open(HTML, config);
}

export { MessageLB, NoOTP, GoService, Completed, PhoneWarn, PhoneError, Already, Ready };
