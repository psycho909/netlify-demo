// 搜尋玩家參與資料
function FindJoinEvevtRecord() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/FindJoinEvevtRecord",
		data: {
			Token: $("#hfData").val()
		}
	}).then((res) => {
		console.log(res);
	});
}

// 遊戲帳號列表
function FindGameAccount() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/FindGameAccount",
		data: {
			Token: $("#hfData").val()
		}
	}).then((res) => {
		console.log(res);
	});
}

// 搜尋玩家角色名稱
function FindAccountCharacter() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/FindAccountCharacter",
		data: {
			Token: $("#hfData").val(),
			StarAccount: "bfguest0000000331412",
			MainAccount: "twsdtest02",
			GameAccount: "VA04d5bf5d7384825918"
		}
	}).then((res) => {
		console.log(res);
	});
}

// 新增參加紀錄
function FindAccountCharacter() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/AddJoinEventData",
		data: {
			Token: $("#hfData").val(),
			CharacterId: "4882925",
			CharacterName: "月天貓",
			GameAccount: "VA04d5bf5d7384825918",
			MainAccount: "twsdtest02",
			StarAccount: "bfguest0000000331412"
		}
	}).then((res) => {
		console.log(res);
	});
}

// 玩家擲骰
function ThrowDiceAPI() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/ThrowDiceAPI",
		data: {
			Token: $("#hfData").val(),
			StarAccount: "bfguest0000000331412",
			MainAccount: "twsdtest02",
			GameAccount: "VA04d5bf5d7384825918",
			CharacterId: "4882925",
			CharacterName: "月天貓"
		}
	}).then((res) => {
		console.log(res);
	});
}

// 發送獎勵
function AddItemToGameLog() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/AddItemToGameLog",
		data: {
			Token: $("#hfData").val(),
			StarAccount: "bfguest0000000331412",
			MainAccount: "twsdtest02",
			GameAccount: "VA04d5bf5d7384825918",
			CharacterId: "4882925",
			CharacterName: "月天貓",
			ClearLevel: 1
		}
	}).then((res) => {
		console.log(res);
	});
}

// 搜尋玩家領取紀錄
function FindItemToGameLog() {
	axios({
		method: "post",
		url: "../../api/E20220412_H5/FindItemToGameLog",
		data: {
			Token: $("#hfData").val(),
			StarAccount: "bfguest0000000331412",
			MainAccount: "twsdtest02",
			GameAccount: "VA04d5bf5d7384825918"
		}
	}).then((res) => {
		console.log(res);
	});
}
