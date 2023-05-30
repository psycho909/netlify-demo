var config = {
	addClass: "default",
	hasCloseBtn: true,
	hasActionBtn: true,
	afterClose: function () {
		$.gbox.close();
	},
	actionBtns: [
		{
			text: "text1",
			class: "btn",
			click: function () {
				$.gbox.close();
			}
		},
		{
			text: "text2",
			class: "btn",
			click: function () {
				$.gbox.close();
			}
		}
	]
};

export const MessageLB = (msg, url, callback) => {
	$.gbox.open(msg, {
		addClass: "default lb-style2",
		hasCloseBtn: true,
		hasActionBtn: true,
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				target: false,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				}
			}
		]
	});
};
export const MessageLB2 = (msg, url, callback) => {
	$.gbox.open(msg, {
		addClass: "default lb-style2",
		hasCloseBtn: true,
		hasActionBtn: true,
		actionBtns: [
			{
				text: "抽限定紀念徽章",
				class: "btn-confirm",
				target: true,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				}
			}
		]
	});
};
export const SkillVideo = (msg, url, callback) => {
	let HTML = `
		<div class="lb-style1__source"><iframe  width="640" height="360" src="https://www.youtube.com/embed/CyffwxSpxq8?autoplay=1&mute=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
	`;
	$.gbox.open(HTML, {
		addClass: "default lb-style1",
		hasCloseBtn: true,
		hasActionBtn: false
	});
};

export const EventInfo = (data, mobileType) => {
	console.log(data);
	let mobileHTML = ``;
	let HTML = "";
	if (mobileType == "google") {
		mobileHTML = `<a class="g-calendar-google gbox-btn btn-calender2" href="javascript:;">Google 活動行事曆提醒</a>`;
	}
	if (mobileType == "apple") {
		mobileHTML = `<a class="g-calendar-ios gbox-btn btn-calender2" href="javascript:;">IOS 活動行事曆提醒</a>`;
	}
	let calenderHTML = `
	<div class="g-calendar" begin="${data.calender.begin}" end="${data.calender.end}" title="《新楓之谷maplestory》全新職業-卡莉，席捲登場！" description="${data.calender.text}" autoDetectDevice="true">\
		<a class="g-calendar-google gbox-btn btn-calender2" href="javascript:;">Google 活動行事曆提醒</a>
		<a class="g-calendar-ios gbox-btn btn-calender2" href="javascript:;">IOS 活動行事曆提醒</a>
	</div>
	`;
	HTML = `
	<div class="lb-style2__source ${data.show ? "" : "comming"}">
			<img src="${data.img}" alt="" />
		</div>
		<div class="lb-style2__text">${data.info}</div>
		${calenderHTML}
		<a class="gbox-btn btn-more" target="_blank" href="${data.link}">瞭解更多</a>
	`;

	$.gbox.open(HTML, {
		addClass: "default lb-style2",
		titleBar: "<div class='lb-style2-title'>" + data.title + "</div>",
		hasCloseBtn: true,
		hasActionBtn: false,
		actionBtns: [
			{
				text: "行事曆",
				class: "btn-calender2",
				target: false,
				click: function () {
					// data.calender.text
					// data.calender.date
				}
			},
			{
				text: "瞭解更多",
				class: "btn-more",
				target: true,
				click: data.link
			}
		]
	});
};

function LB(msg, url, callback) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "text1",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			},
			{
				text: "text2",
				class: "btn",
				click: function () {
					$.gbox.close();
				}
			}
		]
	};

	var HTML = "";
	$.gbox.open(HTML, config);
}
