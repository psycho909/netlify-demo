// 定義變量
let canvas;
let ctx;
let errorDiv;
// 定義圖片路徑
const IMAGE_PATH = "../E2024Anniversary/assets/css/images/share";
const IMAGES = {
	BG: `${IMAGE_PATH}/bg-share.jpg`,
	TITLE: `${IMAGE_PATH}/share-title.png`,
	CARD_BG: `${IMAGE_PATH}/share-card-bg.png`,
	DESC_2024: `${IMAGE_PATH}/share-desc-2024.png`,
	DESC_2023: `${IMAGE_PATH}/share-desc-2023.png`,
	getLogo: (logo) => `${IMAGE_PATH}/share-logo-${logo}.png`
};

// 加載圖片並支持 CORS 的函數
export function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
		img.src = src;
	});
}

// 居中繪製文字的函數
export function drawCenteredText(text, x, y, font, color) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}

// 動態繪製成長率文本的函數（僅當提供 Y 時才顯示）
export function drawGrowthRate(cardX, baselineY, Y) {
	if (!Y) return;

	const centerX = cardX + 139;
	const normalFont = 'normal 28px "Microsoft JhengHei"';
	const largeFont = 'normal 44px "Microsoft JhengHei"';

	ctx.font = normalFont;
	const prefix = "成長率";
	const suffix = "%";
	const prefixWidth = ctx.measureText(prefix).width;
	const suffixWidth = ctx.measureText(suffix).width;

	ctx.font = largeFont;
	const numberWidth = ctx.measureText(Y).width;

	const spacing = 2;
	const totalWidth = prefixWidth + numberWidth + suffixWidth + spacing * 2;
	let startX = centerX - totalWidth / 2;

	ctx.font = normalFont;
	ctx.fillStyle = "#ffebd1";
	ctx.textAlign = "left";
	ctx.fillText(prefix, startX, baselineY);

	startX += prefixWidth + spacing;
	ctx.font = largeFont;
	ctx.fillText(Y, startX, baselineY);

	startX += numberWidth + spacing;
	ctx.font = normalFont;
	ctx.fillText(suffix, startX, baselineY);
}

// 繪製卡片內容的函數，支持 "mabi" 標誌的特殊設置
export function drawCardContent(cardX, cardY, { Title, L, T, Y, show2024, show2023, desc2024Image, desc2023Image }, isMabi) {
	const titleY = isMabi ? cardY + 105 : cardY + 90;
	const desc2024Y = isMabi ? cardY + 209 : cardY + 174;

	// 將標題文字分行顯示（若超過6個字）
	const titleFont = 'bold 28px "Microsoft JhengHei"';
	const titleColor = "#ffebd1";
	const lineHeight = 35; // 行距

	if (Title.length <= 8) {
		// 一行
		drawCenteredText(Title, cardX + 139, titleY, titleFont, titleColor);
	} else if (Title.length <= 16) {
		// 兩行
		const firstLine = Title.slice(0, 8);
		const secondLine = Title.slice(8);
		drawCenteredText(firstLine, cardX + 139, titleY, titleFont, titleColor);
		drawCenteredText(secondLine, cardX + 139, titleY + lineHeight, titleFont, titleColor);
	} else {
		// 三行
		const firstLine = Title.slice(0, 8);
		const secondLine = Title.slice(8, 16);
		const thirdLine = Title.slice(16);
		drawCenteredText(firstLine, cardX + 139, titleY, titleFont, titleColor);
		drawCenteredText(secondLine, cardX + 139, titleY + lineHeight, titleFont, titleColor);
		drawCenteredText(thirdLine, cardX + 139, titleY + lineHeight * 2, titleFont, titleColor);
	}

	// 若有指定天數顯示，則繪製 2024 天數
	if (show2024 && T) {
		const textY = isMabi ? cardY + 295 : cardY + 240;
		drawCenteredText(T, cardX + 139, textY, 'normal 34px "Microsoft JhengHei"', "#d1ac66");
	}

	// 若非 "mabi" 標誌且有 Y 則繪製成長率
	if (!isMabi) drawGrowthRate(cardX, cardY + 300, Y);

	// 若非 "mabi" 且 show2023 顯示，則繪製 2023 的天數和標籤
	if (show2023 && !isMabi) {
		if (desc2023Image) ctx.drawImage(desc2023Image, cardX + 85, cardY + 322);
		if (L) {
			drawCenteredText(L, cardX + 139, cardY + 388, 'normal 34px "Microsoft JhengHei"', "#d1ac66");
		}
	}

	// 如果 show2024 且 desc2024Image 存在，繪製 2024 標籤圖片
	if (show2024 && desc2024Image) {
		ctx.drawImage(desc2024Image, cardX + 85, desc2024Y);
	}
}

// 主函數：繪製所有內容並支持自定義設置
export async function drawShareImage({
	logo = "cso",
	cardData = [
		{ Title: "累積登入天數", show2024: true, show2023: true, L: "123天", T: "100天", Y: "100" },
		{ Title: "遊戲次數", show2024: true, show2023: false, L: "456天", T: "", Y: "200" },
		{ Title: "每日挑戰", show2024: true, show2023: true, L: "789天", T: "200天", Y: "" }
	]
} = {}) {
	// 初始化畫布和上下文
	canvas = document.getElementById("shareCanvas");
	ctx = canvas.getContext("2d");

	canvas.width = 1200;
	canvas.height = 630;

	try {
		const bgImage = await loadImage(IMAGES.BG);
		const titleImage = await loadImage(IMAGES.TITLE);
		const logoImage = await loadImage(IMAGES.getLogo(logo));
		const cardBgImage = await loadImage(IMAGES.CARD_BG);

		ctx.drawImage(bgImage, 0, 0, 1200, 630);
		ctx.drawImage(titleImage, 572, 80, 191, 33);
		ctx.drawImage(logoImage, 375, 51, 195, 90);

		const isMabi = logo === "mabi";
		const cardPositions = [
			{ x: 115, y: 165 },
			{ x: 462, y: 165 },
			{ x: 794, y: 165 }
		];

		for (let i = 0; i < cardData.length; i++) {
			const { x, y } = cardPositions[i];
			const card = cardData[i];

			// 設置卡片的陰影效果
			ctx.shadowColor = "rgba(81,44, 0, 0.75)"; // 陰影顏色
			ctx.shadowOffsetX = 0; // 陰影橫向偏移
			ctx.shadowOffsetY = 4; // 陰影縱向偏移
			ctx.shadowBlur = 11; // 模糊程度
			ctx.drawImage(cardBgImage, x, y, 278, 428);

			const desc2024Image = card.show2024 ? await loadImage(IMAGES.DESC_2024) : null;
			const desc2023Image = card.show2023 ? await loadImage(IMAGES.DESC_2023) : null;

			drawCardContent(x, y, { ...card, desc2024Image, desc2023Image }, isMabi);
		}
		return getBase64Image();
	} catch (error) {
		console.error("Error:", error);
	}
}

// 獲取 Base64 圖片字符串的函數
export function getBase64Image(format = "image/jpeg", quality = 0.6) {
	return canvas.toDataURL(format, quality);
}

// 生成可下載圖片的函數
export function downloadImage() {
	const imageData = getBase64Image();
	const downloadLink = document.createElement("a");
	downloadLink.href = imageData;
	downloadLink.download = "share_image.png";
	downloadLink.click();
}
