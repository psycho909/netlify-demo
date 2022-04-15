var config = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "為繁星注入祈願之力",
			id: "shot",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
		{
			text: "為繁星注入祈願之力",
			id: "shot",
			class: "btn",
			click: function () {
				$.gbox.close();
			},
		},
	],
};
var part1HTML = '<div class="part1__head">事前登錄獎勵–死亡騎士碑石</div>\
    <div class="part1__body">\
        <div class="part1__list-box">\
            <div class="part1__list-title">Remastered全新Buff效果說明</div>\
            <div class="part1__list-text">近距離命中+5</div>\
            <div class="part1__list-text">遠距離命中+5</div>\
            <div class="part1__list-text">魔法命中+5</div>\
            <div class="part1__list-text">體力恢復量+5</div>\
            <div class="part1__list-text">魔力恢復量+5</div>\
            <div class="part1__list-text">HP藥水恢復量增加+8%+10</div>\
            <div class="part1__list-text">體力上限+120</div>\
            <div class="part1__list-text">魔力上限+100</div>\
        </div>\
    </div>\
';

$.gbox.open(part1HTML, config);

function DefaultText() {}
