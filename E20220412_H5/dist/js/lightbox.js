import until from "../js/utils.js";
export default function () {
	const store = Vuex.useStore();
	const { MapShow, MapHide } = until();
	const ClearedInit = () => {
		gsap.set(".fight__boss-complete", {
			opacity: 0,
		});
	};
	const MessageLB = (msg, url, callback) => {
		$.gbox.open(`<div class="lb-text2">${msg}</div>`, {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				if (url) window.location.href = url;
				else {
					$.gbox.close();
					if (callback) {
						callback();
					}
				}
			},
		});
	};
	// DiceZero();
	// 21.已經沒有骰子囉!
	const DiceZero = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				$.gbox.close();
			},
			actionBtns: [
				{
					text: "活動方法",
					class: "lb-btn-event-notice",
					click: function () {
						EventNotice();
					},
				},
			],
		};
		let HTML = `<div class="lb-text lb-text-dice-zero"></div>`;
		$.gbox.open(HTML, config);
	};
	// Kudos();
	// 花費任意逗點
	// 20.恭喜獲得
	const Kudos = (item) => {
		var config = {
			addClass: "default lb-kudos",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				$.gbox.close();
				MapHide(".fight");
				store.dispatch("ajaxToggle");
				ClearedInit();
			},
			actionBtns: [
				{
					text: "返回地圖",
					class: "lb-btn-back",
					click: function () {
						$.gbox.close();
						MapHide(".fight");
						store.dispatch("ajaxToggle");
						ClearedInit();
					},
				},
			],
		};
		let HTML = `
			<div class="lb-text lb-text-kudos">恭喜獲得</div>
			<div class="lb-kudos__item">${item}</div>
			<div class="lb-kudos__notice">獎勵已發送至遊戲中角色之信箱、<br />特殊管理箱或禮物盒。</div>
		`;
		$.gbox.open(HTML, config);
	};
	// LevelWasComplete();
	// 12.此關卡已過關過!
	const LevelWasComplete = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterClose: function () {
				$.gbox.close();
			},
		};
		let HTML = `<div class="lb-text lb-text-level-complete">此關卡已過關過!</div>`;
		$.gbox.open(HTML, config);
	};
	// RewardInfo();
	// 11.獎勵資訊
	const RewardInfo = () => {
		var config = {
			addClass: "default lb-rewardInfo",
			hasCloseBtn: true,
			hasActionBtn: false,

			afterClose: function () {
				$.gbox.close();
			},
		};
		let data = [
			{ level: "黑龍", reward: "帕尼亞的特效武器秘寶*2" },
			{ level: "沙龍", reward: "亞勒詹達的紋章支援品*1" },
			{ level: "黑妖玖月", reward: "發光的破壞保護魔法果凍*2" },
			{ level: "赤風之龍", reward: "帕尼亞的特效武器秘寶*2" },
			{ level: "冰晶龍", reward: "亞勒詹達的龍玉支援品*1" },
			{ level: "鐵匠", reward: "隨機綻放紋章袋子(高級)*1" },
			{ level: "交易所長", reward: "稀有寶石 (10000金幣) *5" },
		];
		let trHTML = "";
		data.forEach((td, index) => {
			trHTML += `<tr class="lb-rewardInfo__tr"><td>${td.level}</td><td>${td.reward}</td></tr>`;
		});
		let HTML = `
			<div class="lb-rewardInfo__btn-group">
			<a href="javascript:;" class="lb-btn lb-btn__event-notice" data-type="notice">玩法說明</a>
			<a href="javascript:;" class="lb-btn lb-btn__reward-info on" data-type="reward">獎勵資訊</a>
			</div>
			<table class="lb-rewardInfo__table">
				<thead class="lb-rewardInfo__thead">
					<tr><th>關卡</th>
					<th>通關獎勵</th></tr>
				</thead>
				<tbody class="lb-rewardInfo__tbody">${trHTML}</tbody>
			</table>
		`;
		$.gbox.open(HTML, config);
	};
	// EventNotice();
	// 10.玩法說明
	const EventNotice = () => {
		var config = {
			addClass: "default lb-rule",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				$(".lb-rule__content").mCustomScrollbar({
					theme: "light",
					contentTouchScroll: true,
					mouseWheel: {
						preventDefault: true,
					},
					advanced: { extraDraggableSelectors: ".lb-rule__content" },
				});
				// 跳窗按鈕
				$("body").on("click", ".lb-btn", function () {
					let type = $(this).attr("data-type");
					if (type) {
						if (!$(this).hasClass("on")) {
							switch (type) {
								// 獎勵資訊
								case "reward":
									RewardInfo();
									return;
								// 活動說明
								case "notice":
									EventNotice();
									return;
							}
						}
					}
				});
			},
			afterClose: function () {
				$.gbox.close();
			},
		};
		let data = [
			{ task: "每日12:00補充", reward: "次數+1" },
			{ task: "完成6個每日任務", reward: "次數+2" },
			{ task: "收到3個讚", reward: "次數+1" },
			{ task: "給別人讚3次", reward: "次數+1" },
			{ task: "釣魚使用10次蚯蚓", reward: "次數+1" },
			{ task: "通關沙龍巢穴", reward: "次數+1" },
			{ task: "通關森林龍巢穴Hard", reward: "次數+1" },
			{ task: "通關天下金庫巢穴(不限樓層)", reward: "次數+2" },
			{ task: "通關赤風之龍巢穴一般", reward: "次數+3" },
			{ task: "花費任意樂豆點<br />(每日限定一次，不含送禮)", reward: "次數+2" },
			{ task: "每週維護補償", reward: "次數+1" },
		];
		let trHTML = "";
		data.forEach((td, index) => {
			trHTML += `<tr><td>${td.task}</td><td>${td.reward}</td></tr>`;
		});
		let HTML = `
			<div class="lb-rule__btn-group">
				<a href="javascript:;" class="lb-btn lb-btn__event-notice on" data-type="notice">玩法說明</a>
				<a href="javascript:;" class="lb-btn lb-btn__reward-info" data-type="reward">獎勵資訊</a>
			</div>
			<div class="lb-rule__content">
				<div class="lb-rule__content-h1">告別肝苦人生， 用你的手指來討伐巨龍吧！</div>
				<div class="lb-rule__content-block">
					<div class="lb-rule__content-h2">活動時間：</div>
					<div class="lb-rule__content-text">
						<span>2022年4月19日 10:00 至5月10日 23:59止。</span>
						<span class="lb-rule__content-text--red">※《新龍之谷》維護期間將暫時無法進行活動。</span>
					</div>
				</div>
				<div class="lb-rule__content-block">
					<div class="lb-rule__content-h2">參加資格：</div>
					<div class="lb-rule__content-text">
						<span>綁定beanfun!app之新龍之谷帳號需具有遊戲角色</span>
						<span class="lb-rule__content-text--red">※注意限參加一次，請妥善選擇帳號及角色。</span>
					</div>
				</div>
				<div class="lb-rule__content-block">
					<div class="lb-rule__content-h2">活動方式：</div>
					<div class="lb-rule__content-text">
						<span>進入關卡，點擊「攻擊」擲骰攻擊Boss。擊敗Boss後可獲得對應獎勵，獎勵將直接發送至角色之特殊管理箱、信箱或禮物盒。</span>
					</div>
				</div>
				<div class="lb-rule__content-block">
					<div class="lb-rule__content-h2">骰子增加方式：</div>
					<div class="lb-rule__content-text">
						<div><span class="lb-rule__content-text--orange">遊戲歷程記錄為每日09:00至隔日09:00，並於12:00更新。</span></div>
						<table class="lb-rule__content-table">
							<thead class="lb-rule__content-thead">
								<tr><th>任務</th>
								<th>獎勵</th></tr>
							</thead>
							<tbody class="lb-rule__content-tbody">${trHTML}</tbody>
						</table>
						<span class="lb-rule__content-text--red">※帳號內所有角色完成任務皆可，但不會重複計算，需多留意。</span>
					</div>
				</div>
				<div class="lb-rule__content-block">
					<div class="lb-rule__content-h2">注意事項：</div>
					<ol class="lb-rule__content-list">
						<li>本活動限定為每個beanfun! App 僅能選定一組綁定的點數帳號參加。</li>
						<li>活動期間請勿解綁點數帳號，以避免後續活動異常問題產生。</li>
						<li>擲骰4次後，第5次將出現爆擊，攻擊傷害2倍。</li>
						<li>獎勵將於擊敗Boss後直接寄送至遊戲中，請留意領取時間。</li>
						<li>獲得獎勵後，可於「獎勵記錄」查詢相關內容。</li>
						<li>使用任何不當方式進行遊戲，將予取消參加和得獎資格。</li>
						<li>《新龍之谷》營運團隊保留一切說明、修正和停止活動之權利。</li>
					</ol>
				</div>
			</div>
			`;

		$.gbox.open(HTML, config);
	};
	// RewardEmpty();
	// 09.尚無任何紀錄!
	const RewardEmpty = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterClose: function () {
				$.gbox.close();
			},
		};
		let HTML = `<div class="lb-text lb-text-list-empty"></div>`;
		$.gbox.open(HTML, config);
	};
	// RewardList();
	// 08.獎勵紀錄
	const RewardList = () => {
		var config = {
			addClass: "default lb-reward",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterOpen: function () {
				setTimeout(() => {
					if (window.innerHeight * 0.3 < $(".lb-reward__table").height()) {
						$(".lb-reward__scroll").mCustomScrollbar({
							theme: "light",
							contentTouchScroll: true,
							mouseWheel: {
								preventDefault: true,
							},
							advanced: { extraDraggableSelectors: ".lb-reward__scroll" },
						});
					}
				}, 0);
			},
			afterClose: function () {
				$.gbox.close();
			},
		};
		let data = [
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
			{ level: "冰龍", reward: "一二三四五六七八九十<br />一二三四五六七八九十", date: "2022/04/08 12:35" },
		];
		let trHTML = "";
		data.forEach((td, index) => {
			trHTML += `<tr><td>${td.level}</td><td>${td.reward}</td><td>${td.date}</td></tr>`;
		});
		let HTML = `
			<div class="lb-reward__scroll">
				<table class="lb-reward__table">
					<thead class="lb-reward__thead">
						<tr>
							<th>關卡</th>
							<th>獎勵名稱</th>
							<th>獲得時間</th>
						</tr>
					</thead>
					<tbody class="lb-reward__tbody">${trHTML}</tbody>
				</table>
			</div>
		`;
		$.gbox.open(HTML, config);
	};

	// EventRepair();
	// 06.活動暫停中
	const EventRepair = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterClose: function () {
				$.gbox.close();
			},
		};
		let HTML = `<div class="lb-text lb-text-repair"></div>`;
		$.gbox.open(HTML, config);
	};
	// NeedCreate();
	// 05.您尚未創建新龍之谷角色
	const NeedCreate = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterClose: function () {
				$.gbox.close();
			},
		};
		let HTML = `<div class="lb-text lb-text-need-create"></div>`;
		$.gbox.open(HTML, config);
	};
	// BindAccount();
	// 04.請綁定新龍之谷帳號
	const BindAccount = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: false,
			afterClose: function () {
				$.gbox.close();
			},
		};
		let HTML = `<div class="lb-text lb-text-bind-account"></div>`;
		$.gbox.open(HTML, config);
	};
	// SelectRole();
	// 03.請選擇參加的角色
	const SelectRole = () => {
		var config = {
			addClass: "default lb-select",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				$.gbox.close();
			},
			actionBtns: [
				{
					text: "確認",
					class: "lb-btn-complete",
					click: function () {
						$.gbox.close();
					},
				},
			],
		};
		let HTML = `
			<div class="lb-select__h1 lb-text-select-role">請選擇參加的角色</div>
			<div class="lb-select__select-box">
				<select class="lb-select__select-control" id="select-role">
					<option value="-1">sadasd</option>
					<option value="123456789">123456789</option>
					<option value="12345678910">12345678910</option>
				</select>
			</div>
			<div class="lb-select__notice-box">
				<div class="lb-select__notice lb-select__notice--error"></div>
				<div class="lb-select__notice">※獎勵將發送至角色之信箱、特殊保管箱或禮物盒。 選擇後無法更換。</div>
				<div class="lb-select__notice">※確認後就無法更換綁定之帳號與角色，請多留意。</div>
			</div>
		`;
		$.gbox.open(HTML, config);
	};
	// SelectName();
	// 02.請選擇遊戲暱稱
	const SelectName = () => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				$.gbox.close();
			},
			actionBtns: [
				{
					text: "確認",
					class: "lb-btn-complete",
					click: function () {
						if ($("#select-name option:selected").val() == -1) {
							$(".lb-select__notice--error").html("請選擇遊戲暱稱");
							return;
						}
						$(".lb-select__notice--error").html("");
					},
				},
			],
		};
		let HTML = `
			<div class="lb-select__h1 lb-text-select-name">請選擇遊戲暱稱</div>
			<div class="lb-select__select-box lb-select__select-box--name">
				<select class="lb-select__select-control" id="select-name">
					<option value="-1">請選擇遊戲暱稱</option>
					<option value="123456789">123456789</option>
					<option value="12345678910">12345678910</option>
				</select>
			</div>
			<div class="lb-select__notice-box">
				<div class="lb-select__notice lb-select__notice--error" style="color:red"></div>
				<div class="lb-select__notice">※活動限綁定一組參加，請妥善選擇。</div>
			</div>
		`;
		$.gbox.open(HTML, config);
	};
	const SuccessRole = (store) => {
		var config = {
			addClass: "default",
			hasCloseBtn: true,
			hasActionBtn: true,
			afterClose: function () {
				$.gbox.close();
			},
			actionBtns: [
				{
					text: "開始冒險",
					class: "lb-btn-start-play",
					click: function () {
						$.gbox.close();
					},
				},
			],
		};
		let HTML = `<div class="lb-text lb-text-success">帳號綁定成功</div>`;
		$.gbox.open(HTML, config);
	};
	return {
		MessageLB,
		SelectName,
		SelectRole,
		BindAccount,
		NeedCreate,
		EventRepair,
		RewardList,
		RewardEmpty,
		EventNotice,
		RewardInfo,
		LevelWasComplete,
		Kudos,
		DiceZero,
		SuccessRole,
	};
}
