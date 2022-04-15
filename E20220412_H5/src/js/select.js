var selectStyle=(function(){
    var selectStyles=function(fix,reveal){
        this.fix=fix;
        this.reveal=reveal;
    }
    selectStyles.prototype.init=function(){
        if ($(this.fix).find('option[selected]').length === 1) {
            $(this.reveal).find('p').html($(this.fix).find('option[selected]').html());
        } else {
            $(this.reveal).find('p').html($(this.fix).find('option:first-child').html());
        }
        var _this=this;
        $(this.fix).on("change",function(){
            var newHTML = $(this).find(":selected").html();
            $(_this.reveal).find('p').html(newHTML);
        })
    }
    var init=function(fix,reveal){
        new selectStyles(fix,reveal).init();
    }
    return {
        init:init
    }
})()