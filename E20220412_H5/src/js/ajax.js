var IsAjax = true;
function Ajax(){
	if(!IsAjax) return;
	IsAjax = false;
    $("#loadingProgress").show()
    var url="";
    var data={

    };
    $.ajax({
        url:url,
        data:data,
        complete:function(){
            $("#loadingProgress").hide()
        },
        success:function(data){
            if(!data.Success){
                ErrorText(data.ErrorText,data.Url)
                return;
            }
            if(data.Data == null{
                ErrorText("目前沒有獎勵",null)
                return;
            })
			IsAjax = true;
        },
        error:function(){
			IsAjax = true;
            message = '系統異常(FRL)';
            ErrorText(message, "Logout.aspx");
        }
    })
}


function MutiAjax(){
    if (!IsAjax) return;
    IsAjax = false;

    var data={
        AccountToken:GetAccountToken()
    }

    if (data.AccountToken == null || data.AccountToken == undefined) {
        location.href = "Logout.aspx"
        return;
    }

    $.when(
        $.ajax({
            url:url1,
            data:data,
            method:"POST",
            cache: false
        }),
        $.ajax({
            url:url2,
            data:data,
            method:"POST",
            cache: false
        })
    ).done(function(a,b){
        IsAjax = true;

    }).fail(function(error){
        message = '系統異常(FRL)';
        ErrorText(message, "Logout.aspx");

        isAjax = true;
    })
}

// 錯誤訊息
function ErrorText(text,url){
    $.gbox.open("<div class='error-text'>"+text+"</div>",{
        addClass:"default",
        hasCloseBtn: true,
        hasActionBtn: false,
        afterOpen:function(){
            setTimeout(function(){
                $(".gbox-close").addClass("error-close")
            }, 0);
        },
        afterClose:function(){
            if(url){
                var href=location.href;
                var path=location.pathname;
                var pathSplit=location.pathname.split("/");
                var len=pathSplit.length;
                pathSplit[len-1]=url;
                var newPath=pathSplit.join("/");
                location.href=href.replace(path,newPath)
            }
        }
    })
}