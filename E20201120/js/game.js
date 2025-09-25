$("body").on("click",".gamepause-btn__holdgame",function(){
	$.gbox.close();
	timeStart();
})
$("body").on("click",".gamepause-btn__restart",function(){
	$.gbox.close();
	restart()
})
$("body").on("click",".gamepause-btn__backhome",function(){

})
// $.gbox.open(gamePauseHTMLRender(),ingameObj);

// =============================================================================

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var musicBg=document.getElementById("music-bg");
var scale=(window.innerWidth/768)
var scalePadding=scale*38*2;
canvas.width=window.innerWidth-scalePadding;
canvas.height=window.innerHeight-$(".game-btn-box").outerHeight(true);

var krArr=[];
var canvasW=canvas.width;
var canvasH=canvas.height;
var initCount=12;
var itemW=215*scale;
var itemH=149*scale;
var itemCol=3;
var colWidth=canvasW/itemCol;
var itemPadding=(colWidth-itemW)/2;
var itemOffsetLeft=colWidth;
var itemOffsetTop=itemH;
var score=0;
var timer=null;
var gameTime=30;
var sound;
var soundLink="audio/du.mp3";
var imgs=["images/blue.png","images/green.png","images/red.png","images/pink.png"];
var useImg=imgs[0];

$(".game").height(window.innerHeight)

var myGameArea={
	start:function(){
		this.interval = setInterval(updateGameArea, 20);
	},
	stop:function(){
		clearInterval(this.interval)
	},
	clear:function(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
	}
}

initKR();
startGame();

$(".play").on("click",function(){
	playMusicBg()
})

document.getElementById("btn1").addEventListener("click",function(){
	updaeKR(0)
})
document.getElementById("btn2").addEventListener("click",function(){
	updaeKR(1)
})
document.getElementById("btn3").addEventListener("click",function(){
	updaeKR(2)
})


document.getElementById("gamepause").addEventListener("click",function(){
	timeStop()
	$.gbox.open(gamePauseHTMLRender(),ingameObj);
})

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
function stopSound(){
	sound.pause();
	sound.currentTime = 0;
	sound=null;
}

function playMusicBg(){
	musicBg.play();
	musicBg.loop=true;
}
function pauseMusicBg(){
	musicBg.pause();
}
function stopMusicBg(){
	musicBg.pause();
	musicBg.currentTime = 0;
}

function timeStart(){
	timer=setInterval(function(){
		gameTime--;
		if(gameTime == 0){
			clearInterval(timer)
			document.getElementById("game-time").innerHTML=0;
			$("#app").prepend("<div class='game-stopbg'></div>")
		}
		document.getElementById("game-time").innerHTML=gameTime
	},1000)
}
function timePause(){
	clearInterval(timer)
	pauseMusicBg()
}
function timeStop(){
	clearInterval(timer)
	stopMusicBg()
}

function component(width, height, img, x, y) {
	this.image = new Image();
	this.image.src = img;
	this.width = width;
	this.height = height;
	this.speedY = 0;
	this.jumpStatus=false;
	this.jumpCount=0;
	this.jumpControl=false;
	this.x = x;
	this.y = y;
	this.tempY=0;
	this.update = function() {
		ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
	};
	this.jumpMove=function(){
		this.jumpControl=true;
		this.tempY=this.y;
	}
	this.newPos = function() {
		if(this.jumpControl){
			if(this.speedY > 25 || this.jumpStatus){
				this.speedY-=3;
				if(this.speedY < 0){
					this.jumpStatus=false;
					this.jumpCount=1;
					this.speedY=0;
					this.jumpControl=false;
				}
			}else{
				this.speedY+=3;
				if(this.speedY > 25){
					this.jumpStatus=true
				}
			}
			this.y=this.tempY
		}
		this.y = this.y-this.speedY;        
	}
}
function initKR(){
	krArr=[];
	gameTime=30;
	score=0;
	cd=3;
	$("#game-time").html(gameTime)
	for(var i=0;i<initCount;i++){
		addKR(i)
	}
	countDown();
}
function addKR(z){
	var kr=Array.from(Array(3),x=>false);
	var r=Math.floor(Math.random()*3);
	var itemX=(r*itemOffsetLeft)+itemPadding;
	var itemY=canvasH-(itemOffsetTop*z)-itemH;
	kr[r]={
		x:itemX,
		y:itemY,
		head:new component(itemW, itemH, useImg, itemX, itemY)
	};
	krArr.push(kr)
}

function updateGameArea(){
	myGameArea.clear();
	for(var i=0;i<krArr.length;i++){
		for(var j=0;j<krArr[i].length;j++){
			if(krArr[i][j]){
				krArr[i][j].head.newPos();
				krArr[i][j].head.update();
			}
		}
	}
}

function startGame(){
	myGameArea.start();
	playMusicBg();
}


function updaeKR(t){
	if(krArr[0][t]){
		delKR()
		if(krArr.length < (initCount)){
			addKR(krArr.length+1)
		}
		for(var i=0;i<krArr.length;i++){
			for(var j=0;j<krArr[i].length;j++){
				if(krArr[i][j]){
					krArr[i][j].head.y+=itemH
				}
			}
		}
	}else{
		for(var i=0;i<krArr[0].length;i++){
			if(krArr[0][i]){
				krArr[0][i].head.jumpMove()
			}
		}
		
	}
}

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
	playSound()
}


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

function restart(){
	initKR();
	startGame();
}
$(".play").click()