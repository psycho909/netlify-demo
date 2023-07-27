//default導頁
var defaultBox = function (data) {
	$.gbox.open(
		`
        ${data.Message}
        `,
		{
			addClass: "gbox-default",
			titleBar: ` `,
			hasCloseBtn: false,
			closeBtn: " ",
			hasActionBtn: true,
			clickBgClose: false,
			actionBtns: [
				{
					text: "確定",
					class: "confirm",
					target: false,
					click: data.Url + "?ET=" + ET
				}
			]
		}
	);
};

//default不導頁
var defaultBox2 = function (data) {
	$.gbox.open(
		`
        ${data.Message}
        `,
		{
			addClass: "gbox-default",
			hasCloseBtn: true,
			closeBtn: " ",
			hasActionBtn: false,
			clickBgClose: false
		}
	);
};

//開獎
var rewardBox = function (data) {
	loadingHide();
	$.gbox.open(``, {
		addClass: "gbox-reward",
		hasCloseBtn: true,
		closeBtn: " ",
		hasActionBtn: false,
		clickBgClose: false,
		afterOpen: function () {
			for (let i = 0; i < data.length; i++) {
				let item = `        
                <div class="gboxReward orange" data-type="${data[i].ItemLevel}">
                    <span>${data[i].ItemName}</span>
                    <div>
                        <img src="https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230727_Mabinogi_LiveEvent/assets/css/img/icon/${data[i].ItemId}.png"  />
                    </div>
                </div>
                `;

				$(".gbox-content").append(item);
			}
		},
		afterClose: function () {
			// setTimeout(function () {
			//     window.open("./Index.aspx?ET=" + ET, "_self");
			// }, 301);
		}
	});
};
