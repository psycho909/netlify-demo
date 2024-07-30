function createCustomScrollbar(container) {
	// 創建虛擬滾動軸容器
	const scrollbarContainer = document.createElement("div");
	scrollbarContainer.className = "scrollbar-track";

	// 設置 scrollbar-track 的樣式
	scrollbarContainer.style.cssText = `
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: ${container.clientHeight}px;
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
        background-color: #c1c1c1;
        cursor: pointer;
    `;

	// 將虛擬滾動軸添加到容器中
	scrollbarContainer.appendChild(scrollbar);

	// 將虛擬滾動軸容器添加到 container 旁邊
	container.parentNode.insertBefore(scrollbarContainer, container.nextSibling);
	container.style.marginRight = "10px"; // 為虛擬滾動軸騰出空間

	// 更新虛擬滾動軸的位置和大小
	function updateScrollbar() {
		const containerHeight = container.clientHeight;
		const contentHeight = container.scrollHeight;
		const scrollPercentage = container.scrollTop / (contentHeight - containerHeight);
		const thumbHeight = Math.max(30, (containerHeight / contentHeight) * containerHeight);

		scrollbar.style.height = `${thumbHeight}px`;
		const maxScrollbarTop = containerHeight - thumbHeight;
		const scrollbarTop = Math.min(scrollPercentage * maxScrollbarTop, maxScrollbarTop);
		scrollbar.style.top = `${scrollbarTop}px`;

		scrollbarContainer.style.height = `${containerHeight}px`;
	}

	// 監聽滾動事件
	container.addEventListener("scroll", updateScrollbar);

	// 監聽窗口大小變化
	window.addEventListener("resize", updateScrollbar);

	// 初始化虛擬滾動軸
	updateScrollbar();

	// 拖動相關變量
	let isDragging = false;
	let startY, startScrollTop;

	// 鼠標和觸摸事件處理函數
	function onStart(e) {
		isDragging = true;
		startY = (e.clientY || e.touches[0].clientY) - scrollbar.getBoundingClientRect().top;
		startScrollTop = container.scrollTop;
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
		container.scrollTop = scrollPercentage * (container.scrollHeight - container.clientHeight);
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
		container.scrollTop = scrollPercentage * (container.scrollHeight - container.clientHeight);
	}

	scrollbarContainer.addEventListener("click", onTrackClick);
	scrollbarContainer.addEventListener("touchstart", onTrackClick, { passive: false });

	// 防止移動設備上的默認滾動行為
	scrollbarContainer.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

	// 返回清理函數
	return function cleanup() {
		container.removeEventListener("scroll", updateScrollbar);
		window.removeEventListener("resize", updateScrollbar);
		scrollbar.removeEventListener("mousedown", onStart);
		scrollbar.removeEventListener("touchstart", onStart);
		scrollbarContainer.removeEventListener("click", onTrackClick);
		scrollbarContainer.removeEventListener("touchstart", onTrackClick);
		scrollbarContainer.removeEventListener("touchmove", (e) => e.preventDefault());
		container.parentNode.removeChild(scrollbarContainer);
		container.style.marginRight = "";
	};
}

// 使用示例
const container1 = document.getElementById("myScrollContainer1");
const cleanupScrollbar1 = createCustomScrollbar(container1);

const container2 = document.getElementById("myScrollContainer2");
const cleanupScrollbar2 = createCustomScrollbar(container2);
// 如果需要移除滾動條
// cleanupScrollbar();
