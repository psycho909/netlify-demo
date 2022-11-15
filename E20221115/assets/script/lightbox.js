export const Message = (msg, url, callback) => {
	var config = {
		addClass: "default lb-message",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterOpen: function () {
			var vh50 = window.innerHeight / 2 + 94 + 34;
			var contentHeight = $(".gbox-content").outerHeight(true);
			if (contentHeight >= vh50) {
				$(".gbox-content").mCustomScrollbar({
					theme: "light",
					contentTouchScroll: true,
					mouseWheel: {
						preventDefault: true
					}
				});
			}
		},
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "確認",
				class: "lb-btn-confirm",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `${msg}`;
	$.gbox.open(HTML, config);
};

// 準探員提醒_
export const LoginNotice = () => {
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
				class: "lb-btn-confirm",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = `
		<div class="lb-title">準探員提醒_</div>
		<ol class="lb-list">
			<li class="lb-listLi">若你還沒有任何遊戲帳號，或是您的遊戲帳號還未創建任何遊戲角色，請先完成註冊遊戲帳號與創建遊戲角色，才能報名參與探員行動喔！請參考遊戲官網公告。</li>
			<li class="lb-listLi">每一個帳號僅能使用一隻角色參與活動，角色確定後將無法再更換，請謹慎選擇參與活動的角色。</li>
			<li class="lb-listLi">若帳號擁有不同遊戲角色，仍可切換不同角色觀看個人成就數據。</li>
		</ol>
	`;
	$.gbox.open(HTML, config);
};

// 恭喜你獲得_
export const Congrats = (data) => {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="lb-title">恭喜你獲得_</div>
		<div class="lb-lottery-ItemImg">
			<span><img src="${data.img}" alt="" /></span>
		</div>
		<div class="lb-lottery-ItemName">${data.name}</div>
	`;
	$.gbox.open(HTML, config);
};

// 銘謝惠顧_
export const UnLucky = () => {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="lb-title">銘謝惠顧_</div>
		<div class="lb-text">期待下次再來</div>
	`;
	$.gbox.open(HTML, config);
};

// 獎項紀錄 沒得獎
export const RewardListEmpty = () => {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var HTML = `
		<div class="lb-title">獎項紀錄_</div>
		<div class="lb-text">目前還沒得到獎品喔 >_<</div>
	`;
	$.gbox.open(HTML, config);
};

// 獎項紀錄 有得獎
export const RewardList = (data) => {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};
	var rewardHTML = ``;
	data.forEach(function (v, i) {
		rewardHTML += `
			<div class="lb-lottery-rewardBox">
				<div class="lb-lottery-rewardItem">
					<span><img src="${v.img}" alt="" /></span>
				</div>
				<div class="lb-lottery-rewardInfo">
					<div class="lb-lottery-rewardInfoLabel">${v.type}</div>
					<div class="lb-lottery-rewardInfoName">${v.name}</div>
					<div class="lb-lottery-rewardInfoDate">${v.date}</div>
				</div>
			</div>
		`;
	});
	var HTML = `
		<div class="lb-title">獎項紀錄_</div>
		<div class="lb-lottery-rewardList">
			${rewardHTML}
		</div>
		<div class="lb-lottery-notice">
		領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說明領獎說
		</div>
		<a href="javascript:;" class="lb-rule">領獎說明</a>
	`;
	$.gbox.open(HTML, config);
};

// 委託任務
export const RewardTask = (data) => {
	var config = {
		addClass: "default lb-lottery",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			$.gbox.close();
		}
	};

	var taskBoxHTML = ``;
	data.list.forEach(function (v, i) {
		taskBoxHTML += `
			<div class="lb-lottery-taskBox">
				<div class="lb-lottery-taskIcon ${v.complete ? "complete" : ""}"></div>
				<div class="lb-lottery-taskInfo">
					<div class="lb-lottery-taskName">完成登入1張</div>
					<div class="lb-lottery-taskDate">${v.date}</div>
				</div>
			</div>
		`;
	});
	var HTML = `
		<div class="lb-title">委託任務</div>
		<div class="lb-lottery-taskTextBox">
			<div class="lb-lottery-taskText">目前你的委託任務達成<span>${data.complete}</span>項</div>
			<div class="lb-lottery-taskText">共可以收集<span>${data.lottery}</span>張抽獎券</span></div>
		</div>
		<div class="lb-lottery-taskList">
			${taskBoxHTML}
		</div>
	`;
	$.gbox.open(HTML, config);
};
