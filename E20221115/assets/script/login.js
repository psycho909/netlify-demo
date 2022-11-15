const login = {
	props: [],
	mounted() {
		var _this = this;
		Vue.nextTick(() => {
			$(".login-selectGameControl").niceSelect();
			$("body").on("click", ".nice-select .list li", function () {
				_this.selectGame = $(this).attr("data-value");
			});
		});
	},
	watch: {
		step(newVal, oldVal) {
			if (newVal == 3) {
				Vue.nextTick(() => {
					$(".login-selectServerControl").niceSelect();
				});
			}
		}
	},
	data() {
		return {
			gameOption: [
				{ value: "LM", text: "天堂M" },
				{ value: "Maple", text: "新楓之谷" }
			],
			serverOption: [
				{ value: 1, text: "天堂M" },
				{ value: 2, text: "新楓之谷" }
			],
			step: 1,
			selectGame: -1,
			selectServer: -1,
			loginType: "",
			username: "",
			gold: "",
			gamaAccount: "",
			gameId: "",
			player: ""
		};
	},
	methods: {
		stepNext(step, type) {
			if (step == 1) {
				this.selectGame = $(".login-selectGameControl").next().find("li.selected").attr("data-value");
			}
			if (step == 2) {
				this.loginType = type;
			}
			if (step == 3) {
				this.selectGame = $(".login-selectServerControl").next().find("li.selected").attr("data-value");
			}
			this.step = step;
		},
		stepBack(step) {
			if (step == 1) {
				this.selectGame = -1;
				this.loginType = "";
			}
			if (step == 2) {
				this.selectServer = -1;
				this.username = "";
				this.gold = "";
				this.gamaAccount = "";
				this.gameId = "";
				this.player = "";
			}
			this.step = step;
		},
		confirm() {
			this.selectGame;
			this.loginType;
			this.selectServer;
			this.username;
			this.gold;
			this.gamaAccount;
			this.gameId;
			this.player;
		}
	},
	template: `
        <div class="login">
			<div class="login-contentBox" data-step="1" style="--w:847;--mw:645" v-show="step == 1">
				<div class="login-contentTitle">請選擇欲參加活動的遊戲_</div>
				<div class="login-selectGameGroup">
					<div class="login-selectGame" :data-game="selectGame"></div>
					<select class="login-selectGameControl">
						<option value="-1">請選擇</option>
						<option v-for="game in gameOption" :value="game.value">{{game.text}}</option>
					</select>
				</div>
				<div class="login-btnGroup">
					<a href="javascript:;" class="login-btnNext" @click="stepNext(2)">下一步</a>
				</div>
			</div>
			<div class="login-contentBox" data-step="2" style="--w:847;--mw:645" v-show="step == 2">
				<div class="login-contentTitle">請選擇你登入的方式_</div>
				<div class="login-notice">
					<span>*登入帳號需與遊戲帳號對應</span>
					<span>*訪客帳號請先進行帳號綁定</span>
				</div>
				<div class="login-btnLoginGroup">
					<div class="login-btnLoginBox">
						<a href="javascript:;" class="login-btnLogin login-btnLogin-G" @click="stepNext(3,'Google')"></a>
						<a href="javascript:;" class="login-btnLogin login-btnLogin-A" @click="stepNext(3,'Apple')"></a>
						<a href="javascript:;" class="login-btnLogin login-btnLogin-F" @click="stepNext(3,'Facebook')"></a>
					</div>
					<div class="login-btnLoginBox">
						<a href="javascript:;" class="login-btnLogin login-btnLogin-Bf" @click="stepNext(3,'bf')"></a>
						<a href="javascript:;" class="login-btnLogin login-btnLogin-Id" @click="stepNext(3,'ID')"></a>
					</div>
				</div>
				<div class="login-btnGroup">
					<a href="javascript:;" class="login-btnBack" @click="stepBack(1)">上一步</a>
					<a href="javascript:;" class="login-btnGuide">綁定教學</a>
				</div>
			</div>
			<div class="login-contentBox" data-step="3" style="--w:847;--mw:645" v-show="step == 3">
				<div class="login-contentTitle">請選擇欲參加活動的角色_</div>
				<div class="login-userInfo">
					<div class="login-selectServerGroup">
						<select class="login-selectServerControl">
							<option value="-1">請選擇伺服器</option>
							<option v-for="server in serverOption" :value="server.value">{{server.text}}</option>
						</select>
					</div>
					<input type="text" class="login-inputControl" v-model="username" />
					<input type="text" class="login-inputControl" v-model="gold" placeholder="請輸入持有金幣數量後五碼" />
					<input type="text" class="login-inputControl" v-model="gamaAccount" placeholder="請輸入遊戲橘子帳號" />
					<input type="text" class="login-inputControl" v-model="gameId" placeholder="請輸入遊戲ID" />
					<input type="text" class="login-inputControl" v-model="player" placeholder="請輸入遊戲玩家  " />
				</div>
				<div class="login-btnGroup">
					<a href="javascript:;" class="login-btnBack" @click="stepBack(2)">上一步</a>
					<a href="javascript:;" class="login-btnConfirm" @click="confirm">確認</a>
				</div>
			</div>
		</div>
    `
};

export default login;
