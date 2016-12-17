
/*忽略ie错误*/
function killerrors() { return true; }

window.onerror = killerrors;

/*品牌列表*/
var brandArea = function () {
    $(".brand_class li").each(function (i) {
        $(this).mouseenter(function () {
            $(this).find("div").stop().animate({ "top": -50 }, 300);
        });
        $(this).mouseleave(function () {
            $(this).find("div").stop().animate({ "top": 0 }, 300);
        });
    });
};

var user_identity = 0;
$(function () {

  

    //head 弹出菜单部分
    var cateMenu = function () {
        var cateLiNum = $(".cateMenu li").length;
        $(".cateMenu li").each(function (index, element) {
            if (index < cateLiNum - 1) {
                $(this).mouseenter(function () {
                    var ty = $(this).offset().top - 158 - $(".header").offset().top + 120;
                    var obj = $(this).find(".list-item");
                    var sh = document.documentElement.scrollTop || document.body.scrollTop;
                    var oy = ty + (obj.height() + 30) + 158 + $(".header").offset().top - 120 - sh;
                    var dest = oy - $(window).height();
                    if (oy > $(window).height()) {
                        ty = ty - dest - 10;
                    }
                    if (ty < 0) ty = 0;
					
					ty = 0;
					
					
                    $(this).addClass("on");
                    obj.show();
                    $(".cateMenu li").find(".list-item").stop().animate({ "top": ty });
                    obj.stop().animate({ "top": ty });
                })
                $(this).mouseleave(function () {
                    $(this).removeClass("on");
                    $(this).find(".list-item").hide();
                })
            }
        });

        $(".navCon_on").hover(function () {
            $(".cateMenu").show();
        },
		function () {
		    $(".cateMenu").hide();
		})

    } ();

    var miniMenu = function () {
        /*购物列表*/
        $(".miniMenu").find(".m1").hover(
			function () {
			    $(this).addClass("on");
			    $(this).find(".mini-cart").show();
			    var dd = new Date();
			    $("#head_cart").load("/ajax/head/shoppingcart.htm?act=getitems&d=" + escape(dd));
			},
			function () {
			    $(this).removeClass("on");
			    $(this).find(".mini-cart").hide();
			}
		)
        /*用户中心*/
        $(".miniMenu").find(".m3").hover(
			function () {
			    $(this).addClass("cur");
			    $(this).find(".miniMenu-child").show();
			},
			function () {
			    $(this).removeClass("cur");
			    $(this).find(".miniMenu-child").hide();
			}
		)
    } ();


    /*topBar置顶*/
    var positionMenu = function (id) {
        var mc = document.getElementById(id);
        var minNumber = mc.offsetTop;
        var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;

        $(window).scroll(function () {
            var sh = document.documentElement.scrollTop || document.body.scrollTop;
            var th = document.documentElement.clientHeight;
            if (sh > minNumber) {
                mc.style.position = !isIE6 ? "fixed" : "absolute";
                mc.style.top = !isIE6 ? "0px" : sh + "px";
            } else {
                mc.style.position = "static";
                mc.style.top = minNumber + "px"
            }
        })
    } ("topBar")





})






//点赞
function PostPraise(type, docid, pre) {
    $.ajax({
        url: "http://faxian.gjw.com/Ajax/Praise/CustomerPraise.htm?act=praise&type=" + type + "&documetid=" + docid + "&uid=" + user_identity + "",
        type: "GET",
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'getPraise',
        success: function (data) {
            if (data.state == 1) {
                $("#" + pre + docid).html(data.value);
                alert("点赞成功");
            } else {
                alert("已点赞");
            }
        }
    })

}














