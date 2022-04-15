/*
<div class="maplestyle-slide">
    <div class="maplestyle-slide__dot-content">
        <span class="maplestyle-slide__dot-item"></span>
        <span class="maplestyle-slide__dot-item"></span>
        <span class="maplestyle-slide__dot-item"></span>
        <span class="maplestyle-slide__dot-item"></span>
        <span class="maplestyle-slide__dot-item"></span>
        <span class="maplestyle-slide__dot-item"></span>
    </div>

    <div class="maplestyle-slide__content">
        <a href="https://youtu.be/pbibYJqFunk" class="maplestyle-slide__item" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide__item" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide__item" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide__item" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide__item" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide__item" target="_blank"></a>
    </div>

    <a href="javascript:;" class="maplestyle-slide__prev"></a>
    <a href="javascript:;" class="maplestyle-slide__next"></a>
</div>
*/

var slider = tns({
	container: ".maplestyle-slide__content",
	mouseDrag: false,
	loop: false,
	autoplay: false,
	autoplayTimeout: 5000,
	autoplayButtonOutput: false,
	items: 1,
	slideBy: "page",
	nav: true,
	navContainer: ".maplestyle-slide__dot-content",
	prevButton: ".maplestyle-slide__prev",
	nextButton: ".maplestyle-slide__next",
});
