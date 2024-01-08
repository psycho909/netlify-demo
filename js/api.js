const apiRequest = axios.create({
	baseURL: "../../api/Event/E20231206"
});

// 初始化
export const GetInitDataAPI = async (Token = "") => {
	try {
		const res = await apiRequest.post("/GetInitData", {
			Token
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

// 取的獎勵
export const GetRewardAPI = ({ Token = "", Kind = 0 }) => {
	return apiRequest.post("/GetReward", {
		Token,
		Kind
	});
};

// 輸入邀請馬
export const AddInviteCodeAPI = ({ Token = "", InviteCode = 0 }) => {
	return apiRequest.post("/AddInviteCode", {
		Token,
		InviteCode
	});
};

// 選擇角色
export const SelectCharacterAPI = ({ Token = "", CharacterId = 0, GameWorldId = 0 }) => {
	return apiRequest.post("/SelectCharacter", {
		Token,
		CharacterId,
		GameWorldId
	});
};

// 取得角色列表
export const FindCharacterAPI = ({ Token = "", GameWorldId = 0 }) => {
	return apiRequest.post("/FindCharacter", {
		Token,
		GameWorldId
	});
};

// 取的伺服器列表
export const FindGameWorldAPI = (Token = "") => {
	return apiRequest.post("/FindGameWorld", {
		Token
	});
};

// 驗證OTP簡訊驗證碼
export const CheckSMSAPI = ({ MessageNumber = "", Location = "", Phone = "", CountryCode = "", Token = "" }) => {
	return apiRequest.post("/CheckSMS", {
		MessageNumber,
		Location,
		Phone,
		CountryCode,
		Token
	});
};

// 輸入手機號碼發送OTP簡訊
export const SendSMSAPI = ({ Location = "", Phone = "", CountryCode = "", Token = "" }) => {
	return apiRequest.post("/SendSMS", {
		Location,
		Phone,
		CountryCode,
		Token
	});
};
