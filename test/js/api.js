const apiRequest = axios.create({
	baseURL: "../../api/Event/E20230606",
});

// 取得指定伺服器的角色列表
export const GetCharacters = async (Token) => {
	try {
		const res = await apiRequest.post("/GetCharacters", {
			Token,
		});
		const { Code, ListData, Data, Url, Message } = res.data;
		if (Code == -1) {
			throw { Message };
		}
		if (Code == -2) {
			throw { Message, Url };
		}
		return { Code, ListData, Data, Url, Message };
	} catch (error) {
		throw error;
	}
};

// 取得點數
export const GetGashPoint = (Token) => {
	return apiRequest.post("/GetGashPointAndAccount", {
		Token,
	});
};

// 取得購買紀錄
export const GetCashHistory = ({ Year = 0, Month = 0, Characterid = 0, Token = "" } = {}) => {
	return apiRequest.post("/GetCashHistory", {
		Token,
		Year,
		Month,
		Characterid,
	});
};

// 取得商品分類
export const GetCategoryList = () => {
	return apiRequest.get("/GetCategoryList");
};

// 商品列表
export const GetItemList = (CategoryNo = null, Keyword = "") => {
	return apiRequest.post("/GetItemList", {
		CategoryNo,
		Keyword,
	});
};

// 取得商品詳細資訊
export const GetItemInformation = (No) => {
	return apiRequest.post("/GetItemInformation", {
		No,
	});
};

// 取得熱門商品
export const GetHotItemList = () => {
	return apiRequest.get("/GetHotItemList");
};

// 商品購買
export const Purchase = ({ Items = [], Characterid = 0, Token = "" } = {}) => {
	return apiRequest.post("/Purchase", {
		Token,
		Items,
		Characterid,
	});
};
