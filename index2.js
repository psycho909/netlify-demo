function createCustomScrollbar(container) {
	let scrollbarContainer,
		scrollbar,
		isInitialized = false;

	function initialize() {
		if (isInitialized) return;

		scrollbarContainer = document.createElement("div");
		scrollbarContainer.className = "scrollbar-track";
		scrollbarContainer.style.cssText = `
            position: absolute;
            right: 0;
            top: 0;
            width: 10px;
            height: ${container.clientHeight}px;
            background-color: #f0f0f0;
        `;

		scrollbar = document.createElement("div");
		scrollbar.className = "scrollbar-thumb";
		scrollbar.style.cssText = `
            position: absolute;
            right: 0;
            width: 100%;
            border-radius: 5px;
            background-color: #c1c1c1;
            cursor: pointer;
        `;

		scrollbarContainer.appendChild(scrollbar);
		container.parentNode.insertBefore(scrollbarContainer, container.nextSibling);
		container.style.marginRight = "10px";

		container.addEventListener("scroll", updateScrollbar);
		window.addEventListener("resize", updateScrollbar);
		scrollbar.addEventListener("mousedown", onStart);
		scrollbar.addEventListener("touchstart", onStart, { passive: false });
		scrollbarContainer.addEventListener("click", onTrackClick);
		scrollbarContainer.addEventListener("touchstart", onTrackClick, { passive: false });
		scrollbarContainer.addEventListener("touchmove", preventDefaultScroll, { passive: false });

		// Add a MutationObserver to watch for content changes
		const observer = new MutationObserver(() => {
			updateScrollbar();
			// Scroll to the bottom when new content is added
			container.scrollTop = container.scrollHeight - container.clientHeight;
		});
		observer.observe(container, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: true
		});

		isInitialized = true;
		updateScrollbar();
	}

	function updateScrollbar() {
		const containerHeight = container.clientHeight;
		const contentHeight = container.scrollHeight;

		// If the content height is less than or equal to the container height, hide the scrollbar
		if (contentHeight <= containerHeight) {
			scrollbarContainer.style.display = "none";
		} else {
			scrollbarContainer.style.display = "block";
			// Retrieve the thumb height from the computed style
			const thumbHeight = parseFloat(window.getComputedStyle(scrollbar).height);
			// Ensure thumbHeight is a valid number and not zero
			if (isNaN(thumbHeight) || thumbHeight <= 0) {
				console.error("Invalid thumb height retrieved from CSS.");
				return;
			}
			// Calculate the percentage of scrollable content that's visible
			const scrollPercentage = container.scrollTop / (contentHeight - containerHeight);
			// Calculate the maximum top position for the scrollbar thumb
			const maxScrollbarTop = containerHeight - thumbHeight;
			// Calculate the top position of the scrollbar thumb
			const scrollbarTop = Math.min(scrollPercentage * maxScrollbarTop, maxScrollbarTop);
			scrollbar.style.top = `${scrollbarTop}px`;
			scrollbarContainer.style.height = `${containerHeight}px`;
		}
	}

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
		const thumbHeight = scrollbar.clientHeight;
		const scrollbarHeight = scrollbarContainer.clientHeight;
		const scrollPercentage = (y - thumbHeight / 2) / (scrollbarHeight - thumbHeight);
		container.scrollTop = Math.min(Math.max(0, scrollPercentage * (container.scrollHeight - container.clientHeight)), container.scrollHeight - container.clientHeight);
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
		const thumbHeight = scrollbar.clientHeight;
		const scrollbarHeight = scrollbarContainer.clientHeight;
		const scrollPercentage = (y - thumbHeight / 2) / (scrollbarHeight - thumbHeight);
		container.scrollTop = Math.min(Math.max(0, scrollPercentage * (container.scrollHeight - container.clientHeight)), container.scrollHeight - container.clientHeight);
	}

	function preventDefaultScroll(e) {
		e.preventDefault();
	}

	initialize();

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
			this.clear();
			initialize();
		}
	};
}
