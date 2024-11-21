import { SetLogin, ShareAchv } from "./api.js";
import useEventStore from "./store.js";

export let gameList = [
	{
		game: "lineage-m",
		name: "天堂M",
		seq: 9,
		id: "viewdata_lm"
	},
	{
		game: "lineage-r",
		name: "天堂國際服",
		seq: 3,
		id: "viewdata_lr"
	},
	{
		game: "lineage-month",
		name: "天堂月費服",
		seq: 8,
		id: "viewdata_la"
	},
	{
		game: "lineage-free",
		name: "天堂免費服",
		seq: 7,
		id: "viewdata_lf"
	},
	{
		game: "maple",
		name: "新楓之谷",
		seq: 2,
		id: "viewdata_ms"
	},
	{
		game: "mabi",
		name: "新瑪奇",
		seq: 6,
		id: "viewdata_mb"
	},
	{
		game: "els",
		name: "艾爾之光",
		seq: 5,
		id: "viewdata_els"
	},
	{
		game: "cso",
		name: "絕對武力",
		seq: 4,
		id: "viewdata_cso"
	},
	{
		game: "dn",
		name: "新龍之谷",
		seq: 1,
		id: "viewdata_dn"
	}
];
export function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			if (url) window.location.href = url;
		},
		actionBtns: [
			{
				text: "確定",
				class: "lb-btn-complete",
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

export function LB(msg, url, callback) {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "lb-btn-close",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "text2",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	let HTML = ``;
	$.gbox.open(HTML, config);
}

// 活動說明 1 登入使用 2 一般使用
export function LBGuide(type) {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	if (type == 1) {
		config.actionBtns = [
			{
				text: "關閉",
				class: "lb-btn-close",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "繼續",
				class: "lb-btn-continue",
				id: "rules_continue",
				click: function () {
					LBSelectGame(gameList);
				}
			}
		];
	}

	var HTML = `
		<div class="lb-title lb-guide__title">活動說明</div>
		<div class="lb-guide__content lb-content">
			<ol class="lb-guide__list">
				<li class="lb-guide__li">
					本活動中：<br>
					-「高能打臉的時光之河」任務，任務開放期間為<span class="datetime">2024/11/11 12:00 ~2024/12/31 23:59</span>。<br>
					-「選擇障礙的高塔」任務，任務開放期間為<span class="datetime">2024/11/18 12:00 ~2024/12/31 23:59</span>。<br>
					-「鏡子迷宮的多重選擇」任務，任務開放期間為<span class="datetime">2024/11/25 12:00 ~2024/12/31 23:59</span>。
				</li>
				<li class="lb-guide__li">本活動其中2項任務，包含「高能打臉的時光之河」、「選擇障礙的高塔」皆無須登入遊戲帳號就能參加，而「鏡子迷宮的多重未來」任務，則須符合指定遊戲登入時間區間<span class="datetime">(2022/10/01 00:00~2024/09/30 23:59內登入過遊戲乙次)</span>之玩家方能參加。</li>
				<li class="lb-guide__li">每一項任務的完成皆能獲取抽獎機會，包含「高能打臉的時光之河」、「選擇障礙的高塔」、「鏡子迷宮的多重未來」。</li>
				<li class="lb-guide__li">「高能打臉的時光之河」、「選擇障礙的高塔」任務可獲得各乙次抽獎序號機會，而「鏡子迷宮的多重未來」任務，不限制遊戲帳號數，若您越多遊戲帳號登入觀看，即可獲得越多組抽獎序號，提高中獎機會哦！並可透過活動Messenger Chatbot進行序號抽獎，抽獎序號有限，送完為止。</li>
				<li class="lb-guide__li">beanfun! 遊戲服務簽到簿於周年慶活動期間<span class="datetime">(2024/11/11 12:00~2024/12/31 23:59)</span>任一天簽到滿乙次，即可獲得乙組抽獎序號，11及12月各簽到乙次，各可獲得乙組，總共最多可獲得兩組抽獎序號，並僅透過活動Messenger Chatbot輸入文字「簽到簿抽獎」進行序號抽獎活動，抽獎序號有限，送完為止(請勿使用''輸入任務序號抽獎''功能，否則玩家所使用之簽到簿序號將無法正常被記錄在Chatbot中獎清單中)。</li>
				<li class="lb-guide__li">抽獎序號請自行保管且不對外洩漏抽獎序號，本公司不負任何保管、法律與補償責任。</li>
				<li class="lb-guide__li">
				「鏡子迷宮的多重未來」任務中：<br>
				-2023個人遊戲數據資料撈取區間為<span class="datetime">2022/10/01 00:00~2023/09/30 23:59</span>。<br>
				-2024個人遊戲數據資料撈取區間為<span class="datetime">2023/10/01 00:00~2024/09/30 23:59</span>。<br>
				-新瑪奇個人遊戲數據資料撈取區間則為<span class="datetime">2024/01/01 00:00~2024/09/30 23:59</span>。<br>
				-天堂M、新楓之谷、艾爾之光個人數據僅顯示6項。
				</li>
				<li class="lb-guide__li">波拉西亞遊戲僅參與「高能打臉的時光之河」、「選擇障礙的高塔」任務活動。</li>
				<li class="lb-guide__li">參加「鏡子迷宮的多重未來」任務前，請遊戲訪客帳號先完成 <a href='https://bfgame-gama-event.beanfun.com/index?Url=AE5393D2C80FD41E60A311BDF8590710.1134' target='_blank' rel='noopener noreferrer'>beanfun! 遊戲帳號綁定</a>。</li>
				<li class="lb-guide__li">參與「鏡子迷宮的多重未來」任務的遊戲帳號請勿於<span class="datetime">2024/11/22 00:00 - 2024/12/31 23:59</span>內進行遊戲更名、更換伺服器、移民操作、beanfun!應用程式解除綁定、更換裝置操作，上述操作將會造成數據資料顯示異常或將無法正常登入觀看。</li>
				<li class="lb-guide__li">活動所標示之各項達成條件，將依本公司系統紀錄之數據為主，而非玩家自行判定是否達成活動條件。</li>
				<li class="lb-guide__li">本活動僅限台灣地區遊戲橘子帳號用戶參加。</li>
				<li class="lb-guide__li">如有發現任何活動BUG或其他問題，應立即向【<a href='https://service.antspw.com/MSGBoardUI/PCform/Index/ANNIV' target='_blank' rel='noopener noreferrer'>客服回報</a>】系統反映，不得利用活動bug或其他問題擅自破壞活動平衡，否則本公司得依網路連線遊戲服務定型化契約，向該玩家進行懲處並請求損害賠償。</li>
				<li class="lb-guide__li">中獎者應於<span class="datetime">2024/12/31(二) 23:59</span>前依中獎規定及其所附內容，填寫中獎資料並經本公司驗證無誤完成相關作業後，統一於<span class="datetime">2025/04/30(三) 23:59</span>前寄發贈品。</li>
				<li class="lb-guide__li">得獎者需至指定之表單內，填妥中獎相關收件資訊，如因參加者所填寫、登錄或提供之資料有誤、不同意填寫或無法辨識而影響其得獎權益，視為自動棄權，不具得獎資格，本公司恕不負責。</li>
				<li class="lb-guide__li">所有參加者保證提出之驗證資料為正確。若有假造，冒用、盜用第三人之資料或詐欺之情事時，本公司得取消其得獎資格並追回獎品，所產生之法律責任由參加者自行負擔，與本公司無關。</li>
				<li class="lb-guide__li">本活動注意事項載明於周年慶系列活動網頁中，參加活動者於參加本活動之同時，應已詳閱且明白並同意接受本活動注意事項之規範，如有違反本活動注意事項之行為，主辦單位得取消其抽獎資格，並對於任何破壞本活動之行為保留相關權利。</li>
				<li class="lb-guide__li">本活動獎品顏色由主辦單位指定。所有獎品日後之使用、保固與維修，本公司恕不負責，如獎品有瑕疵等疑問，請洽獎品製造商或服務廠商處理後續。</li>
				<li class="lb-guide__li">本活動獎品以公布於周年慶系列活動網頁上之資料為準，如遇有不可抗拒之因素，本公司保留更換其他獎品之權利。獎品規格以實物為主，得獎者不得要求將贈品讓與他人，也不得要求變換或折換現金。本公司亦不須為得獎人領取、使用或行使各項獎品之任何後果負責。</li>
				<li class="lb-guide__li">寄出獎品如因地址錯誤遭退回主辦單位，視同放棄領獎資格。</li>
				<li class="lb-guide__li">本活動的獎品均有領取、寄送、使用效期，如有遺失、毀損、未依照活動規則領取獎項…等情事發生，將視同棄權且無法重新補發或寄送。</li>
				<li class="lb-guide__li">本活動僅限台灣地區玩家遊戲帳號參加，且本活動寄送地址只限台、澎、金、馬地區，依中華民國稅法規定，中獎贈品或獎金都算所得稅，全年所中獎的獎品價值超過市價1,000 元，年度報稅時必須計入個人所得，中獎玩家需配合繳交身分證影印本作為申報依據，若玩家為未成年或是未持有身分證件之得獎人，須請玩家依活動規定填寫之表單中提供父母或是監護人之身分證件，若無法配合繳交資料等情況，將視同放棄活動獎品，且無法重新進行領獎程序。</li>
				<li class="lb-guide__li">依中華民國稅法規定，全年所中獎的獎品價值超過20,000元(含)以上，需預先繳交10%機會中獎稅，若無法配合繳交資料等情況，將視同放棄動獎品，且無法重新進行領獎程序。</li>
				<li class="lb-guide__li">如果獲獎人或中獎人是我國境內居住的個人，或在我國境內有固定營業場所的營利事業、或於一課稅年度內在臺灣地區居留、停留合計滿183天之大陸地區人民及在臺灣地區有固定營業場所之大陸地區法人、團體或其他機構，要按照給付金額扣繳10%。</li>
				<li class="lb-guide__li">如果獲獎人或中獎人不是我國境內居住的個人，或是在國內沒有固定營業場所的營利事業、或於一課稅年度內在臺灣地區居留、停留合計未滿183天之大陸地區人民及在臺灣地區無固定營業場所之大陸地區法人、團體或其他機構，一律要按照給付金額扣繳20%。</li>
				<li class="lb-guide__li">獎項內容以及兌換資格、異動說明..等，本公司將在活動網頁中或遊戲官網另行公告，公告內容均以官網公告最後一次公佈之內容為準，請玩家密切注意公佈訊息。</li>
				<li class="lb-guide__li">任何不可歸責於本公司之事由，包含但不限於電腦、網路、電話、技術或硬體設備，而使參加活動者所寄發或登錄之資料，有遺失、遲延、錯誤、毀損或無法辨識等情事產生，本公司不負任何法律與補償責任。</li>
				<li class="lb-guide__li">若有其他未盡事宜，悉依本公司相關規定辦理，本公司保留變更或停止本活動之權利。</li>
			</ol>
		</div>
	`;
	$.gbox.open(HTML, config);
}
// 選擇遊戲
export function LBSelectGame(game) {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			$("#select").niceSelect();
			// 設定預設值為天堂M
			$("#select").val("lineage-m").niceSelect("update");
			// 設定預設logo
			$(".lb-select__logo").attr("data-game", "lineage-m");
			// 偵測 選擇遊戲獲取select value，放入.lb-select__logo的data-game
			$("#select").on("change", function () {
				$(".lb-select__logo").attr("data-game", $(this).val());
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "上一步",
				class: "lb-btn-prev",
				click: function () {
					LBGuide(1);
				}
			},
			{
				text: "繼續",
				id: "gamechoose_continue",
				class: "lb-btn-continue",
				click: function () {
					let value = $(".nice-select .list .option.selected").attr("data-value");
					// 獲取value 從gameList 找到seq
					let gameObj = gameList.find((item) => item.game == value);
					// 把gameObj 記錄在localstorage
					localStorage.setItem("sdEventGame", JSON.stringify(gameObj));
					// localStorage.setItem("currentPage", "page2");
					LBLogin(value);
				}
			}
		]
	};
	let optionHTML = game.map((item) => `<option value="${item.game}">${item.name}</option>`).join("");
	var HTML = `
	<div class="lb-title lb-select__title">說說你玩哪款遊戲</div>
	<div class="lb-select__content lb-content">
		<div class="lb-select__logo-box"><div class="lb-select__logo" data-game=""></div></div>
		<div class="lb-select__select">
			<select name="select" id="select">
				${optionHTML}
			</select>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 登入方式
// 天M type 1 多種登入，其他只有 遊戲橘子
export function LBLogin(type) {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			// 獲取seq
			let gameObj = JSON.parse(localStorage.getItem("sdEventGame"));
			// .lb-btn-login__item點擊先使用Init API，不要使用jquery，並獲取data-type
			document.querySelectorAll(".lb-btn-login__item").forEach((item) => {
				item.addEventListener("click", function () {
					let type = $(this).attr("data-type");
					document.querySelector("#loadingProgress").style.display = "block";
					SetLogin(gameObj.seq).then((res) => {
						document.querySelector("#loadingProgress").style.display = "none";
						let { code, message, url } = res.data;
						if (code !== 1) {
							MessageLB(message, url);
							return;
						}
						// type == f 跳頁使用/login/facebook
						// type == g 跳頁使用/login/google
						// type == bf 跳頁使用/Login
						// type == ios 跳頁使用/login/apple
						if (type == "f") {
							window.location.href = "/login/facebook";
						} else if (type == "g") {
							window.location.href = "/login/google";
						} else if (type == "bf") {
							window.location.href = "/Login";
						} else if (type == "ios") {
							window.location.href = "/login/apple";
						}
					});
				});
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "上一步",
				class: "lb-btn-prev",
				click: function () {
					// 把localstorage的遊戲記錄刪除
					localStorage.removeItem("sdEventGame");
					LBSelectGame(gameList);
				}
			},
			{
				text: "綁定教學",
				class: "lb-btn-bind",
				target: true,
				click: "https://bfgame-gama-event.beanfun.com/index?Url=AE5393D2C80FD41E60A311BDF8590710.1134"
			}
		]
	};
	let loginHTML = "";
	if (type == "lineage-m") {
		loginHTML = `
		<div class="lb-login__item-group" style="--column: 2">
			<a href="javascript:;" id="lm_fblogin" class="lb-btn-login__item" data-type="f"></a>
			<a href="javascript:;" id="lm_googlelogin" class="lb-btn-login__item" data-type="g"></a>
			<a href="javascript:;" id="lm_bflogin" class="lb-btn-login__item" data-type="bf"></a>
			<a href="javascript:;" id="lm_ioslogin" class="lb-btn-login__item" data-type="ios"></a>
		</div>
		<div class="lb-login__note">
			<p>◎登入帳號需與遊戲帳號對應</p>
			<p>◎訪客帳號請先進行<a href="https://bfgame-gama-event.beanfun.com/index?Url=AE5393D2C80FD41E60A311BDF8590710.1134" target="_blank" rel="noopener noreferrer">綁定教學</a></p>
		</div>
		`;
	} else {
		config.actionBtns = [
			{
				text: "上一步",
				class: "lb-btn-prev",
				click: function () {
					LBSelectGame(gameList);
				}
			}
		];
		loginHTML = `
		<div class="lb-login__item-group " style="--column: 1">
			<a href="javascript:;" id="othergame_bflogin" class="lb-btn-login__item lb-btn-login__item--focus" data-type="bf"></a>
		</div>
		<div class="lb-login__note">
			<p>@請點選上方「遊戲橘子」按鈕登入</p>
			<p>◎登入帳號需與遊戲帳號對應</p>
		</div>
		`;
	}
	var HTML = `
	<div class="lb-title lb-login__title">登入方式呢</div>
	<div class="lb-login__content lb-content">
		${loginHTML}
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 登入成功提醒
export function LBLoginSuccess() {
	const store = useEventStore();
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確認",
				class: "lb-btn-complete",
				click: function () {
					store.setPage("page2");
					$.gbox.close();
				}
			}
		]
	};
	var HTML = `
	<div class="lb-title lb-login-success__title">登入成功提醒</div>
	<div class="lb-login-success__content lb-content">
		<p>接下來透過魔鏡看看自己</p>
		<p>過去成長的歷程吧...</p>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 活動提醒
export function LBWarm() {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "說明",
				class: "lb-btn-guide",
				click: function () {
					// LBGuide();
					// 用localstorage記錄準備開啟LBGuide
					localStorage.setItem("sdEventWarm", "LBGuide");
					location.href = "/Logout";
				}
			},
			{
				text: "確認",
				class: "lb-btn-complete",
				click: function () {
					// LBSelectGame(gameList);
					// 用localstorage記錄準備開啟LBSelectGame
					localStorage.setItem("sdEventWarm", "LBSelectGame");
					location.href = "/Logout";
				}
			}
		]
	};
	var HTML = `
	<div class="lb-title lb-warm__title">活動提醒</div>
	<div class="lb-warm__content lb-content">
		<p>您的遊戲帳號並不符合</p>
		<p>個人數據活動資格，請詳閱活動說明。</p>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 選擇數據分享方式
export function LBSDataShare(game = "", data = [], shareUrl = "") {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			// data-type="link" 複製功能
			document.querySelector(".lb-btn-share__item[data-type='link']").addEventListener("click", function () {
				navigator.clipboard
					.writeText(shareUrl)
					.then(() => alert("網址已複製"))
					.catch((err) => console.error("Error in copying text: ", err));
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	let cardList = ``;
	if (data.length > 0) {
		data.forEach((item) => {
			cardList += `
			<div class="lb-card">
				<div class="lb-card__title">${item.Title}</div>
				<div class="lb-card__content lb-content">
					<div class="lb-card__year" data-type="2024">
						<div class="lb-card__year-title">2024</div>
						<div class="lb-card__year-day">${item.T}${item.Unit}</div>
					</div>
					<div class="lb-card__grow ${item.Y ? "" : "hide"}">
						<span>成長值</span>
						<span>${item.Y > 9999 ? "9999" : item.Y}</span>
						<span>%</span>
					</div>
					<div class="lb-card__year" data-type="2023" ${item.L ? "" : "hide"}>
						<div class="lb-card__year-title">2023</div>
						<div class="lb-card__year-day">${item.L}${item.Unit}</div>
					</div>
				</div>
			</div>
			`;
		});
	}
	var HTML = `
	<div class="lb-title lb-data-share__title">請選擇數據分享方式</div>
	<div class="lb-data-share__box">
		<div class="lb-data-share__logo" data-game="${game}"></div>
		<div class="lb-data-share__text">個人成長報告</div>
	</div>
	<div class="lb-data-share__content lb-content">
		<div class="lb-data-share__card-list" data-game="${game}">${cardList}</div>
		<div class="lb-data-share__btn-box g-share" data-url="${shareUrl}" data-title="人生重來模擬器 挑戰喵生重啟" data-desc="2024《遊戲橘子周年慶》BIG GAMA 大數橘 - 厭世柑姆的橘生指南">
			<a href="javascript:;" class="lb-btn-share__item" data-type="link"></a>
			<a href="javascript:;" class="lb-btn-share__item g-share-fb" data-type="f" target="_blank" rel="noopener noreferrer"></a>
			<a href="javascript:;" class="lb-btn-share__item g-share-line" data-type="line" target="_blank" rel="noopener noreferrer"></a>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 領取抽獎序號
export function LBSGetSn(sn) {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterOpen: function () {
			// 註解: 設定序號
			// 序號去除空白
			sn = sn.replace(/\s+/g, "");
			document.querySelector(".lb-get-sn__sn").textContent = sn;
			// 註解: 複製序號
			document.querySelector(".lb-get-sn__copy").addEventListener("click", function () {
				navigator.clipboard
					.writeText(sn)
					.then(() => alert("序號已複製"))
					.catch((err) => console.error("Error in copying text: ", err));
			});
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "關閉",
				class: "lb-btn-close",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var HTML = `
	<div class="lb-title lb-get-sn__title">領取魔鏡抽獎序號</div>
	<div class="lb-get-sn__content lb-content">
		<div class="lb-get-sn__box">
			<div class="lb-get-sn__sn">1234567890</div>
			<a href="javascript:;" class="lb-get-sn__copy lb-btn-copy">複製序號</a>
		</div>
		<div class="lb-get-sn__note">
			<div class="lb-get-sn__note-title">魔鏡抽獎序號使用說明</div>
			<ol class="lb-get-sn__note-list">
				<li class="lb-get-sn__note-li">
					本活動「鏡子迷宮的多重選擇」所獲得之抽獎序號，可透過以下兩種方式進行抽獎：<br/>
					-透過遊玩Gamania FB粉專Messenger 第三個任務進入到個人數據活動網頁的玩家，可返回Gamania FB粉專Messenger，依照活動流程提示輸入序號即可抽獎。<br/>
					-還未遊玩Gamania FB粉專Messenger 第三個任務的玩家，可透過此<a href='https://go.goskyai.com/6qajs6/' target='_blank' rel="noopener noreferrer">beanfun! 連結</a>進入活動Messenger，並輸入關鍵字「進入鏡子迷宮」，依照活動流程提示輸入序號即可抽獎。
				</li>
				<li class="lb-get-sn__note-li">「鏡子迷宮的多重未來」任務，不限制遊戲帳號數，若您越多遊戲帳號登入觀看，即可獲得越多組抽獎序號，提高中獎機會哦！抽獎序號有限，送完為止。</li>
				<li class="lb-get-sn__note-li">抽獎序號請自行保管且不對外洩漏抽獎序號，本公司不負任何保管、法律與補償責任。</li>
			</ol>
		</div>
	</div>
	`;
	$.gbox.open(HTML, config);
}

// 登出確認
export function LBLogout() {
	var config = {
		addClass: "default",
		hasCloseBtn: false,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確定",
				class: "lb-btn-complete",
				click: function () {
					localStorage.removeItem("sdEventGame");
					location.href = "/Logout";
				}
			},
			{
				text: "繼續",
				class: "lb-btn-continue",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};
	var HTML = `
	<div class="lb-title lb-logout__title">登出確認</div>
	<div class="lb-logout__content lb-content">
		<p>您確定不繼續使用魔鏡嗎？</p>
	</div>
	`;
	$.gbox.open(HTML, config);
}
