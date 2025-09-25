var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        $.gbox.close();
    },
    actionBtns: [{
        text: '關閉',
        click:function(){
			$.gbox.close();
        }
    }]
}

var test_data=[
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十十一"},
	{"account":"一二三四五六七八九十十一十二"},
	{"account":"一二三四五六七八九十十一十二十三"},
	{"account":"一二三四五六七八九十十一十二十三十四"},
	{"account":"一二三四五六七八九十十一十二十三十四一二"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"},
	{"account":"一二三四五六七八九十"}
]

// 參加帳號
var accountObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        $.gbox.close();
	},
	actionBtns: [{
        text: '確定',
        class:"gbox-success",
        click:function(){
			$.gbox.close();
        }
    }]
}

function accountHTMLRender(data){
	var liHTML='';
	for(var i=0;i<data.length;i++){
		liHTML+='<li class="account-list__li">\
			<label class="account-list__label">\
				<input class="account-list__radio" type="radio" name="account" value="'+data[i].account+'" />\
				<span class="account-list__style"></span>\
				<span class="account-list__text">'+data[i].account+'</span>\
			</label>\
		</li>';
	}

	var accountHTML=
    '<div class="account-title">請選擇要參加跑跑金手指的遊戲帳號</div>\
	<ul class="account-list">'+liHTML+'</ul>\
	<div class="account-notice-box">\
		<p class="account-notice__title">※注意事項：</p>\
		<p>虛寶將會發送至選定的遊戲帳號內，</p>\
		<p>選擇後將不可再修改。</p>\
	</div>\
	';
	return accountHTML;
}

// $.gbox.open(accountHTMLRender(test_data),accountObj);

// 確認參加帳號
var checkAccountObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        $.gbox.close();
	},
	actionBtns: [{
        text: '我在想想',
        class:"gbox-thinkabout",
        click:function(){
			$.gbox.close();
        }
    },{
        text: '確定',
        class:"gbox-success",
        click:function(){
			$.gbox.close();
        }
    }]
}

function checkAccountHTMLRender(data){
	var checkAccountHTML=
    '<div class="account-text">確定要使用</div>\
	<div class="account-account">'+data+'</div>\
	<div class="account-text account-pb">參加嗎?</div>\
	<div class="account-notice-box">\
		<p class="account-notice__title">※注意事項：</p>\
		<p>虛寶將會發送至選定的遊戲帳號內，</p>\
		<p>選擇後將不可再修改。</p>\
	</div>\
	';
	return checkAccountHTML;
}

// $.gbox.open(checkAccountHTMLRender("一二三四五六七八九十十一十二十三十四一二"),checkAccountObj);

// 確認參加帳號
var dontAccountObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        $.gbox.close();
	},
	actionBtns: [{
        text: '確定',
        class:"gbox-success",
        click:function(){
			$.gbox.close();
        }
    }]
}

function doneAccountHTMLRender(data){
	var doneAccountHTML=
    '<div class="account-text">已完成參加!</div>\
	';
	return doneAccountHTML;
}

// $.gbox.open(doneAccountHTMLRender("一二三四五六七八九十十一十二十三十四一二"),dontAccountObj);


var indexObj={
    addClass:"gbox-index",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        $.gbox.close();
    },
    actionBtns: [{
        text: '關閉',
        click:function(){
			$.gbox.close();
        }
    }]
}

// 遊戲說明
var gameInfo_data=[
	"玩法：點擊N20消滅角色並累積分數。",
	"每日參與次數不限。",
	"每週五00:00前100名排行重置。",
	"虛寶獎勵將於2小時內發放至遊戲內禮物盒。",
	"每個級距的獎勵每週僅能領取一次。",
	"徽章一個遊戲帳號僅能領取一次。",
	"徽章獎勵將於每週五結算後發放"
];

function gameInfoHTMLRender(data){
	var liHTML="";
	for(var i=0;i<data.length;i++){
		liHTML+='<li class="gameinfo-list__li">'+data[i]+'</li>';
	}

	var gameInfoHTML=
	'<div class="gameinfo-title">遊戲說明</div>\
	<ol class="gameinfo-list">'+liHTML+'</ol>\
	';
	return gameInfoHTML;
}

// $.gbox.open(gameInfoHTMLRender(gameInfo_data),indexObj);

// 獎勵清單
var rewardList_data=[
	{"lv":"一","point":"25,000","img":"images/reward-1.png","reward":"<span>尼歐的新品車款</span><span>齒輪7代2個</span>"},
	{"lv":"二","point":"100,000","img":"images/reward-2.png","reward":"<span>黃金齒輪2個</span>"},
	{"lv":"三","point":"200,000","img":"images/reward-3.png","reward":"<span>鈦金齒輪3個</span>"},
	{"lv":"四","point":"455,000","img":"images/reward-4.png","reward":"<span>跑跑金手指</span><span>專屬徽章</span>"},
];

function rewardListHTMLRender(data){
	var trHTML="";
	for(var i=0;i<data.length;i++){
		trHTML+='<tr><td>'+data[i].lv+'</td><td>'+data[i].point+'</td><td><div class="rewardlist-table__reward rewardlist-table__reward-'+(i+1)+'"><img src="'+data[i].img+'" alt=""/><div class="rewardlist-table__reward-item">'+data[i].reward+'</div></div></td></tr>';
	}

	var rewardListHTML=
	'<div class="rewardlist-title">獎勵清單</div>\
	<table class="rewardlist-table">\
		<thead class="rewardlist-table__thead">\
			<tr><th>獎勵級距</th><th>分數</th><th>獎勵</th></tr>\
		</thead>\
		<tbody class="rewardlist-table__tbody">'+trHTML+'</tbody>\
	</table>\
	<div class="rewardlist-notice-box">\
		<p>＊虛寶獎勵將於2小時後發放至遊戲內禮物盒。</p>\
		<p>＊每個級距的獎勵每週僅能領取一次。</p>\
		<p>＊徽章一個遊戲帳號僅能領取一次。</p>\
		<p>*徽章獎勵將於每週五結算後發放</p>\
	</div>\
	';
	return rewardListHTML;
}

// $.gbox.open(rewardListHTMLRender(rewardList_data),indexObj);


var week100_data={
	"data":{
		"total":"12345",
		"account":"一二三四五六七八九十一二",
		"score":"1234567"
	},
	"listData":[
		{"rank":"1","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"2","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"3","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"4","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"5","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"6","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"7","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"8","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"9","account":"一二三四五六七八九十一二","score":"213213"},
		{"rank":"10","account":"一二三四五六七八九十一二","score":"213213"},
	]
};
// 活動主畫面_排行榜前100名
function week100HTMLRender(data){
	var week100=data.listData;
	var infoData=data.data;

	var week100li="";
	for(var i=0;i<week100.length;i++){
		week100li+=
		'<li class="week-100list__li">\
			<div class="week-100list__rank">\
				<span class="week-100list__rank-text">第'+week100[i].rank+'名</span>\
			</div>\
			<div class="week-100list__info">\
				<span class="week-100list__info-name">'+week100[i].account+'</span>\
				<span class="week-100list__info-score">'+week100[i].score+'</span>\
			</div>\
		</li>';
	}
	var weekHTML=
	'<div class="week-title">本週紀錄</div>\
	<div class="week-list-box">\
		<div class="week-list--style week-list__total">\
			<div class="week-list--style-title">總排名</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.total+'</span>\
			</div>\
		</div>\
		<div class="week-list--style week-list__player">\
			<div class="week-list--style-title">玩家名稱</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.account+'</span>\
			</div>\
		</div>\
		<div class="week-list--style week-list__top">\
			<div class="week-list--style-title">最高分數</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.score+'</span>\
			</div>\
		</div>\
	</div>\
	<div class="week-btn-box">\
		<a href="javascript:;" class="week-btn__100 btn--on">前100名</a>\
		<a href="javascript:;" class="week-btn__my btn--off">我的紀錄</a>\
	</div>\
	<ul class="week-100list">'+week100li+'</ul>\
	';
	return weekHTML;
}

// $.gbox.open(week100HTMLRender(week100_data),indexObj);

var weekMy_data={
	"data":{
		"total":"12345",
		"account":"一二三四五六七八九十一二",
		"score":"1234567"
	},
	"listData":[
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
		{"score":"213213"},
	]
};

// 活動主畫面_排行榜我的紀錄
function weekMyHTMLRender(data){
	var weekMy=data.listData;
	var infoData=data.data;

	var weekmyli="";
	for(var i=0;i<weekMy.length;i++){
		weekmyli+=
		'<li class="week-mylist__li"><div class="week-mylist__img"><span>'+(i+1)+'</div></span><span>'+weekMy[i].score+'</span></li>';
	}
	var weekHTML=
	'<div class="week-title">本週紀錄</div>\
	<div class="week-list-box">\
		<div class="week-list--style week-list__total">\
			<div class="week-list--style-title">總排名</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.total+'</span>\
			</div>\
		</div>\
		<div class="week-list--style week-list__player">\
			<div class="week-list--style-title">玩家名稱</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.account+'</span>\
			</div>\
		</div>\
		<div class="week-list--style week-list__top">\
			<div class="week-list--style-title">最高分數</div>\
			<div class="week-list--style-info">\
				<span>'+infoData.score+'</span>\
			</div>\
		</div>\
	</div>\
	<div class="week-btn-box">\
		<a href="javascript:;" class="week-btn__100 btn--off">前100名</a>\
		<a href="javascript:;" class="week-btn__my btn--on">我的紀錄</a>\
	</div>\
	<ul class="week-mylist">'+weekmyli+'</ul>\
	';
	return weekHTML;
}

// $.gbox.open(weekMyHTMLRender(weekMy_data),indexObj);

// 遊戲畫面_暫停
var ingameObj={
    addClass:"ingame",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterClose:function(){
		$.gbox.close();
		timeStart();
    }
}

function gamePauseHTMLRender(){
	var gamePauseHTML=
	`<div class="gamepause-title btn--yellow">Menu</div>
	<div class="gamepause-btn-box">
		<a class="gamepause-btn__holdgame btn--blue" href="javascript:;">繼續遊戲</a>
		<a class="gamepause-btn__restart btn--blue" href="javascript:;">重新開始</a>
		<a class="gamepause-btn__backhome btn--blue" href="index.html">回到首頁</a>
	</div>
	`;
	return gamePauseHTML;
}

// =========================================================
// 開啟 遊戲說明
$(".index-btn__gameinfo").on("click",function(){
	$.gbox.open(gameInfoHTMLRender(gameInfo_data),indexObj);
})

// 開啟 獎勵清單
$(".index-btn__rewardlist").on("click",function(){
	$.gbox.open(rewardListHTMLRender(rewardList_data),indexObj);
})

// ===========================================================

// 開啟 排行榜
$(".index-btn__leaderboard").on("click",function(){
	$.gbox.open(week100HTMLRender(week100_data),indexObj);
})

// 開啟 前100名
$("body").on("click",".week-btn__100",function(){
	$.gbox.open(week100HTMLRender(week100_data),indexObj);
})

// 開啟 我的紀錄
$("body").on("click",".week-btn__my",function(){
	$.gbox.open(weekMyHTMLRender(weekMy_data),indexObj);
})