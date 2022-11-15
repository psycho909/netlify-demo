import { Message, LoginNotice, Congrats, UnLucky, RewardListEmpty, RewardList, RewardTask } from "./lightbox.js";
const lottery = {
	data() {
		return {
			rewardList: [
				{
					label: "偵探小喵特別獎",
					img: "./assets/css/img/lottery/item.png",
					name: "Apple iPhone 14 Pro (256G)-深紫色",
					num: 1
				},
				{
					label: "頭獎",
					img: "./assets/css/img/lottery/item.png",
					name: "Apple iPhone 14 Pro (256G)-深紫色",
					num: 1
				},
				{
					label: "貳獎",
					img: "./assets/css/img/lottery/item.png",
					name: "Apple iPhone 14 Pro (256G)-深紫色",
					num: 1
				},
				{
					label: "參獎",
					img: "./assets/css/img/lottery/item.png",
					name: "Apple iPhone 14 Pro (256G)-深紫色",
					num: 1
				},
				{
					label: "參獎",
					img: "./assets/css/img/lottery/item.png",
					name: "Apple iPhone 14 Pro (256G)-深紫色",
					num: 1
				}
			],
			lottery: 1,
			lotteryLoading: false
		};
	},
	methods: {
		lotteryPlay() {
			var data = {
				img: "./assets/css/img/common/item.png",
				name: "Apple iPhone 14 Pro (256G)-深紫色 1台"
			};
			// 跑loading動畫
			this.lotteryLoading = true;
			// Congrats(data);
			// UnLucky();
		},
		taskPop() {
			var data = {
				complete: 1,
				lottery: 1,
				list: [
					{ complete: false, name: "完成登入1張", date: "" },
					{ complete: true, name: "完成數據情報館圖片分享1張", date: "2022/10/26  21:00" },
					{ complete: false, name: "完成個人機密庫圖片分享1張", date: "" },
					{ complete: false, name: "完成偵探小喵分享2張", date: "" },
					{ complete: false, name: "完成偵探小喵收藏2張", date: "" },
					{ complete: false, name: "完成beanfun! 簽到2張", date: "" },
					{ complete: false, name: "完成以上所有任務1張", date: "" }
				]
			};
			RewardTask(data);
		},
		historyPop() {
			var data = [
				{ img: "./assets/css/img/common/item.png", type: "頭獎", name: "Apple iPhone 14 Pro (256G)-深紫色很多文字很多文字", date: "2022.09.27  11:00" },
				{ img: "./assets/css/img/common/item.png", type: "頭獎", name: "Apple iPhone 14 Pro (256G)-深紫色很多文字很多文字", date: "2022.09.27  11:00" }
			];
			if (!data.length) {
				RewardListEmpty();
				return;
			}
			RewardList(data);
		}
	},
	template: `
		<div class="lottery">
			<lottery-loading v-if="lotteryLoading"></lottery-loading>
			<div class="lottery-head">
				<div class="lottery-headBox">
					<div class="lottery-headAnim1"></div>
					<div class="lottery-headAnim2"></div>
					<div class="lottery-headAnim3"></div>
					<div class="lottery-headAnim4"></div>
				</div>
			</div>
			<div class="lottery-container">
				<div class="lottery-info">
					<div class="lottery-infoText"><span>歡迎各位探員蒞臨抽獎整備室，</span></div>
					<div class="lottery-infoText"><span>這裡陳列了各項限量獎品，</span><span>委託任務攸關您的拿獎機會，</span></div>
					<div class="lottery-infoText"><span>您準備好成為一名優秀探員了嗎?</span></div>
					<div class="lottery-infoText"><span>接受委託任務抱走大獎吧!</span></div>
				</div>
				<a href="javascript:;" class="lottery-loginBtn">立即報到</a>
				<div class="lottery-content">
					<div class="lottery-contentBox" style="--w:1067;--mw:625;">
						<div class="lottery-contentBox-title">剩餘抽獎券{{lottery}}張_</div>
						<a href="javascript:;" class="lottery-btnLottery" @click="lotteryPlay">前往抽獎</a>
						<div class="lottery-btnGroup">
							<a href="javascript:;" class="lottery-btnTask" @click="taskPop">委託任務</a>
							<a href="javascript:;" class="lottery-btnHistory" @click="historyPop">賞金紀錄</a>
						</div>
					</div>
					<div class="lottery-contentBox" style="--w:1067;--mw:625;">
						<div class="lottery-contentBox-title">獎品陳列表_</div>
						<div class="lottery-rewardBox lottery-rewardBox-sp">
							<div class="lottery-rewardBox-label">{{rewardList[0].label}}</div>
							<div class="lottery-rewardBox-itemSP">
								<div class="lottery-rewardBox-imgBox"><img :src="rewardList[0].img" alt="" /></div>
							</div>
							<div class="lottery-rewardBox-bottom">
								<div class="lottery-rewardBox-name">{{rewardList[0].name}}</div>
								<div class="lottery-rewardBox-total">共{{rewardList[0].num}}名</div>
							</div>
						</div>
						<div class="lottery-rewardBoxGroup">
							<div class="lottery-rewardBox" v-for="reward in rewardList.slice(1)">
								<div class="lottery-rewardBox-label">{{reward.label}}</div>
								<div class="lottery-rewardBox-item">
									<div class="lottery-rewardBox-imgBox"><img :src="reward.img" alt="" /></div>
								</div>
								<div class="lottery-rewardBox-bottom">
									<div class="lottery-rewardBox-name">{{reward.name}}</div>
									<div class="lottery-rewardBox-total">共{{reward.num}}名</div>
								</div>
							</div>
						</div>
					</div>
					<div class="lottery-contentBoxBn">
						<div class="lottery-contentBox" style="--w:495;--mw:625;"><img src="./assets/css/img/front/item1.jpg" alt="" /></div>
						<div class="lottery-contentBox" style="--w:495;--mw:625;"><img src="./assets/css/img/front/item1.jpg" alt="" /></div>
					</div>
				</div>
				<a href="javascript:;" class="lottery-ruleBtn">規則說明</a>
			</div>
		</div>
	`
};

export default lottery;
