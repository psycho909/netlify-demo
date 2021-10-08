// 取得遊戲帳號
function GetAccount() {
	loading.show();
	$.ajax({
		type: "POST",
		url: "../../api/E20211008_H5/GetAccount",
		contentType: "application/json; charset=utf-8",
		dataType: "Json",
		data: $("#hfData").val(),
		success: function (jsonData) {
			console.log(jsonData);
		},
		error: function () {
			loading.hide();
			GboxError("系統忙碌中，請稍後再試(err1)", $("#hfWeb").val());
		},
	});
}

// 新增玩家資料
function SetAccount(account) {
	var Requestdata = {
		Data: $("#hfData").val(),
		GameAccount: account,
	};

	$.ajax({
		type: "POST",
		url: "../../api/E20211008_H5/SetAccount",
		contentType: "application/json; charset=utf-8",
		dataType: "Json",
		data: JSON.stringify(Requestdata),
		success: function (jsonData) {
			console.log(jsonData);
		},
		error: function () {
			loading.hide();
			GboxError("系統忙碌中，請稍後再試(err2)", $("#hfWeb").val());
		},
	});
}

// 保存
function Save(account, data) {
	var Requestdata = {
		Data: $("#hfData").val(),
		GameAccount: "account",
		CakeDecoration: json,
	};
	$.ajax({
		type: "POST",
		url: "../../api/E20211008_H5/Save",
		contentType: "application/json; charset=utf-8",
		dataType: "Json",
		data: JSON.stringify(Requestdata),
		success: function (jsonData) {
			console.log(jsonData);
		},
		error: function () {
			loading.hide();
			GboxError("系統忙碌中，請稍後再試(err3)", $("#hfWeb").val());
		},
	});
}

// 領獎
function Exchange(account) {
	var Requestdata = {
		Data: $("#hfData").val(),
		GameAccount: account,
	};

	$.ajax({
		type: "POST",
		url: "../../api/E20211008_H5/Exchange",
		contentType: "application/json; charset=utf-8",
		dataType: "Json",
		data: JSON.stringify(Requestdata),
		success: function (jsonData) {
			console.log(jsonData);
		},
		error: function () {
			loading.hide();
			GboxError("系統忙碌中，請稍後再試(err3)", $("#hfWeb").val());
		},
	});
}
