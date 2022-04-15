// 影片 : 播放時事件
function videoPlaying(video, callback) {
	$(video)[0].onplaying = callback;
}
// 影片 : 播放結束候事件
function videoEnded(video, callback) {
	$(video)[0].onended = callback;
}
