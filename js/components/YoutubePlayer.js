const YoutubePlayer = {
	props: {
		videoId: String,
		showControls: {
			type: Boolean,
			default: true
		},
		playerId: {
			type: String,
			default: "player-container"
		}
	},
	mounted() {
		this.loadYoutubeApi();
	},
	methods: {
		loadYoutubeApi() {
			if (window.YT && window.YT.Player) {
				this.initializePlayer();
			} else {
				window.onYouTubeIframeAPIReady = () => this.initializePlayer();
			}
		},
		initializePlayer() {
			this.player = new YT.Player(this.playerId, {
				height: "360",
				width: "640",
				videoId: this.videoId,
				playerVars: {
					autoplay: 1,
					mute: 1,
					controls: this.showControls ? 1 : 0
				},
				events: {
					onReady: this.onPlayerReady
				}
			});
		},
		onPlayerReady(event) {
			event.target.mute();
		},
		playVideo() {
			if (this.player) {
				this.player.playVideo();
			}
		},
		pauseVideo() {
			if (this.player) {
				this.player.pauseVideo();
			}
		},
		pauseVideo() {
			if (this.player) {
				this.player.pauseVideo();
			}
		},
		mute() {
			if (this.player) {
				this.player.mute();
			}
		},
		unMute() {
			if (this.player) {
				this.player.unMute();
			}
		}
	},
	template: `
      <div :id="playerId"></div>
      `
};

export default YoutubePlayer;
