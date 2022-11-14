// 預設
var defaultObj = {
	addClass: "default",
	titleBar: " ",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "確認",
			class: "btn-success",
			click: function () {
				$.gbox.close();
			},
		},
		{
			text: "再想想",
			class: "btn-think",
			click: function () {
				$.gbox.close();
			},
		},
	],
};

// 怎麼玩
var howObj = {
	addClass: "default lb-how",
	titleBar: "怎麼玩",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterOpen: function () {
		if (isMobile.any) {
			$(".lb-how-wrap").mCustomScrollbar({
				theme: "light",
			});
		}
	},
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "知道了",
			class: "btn-success",
			click: function () {
				$.gbox.close();
			},
		},
	],
};

var howHTML = '<div class="lb-how-wrap">\
		<div class="lb-how__content-wrap">\
			<div class="lb-how__content">\
				<div class="lb-how__content-title">遊戲步驟</div>\
				<ul class="lb-how__content-list">\
					<li>每日 20 次機會投骰子抽獎勵<span class="lb-how__content-list--dice"></span></li>\
					<li>抽到想要的獎勵，各欄位皆可利用鎖頭可單獨鎖定</li>\
					<li>改版當天維護後開放領取</li>\
				</ul>\
				<div class="lb-how__content-notice">※已鎖定道具將不會隨著投出骰子變換</div>\
				<div class="lb-how__content-notice">※一經投出骰子變換獎勵，等同放棄先前的獎勵結果且無法保留與復原。</div>\
			</div>\
			<div class="lb-how__content">\
				<div class="lb-how__content-title">可能獲的禮物</div>\
				<div class="lb-how__content-lv" data-lv="s">\
					<div class="lb-how__content-lv-title">S級</div>\
					<div class="lb-how__content-lv-img"></div>\
					<div class="lb-how__content-lv-text">\
						<span>波曲王之劍(活動)、巴拉卡斯的力量(活動)等</span>\
						<span>同級職業武器與防具</span>\
					</div>\
				</div>\
				<div class="lb-how__content-lv" data-lv="a">\
					<div class="lb-how__content-lv-title">A級</div>\
					<div class="lb-how__content-lv-img"></div>\
					<div class="lb-how__content-lv-text">+8~+9騎士團武器、+6~+7騎士團系列防具</div>\
				</div>\
				<div class="lb-how__content-lv" data-lv="b">\
					<div class="lb-how__content-lv-title">B級</div>\
					<div class="lb-how__content-lv-img"></div>\
					<div class="lb-how__content-lv-text">+6~+7騎士團武器、+4~+5騎士團系列防具</div>\
				</div>\
				<a href="https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7403" target="_blank" class="lb-how__content-link">詳細獎勵一覽</a>\
			</div>\
		</div>\
	</div>';

// $.gbox.open(howHTML, howObj);

// 分享開局裝備
var shareObj = {
	addClass: "lb-sh_are",
	hasCloseBtn: true,
	hasActionBtn: false,
	afterClose: function () {
		$.gbox.close();
	},
};

function shareRender2() {
	var shareHTML = '<div class="lb-sh_are-wrap">\
			<canvas id="canvas"></canvas>\
			<a href="javascript:;" class="lb-sh_are__btn">分享</a>\
		</div>';
	return shareHTML;
}
// $.gbox.open(shareRender2(), shareObj);

// 選取角色
var selectObj = {
	addClass: "default lb-select",
	titleBar: "請選擇領取角色",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterOpen:function(){
		GetServer()
	},
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "確認",
			class: "btn-confirm",
			click: function () {
				var error="";
				var ServerId=$("#select-server").val();
				var CharacterName=$("#select-character").val();
				if(ServerId <= 0 || CharacterName <= 0){
					if($("#select-server").val() <= 0){
						error+="請選擇伺服器<br/>";
						$(".lb-select__error").html(error)
					}
					if($("#select-character").val() <= 0){
						error+="請選擇角色";
						$(".lb-select__error").html(error)
					}
					return;
				}
				CheckCharacter(ServerId,CharacterName)
				$.gbox.close();
			},
		},
		{
			text: "再想想",
			class: "btn-think",
			click: function () {
				$.gbox.close();
			},
		},
	],
};

function selectRender() {
	var selectHTML = '<div class="lb-select-wrap">\
			<div class="lb-select__text"><span>獲得祭壇祝福的角色只能選一次（將綁定獎勵對象），</span><span>考慮完再按下確定。</span></div>\
			<div class="lb-select__ui">\
				<select name="" id="select-server">\
					<option value="-1">選擇伺服器</option>\
				</select>\
			</div>\
			<div class="lb-select__ui">\
				<select name="" id="select-character">\
					<option value="-1">選擇角色</option>\
				</select>\
			</div>\
			<div class="lb-select__error"></div>\
		</div>';

	return selectHTML;
}

// $.gbox.open(selectRender(), selectObj);

// 選擇祭壇禮物
var selectItemObj = {
	addClass: "default lb-selectItem",
	titleBar: "選擇祭壇禮物",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "確認",
			class: "btn-confirm",
			click: function () {
				var list = [];
				var error="";
				var GetNum=0;
				$(".lb-selectItem__checkbox").each(function (i, v) {
					if ($(this).prop("disabled") && $(this).prop("checked")) {
						GetNum++;
						return;
					}
					if ($(this).prop("checked")) {
						list.push({
							Seq: $(this).attr("data-seq"),
							ItemType: $(this).attr("data-type"),
						});
					}
				});
				if(GetNum == 6){
					error="祭壇禮物已領取完";
					$(".lb-select__error").html(error)
					return;
				}
				if(list.length == 0){
					error="請選擇祭壇禮物";
					$(".lb-select__error").html(error)
					return;
				}
				
				$(".lb-select__error").html(error)
				SendItem(list)
				$.gbox.close();
			},
		},
		{
			text: "再想想",
			class: "btn-think",
			click: function () {
				$.gbox.close();
			},
		},
	],
};


function SelectItemRender(selectItem) {
	var selectItemList = "";
	var type={
		1:"頭盔",
		2:"斗篷",
		3:"盔甲",
		4:"脛甲",
		5:"武器",
		6:"手套"
	}
	selectItem.forEach(function (v, i) {
		var tr = '<tr>\
				<td>\
					<label class="lb-selectItem__label" for="Send_' + (v.id) + '">\
						<input id="Send_' + (v.id) + '" data-seq="'+(v.id)+'" data-type="'+(v.type)+'" class="lb-selectItem__checkbox" type="checkbox" ' + ((v.flag == 2 || v.flag == 3) ? "checked disabled" : "") + ' />\
						<span class="lb-selectItem__ui"></span>\
					</label>\
				</td>\
				<td>' + type[v.type] + "</td>\
				<td>" + v.name + "</td>\
				<td>" + ((v.flag == 2 || v.flag == 3) ? "已領取" : "未領取") + "</td>\
			</tr>";
		selectItemList += tr;
	});
	var selectItemHTML = '<div class="lb-selectItem-wrap">\
		<table class="lb-selectItem__table">\
			<thead class="lb-selectItem__thead">\
				<tr>\
					<th>選擇</th>\
					<th>欄位</th>\
					<th>目前獎勵</th>\
					<th>狀態</th>\
				</tr>\
			</thead>\
			<tbody class="lb-selectItem__tbody">' + selectItemList + '</tbody>\
		</table>\
		<div class="lb-selectItem__notice">\
			<span>※每個欄位限領一次，記得注意獎勵適用的職業，領過就不能領囉</span>\
		</div>\
		<div class="lb-select__error"></div>\
	</div>';
	return selectItemHTML;
}

// $.gbox.open(selectItemRender(selectItem), selectItemObj);

// 帳號沒有天堂國際服帳號
var registerObj = {
	addClass: "default lb-register",
	titleBar: " ",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "遊戲帳號申請",
			class: "btn-register",
			target:true,
			click: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=3865",
		},
		{
			text: "啟動遊戲",
			class: "btn-gamestart",
			target:true,
			click: "https://tw.beanfun.com/game_zone/default.aspx?service_code=611639&service_region=T0",
		},
	],
};

var registerHTML = '<div class="lb-register-wrap">\
		<div class="lb-register__text">\
			<span>遊戲橘子沒有天堂國際服帳號</span>\
			<span>立即申請即可領取獎勵囉</span>\
		</div>\
	</div>';

// $.gbox.open(registerHTML, registerObj);
