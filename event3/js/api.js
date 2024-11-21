const apiRequest = axios.create({
	baseURL: "../../api/E2024Anniversary_Event"
});

export const Init = ({ gameSeq = -1, token = "" } = {}) => {
	return apiRequest.post("/Init", {
		gameSeq,
		token
	});
};

export const ShareAchv = ({ gameSeq = -1, token = "", base64 = "" } = {}) => {
	return apiRequest.post("/ShareAchv", {
		gameSeq,
		token,
		base64
	});
};

export const SetLogin = (gameSeq = 0) => {
	return axios.post("../../api/E2024Anniversary_Login/SetLogin", {
		gameSeq
	});
};
