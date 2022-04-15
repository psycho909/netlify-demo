$("#fullpage").fullpage({
    menu: "#menu",
    anchors: ["sec1", "sec2", "sec3", "sec4"],
    // scrollOverflow: true,
    sectionSelector: ".sec",
    afterLoad: function (origin, destination, direction) {
        // origin 進入頁面的 index
    },
    onLeave: function (origin, destination, direction) {
        // origin 離開頁面的 index
    },
});

<nav id="menu" class="nav">
    <a href="javascrpit:;" class="nav-toggle"></a>
    <a href="javascript:;" class="nav-start">光之守護者 強勢歸來</a>
    <ul class="nav-list">
        <li class="nav-li active" data-sec="sec1" data-menuanchor="sec1">
            <a href="#sec1">光之守護者</a>
        </li>
        <li class="nav-li" data-sec="sec2" data-menuanchor="sec2">
            <a href="#sec2">技能介紹</a>
        </li>
        <li class="nav-li" data-sec="sec3" data-menuanchor="sec3">
            <a href="#sec3">職業轉換</a>
        </li>
        <li class="nav-li" data-sec="sec4" data-menuanchor="sec4">
            <a href="#sec4">GAMA COUPON</a>
        </li>
    </ul>
    <a href="https://tw.beanfun.com/LineageM/web/index.aspx" class="nav-home" target="_blank">官方網站</a>
</nav>


<div id="fullpage">
    <section class="sec sec1" data-anchor="sec1">
        <div class="sec-info"></div>
    </section>
</div>