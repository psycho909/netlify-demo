// 獲取容器元素
const box = document.getElementById("box");

// 創建虛擬滾動軸容器
const scrollbarContainer = document.createElement("div");
scrollbarContainer.className = "scrollbar-track";

// 設置 scrollbar-track 的樣式
scrollbarContainer.style.cssText = `
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: ${box.clientHeight}px;
    background-color: #f0f0f0;
`;

// 創建虛擬滾動軸
const scrollbar = document.createElement("div");
scrollbar.className = "scrollbar-thumb";

// 設置 scrollbar-thumb 的基本樣式
scrollbar.style.cssText = `
    position: absolute;
    right: 0;
    width: 100%;
    border-radius: 5px;
`;

// 將虛擬滾動軸添加到容器中
scrollbarContainer.appendChild(scrollbar);

// 將虛擬滾動軸容器添加到 box 旁邊
box.parentNode.insertBefore(scrollbarContainer, box.nextSibling);
box.style.marginRight = "10px"; // 為虛擬滾動軸騰出空間

// 更新虛擬滾動軸的位置
function updateScrollbar() {
	// 獲取 .scrollbar-thumb 的計算樣式
	const thumbStyle = window.getComputedStyle(scrollbar);
	const thumbHeight = parseInt(thumbStyle.height, 10);

	const scrollPercentage = box.scrollTop / (box.scrollHeight - box.clientHeight);

	// 計算滾動軸的最大可滾動距離
	const maxScrollbarTop = box.clientHeight - thumbHeight;

	// 確保滾動軸不會超出容器底部
	const scrollbarTop = Math.min(scrollPercentage * maxScrollbarTop, maxScrollbarTop);

	scrollbar.style.top = `${scrollbarTop}px`;
}

// 監聽滾動事件
box.addEventListener("scroll", updateScrollbar);

// 監聽窗口大小變化，重新調整虛擬滾動軸容器的高度
window.addEventListener("resize", () => {
	scrollbarContainer.style.height = `${box.clientHeight}px`;
	updateScrollbar();
});

// 初始化虛擬滾動軸
updateScrollbar();

// MutationObserver 來監視 .scrollbar-thumb 的樣式變化
const observer = new MutationObserver(() => {
	updateScrollbar();
});

observer.observe(scrollbar, {
	attributes: true,
	attributeFilter: ["style", "class"]
});

// 拖動相關變量
let isDragging = false;
let startY, startScrollTop;

// 鼠標事件處理函數
function onStart(e) {
	isDragging = true;
	startY = (e.clientY || e.touches[0].clientY) - scrollbar.getBoundingClientRect().top;
	startScrollTop = box.scrollTop;
	document.addEventListener("mousemove", onMove);
	document.addEventListener("touchmove", onMove, { passive: false });
	document.addEventListener("mouseup", onEnd);
	document.addEventListener("touchend", onEnd);
}

function onMove(e) {
	if (!isDragging) return;
	e.preventDefault();
	const clientY = e.clientY || (e.touches && e.touches[0].clientY);
	const y = clientY - scrollbarContainer.getBoundingClientRect().top;
	const scrollPercentage = y / scrollbarContainer.clientHeight;
	box.scrollTop = scrollPercentage * (box.scrollHeight - box.clientHeight);
}

function onEnd() {
	isDragging = false;
	document.removeEventListener("mousemove", onMove);
	document.removeEventListener("touchmove", onMove);
	document.removeEventListener("mouseup", onEnd);
	document.removeEventListener("touchend", onEnd);
}

// 添加鼠標和觸摸事件監聽器
scrollbar.addEventListener("mousedown", onStart);
scrollbar.addEventListener("touchstart", onStart, { passive: false });

// 點擊滾動條容器時，移動滾動條到點擊位置
function onTrackClick(e) {
	if (e.target === scrollbar) return;
	const clientY = e.clientY || (e.touches && e.touches[0].clientY);
	const y = clientY - scrollbarContainer.getBoundingClientRect().top;
	const scrollPercentage = y / scrollbarContainer.clientHeight;
	box.scrollTop = scrollPercentage * (box.scrollHeight - box.clientHeight);
}

scrollbarContainer.addEventListener("click", onTrackClick);
scrollbarContainer.addEventListener("touchstart", onTrackClick, { passive: false });

// 防止移動設備上的默認滾動行為
scrollbarContainer.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
