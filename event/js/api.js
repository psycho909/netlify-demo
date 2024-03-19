const apiRequest = axios.create({
	baseURL: "../../api/Event/E20240410",
});

// 取得伺服器列表
/*
ListData:[
{
	"GameWorldId": 0,
	"GameWorldName": "艾麗亞"
},
{
	"GameWorldId": 1,
	"GameWorldName": "普力特"
},
{
	"GameWorldId": 2,
	"GameWorldName": "琉德"
},
{
	"GameWorldId": 3,
	"GameWorldName": "優依娜"
},
{
	"GameWorldId": 4,
	"GameWorldName": "愛麗西亞"
},
{
	"GameWorldId": 6,
	"GameWorldName": "殺人鯨"
},
{
	"GameWorldId": 45,
	"GameWorldName": "Reboot"
}
]
*/
export const FindGameWorld = (Token = "") => {
	return apiRequest.post("/FindGameWorld", {
		Token,
	});
};
// 取得角色列表
/*
ListData:[
	{
		"CharacterId": 8188690,
		"CharacterName": "測試test05",
		"InGameAccountId": null
	},
	{
		"CharacterId": 8188691,
		"CharacterName": "測試test06號",
		"InGameAccountId": null
	}
]
*/
export const FindCharacter = ({ Token = "", GameWorldId = 0 } = {}) => {
	return apiRequest.post("/FindCharacter", {
		Token,
		GameWorldId,
	});
};
// 選擇角色 會取得新的Token
/*
Data:"dsaasdasdasdasdasd"
*/
export const SelectCharacter = ({ Token = "", GameWorldId = 0, CharacterId = 0 } = {}) => {
	return apiRequest.post("/SelectCharacter", {
		Token,
		GameWorldId,
		CharacterId,
	});
};

// 取得初始資料
/*
Data:{
	"NickName": "twsdtest03map",
	"Summary": {
		"Count": 0,
		"TotalCount": 0
	}
}
*/
export const GetInitData = (Token = "") => {
	return apiRequest.post("/GetInitData", {
		Token,
	});
};

// GoLottery
/*
ListData:[
	{
		"ItemName": "選擇秘法符文交換券",
		"ItemCount": 10,
		"CreateTime": null,
		"UpdateTime": null
	}
]
*/
export const GoLottery = (Token = "") => {
	return apiRequest.post("/GoLottery", {
		Token,
	});
};
// FindLotteryLog
/*
ListData:[
	{
		"ItemName": "選擇秘法符文交換券",
		"ItemCount": 10,
		"CreateTime": "2024-03-07T14:13:52.83",
		"UpdateTime": "2024-03-07T14:13:52.883"
	}
]
*/
export const FindLotteryLog = (Token = "") => {
	return apiRequest.post("/FindLotteryLog", {
		Token,
	});
};
