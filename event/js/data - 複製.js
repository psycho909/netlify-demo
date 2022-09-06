var IsAjax = true;
var AccountToken

function GetAccountToken() {
    AccountToken=$("#AccountToken").val();
    return AccountToken;
}

var Mobj=[];
var Wobj=[];
var M=12;
var W=5;
// 玩家任務列表與狀態
function GetMission(type) {
    
    if (!IsAjax) return;
    IsAjax = false;
    if (AccountToken == null || AccountToken == undefined) {
        location.href="Logout.aspx"
        return;
    }
    var url="../api/E20201209_J/GetMission";
    var data={
        AccountToken:GetAccountToken()
    }
    if(Mobj.length == 0 && Wobj.length == 0){
        $.ajax({
            url:url,
            method:"POST",
            data:JSON.stringify(data),
            cache: false,
            success:function(data){
                var mission=data.E20201209_UserData;
                for(var i=1;i<=M;i++){
                    var obj={};
                    obj["M"+i]=mission["M"+i];
                    obj["M"+i+"_Name"]=mission["M"+i+"_Name"];
                    obj["M"+i+"_Unit"]=mission["M"+i+"_Unit"];
                    obj["M"+i+"_Status"]=mission["M"+i+"_Status"];
                    Mobj.push(obj)
                }
                for(var i=1;i<=W;i++){
                    var obj={};
                    obj["W"+i]=mission["W"+i];
                    obj["W"+i+"_Name"]=mission["W"+i+"_Name"];
                    obj["W"+i+"_Unit"]=mission["W"+i+"_Unit"];
                    obj["W"+i+"_Status"]=mission["W"+i+"_Status"];
                    Wobj.push(obj)
                }
                switch(type){
                    case "person":
                        $.gbox.open(taskPersonRender(Mobj),taskPersonObj);
                        return;
                    case "world":
                        $.gbox.open(taskWorldRender(Wobj),taskPersonObj);
                        return;
                }
            }
        })

        IsAjax = true;
    } else {
        IsAjax = true;
        switch(type){
            case "person":
                $.gbox.open(taskPersonRender(Mobj),taskPersonObj);
                return
            case "world":
                $.gbox.open(taskWorldRender(Wobj),taskPersonObj);
                return
        }
    }
}

var HallofFameBetList;
var HallofFameList=[];
var HalloFameRankList;
var swiper;
// 20201209
var swiper = false;

// 20201209
function unSwiper() {
    if (swiper) {
        $(".glory__slider-wrapper").slick("destroy");
        swiper = false;
    }
}
// 20201209
function checkSwiper() {
    swiper = true;
    $(".glory__slider-wrapper").slick({
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3,
        slidesToScroll: 1,
    });
}


// 名人堂列表
function GetHallofFame() {
    if (!IsAjax) return;
    IsAjax = false;
    var url="../api/E20201209_J/GetHallofFame";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(GHL)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;

        },
        success: function (data) {
            IsAjax = true;
            if(!data.IsSuccess){
                ErrorText(data.ErrorText,data.Url)
                return;
            }
            HallofFameBetList=data.List_E20201209_HallofFame

            $.gbox.open(gloryBetRender(HallofFameBetList),gloryBetObj);
        }
    })
}

// 分享分數Bar
// 修改20201203
function ShareCntBar(cnt) {
    var per = 100 / 7;
    var range = [0, 5000, 10000, 20000, 30000, 50000, 70000, 100000];
    var share = 0;
    range.forEach(function (v, i) {
        if (cnt > v) {
            if (range[i + 1]) {
                var r = range[i + 1] - range[i];
                share = ((cnt - range[i]) / r) * per + i * per;
            } else {
                share = 100;
            }
        }
    });
    $(".glory__share-bar").css("width", share + "%");
}

var isLike = true;

// 名人堂列表&分享數&排行表
function HallofFameLoad() {
    if (!IsAjax) return;
    IsAjax = false;
    var url="../api/E20201209_J/HallofFameLoad";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(HFL)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;

        },
        success: function (data) {
            IsAjax = true;
            if (!data.IsSuccess) {
                ErrorText(data.ErrorText, data.Url);
                return;
            }
            var ShareCnt = data.ShareCnt;
            isLike = data.IsLike;

            HallofFameList = data.List_E20201209_HallofFame;
            if (data.List_E20201209_HallofFame_Rank.length) {
                if ($(".glory__rank-coming").length) {
                    $(".glory__rank-coming").remove();
                    $(".glory__rank-title").show();
                    $(".glory__rank-list").show();
                }
                HalloFameRankList = data.List_E20201209_HallofFame_Rank;
                HalloFameRankList = HalloFameRankList.sort(function (a, b) {
                    return a.Rank - b.Rank;
                });

                var liHTML = "";
                HalloFameRankList.forEach(function (v, i) {
                    var li = "<li>NO." + v.Rank + " " + v.Characteristic + "</li>";
                    liHTML += li;
                });
                $(".glory__rank-list").html(liHTML);
                $(".glory__rank-week").text(weekList[HalloFameRankList[0]["Week"]]);
            } else {
                if (!$(".glory__rank-coming").length) {
                    $(".glory__rank").prepend("<div class='glory__rank-coming'>排名將於<br>12/23公布</div>");
                }
                $(".glory__rank-title").hide();
                // $(".glory__rank-list").hide();
            }

            ShareCntBar(ShareCnt);
            var slideHTML = "";
            for (var i = 0; i < HallofFameList.length; i++) {
                var slide = '<div class="glory__slider-slide swiper-slide swiper-no-swiping">\
                    <div class="glory__slider-role" data-seq="' + HallofFameList[i].Seq + '" data-char="' + HallofFameList[i].Class + '">\
                        <div class="glory__slider-btn-like"></div>\
                        <div class="glory__slider-role-light"></div>\
                        <div class="glory__slider-role-glory">' + HallofFameList[i].Characteristic + '</div>\
                        <div class="glory__slider-role-info">\
                            <span class="glory__slider-role-server">' + HallofFameList[i].Character + '</span>\
                            <span class="glory__slider-role-name">' + HallofFameList[i].ServerName + "</span>\
						</div>\
                    </div>\
                </div>";
                slideHTML += slide;
            }
            $(".glory__slider-wrapper").html(slideHTML);
            checkSwiper();
        }
    })
}

// 名人堂按讚
function Like(seq) {
    if (seq == undefined || seq == '')
    {
        $.gbox.open("請選擇名人堂成員", defaultObj);
        return;
    }
    if (!IsAjax) return;
    IsAjax = false;
    var url="../api/E20201209_J/Like";
    var data={
        AccountToken:GetAccountToken(),
        "HallofFameSeq":seq
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(LI)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;

        },
        success: function (data) {
            IsAjax = true;
            if (!data.IsSuccess) {
                ErrorText(data.ErrorText, data.Url);
                return;
            }
            $.gbox.open(data.SuccessText, defaultObj);
        }
    })
}

// 名人堂支持
function Support(seq, h5) {
    if (seq == undefined || seq == '') {
        $.gbox.open("請選擇名人堂成員", defaultObj);
        return;
    }
    if (!IsAjax) return;
    IsAjax = false;

    var url="../api/E20201209_J/Support";
    var data={
        AccountToken:GetAccountToken(),
        "HallofFameSeq":seq
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(SU)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;

        },
        success: function (data) {
            IsAjax = true;
            if(!data.IsSuccess){
                ErrorText(data.ErrorText,data.Url)
                return;
            }
            $.gbox.open(data.SuccessText)
        }
    })
}

function fbShare(){
    var url = location.href;
    var t="";
    if(isMobile.any){
        var winRef = window.open(url, "_blank");
        var fbhtml_url = window.location.toString();
        winRef.location='http://www.facebook.com/sharer/sharer.php?u=' + fbhtml_url
    }else{
        window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(t),'sharer', 'toolbar=0,status=0,width=626,height=436');
    }
}

function getMeta(name){
    var meta=document.getElementsByTagName("meta");
    var desc;
    for(var i=0;i<meta.length;i++){
        if(meta[i].name == name){
            desc=meta[i].content
        }
    }
    return desc;
}

// 手機板分享時使用
function mobileShare(){
	var url=location.href;
	var t=getMeta("description");
	var title=document.getElementsByTagName("title")[0].innerHTML;
    var shareData = {
        url: url, // 要分享的 URL
        title: title, // 要分享的標題
        text: t, // 要分享的文字內容
    };
    if(navigator.share){
        navigator.share(shareData);
    }else{
        fbShare()
    }
}

// 分享按鈕
function Share() {
    if (!IsAjax) return;
    IsAjax = false;
    var url="../api/E20201209_J/Share";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(SH)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;

        },
        success: function (data) {
            IsAjax = true;
            if(!data.IsSuccess){
                ErrorText(data.ErrorText,data.Url)
                return;
            }
            var cnt=parseInt(data.ShareCnt);
            ShareCntBar(cnt)
            if(isMobile.any){
                mobileShare()
            }else{
                fbShare()
            }
            //$.gbox.open("分享成功",defaultObj)
        }
    })
}

function StringToNum(str){
    switch(str){
        case "一":
            return 1;
        case "二":
            return 2;
        case "三":
            return 3;
        case "四":
            return 4;
    }
}

var GetSupportList=[];
// 支持紀錄
function GetSupportLog() {
    if (!IsAjax) return;
    IsAjax = false;
    var url="../api/E20201209_J/GetSupportLog";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
    if(GetSupportList.length == 0){
        $.ajax({
            url:url,
            data:JSON.stringify(data),
            method:"POST",
            cache: false,
            error: function () {
                message = '系統異常(GSL)';
                ErrorText(message, "Logout.aspx");

                IsAjax = true;

            },
            success: function (data) {
                IsAjax = true;
                if(!data.IsSuccess){
                    ErrorText(data.ErrorText,data.Url)
                    return;
                }
                GetSupportList=data.List_E20201209_SupportLog;
                $.gbox.open(gloryBetStatusRender(GetSupportList),gloryBetStatusObj);
            }
        })
    } else {
        IsAjax = true;
        $.gbox.open(gloryBetStatusRender(GetSupportList),gloryBetStatusObj);
    }
}
// GetSupportLog()
var Marquee;
var ItemStats;
var ItemRewardInit=[];

var marqueeIndex=0;
// 跑馬燈動畫
function MarqueeAnim(i) {
    TweenMax.set($(".gashapon__marquees").eq(i), {
        x: "100%",
        y: "-50%"
    })
    TweenMax.to($(".gashapon__marquees").eq(i), 5, {
        x: "0%",
        y: "-50%",
        onComplete: function () {
            TweenMax.to($(".gashapon__marquees").eq(i), 5, {
                x: "-100%",
                y: "-50%",
                delay: 1,
                onComplete: function () {
                    marqueeIndex++;
                    if (marqueeIndex >= Marquee.length) {
                        marqueeIndex = 0;
                    }
                    MarqueeAnim(marqueeIndex)
                }
            })
        }
    })
}

function MarqueeInit(data) {
    marqueeIndex = 0;
    var spanHTML = "";
    for (var i = 0; i < data.length; i++) {
        spanHTML += '<span class="gashapon__marquees">' + data[i].Content + '</span>'
    }
    $(".gashapon__marquee-box").html(spanHTML)
    MarqueeAnim(marqueeIndex)
}

// 獎賞尚有數量
function ItemStatsInit(stats){
    for(var i=0;i<stats.length;i++){
        $(".itemstats-num[data-type="+stats[i].ItemType+"]").find("span").html(stats[i].ItemCnt);
    }
}

// 初始化(千萬轉蛋)
function Initialize() {
    if (!IsAjax) return;
    IsAjax = false;

    var url="../api/E20201209_W/Initialize";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }

    $.ajax({
        url:url,
        data:data,
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(In)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;
        },
        success: function (data) {
            IsAjax = true;
            if (!data.Success) {
                ErrorText(data.ErrorText, data.Url)
                return;
            }
            var data = data.Data;
            var ItemRewardNormals;
            var ItemRewardSpecial;
            var ItemReward;

            ItemRewardInit = [];

            Marquee = data.Marquee;
            ItemStats = data.Stats;
            ItemReward = data.Reward;
            ItemRewardNormals = ItemReward.Normals;
            ItemRewardSpecial = ItemReward.Special["Data"];

            TweenMax.killTweensOf($(".gashapon__marquees"));
            MarqueeInit(Marquee)
            ItemStatsInit(ItemStats)
            $(".gashapon__counter-top").find("span").html(data.RewardCnt)
            $(".gashapon__counter-num").find("span").html(data.LogCnt)
            $(".gashapon__counter-key").find("span").html(data.KeyCnt)

            for (var i = 0; i < ItemRewardNormals.length; i++) {
                for (var j = 0; j < ItemRewardNormals[i]["Data"].length; j++) {
                    ItemRewardInit.push(ItemRewardNormals[i]["Data"][j])
                }
            }
            for (var i = 0; i < ItemRewardSpecial.length; i++) {
                var obj = {
                    ItemType: "",
                    ItemName: "",
                    ItemCon: "",
                    ItemCnt: 0,
                }
                obj["ItemType"] = "特殊獎項";
                obj["ItemCon"] = ItemRewardSpecial[i].ItemType;
                obj["ItemName"] = ItemRewardSpecial[i].ItemName;
                obj["ItemCnt"] = ItemRewardSpecial[i].ItemCnt;
                ItemRewardInit.push(obj)
            }
        }
    })
}

var Log;
var serverList;
// 獎勵查詢(千萬轉蛋)
function FindRewardLog() {
    if (!IsAjax) return;
    IsAjax = false;

    var url="../api/E20201209_W/FindRewardLog";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }
   
    $.ajax({
        url:url,
        data:data,
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(FRL)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;
        },
        success: function (data) {
            IsAjax = true;
            if(!data.Success){
                ErrorText(data.ErrorText,data.Url)
                return;
            }
            if(data.Data == null){
                ErrorText("目前沒有獎勵",null)
                return;
            }
            Log = data.Data.Log;
            Server = data.Data.Server;
            
            $.gbox.open(rewardSearchARender(Log,Server), rewardSearchAObj);
        }
    })
}

// 進行抽獎(千萬轉蛋)
function AddRewardLog() {
    if (!IsAjax) return;
    IsAjax = false;
    dragStop()
    var url="../api/E20201209_W/AddRewardLog";
    var data={
        AccountToken:GetAccountToken()
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }

    $.ajax({
        url:url,
        data:data,
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(ARL)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;
            dragStart()
        },
        success: function (data) {
            //IsAjax = true;
            if (!data.Success) {
                IsAjax = true;
                ErrorText(data.ErrorText, data.Url)
                return;
            }
            var Item = data.Data.Reward
            var actionArr = ["action1", "action2", "action3"];
            var randomAction = Math.floor(Math.random() * actionArr.length);
            $(".gashapon__main-btn").parent().addClass(actionArr[randomAction])
            setTimeout(function () {
                $(".gashapon__main-btn").parent().removeClass(actionArr[randomAction])
                $.gbox.open(gashaponGetRender(Item), gashaponGetObj);
                dragStart();
                //Initialize()
            }, 1800);
        }
    })
}

// 領取獎勵(千萬轉蛋)
function AddItemToGameLog(info, reward) {
    if (!IsAjax) return;
    IsAjax = false;
  
    var url="../api/E20201209_W/AddItemToGameLog";
    var data={
        AccountToken:GetAccountToken(),
        GameServer:info.GameServer,
        CharacterName:info.CharacterName,
        Reward:reward
    }
    if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
        location.href = "Logout.aspx"
        return;
    }

    $.ajax({
        url:url,
        data:data,
        method:"POST",
        cache: false,
        error: function () {
            message = '系統異常(AITGL)';
            ErrorText(message, "Logout.aspx");

            IsAjax = true;
        },
        success: function (data) {
            IsAjax = true;
            if(!data.Success){
                ErrorText(data.ErrorText,data.Url)
                return;
            }else{
                $.gbox.open("獎勵發送成功",defaultObj)
            }
        }
    })
}

// 錯誤訊息
function ErrorText(text, url) {
    $.gbox.open("<div class='error-text'>" + text + "</div>", {
        addClass: "default",
        hasCloseBtn: true,
        hasActionBtn: false,
        afterOpen: function () {
            $(".gbox").prepend("<div class='layer-frame'></div>");
            setTimeout(function () {
                $(".gbox-close").addClass("error-close");
            }, 0);
        },
        afterClose: function () {
            if ($("#app").attr("data-current") == "gashapon") {
                dragStart();
            }
            if (url) {
                var href = location.href;
                var path = location.pathname;
                var pathSplit = location.pathname.split("/");
                var len = pathSplit.length;
                pathSplit[len - 1] = url;
                var newPath = pathSplit.join("/");
                location.href = href.replace(path, newPath);
            }
        },
    });
}

