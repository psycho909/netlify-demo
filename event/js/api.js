// type=1 step1
// type=2 step2

// code=1 正常預登
// code=2 已經預登過
const apiRequest = axios.create({
	baseURL: "../../api/Event/E20230606"
});

// 預先登入送好禮
export const AddUserData = (Token) => {
	return apiRequest.post("/AddUserData", {
		Token
	});
};

// 取得活動分類
export const GetEventCategory = () => {
	return apiRequest.get("/GetEventCategory");
};

// 取得活動對應的banner list
export const GetEventBannerList = (seq = 0) => {
	return apiRequest.get(`/GetEventBannerList/${seq}`);
};
