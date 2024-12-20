function gboxPlus() {
	let html = `
    <div class="title">超越極限的泰里專屬豪禮</div>
    <div class="text">豪華大禮輸入序號 立即領取!!</div>
    <div class="content">
        <div class="content-row">
            <div class="content-number">CHASERTERRY</div>
            <div class="btn btn-copy" data-copy-text="CHASERTERRY"></div>
        </div>
        <div class="content-item" data-num="plus"></div>
    </div>
`;
	$.gbox.open(html, {
		addClass: "gbox-cards gbox-items gbox-items-plus",
		titleBar: "",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".gbox-content .content").addClass("scrollbar2");
			document.querySelector(".btn-copy").addEventListener("click", function () {
				const copyText = this.getAttribute("data-copy-text");
				navigator.clipboard.writeText(copyText).then(
					function () {
						alert("複製成功");
					},
					function () {
						alert("複製失敗");
					}
				);
			});
		}
	});
}

const btnPlus = {
	setup() {
		return { gboxPlus };
	},
	template: `
     <div class="btn btn-plus" @click="gboxPlus"></div>
    `
};

export default btnPlus;
