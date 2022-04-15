/*
使用說明
傳入 input的class

<!--[if IE]>
<script>
    add_placeholder("task1");
</script>
<![endif]-->

*/

function add_placeholder2(color) {
    var el = document.getElementsByTagName("input");

    for (var i = 0, len = el.length; i < len; i++) {
    	if(el[i].getAttribute("placeholder")){
    		el[i].onfocus = function () {
	            if (this.value == this.getAttribute("placeholder")) {
	                this.value = "";
	                this.style.cssText = "";
	            }
	        }
	        el[i].onblur = function () {
	            if (this.value.length == 0) {
	                this.value = this.getAttribute("placeholder");
	                this.style.cssText = 'color:'+color+';';
	            }
	        }
	        el[i].onblur();
    	}
    }
}

/* <div class="form-group">
	<input id="email" type="email" class="form-input" name="email">
	<label for="email">請輸入Email</label>
</div> */

function ieplaceholder(el){
    var val=$(el).val()
    if(val){
        if(val.length > 0){
            $(el).next("label").hide()
        }
    }
	$(el).on("focus",function(){
		var val=$(this).val()
		if(val.length > 0){
			$(this).next("label").hide()
		}else{
			$(this).next("label").show()
		}
	})
	$(el).on("blur",function(){
		var val=$(this).val()
		if(val.length > 0){
			$(this).next("label").hide()
		}else{
			$(this).next("label").show()
		}
	})
	
	$(el).on("input",function(){
		var val=$(this).val()
		if(val.length > 0){
			$(this).next("label").hide()
		}else{
			$(this).next("label").show()
		}
	})
}
ieplaceholder(".form-input");