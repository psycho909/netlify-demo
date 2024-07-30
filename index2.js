function createCustomScrollbar(container) {
	let scrollbarContainer,
		scrollbar,
		isInitialized = false;

	function initialize() {
		if (isInitialized) return;

		// 创建虚拟滚动条容器
		scrollbarContainer = document.createElement("div");
		scrollbarContainer.className = "scrollbar-track";

		// 设置 scrollbar-track 的样式
		scrollbarContainer.style.cssText = `
            position: absolute;
            right: 0;
            top: 0;
            width: 10px;
            height: ${container.clientHeight}px;
            background-color: #f0f0f0;
        `;

		// 创建虚拟滚动条
		scrollbar = document.createElement("div");
		scrollbar.className = "scrollbar-thumb";

		// 设置 scrollbar-thumb 的基本样式
		scrollbar.style.cssText = `
            position: absolute;
            right: 0;
            width: 100%;
            border-radius: 5px;
            background-color: #c1c1c1;
            cursor: pointer;
        `;

		// 将虚拟滚动条添加到容器中
		scrollbarContainer.appendChild(scrollbar);

		// 将虚拟滚动条容器添加到 container 旁边
		container.parentNode.insertBefore(scrollbarContainer, container.nextSibling);
		container.style.marginRight = "10px"; // 为虚拟滚动条腾出空间

		// 添加事件监听器
		container.addEventListener("scroll", updateScrollbar);
		window.addEventListener("resize", updateScrollbar);
		scrollbar.addEventListener("mousedown", onStart);
		scrollbar.addEventListener("touchstart", onStart, { passive: false });
		scrollbarContainer.addEventListener("click", onTrackClick);
		scrollbarContainer.addEventListener("touchstart", onTrackClick, { passive: false });
		scrollbarContainer.addEventListener("touchmove", preventDefaultScroll, { passive: false });

		isInitialized = true;
		updateScrollbar(); // 初始化滚动条位置
	}

	function updateScrollbar() {
		const containerHeight = container.clientHeight;
		const contentHeight = container.scrollHeight;
		if (contentHeight - containerHeight <= 0) {
			scrollbarContainer.style.display = "none";
		} else {
			scrollbarContainer.style.display = "block";
			const scrollPercentage = container.scrollTop / (contentHeight - containerHeight);
			const thumbHeight = Math.max(30, (containerHeight / contentHeight) * containerHeight);

			scrollbar.style.height = `${thumbHeight}px`;
			const maxScrollbarTop = containerHeight - thumbHeight;
			const scrollbarTop = Math.min(scrollPercentage * maxScrollbarTop, maxScrollbarTop);
			scrollbar.style.top = `${scrollbarTop}px`;

			scrollbarContainer.style.height = `${containerHeight}px`;
		}
	}

	// 拖动相关变量和函数
	let isDragging = false;
	let startY, startScrollTop;

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
		const thumbHeight = parseFloat(getComputedStyle(scrollbar).height);
		const scrollPercentage = y / (scrollbarContainer.clientHeight - thumbHeight);
		container.scrollTop = scrollPercentage * (container.scrollHeight - container.clientHeight);
	}

	function onEnd() {
		isDragging = false;
		document.removeEventListener("mousemove", onMove);
		document.removeEventListener("touchmove", onMove);
		document.removeEventListener("mouseup", onEnd);
		document.removeEventListener("touchend", onEnd);
	}

	function onTrackClick(e) {
		if (e.target === scrollbar) return;
		const clientY = e.clientY || (e.touches && e.touches[0].clientY);
		const y = clientY - scrollbarContainer.getBoundingClientRect().top;
		const thumbHeight = parseFloat(getComputedStyle(scrollbar).height);
		const scrollPercentage = y / (scrollbarContainer.clientHeight - thumbHeight);
		container.scrollTop = scrollPercentage * (container.scrollHeight - container.clientHeight);
	}

	function preventDefaultScroll(e) {
		e.preventDefault();
	}

	// 初始化滚动条
	initialize();

	// 返回包含 clear 和 reinitialize 方法的对象
	return {
		clear: function () {
			if (!isInitialized) return;

			container.removeEventListener("scroll", updateScrollbar);
			window.removeEventListener("resize", updateScrollbar);
			scrollbar.removeEventListener("mousedown", onStart);
			scrollbar.removeEventListener("touchstart", onStart);
			scrollbarContainer.removeEventListener("click", onTrackClick);
			scrollbarContainer.removeEventListener("touchstart", onTrackClick);
			scrollbarContainer.removeEventListener("touchmove", preventDefaultScroll);
			container.parentNode.removeChild(scrollbarContainer);
			container.style.marginRight = "";

			isInitialized = false;
		},
		reinitialize: function () {
			this.clear(); // 确保先清理任何现有的滚动条
			initialize(); // 重新初始化
		}
	};
}
