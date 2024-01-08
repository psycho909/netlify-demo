import topbar from "./components/topbar.js";
import leftbar from "./components/leftbar.js";
import anim from "./components/anim.js";
import imgLoading from "./components/imgLoading.js";
let app = Vue.createApp({
	setup() {
		let imgloading = Vue.ref(false);
		Vue.nextTick(() => {});
		Vue.onMounted(() => {
			$("#loadingProgress").show();
			const myComponent = imgLoading();
			myComponent
				.checkAllBackgroundImagesLoaded()
				.then(async (isLoaded) => {
					imgloading.value = true;
					$("#loadingProgress").hide();
					calendarInit();
				})
				.catch((error) => {
					console.error("Error loading media:", error);
					$("#loadingProgress").hide();
					imgloading.value = true;
					calendarInit();
				});
		});
		return {
			imgloading
		};
	},
	components: {
		topbar,
		leftbar,
		anim
	}
});
app.mount("#app");
