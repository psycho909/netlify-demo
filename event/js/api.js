const apiRequest = axios.create({
	// baseURL: "/api/GamaEvent/"
	baseURL: "../../api/E20230131/",
});

export const GetUserData = (Token) => {
	return apiRequest.post("/GetUserData", {
		CipherText: Token,
	});
};

export const FindCoinLog = (Token) => {
	return apiRequest.post("/FindCoinLog", {
		CipherText: Token,
	});
};

export const AddRewardLog = (Token, Cnt) => {
	return apiRequest.post("/AddRewardLog", {
		CipherText: Token,
		LotteryCnt: Cnt,
	});
};

export const AddGuaranteedLog = (Token, Box) => {
	return apiRequest.post("/AddGuaranteedLog", {
		CipherText: Token,
		Box: Box,
	});
};

export const FindRewardLog = (Token, Page) => {
	return apiRequest.post("/FindRewardLog", {
		CipherText: Token,
		Page: Page,
	});
};

export const AddItemToGameLog = (Token, CharacterId, Seqs) => {
	return apiRequest.post("/AddItemToGameLog", {
		CharacterId: CharacterId,
		CipherText: Token,
		Seqs: Seqs,
	});
};
