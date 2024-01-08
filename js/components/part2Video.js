const part2Video = {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		let players = Vue.ref([]);
		var playerInfoList = [
			{
				id: "player1",
				videoId: "T6-Yt0L4skQ"
			},
			{
				id: "player2",
				videoId: "T6-Yt0L4skQ"
			},
			{
				id: "player3",
				videoId: "T6-Yt0L4skQ"
			}
		];
		let initializePlayer = () => {
			function createPlayer(playerInfo) {
				return new YT.Player(playerInfo.id, {
					videoId: playerInfo.videoId,
					playerVars: {
						showinfo: 0,
						mute: 1
					}
				});
			}
			if (typeof playerInfoList === "undefined") return;

			for (var i = 0; i < playerInfoList.length; i++) {
				var curplayer = createPlayer(playerInfoList[i]);
				players.value[i] = curplayer;
			}
		};
		let play = (i) => {
			players.value[i].playVideo();
		};
		Vue.onMounted(() => {
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = initializePlayer;
		});
		return { play };
	},
	template: `<div id="part2" class="section part2-video">
	<div>
		<a href="javascript:;" @click="play(0)">按鈕1 play</a>
		<a href="javascript:;" @click="play(1)">按鈕2 play</a>
		<a href="javascript:;" @click="play(2)">按鈕3 play</a>
		<div id="player1"></div>
		<div id="player2"></div>
		<div id="player3"></div>
  </div>
</div>`
};

export default part2Video;
