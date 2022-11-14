var isAjax = true;
var isShare = true;
var ShareLink = "Share.aspx";
var LOGIN_LINK = "Login.aspx";
var LOGOUT_LINK = "Logout.aspx";
var EVENT_TIME = "2021/03/11 16:30:00";
var END_TIME = "2021/05/06 16:30:00";
var userItemArr = [];
var userInfo = { ServerId: "", CharacterName: "", MainAccount: "" };
//本機
var imgPath = "./images/";
//var imgPath = "https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E20210311/images/";
var Url = {
	GetServer: "API.aspx/GetServer",
	GetCharacter: "API.aspx/GetCharacter",
	CheckCharacter: "API.aspx/CheckCharacter",
	GetUserData: "API.aspx/GetUserData",
	Dice: "API.aspx/Dice",
	Lock: "API.aspx/Lock",
	UnLock: "API.aspx/UnLock",
	SendItem: "API.aspx/SendItem",
	CheckShare: "API.aspx/CheckShare",
};

// 道具整理
function ItemGroup(userDataList) {
	userItemArr = [];
	// items/ItemType/ItemID.png
	// 裝備欄位
	for (var i = 1; i <= 6; i++) {
		userItemArr.push({
			id: userDataList["ItemID_" + i],
			flag: userDataList["ItemFlag_" + i],
			name: userDataList["ItemName_" + i],
			img: userDataList["ItemID_" + i] == 0 ? "" : "items/" + i + "/" + userDataList["ItemID_" + i] + ".png",
			type: i,
			imgError: false,
		});
	}
	return userItemArr;
}

// 裝備Render
function ItemRender(Items) {
	var slotList = "";
	var itemName = "";
	var lockShow = "";
	Items.forEach(function (v, i) {
		if (v.name != null) {
			itemName = v.name;
			lockShow = '<a href="javascript:;" class="play-slot__lock"></a>';
		}
		var slot = '<div id="' + v.id + '" class="play-slot" data-type="' + v.type + '" data-flag="' + v.flag + '">\
				' + lockShow + '\
				<div class="play-slot__light"></div>\
				<div class="play-slot__item-img ' + (v.img ? "" : "default-img") + '">\
					<img src="' + imgPath + v.img + '" alt="" onerror="ErrorImage(this)" class="' + (v.img == "" ? "hide" : "") + '" />\
				</div>\
				<div class="play-slot__item-name">' + itemName + "</div>\
			</div>";
		slotList += slot;
	});
	$(".play-box").html(slotList);
}

// 預設訊息
function DefaultText(obj) {
	$.gbox.open("<div class='error-text'>" + obj.text + "</div>", {
		addClass: "default default-text",
		titleBar: obj.title || " ",
		hasCloseBtn: true,
		hasActionBtn: obj.btn || false,
		afterOpen: function () {},
		afterClose: function () {
			if (obj.callback) {
				callback();
			}
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
	});
}
// 錯誤訊息
function ErrorText(text, url) {
	$.gbox.open("<div class='error-text'>" + text + "</div>", {
		addClass: "default",
		titleBar: " ",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {},
		afterClose: function () {
			if (url) {
				var href = location.href;
				var path = location.pathname;
				var pathSplit = location.pathname.split("/");
				var len = pathSplit.length;
				pathSplit[len - 1] = url;
				var newPath = pathSplit.join("/");
				location.href = href.replace(path, newPath);
			}
		},
	});
}

// 登入訊息
function LoginText(text) {
	$.gbox.open("<div class='error-text'>" + text + "</div>", {
		addClass: "default default-text",
		titleBar: " ",
		hasCloseBtn: true,
		hasActionBtn: true,
		actionBtns: [
			{
				text: "馬上登入",
				class: "btn btn-login",
				click: function () {
					$.gbox.close(LOGIN_LINK);
				},
			},
		],
	});
}

function SetUserInfo(info) {
	userInfo.ServerId = info.ServerId;
	userInfo.CharacterName = info.CharacterName;
	userInfo.MainAccount = info.MainAccount;
}

// 獲取伺服器
function GetServer() {
	// if (GetServerTime() >= +new Date(END_TIME)) {
	// 	DefaultText({
	// 		text: "《天堂R》勇士誕生祭壇活動已結束",
	// 	});
	// 	return;
	// }
	$("#loadingProgress").show();
	$.ajax({
		type: "POST",
		url: Url.GetServer,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				if (_data.ErrorText.indexOf("沒有遊戲帳號") > -1) {
					$.gbox.open(registerHTML, registerObj);
					return;
				}
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var serverListHTML = '<option value="-1">選擇伺服器</option>';
			var serverList = _data.ListData;
			serverList.forEach(function (s, i) {
				var option = '<option value="' + s.ServerId + '">' + s.ServerName + "</option>";
				serverListHTML += option;
			});
			$("#select-server").html(serverListHTML);
			SelectServer();
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 選擇伺服器
function SelectServer() {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("body").on("change", "#select-server", function () {
		var ServerId = $(this).val();
		if (ServerId <= 0) {
			return;
		}
		$(".lb-select__error").html("");
		$("#select-character").html('<option value="-1">選擇角色</option>');
		GetCharacter(ServerId);
	});
}

// 獲取角色名稱
function GetCharacter(ServerId) {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ ServerId: ServerId });
	$.ajax({
		type: "POST",
		url: Url.GetCharacter,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				if (_data.ErrorText.indexOf("選取伺服器沒有角色") > -1) {
					$(".lb-select__error").html("選取伺服器沒有角色");
					return;
				}
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}

			var characterListHTML = '<option value="-1">選擇角色</option>';
			var characterList = _data.ListData;
			characterList.forEach(function (c, i) {
				var option = '<option value="' + c.CharacterName + '">' + c.CharacterName + "</option>";
				characterListHTML += option;
			});
			$("#select-character").html(characterListHTML);
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 確認玩家資料
function CheckCharacter(ServerId, CharacterName) {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ ServerId: ServerId, CharacterName: CharacterName });
	$.ajax({
		type: "POST",
		url: Url.CheckCharacter,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var userDataList = _data.Data;
			// 骰子點數
			$(".play-times span").text(userDataList.DiceCnt);
			// 帳號
			$(".header-user__name").text(userDataList.MainAccount);

			SetUserInfo(userDataList);
			// 登出登入
			LoginStatus(true);

			ItemRender(ItemGroup(userDataList));
			if (CheckUserItem(userItemArr)) {
				DefaultText({
					text: "還沒擲出祭壇骰子，首次完成就能開啟領取獎勵功能",
				});
				return;
			}
			$.gbox.open(SelectItemRender(userItemArr), selectItemObj);
			// GetUserData()
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 登入登出切換
function LoginStatus(status) {
	if (status) {
		// 登出顯示
		$(".header-user__login").hide();
		$(".header-user__logout").show();
	} else {
		// 登入顯示
		$(".header-user__login").show();
		$(".header-user__logout").hide();
	}
}

// 取得玩家資料
function GetUserData() {
	$("#loadingProgress").show();
	$.ajax({
		type: "POST",
		url: Url.GetUserData,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var userDataList = _data.Data;
			// 骰子點數
			$(".play-times span").text(userDataList.DiceCnt);
			// 帳號
			$(".header-user__name").text(userDataList.MainAccount);

			SetUserInfo(userDataList);
			// 登出登入
			LoginStatus(true);

			ItemRender(ItemGroup(userDataList));
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 骰子換裝備
function DiceItemRender(diceItem) {
	var i = 0;
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	var filterDiceItem = diceItem.filter(function (item, index) {
		return item.flag == 0;
	});
	filterDiceItem.forEach(function (v, index) {
		i++;
		if ($(".play-slot[data-type=" + v.type + "]").find(".play-slot__lock").length == 0) {
			$(".play-slot[data-type=" + v.type + "]").append('<a href="javascript:;" class="play-slot__lock"></a>');
		}
		$(".play-slot[data-type=" + v.type + "]")
			.find(".play-slot__light")
			.fadeIn(function () {
				$(this).fadeOut(function () {
					if (i == filterDiceItem.length) {
						isAjax = true;
					}
				});
				$(".play-slot[data-type=" + v.type + "]").attr("id", v.id);
				$(".play-slot[data-type=" + v.type + "]").attr("data-flag", v.flag);
				$(".play-slot[data-type=" + v.type + "]")
					.find(".play-slot__item-name")
					.html(v.name);
				$(".play-slot[data-type=" + v.type + "]")
					.find(".play-slot__item-img img")
					.attr("src", imgPath + v.img)
					.removeClass("hide");
			});
	});
}

// 骰裝備
function Dice() {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	$.ajax({
		type: "POST",
		url: Url.Dice,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var userDataList = _data.Data;
			$(".play-times span").text(userDataList.DiceCnt);

			$(".play-dice__sprite").removeClass("on");
			animSprite(
				{
					target: $(".play-dice__sprite-img"),
					fps: 60,
					steps: 19,
				},
				function () {
					$(".play-dice__sprite").addClass("on");
					DiceItemRender(ItemGroup(userDataList));
				}
			);
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
			isAjax = true;
		},
	});
}
// Dice()

// 鎖定裝備
function Lock(ItemInfo) {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ ItemInfo: ItemInfo });
	$.ajax({
		type: "POST",
		url: Url.Lock,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var userDataList = _data.Data;
			$(".play-slot[data-type=" + ItemInfo.ItemType + "]").attr("data-flag", 1);
			ItemGroup(userDataList);
			isShare = true;
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 解鎖定裝備
function UnLock(ItemInfo) {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ ItemInfo: ItemInfo });
	$.ajax({
		type: "POST",
		url: Url.UnLock,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var userDataList = _data.Data;
			$(".play-slot[data-type=" + ItemInfo.ItemType + "]").attr("data-flag", 0);
			ItemGroup(userDataList);
			isShare = true;
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 兌換裝備
function SendItem(ListItemInfo) {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ ListItemInfo: ListItemInfo });
	$.ajax({
		type: "POST",
		url: Url.SendItem,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}

			var userDataList = _data.Data;
			ItemRender(ItemGroup(userDataList));
			var _SuccessText = _data.SuccessText.split(",");
			var SendItemHTML = "";
			_SuccessText.forEach(function (v, i) {
				SendItemHTML += v + "<br/>";
			});
			DefaultText({
				text: SendItemHTML,
				title: "已領取",
			});
		},
		error: function (err) {
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}

// 分享
function CheckShare(base64String) {
	//if(GetServerTime() >= +new Date(END_TIME)){
	//	DefaultText({
	// 	text:"《天堂R》勇士誕生祭壇活動已結束"
	// })
	//	return;
	//}
	$("#loadingProgress").show();
	var _data = JSON.stringify({ base64String: base64String });
	$.ajax({
		type: "POST",
		url: Url.CheckShare,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: _data,
		success: function (data) {
			$("#loadingProgress").hide();
			var _data = JSON.parse(data.d);
			if (!_data.IsSuccess || _data.ErrorText != null) {
				ErrorText(_data.ErrorText, _data.Url);
				return;
			}
			var Seq = _data.Data.Seq;
			if (Seq == 0 || Seq == null) {
				ShareLink += "Seq=0";
			} else {
				ShareLink += "Seq=" + Seq;
			}
			Share.mobileShare(ShareLink);
		},
		error: function (err) {
			isShare = true;
			$("#loadingProgress").hide();
			ErrorText("系統異常", LOGIN_LINK);
		},
	});
}
var LockDebounce = debounce(Lock, 250);
var UnLockDebounce = debounce(UnLock, 250);
// 裝備鎖定
$("body").on("click", ".play-slot__lock", function () {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	var _flag = parseInt($(this).parent(".play-slot").attr("data-flag"));
	if (_flag > 1) {
		return;
	}
	var ItemInfo = {
		Seq: "",
		ItemType: "",
	};
	if (_flag !== 0) {
		// $(this).parent(".play-slot").attr("data-flag",0)
		ItemInfo = {
			Seq: $(this).parent(".play-slot").attr("id"),
			ItemType: $(this).parent(".play-slot").attr("data-type"),
		};
		UnLockDebounce(ItemInfo);
		return;
	} else {
		// $(this).parent(".play-slot").attr("data-flag",1)
		ItemInfo = {
			Seq: $(this).parent(".play-slot").attr("id"),
			ItemType: $(this).parent(".play-slot").attr("data-type"),
		};
		LockDebounce(ItemInfo);
		return;
	}
});

// 骰子事件 按鈕
$(".play-dice__btn").on("click", function () {
	if (GetServerTime() >= +new Date(END_TIME)) {
		DefaultText({
			text: "《天堂R》勇士誕生祭壇活動已結束",
		});
		return;
	}
	if (userInfo.MainAccount == "") {
		LoginText("勇士請先登入才能投擲骰子");
		return;
	}
	if ($(".play-times span").text() <= 0) {
		DefaultText({
			text: "祭壇骰子能量不足",
		});
		return;
	}
	var checkFlag = userItemArr.every(function (v, i) {
		return v.flag >= 1;
	});
	var checkFlagReward = userItemArr.every(function (v, i) {
		return v.flag >= 2;
	});
	if (checkFlagReward) {
		DefaultText({
			text: "祭壇裝備已全部領取，無法擲出祭壇骰子",
		});
		return;
	}
	if (checkFlag) {
		DefaultText({
			text: "祭壇裝備全部已鎖定，無法擲出祭壇骰子",
		});
		return;
	}
	if (!isAjax) return;
	isAjax = false;
	Dice();
});

function ErrorImage(t) {
	var _type = $(t).closest(".play-slot").attr("data-type");
	userItemArr.forEach(function (v, i) {
		if (v.type == _type) {
			v.imgError = "true";
		}
	});
}

function CheckErrImg(userItemArr) {
	return userItemArr.some(function (v, i) {
		return v.imgError;
	});
}

function CheckUserItem(userItemArr) {
	return userItemArr.every(function (v, i) {
		return v.id == 0;
	});
}

// 分享按鈕 - 獲取資料開啟
$(".play-lb__btn-share").on("click", function () {
	//if(GetServerTime() >= +new Date(END_TIME)){
	//	DefaultText({
	// 	text:"《天堂R》勇士誕生祭壇活動已結束"
	// })
	//	return;
	//}

	// 尚未登入
	// if(userInfo.MainAccount == ""){
	// 	LoginText("勇士請先登入才能投擲骰子");
	// 	return;
	// }
	// if(CheckUserItem(userItemArr)){
	// 	DefaultText({
	// 		text:"還沒擲出祭壇骰子，首次完成就能開啟分享開局裝備功能"
	// 	})
	// 	return;
	// }
	// if(CheckErrImg(userItemArr)){
	// 	DefaultText({
	// 		text:"祭壇獎勵圖片有錯誤"
	// 	})
	// 	return;
	// }
	// var diceCnt = $(".play-times span").text();
	var diceCnt = 2;
	var userItemArr = [
		{
			name: "1",
			img: "items/1/1.png",
		},
		{
			name: "2",
			img: "items/2/2.png",
		},
		{
			name: "3",
			img: "items/3/3.png",
		},
		{
			name: "4",
			img: "items/4/51.png",
		},
		{
			name: "5",
			img: "items/5/1.png",
		},
		{
			name: "6",
			img: "items/6/58.png",
		},
	];
	shareObj.afterOpen = function () {
		var t = new drawShare(userItemArr, diceCnt);
		t.draw();
	};
	$.gbox.open(shareRender2(), shareObj);
});

function debounce(fn, delay) {
	var timeoutID = null;

	return function (args) {
		var that = this;
		var _args = args;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {
			fn.call(that, _args);
		}, delay);
	};
}

var CheckShareDebounce = debounce(CheckShare, 1000);
// 分享按鈕分享出去
$("body").on("click", ".lb-sh_are__btn", function () {
	//if(GetServerTime() >= +new Date(END_TIME)){
	//	DefaultText({
	// 	text:"《天堂R》勇士誕生祭壇活動已結束"
	// })
	//	return;
	//}
	if (!isShare) {
		Share.mobileShare(ShareLink);
		return;
	}
	isShare = false;
	var base64 = canvas.toDataURL("image/jpeg", 0.3).replace("data:image/jpeg;base64,", "");
	CheckShareDebounce(base64);
	// CheckShare(base64)
});

// 領取獎勵 按鈕
$(".play-reward__btn").on("click", function () {
	// if (GetServerTime() >= +new Date(END_TIME)) {
	// 	DefaultText({
	// 		text: "《天堂R》勇士誕生祭壇活動已結束",
	// 	});
	// 	return;
	// }
	// if (GetServerTime() < +new Date(EVENT_TIME)) {
	// 	DefaultText({
	// 		text: "還沒到祭壇領獎時間！改版當天維護後將開放領取。",
	// 		btn: true,
	// 	});
	// 	return;
	// }
	// // 尚未登入
	// if (userInfo.MainAccount == "") {
	// 	LoginText("勇士請先登入才能投擲骰子");
	// 	return;
	// }
	// 有帳號 首次領取要先綁定角色
	// if (userInfo.ServerId == "" || userInfo.CharacterName == "") {
	// 	$.gbox.open(selectRender(), selectObj);
	// 	return;
	// }

	// // 沒有裝備
	// if (CheckUserItem(userItemArr)) {
	// 	DefaultText({
	// 		text: "還沒擲出祭壇骰子，首次完成就能開啟領取獎勵功能",
	// 	});
	// 	return;
	// }
	// 已綁定後選擇道具
	$.gbox.open(SelectItemRender(userItemArr), selectItemObj);
});

// GetUserData()
