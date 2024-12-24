import sec9 from "./components/sec9.js";
// MessageLB();
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

// Vue3
const app = Vue.createApp({
	components: {
		sec9: sec9
	},
	setup() {
		Vue.onMounted(() => {});
	}
});

app.mount("#app");
