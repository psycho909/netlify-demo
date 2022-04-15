import lightbox from "../js/lightbox.js";
import until from "../js/utils.js";
let fight = {
	template: `
    <!-- fight -->
    <div class="fight">
        <a href="javascript:;" class="fight__btn-back" @click="backMap">返回地圖</a>

        <!-- BOSS -->
        <div class="fight__boss-box">
            <div class="fight__boss-fire"></div>
            <!-- 攻擊效果 -->
            <div class="fight__boss-hit"><span></span></div>
            <!-- 爆擊效果 -->
            <div class="fight__boss-crit">爆擊效果</div>
            <!-- 討乏成功 -->
            <div class="fight__boss-complete">討乏成功</div>
            <!-- BOSS -->
            <div class="fight__boss" :data-boss="$store.state.Boss.BossLevel"></div>
            <div class="fight__boss-hp">
                <div class="fight__boss-hp__text">HP</div>
                <div class="fight__boss-hp__num">
                    <span class="fight__boss-hp__num-c">{{$store.state.Boss.BossHealth}}</span>
                    <span class="fight__boss-hp__num-symbol">/</span>
                    <span class="fight__boss-hp__num-m">{{$store.state.Boss.BossTotalHealth}}</span>
                </div>
            </div>
        </div>
        <a href="javascript:;" class="fight__btn-hit" @click="hit">攻擊</a>

        <!-- 骰子 -->
        <div class="fight__dice-group">
            <div class="fight__dice-anime"></div>
            <div class="fight__dice-title">骰子數</div>
            <div class="fight__dice-count">{{$store.state.TotalDice}}</div>
        </div>
    </div>
    `,
	setup() {
		const { DiceZero, Kudos, MessageLB } = lightbox();
		const { MapShow, MapHide } = until();
		const store = Vuex.useStore();
		const HitText = (text = "") => {
			$(".fight__boss-hit span").text(text);
		};
		const HitTextAnim = (text) => {
			HitText(text);
			gsap.to(".fight__boss-hit", 0.55, {
				opacity: 1,
				onComplete: function () {
					gsap.to(".fight__boss-hit", 0.45, {
						opacity: 0,
						delay: 0.4,
						onComplete: function () {
							HitText();
							if (store.state.Boss.BossHealth > 0) {
								store.dispatch("ajaxToggle");
							}
						}
					});
				}
			});
		};
		const Crit = () => {
			gsap.set(".fight__boss-crit", {
				scale: 0.1
			});
			gsap.to(".fight__boss-crit", 0.45, {
				opacity: 1,
				scale: 1.1,
				ease: "elastic.out(1, 0.3)",
				onComplete: function () {
					gsap.to(".fight__boss-crit", 0.35, {
						opacity: 0,
						delay: 0.35
					});
				}
			});
		};
		const Dice = (dice, hit, hp, crit = false) => {
			let tl = gsap.timeline();
			let bgX = (dice - 1) * -100 + "%";
			tl.to(".fight__dice-anime", 0.5, {
				repeat: 1,
				backgroundPosition: "-500%",
				ease: SteppedEase.config(5),
				onComplete: function () {
					tl.to(".fight__dice-anime", 0.01, {
						backgroundPosition: bgX
					});

					HitTextAnim(hit);
					store.dispatch("bossUpdateHeath", 1);
					// HitBoss(store.state.Boss.BossHealth, crit);
					HitBoss(0, crit);
					if (crit) {
						Crit();
					}
				}
			});
		};
		const Cleared = (item) => {
			gsap.to(".fight__boss-complete", 0.35, {
				opacity: 1,
				onComplete: function () {
					setTimeout(() => {
						Kudos(item);
					}, 400);
				}
			});
		};
		const HitBoss = (status, item = "", crit = false) => {
			let onComplete = (status, item) => {
				if (status <= 0) {
					Cleared(item);
				}
			};
			if (!crit) {
				gsap.to(".fight__boss", {
					keyframes: [{ duration: 0.12, autoAlpha: 0 }, { duration: 0.12, autoAlpha: 1 }, { duration: 0.12, autoAlpha: 0 }, { duration: 0.12, autoAlpha: 1 }, , { duration: 0.12, autoAlpha: 0 }, { duration: 0.12, autoAlpha: 1 }],
					ease: "circ.out",
					onComplete: onComplete(status, item)
				});
			} else {
				gsap.to(".fight__boss", {
					keyframes: [
						{ duration: 0.2, autoAlpha: 0, x: 8 },
						{ duration: 0.2, autoAlpha: 1, x: -8 },
						{ duration: 0.2, autoAlpha: 0, x: 8 },
						{ duration: 0.2, autoAlpha: 1, x: -8 },
						{ duration: 0.2, autoAlpha: 0, x: 8 },
						{ duration: 0.2, autoAlpha: 1, x: 0 }
					],
					ease: "power4.out",
					onComplete: onComplete(status, item)
				});
			}
		};
		const HitBtn = () => {
			gsap.set(".fight__btn-hit", {
				scale: 1
			});
			gsap.to(".fight__btn-hit", 0.02, {
				scale: 1.15,
				ease: "elastic.out(1, 0.3)",
				onComplete: function () {
					gsap.to(".fight__btn-hit", 0.02, {
						scale: 1
					});
				}
			});
		};
		const hit = () => {
			if (!store.state.ajax) {
				if (store.state.TotalDice == 0) {
					DiceZero();
					return;
				}
				let output = {
					r: 10,
					hp: 10,
					hp: 10,
					crit: true
				};
				store.dispatch("ajaxToggle");
				HitBtn();
				Dice(output.r, output.hp, output.hp, output.crit);
				store.dispatch("diceUpdate", { dice: 9 });
			}
		};
		const backMap = () => {
			if (!store.state.ajax) {
				MapHide(".fight");
			}
		};
		return {
			backMap,
			hit
		};
	}
};

export default fight;
