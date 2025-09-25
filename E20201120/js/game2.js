// 繼續遊戲 事件
$("body").on("click",".gamepause-btn__holdgame",function(){
	$.gbox.close();
	timeStart();
})
// 重新開始 事件
$("body").on("click",".gamepause-btn__restart",function(){
	$.gbox.close();
	restart()
})

// $.gbox.open(gamePauseHTMLRender(),ingameObj);

// =============================================================================

var canvas=document.getElementById("canvas");
var musicBg=document.getElementById("music-bg");
var scale=(window.innerWidth/768)
var scalePadding=scale*38*2;
canvas.style.width=window.innerWidth-scalePadding+"px";
canvas.style.height=window.innerHeight-$(".game-btn-box").outerHeight(true)+"px";

var krArr=[];
var canvasW=$("#canvas").width();
var canvasH=$("#canvas").height();
var initCount=12;
var itemW=215*scale;
var itemH=149*scale;
var itemCol=3;
var colWidth=canvasW/itemCol;
var itemPadding=(colWidth-itemW)/2;
var itemOffsetLeft=colWidth;
var itemOffsetTop=itemH;
var headDiv="";
var timer=null;
var gameTime=30;
var sound;
var soundLink="audio/du.mp3";
var imgs=["blue","green","red","pink","yellow"];
var useImg=imgs[0];
// 分數統計
var score=0;
// 初始化高度
$(".game").height(window.innerHeight)

// 初始化
initKR();

// 強制播放背景音樂
$(".play").on("click",function(){
	playMusicBg()
})

// n20按鈕事件
var oBtn=document.querySelectorAll(".game-btn__n20");
for(var i=0;i<oBtn.length;i++){
	oBtn[i].addEventListener("click",function(){
		var index=this.dataset.index;
		updaeKR(index)
	})
}

// 暫停按鈕事件
document.getElementById("gamepause").addEventListener("click",function(){
	timeStop()
	$.gbox.open(gamePauseHTMLRender(),ingameObj);
})

// 播放音效
function playSound(){
	if(sound){
		sound.pause();
		sound.currentTime = 0;
		sound=null;
		sound=new Audio(soundLink);
		sound.play();
	}else{
		sound=new Audio(soundLink);
		sound.play();
	}
}
// 停止音效
function stopSound(){
	sound.pause();
	sound.currentTime = 0;
	sound=null;
}
// 播放背景音樂
function playMusicBg(){
	musicBg.play();
	musicBg.loop=true;
}
// 暫停背景音樂
function pauseMusicBg(){
	musicBg.pause();
}
// 停止背景音樂
function stopMusicBg(){
	musicBg.pause();
	musicBg.currentTime = 0;
}

// 時間開始跟結束
function timeStart(){
	timer=setInterval(function(){
		gameTime--;
		// 當時間結束時
		if(gameTime == 0){
			clearInterval(timer)
			document.getElementById("game-time").innerHTML=0;
			$("#app").prepend("<div class='game-stopbg'></div>")

			// 放入程式
			// 遊戲結束直接切換到結果頁跳出總分
			// score 分數
			// .............................
			location.href="result.html";
		}
		document.getElementById("game-time").innerHTML=gameTime
	},1000)
}

// 時間暫停
function timePause(){
	clearInterval(timer)
	pauseMusicBg()
}
// 時間強制停止
function timeStop(){
	clearInterval(timer)
	stopMusicBg()
}

// 初始化
function initKR(){
	krArr=[];
	gameTime=30;
	score=0;
	cd=3;
	$("#game-time").html(gameTime)
	$("#canvas").html("")
	for(var i=0;i<initCount;i++){
		addKR(i)
	}
	countDown();
	$(".play").click();
	btnCurr()
}
// 增加KR
function addKR(z){
	var kr=Array.from(Array(3),x=>false);
	var r=Math.floor(Math.random()*3);
	var itemX=(r*itemOffsetLeft)+itemPadding;
	var itemY=canvasH-(itemOffsetTop*z)-itemH;
	kr[r]={
		x:itemX,
		y:itemY,
		head:useImg
	};
	krArr.push(kr)
	headDiv=`<div class="head ${kr[r].head}" style="top:${kr[r].y}px;left:${kr[r].x}px"></div>`
	$("#canvas").append(headDiv)
}

// 更新KR移動
function updateGameArea(){
	$(".head").eq(0).remove()
	$(".head").each(function(i,v){
		var t=$(v).css("top").slice(0,-2)
		var top=parseInt(t)+itemH;
		$(v).css("top",top+"px")
	})
}

// 更新KR
function updaeKR(t){
	if(krArr[0][t]){
		delKR()
		if(krArr.length < (initCount)){
			addKR(krArr.length+1)
		}
		updateGameArea()
		btnCurr()
	}else{
		if(!$(".head").eq(0).hasClass("bounce")){
			$(".head").eq(0).addClass("bounce");
			setTimeout(function(){
				$(".head").eq(0).removeClass("bounce")
			}, 600);
		}
	}
}

// 刪除KR
function delKR(){
	score++;
	krArr=krArr.slice(1)

	if(score > 20){
		useImg=imgs[1]
	}
	if(score > 40){
		useImg=imgs[2]
	}
	if(score > 60){
		useImg=imgs[3]
	}
	if(score > 80){
		useImg=imgs[4]
	}
	playSound()
}

// 倒數計時
function countDown(){
	if(!$(".game-cd").length){
		$("#app").prepend("<div class='game-cd game-cd3'></div>")
	}
	if(cd <= 0){
		$(".game-cd").remove()
		timeStart()
		return;
	}
	setTimeout(function(){
		cd--;
		$(".game-cd").attr("class","game-cd game-cd"+cd)
		countDown()
	}, 1000);
}

function btnCurr(){
	for(var i=0;i<krArr[0].length;i++){
		if(krArr[0][i]){
			$(".game-btn__n20").eq(i).addClass("curr")
		}else{
			$(".game-btn__n20").eq(i).removeClass("curr")
		}
	}
}

// 重新開始
function restart(){
	initKR();
}

// 強制播放背景音樂
$(".play").click()