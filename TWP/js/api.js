const apiRequest = axios.create({
	baseURL: "./api/E20240516"
});

// 取得 冷卻時間 + 角色資料 + 稱號資料
export const GetUserCharacterData = (token = "") => {
	return apiRequest.post("/GetUserCharacterData", {
		token
	});
};

// 取得 伺服器與領域資料
export const GetServerData = () => {
	return apiRequest.post("/GetServerData");
};

// 新增 使用者資料 + 角色資料
export const InsertUserDataAndCharacter = ({ token = "", worldSeq = 0, serverSeq = 0, characterName = "" }) => {
	return apiRequest.post("/InsertUserDataAndCharacter", {
		token,
		worldSeq,
		serverSeq,
		characterName
	});
};

// 新增 使用者抽取稱號紀錄 + 回傳稱號紀錄Seq + 回傳10筆抽取稱號結果
export const InsertTitleLog = ({ token = "" }) => {
	return apiRequest.post("/InsertTitleLog", {
		token
	});
};

// 更新 使用者稱號資料(刪除) + 新增 選擇的稱號
export const UpdateTitleLog = ({ token = "", titleLogSeq = 0, titleSeq = 0 }) => {
	return apiRequest.post("/UpdateTitleLog", {
		token,
		titleLogSeq,
		titleSeq
	});
};
