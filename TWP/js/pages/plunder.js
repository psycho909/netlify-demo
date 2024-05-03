import { Notice, MessageLB, PlunderSuccess } from "../lightbox.js";
import { UpdateTitleLog } from "../api.js";
import useEventStore from "../store.js";

const plunder = {
	setup() {
		const store = useEventStore();
		const { titleList } = storeToRefs(store);
		let api = Vue.ref(false);
		const selected = Vue.ref(null);
		// 稱號選擇後的操作
		const titleSubmit = () => {
			if (selected.value == null) {
				return;
			}
			// 打API成功後執行
			// 刪掉之前default的項目
			// 進入下一頁
			let title = titleList.value.find((item) => item.id == selected.value);
			let data = {
				token: store.token,
				titleLogSeq: store.titleLogSeq,
				titleSeq: title.Seq
			};
			// $("#loadingProgress").show();
			// UpdateTitleLog(data).then((res)=>{
			// $("#loadingProgress").hide();
			// 	let {code,message,data,Listdata,url}=res.data
			// 	if(code == -1){
			// 		MessageLB(message);
			// 		return;
			// 	}
			// 	if(code == -2){
			// 		MessageLB(message,url);
			// 		return;
			// 	}
			// })
			PlunderSuccess();
			store.setTitleData(title);
			store.setCurrentPage("create");
		};

		Vue.onMounted(() => {
			selected.value = titleList.value[0].Seq;
		});
		return { Notice, selected, titleSubmit, titleList };
	},
	template: `
		<div class="plunder-content">
			<div class="plunder-title">掠奪角色名稱</div>
			<div class="plunder-chosen">
				<a href="javascript:;" class="plunder-chosen__btn-submit" @click="titleSubmit">檢查名稱</a>
			</div>
			<div class="plunder-names">
				<div class="plunder-names__title">推薦名稱</div>
				<div class="plunder-names__list">
					<label class="plunder-names__label" v-for="i in titleList">
						<input type="radio" name="title" :value="i.Seq" v-model="selected"  />
						<span class="plunder-names__item">{{i.TitleName}}</span>
					</label>
				</div>
				<span class="plunder-names__error">請選擇一個天命進行召喚</span>
			</div>
			<a href="javascript:;" class="plunder-btn__notice btn-common" @click="()=>Notice()">注意事項</a>
		</div>
	`
};

export default plunder;
