import { Notice, MessageLB, SelectCreate } from "../lightbox.js";
import useEventStore from "../store.js";
import { GetUserCharacterData, GetServerData } from "../api.js";
import { isValidString } from "../utils.js";

const listData = [
	{
		WorldSeq: 1,
		WorldName: "扭曲的黃金港",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港1",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港2",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 3,
		ServerName: "扭曲的黃金港3",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 4,
		ServerName: "扭曲的黃金港4",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 1,
		WorldName: "test01",
		ServerSeq: 5,
		ServerName: "扭曲的黃金港5",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 2,
		WorldName: "test02",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港1",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 2,
		WorldName: "test02",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港2",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	},
	{
		WorldSeq: 3,
		WorldName: "test03",
		ServerSeq: 1,
		ServerName: "扭曲的黃金港3-1",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 1
	},
	{
		WorldSeq: 3,
		WorldName: "test03",
		ServerSeq: 2,
		ServerName: "扭曲的黃金港3-2",
		Flag: 1,
		IsAdminNew: 0,
		isAdminRecommend: 0
	}
];
const selected = {
	setup() {
		const store = useEventStore();
		let serverData = Vue.ref([]);
		let selectedRealm = Vue.ref(null);
		let selectedName = Vue.ref("");
		let nameError = Vue.ref("");
		let status = Vue.ref(false);
		let firstRecommendedServer = Vue.ref(null);
		function groupedByWorldSeq(data) {
			let groupedBy = {};
			return (groupedBy = data.reduce((acc, obj) => {
				if (!acc[obj.WorldSeq]) {
					acc[obj.WorldSeq] = [];
				}
				acc[obj.WorldSeq].push(obj);
				return acc;
			}, {}));
		}

		// 檢查名稱
		let checkName = () => {
			if (!isValidString(selectedName.value)) {
				// 跳窗提示
				nameError.value = "請勿使用特殊符號、空白、注音符號、數字或非法文字，並再次輸入。";
				return;
			}
			if (selectedName.value.length < 2) {
				// 跳窗提示
				nameError.value = "角色名稱最少需輸入2個以上的文字，請重新輸入。";
				return;
			}
			if (selectedName.value.length > 10) {
				// 跳窗提示
				nameError.value = "字數超過上限，中英數字最多不可超過10個字，請重新輸入。";
				return;
			}
			nameError.value = "";
			// $("#loadingProgress").show();
			// $("#loadingProgress").hide();
			// API判斷名稱有無重複
			let data = {
				token: "",
				WorldSeq: selectedRealm.value.split("-")[0],
				ServerSeq: selectedRealm.value.split("-")[1],
				Name: selectedName.value
			};
			// 沒有重複
			SelectCreate(data);
		};
		// 選擇領域id filter後顯示名稱
		let filterWorldSeq = Vue.computed(() => {
			if (selectedRealm.value == null) return [];
			let [WorldSeq, ServerSeq] = selectedRealm.value.split("-");
			return listData.filter((item) => item.WorldSeq == WorldSeq && item.ServerSeq == ServerSeq)[0];
		});
		let toggleStatus = () => {
			status.value = !status.value;
		};
		Vue.onMounted(() => {
			// WorldSeq整理group
			serverData.value = groupedByWorldSeq(listData);
			for (let worldKey in serverData.value) {
				if (serverData.value.hasOwnProperty(worldKey)) {
					// Find the first server in the current world where isAdminRecommend is 1
					let recommendedServer = serverData.value[worldKey].find((server) => server.isAdminRecommend === 1);
					if (recommendedServer) {
						firstRecommendedServer.value = recommendedServer;
						break; // Stop the search once the first match is found
					}
				}
			}
			// currentWorldSeq.value = firstRecommendedServer.value.worldSeq;
			// selectedRealm.value = firstRecommendedServer.value;
			console.log(firstRecommendedServer.value);
		});
		return { Notice, serverData, selectedRealm, selectedName, checkName, filterWorldSeq, nameError, toggleStatus, status };
	},
	template: `
		<div class="selected-content">
			<div class="selected-title">選擇領域</div>
			<div class="selected-realm-box">
				<div class="selected-realm__status">
					<div class="selected-realm__status-item" data-type="recommend">推薦</div>
					<div class="selected-realm__status-item" data-type="new">最新</div>
					<div class="selected-realm__status-item" data-type="2">順暢</div>
					<div class="selected-realm__status-item" data-type="3">擁擠</div>
					<div class="selected-realm__status-item" data-type="4">飽和</div>
					<div class="selected-realm__status-item" data-type="5">關閉</div>
				</div>
				<div class="selected-realm__row-group">
					<div class="selected-realm__row" :class="[status?'-open':'']" v-for="(worlds,worldsKey,worldsIndex) in serverData" :key="worldsIndex">
						<div class="selected-realm__title"><span>{{worlds[0]?.WorldName}}</span></div>
						<a href="javascript:;" class="selected-realm__toggle" @click="toggleStatus"></a>
						<div class="selected-realm__box">
							<div class="selected-realm__inner">
								<div class="selected-realm__inner-box">
									<label v-for="(realm,realmIndex) in worlds" :key="realm.ServerSeq">
										<input type="radio" name="realm" :value="realm" v-model="selectedRealm" />
										<div class="selected-realm__item" :data-type="realm.flag"><span class="icon--circle"></span>{{realm.serverName}}<span class="icon--new" v-if="realm.isAdminNew"></span><span class="icon--recommend" v-if="realm.isAdminRecommend"></span></div>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selected-chosen" v-if="selectedRealm != null">
				<div class="selected-chosen__title">
					<span class="selected-chosen__title-hexagon"></span>
					
				</div>
				<div class="selected-chosen__input">
					<input type="text" placeholder="請輸入1~10個字的角色名稱" maxlength="10" v-model="selectedName" />
				</div>
				<span class="selected-chosen__error" v-if="nameError !== ''">{{nameError}}</span>
				<a href="javascript:;" class="selected-chosen__btn-submit" @click="checkName">檢查名稱</a>
				<span class="selected-chosen__notice"><span>※ 請注意！</span><span>創立角色名稱後，</span><span>選定的伺服器與角色名稱將無法變更。</span></span>
			</div>
			<a href="javascript:;" class="selected-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default selected;
