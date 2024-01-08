import { MessageLB, PhoneErrorLB, OTPErrorLB, InviteErrorLB, RewardLB } from "../lightbox.js";
function calculatePercentage(targetNumber) {
	if (targetNumber < 10) {
		return `--progress:0`;
	}
	// 定義給定的數字和對應的百分比
	const data = [
		{ number: 10, percentage: 0 },
		{ number: 20, percentage: 0.25 },
		{ number: 30, percentage: 0.5 },
		{ number: 40, percentage: 0.75 },
		{ number: 50, percentage: 1 }
	];

	// 找到最接近目標數字的兩個數字組合
	let smallerNumber = data[0];
	let largerNumber = data[data.length - 1];

	for (let i = 0; i < data.length; i++) {
		if (data[i].number === targetNumber) {
			return `--progress:${data[i].percentage}`;
		} else if (data[i].number < targetNumber) {
			smallerNumber = data[i];
		} else {
			largerNumber = data[i];
			break;
		}
	}

	// 進行線性插值計算
	const percentageDifference = largerNumber.percentage - smallerNumber.percentage;
	const numberDifference = largerNumber.number - smallerNumber.number;

	const percentage = ((targetNumber - smallerNumber.number) / numberDifference) * percentageDifference + smallerNumber.percentage;

	return `--progress:${percentage}`;
}

const reserve = {
	props: {
		login: {
			type: Boolean,
			default: false
		},
		mobile: {
			type: Boolean,
			default: false
		},
		cnt: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		let progress = Vue.computed(() => {
			let p = props.cnt / 10000;
			if (p >= 10 && p < 20) {
				return 10;
			}
			if (p >= 20 && p < 30) {
				return 20;
			}
			if (p >= 30 && p < 40) {
				return 30;
			}
			if (p >= 40 && p < 50) {
				return 40;
			}
			if (p >= 50) {
				return 50;
			}
		});
		let progressLine = Vue.computed(() => {
			let p = props.cnt / 10000;
			if (p >= 50) {
				p = 50;
			}
			return calculatePercentage(p);
		});
		Vue.nextTick(() => {});
		return {
			progress,
			progressLine
		};
	},
	template: `<div class="section reserve" id="reserve">
	<div class="section-title reserve-title">預約活動</div>
	<div class="reserve-date">
		<span>2023/12/6 12:00 -2024/1/9 23:59</span>
		<span>《新楓之谷》六轉即將開始，立即使用手機門號預約抽百萬好禮！</span>
	</div>
	<div class="reserve-progress">
		<div class="reserve-progress__line" :data-progress="progress">
			<div class="reserve-progress__line-num" data-num="1">10w</div>
			<div class="reserve-progress__line-num" data-num="2">20w</div>
			<div class="reserve-progress__line-num" data-num="3">30w</div>
			<div class="reserve-progress__line-num" data-num="4">40w</div>
			<div class="reserve-progress__line-num" data-num="5">50w</div>
			<div class="reserve-progress__line-progress" :style="progressLine"></div>
			<div class="reserve-progress__line-point" data-rate="1"></div>
			<div class="reserve-progress__line-point" data-rate="2"></div>
			<div class="reserve-progress__line-point" data-rate="3"></div>
			<div class="reserve-progress__line-point" data-rate="4"></div>
			<div class="reserve-progress__line-point" data-rate="5"></div>
		</div>
		<div class="reserve-progress__prize-list" :data-progress="progress">
			<div class="reserve-progress__prize-item" data-item="1">
				<div class="reserve-progress__prize-image"></div>
				<div class="reserve-progress__prize-name">陽光硬幣<br/>x100</div>
			</div>
			<div class="reserve-progress__prize-item" data-item="2">
				<div class="reserve-progress__prize-image"></div>
				<div class="reserve-progress__prize-name">菇菇寶貝寵物組合包x1</div>
			</div>
			<div class="reserve-progress__prize-item" data-item="3">
				<div class="reserve-progress__prize-image"></div>
				<div class="reserve-progress__prize-name">準備好的精靈墜飾x1</div>
			</div>
			<div class="reserve-progress__prize-item" data-item="4">
				<div class="reserve-progress__prize-image"></div>
				<div class="reserve-progress__prize-name">神秘冥界幽靈武器箱x1</div>
			</div>
			<div class="reserve-progress__prize-item" data-item="5">
				<div class="reserve-progress__prize-image"></div>
				<div class="reserve-progress__prize-name">棉花糖啾騎寵交換券x1</div>
			</div>
		</div>
	</div>
	<div class="reserve-info">
		<ol class="reserve-content__ol">
			<li class="reserve-content__li">輸入手機門號即可參加活動，每支手機門號限參加活動一次，並獲得一次抽獎機會。</li>
			<li class="reserve-content__li">本活動將依最終預約人數，配發相對應虛寶獎勵及抽出對應實體贈品(獎勵可累贈)。</li>
			<li class="reserve-content__li">完成手機門號預約所產生之邀請碼，將可使用於【邀請碼任務】，請妥善保管。</li>
			<li class="reserve-content__li">虛寶獎勵統一於2024/01/10派發，實體獎勵中獎名單將於2024/01/17於本活動網頁公告並以手機簡訊通知中獎者。</li>
			<li class="reserve-content__li">欲領取虛寶獎勵需於2024/01/09前完成預約活動，且個人遊戲帳號已存在角色，否則將無法成功領取。</li>
		</ol>
	</div>
	<div class="reserve-prize__list">
		<div class="reserve-prize__item" data-item="1" data-tip="需有橘子支付帳號方可領取">
			<div class="reserve-prize__item-image"><span></span></div>
			<div class="reserve-prize__item-name">橘子支付零用金66元<br/>x1000位</div>
		</div>
		<div class="reserve-prize__item" data-item="2">
			<div class="reserve-prize__item-image"><span></span></div>
			<div class="reserve-prize__item-name">ROG 機械電競鍵盤<br/>(價值$3,490)x66位</div>
		</div>
		<div class="reserve-prize__item" data-item="3">
			<div class="reserve-prize__item-image"><span></span></div>
			<div class="reserve-prize__item-name">iPhone 15 Pro 256G<br/>(價值$40,400)x6位</div>
		</div>
		<div class="reserve-prize__item" data-item="4">
			<div class="reserve-prize__item-image"><span></span></div>
			<div class="reserve-prize__item-name">ROG G16 電競筆電<br/>(價值$55,999)x6位</div>
		</div>
		<div class="reserve-prize__item" data-item="5">
			<div class="reserve-prize__item-image"><span></span></div>
			<div class="reserve-prize__item-name">6錢純金造型輪迴碑石<br/>(價值$75,000)x6位</div>
		</div>
	</div>
</div>`
};

export default reserve;
