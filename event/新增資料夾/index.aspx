<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="MapleStory_Event_GCP.Event.E20230606.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" class="ovh">
	<head runat="server">
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- <meta name="viewport" content="width=750,user-scalable=0"> -->
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<meta name="description" content="新楓之谷全新改版✦Savior✦上線，睽違1.5年全新職業登場，超殺職業有夠好玩！" />
		<!-- 除了H5活動頁以外都要加上 -->
		<meta name="open-default-browser" content="true" />

		<!-- fb meta -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content="《新楓之谷maplestory》全新職業-卡莉，席捲登場！" />
		<meta property="og:description" content="最好玩的《新楓之谷》全新職業〈卡莉〉席捲登場全新改版✦Savior✦火熱上線，現在就開始你的冒險，和朋友一起大玩特玩！" />
		<!-- Safari 數字過常會變成可撥打電話 -->
		<meta name="format-detection" content="telephone=no" />
		<!-- 1200x628 -->
		<meta property="og:image" content="{{ url }}/assets/images/og-image.png" />

		<title>《新楓之谷maplestory》全新職業-卡莉，席捲登場！</title>
		<!-- CSS -->
		<link href="https://tw.hicdn.beanfun.com/plugins/swiper/8.3.2/swiper-bundle.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="./assets/css/default.css" />

		<!-- JS -->
		<!-- jQuery -->
		<script src="https://tw.hicdn.beanfun.com/plugins/swiper/8.3.2/swiper-bundle.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/isMobile/isMobile.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/jquery/jquery.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/jquery/jquery-migrate.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/gsap/3.4.0/gsap.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/particles/particles.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/vue/3.2.1/vue.global.js"></script>
		<!-- <script src="https://tw.hicdn.beanfun.com/plugins/vue/3.2.1/vue.global.prod.js"></script> -->
		<script src="https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/gbox/gbox.js"></script>
		<script type="text/javascript" src="https://tw.hicdn.beanfun.com/plugins/loadingProgress/loadingProgress.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/axios/0.21.1/axios.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/g-calendar/g-calendar.js"></script>
		<!-- 如果有載入topBar.js則不需要，因為topBar.js已自帶GA_CodeNew.js -->
		<script language="javascript" src="https://tw.beanfun.com/js/GA_CodeNew.js"></script>
	</head>
	<body>
		<!-- 內容開始 -->
		<div id="app">
			<loading :show-loading="showLoading"
				><div class="loadingProgress-num">{{ num }}</div></loading
			>
			<!-- 上方浮動選單 -->
			<div class="top-bar">
				<a href="https://maplestory.beanfun.com/main" class="top-bar__logo" target="_blank">logo</a>
				<a href="javascript:;" class="top-bar__open" @click="handleMenu(true)"></a>
				<div class="top-bar-box" :class="[menuStatus?'show':'']">
					<a href="javascript:;" class="top-bar__close" @click="handleMenu(false)"></a>
					<div class="top-bar__content">
						<div class="top-bar__item" :class="[currentPage == 'sec1'?'active':'']" @click="goPage('#sec1')"><a href="javascript::">全新職業卡莉</a></div>
						<div class="top-bar__item" :class="[currentPage == 'sec2'?'active':'']" @click="goPage('#sec2')"><a href="javascript::">Savior版本活動</a></div>
						<div class="top-bar__item" :class="[currentPage == 'sec3'?'active':'']" @click="goPage('#sec3')"><a href="javascript::">美味楓潮</a></div>
					</div>
					<div class="top-bar__social">
						<a href="https://maplestory.beanfun.com/main" class="btn-home" target="_blank"></a>
						<a href="https://www.facebook.com/www.maplestory.msfans.com.tw" class="btn-f" target="_blank"></a>
						<a href="https://www.instagram.com/maplestory_tw/ " class="btn-i" target="_blank"></a>
					</div>
				</div>
			</div>
			<!-- 右邊浮動選單 -->
			<div class="right-bar loading" :class="[loadRightBar?'':'unloading']">
				<div v-if="showCalender" class="g-calendar" begin="2023/06/20 00:00" end="2023/06/20 23:59" title="《新楓之谷maplestory》全新職業-卡莉，席捲登場！" description="6/20 全新職業-卡莉 席捲登場" autoDetectDevice="true">
					<a class="g-calendar-google btn-calender" href="javascript:;" v-if="mobileType == 'google' ">Google 活動行事曆提醒</a>
					<a class="g-calendar-ios btn-calender" href="javascript:;" v-if="mobileType == 'apple' ">IOS 活動行事曆提醒</a>
				</div>
				<a href="javascript:;" class="btn-top" @click="goTop">TOP</a>
			</div>
			<!-- 全新職業卡莉 -->
			<sec1 :mobile="mobile" :event="event" @show-loading="handleLoading"></sec1>
			<!-- Savior版本活動 -->
			<sec2 :mobile="mobile" :mobile-type="mobileType"></sec2>
			<!-- 品牌活動 -->
			<sec3 :mobile="mobile" @show-loading="handleLoading"></sec3>
		</div>
		<input id="Token" type="hidden" value="<%=Token %>" />
		<!-- footer -->
		<script type="text/javascript" src="https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/game-footer.js" id="game-footer" prod="新楓之谷" theme="dark"></script>
		<script type="module" src="./js/default.js"></script>
	</body>
</html>
