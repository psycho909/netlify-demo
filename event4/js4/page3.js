const page3 = {
	setup() {
		const store = Vuex.useStore();
		const activeCharacter = Vue.ref(0);
		const isMB = Vue.ref(isMobile.any);
		const openLightboxCharacter = (num) => {
			console.log(num);
			store.commit("openLightbox", {
				isOpen: true,
				char: num
			});
		};
		return {
			activeCharacter,
			isMB,
			openLightboxCharacter
		};
	},
	template: `
	<div class="page page-3" id="page-3">
		<div class="bg">
			<div class="bg-content"></div>
		</div>
		<div class="title fz0">職業Remaster</div>
		<div class="content">
			<template v-for="n in 2" :key="n">
				<div 
				:class="[
					'content-character',
					'content-character-' + n,
					{ active: activeCharacter === n }
				]"
				v-on="!isMB ? {
					mouseover: () => activeCharacter = n,
					mouseout: () => activeCharacter = 0
				} : {}"
				@click="openLightboxCharacter(n)"
				>
				<div class="image"></div>
				<div class="text fz0">了解更多</div>
				</div>
			</template>
		</div>
	</div>
	`
};

export default page3;
