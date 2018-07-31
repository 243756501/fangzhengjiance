//去掉a的虚线框
$("a").bind("focus", function () {
    if (this.blur) { this.blur() };
});
//导航栏菜单
function dropMenu(obj) {
    $(obj).each(function () {
        var theSpan = $(this);
        var theMenu = theSpan.find(".submenu");
        var tarHeight = theMenu.height();
        theMenu.css({ height: 0, opacity: 0 });
        theSpan.hover(
            function () {
                $(this).addClass("selected");
                theMenu.stop().show().animate({ height: tarHeight, opacity: 1 }, 300);
            },
            function () {
                $(this).removeClass("selected");
                theMenu.stop().animate({ height: 0, opacity: 0 }, 300, function () {
                    $(this).css({ display: "none" });
                });
            }
        );
    });
}

//左侧栏菜单
function dropLeftMenu(obj) {
    $(obj).each(function () {
        var theSpan = $(this);
        var theMenu = theSpan.find("dt");
        var theChild = theSpan.find("dd");
        theSpan.find("dd:last-child").css("border-bottom", "0");
        if (theChild.length == 0) {
            theMenu.css("border-bottom", "0");
        }
        theMenu.click(function () {
            theSpan.parent().find('dt').removeClass("selected");
            //theSpan.parent().find('dd').slideUp();
            $(this).addClass("selected");
            //$(this).parent().find('dd').slideDown();
        });
    });
}

//导航连接修改
function ChangeMenuLi() {
    $('li.drop-menu-effect').find("a").each(function () {
        var o = $(this).text();
        switch (o) {
            case "内部登录":
                $(this).removeAttr('href').attr({ href: 'https://218.75.126.173', target: '_blank' });
                break;
        }
    });
}

//内容页上下篇文字修改
function ChangeNeightorText() {
    $('.context .neightor .l').find("span").html("上一篇：");
    $('.context .neightor .r').find("span").html("下一篇：");
}




/////////////////////////////////文章字体缩放函数/////////////////////////////////////////////////////////////

/*

 对页面上的字体增大、缩小、恢复原始大小

 需要在html页面中定义三个元素

 元素的class分别为 resetFont、increaseFont、decreaseFont

 在本文件的JQuery事件中分别定义了三个元素的click事件来实现增大、缩小、恢复原始大小

 */
//恢复默认字体大小
function resetFontClick() {
    $(".content-main p,#content p,#content span").css("font-size", "14px");
    //JavaScript不向下执行
    return false;
}

//加大字体,某个元素的class定义为increaseFont
function increaseFontClick() {
    var currentFontSize = $(".content-main p,#content p").css("font-size");//取得当前字体大小 后缀px,pt,pc
    var currentFontSizeNumber = parseFloat(currentFontSize); //取得当前字体大小，parseFloat()转为float类型去除后缀
    if (currentFontSizeNumber < 22) {
        var newFontSize = currentFontSizeNumber * 1.1;//新定义的字体大小
        $(".content-main p,#content p,#content span").css("font-size", newFontSize);//重写样式表
    }
    //JavaScript不向下执行
    return false;
}

//减小字体，某个元素的class定义为decreaseFont
function decreaseFontClick() {
    var currentFontSize = $(".content-main p,#content p").css("font-size");//取得当前字体大小 后缀px,pt,pc
    var currentFontSizeNumber = parseFloat(currentFontSize); //取得当前字体大小，parseFloat()转为float类型去除后缀
    if (currentFontSizeNumber > 11) {
        var newFontSize = currentFontSizeNumber * 0.9;//重新定义字体大小
        $(".content-main p,#content p,#content span").css("font-size", newFontSize);//重写样式表
    }
    //JavaScript不向下执行
    return false;
}
//END//

/////////////////////////////////飘窗特效函数/////////////////////////////////////////////////////////////
function addEvent(obj, evtType, func, cap) {
    cap = cap || false;
    if (obj.addEventListener) {
        obj.addEventListener(evtType, func, cap);
        return true;
    } else if (obj.attachEvent) {
        if (cap) {
            obj.setCapture();
            return true;
        } else {
            return obj.attachEvent("on" + evtType, func);
        }
    } else {
        return false;
    }
}
function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageXOffset) {
        xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollLeft) {
        xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {
        xScroll = document.body.scrollLeft;
    }
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        yScroll = document.documentElement.scrollTop;
    } else if (document.body) {
        yScroll = document.body.scrollTop;
    }
    arrayPageScroll = new Array(xScroll, yScroll);
    return arrayPageScroll;
}
function GetPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else {
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) {
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}
var AdMoveConfig = new Object();
AdMoveConfig.IsInitialized = false;
AdMoveConfig.ScrollX = 0;
AdMoveConfig.ScrollY = 0;
AdMoveConfig.MoveWidth = 0;
AdMoveConfig.MoveHeight = 0;
AdMoveConfig.Resize = function () {
    var winsize = GetPageSize();
    AdMoveConfig.MoveWidth = winsize[2];
    AdMoveConfig.MoveHeight = winsize[3];
    AdMoveConfig.Scroll();
}
AdMoveConfig.Scroll = function () {
    var winscroll = getPageScroll();
    AdMoveConfig.ScrollX = winscroll[0];
    AdMoveConfig.ScrollY = winscroll[1];
}
addEvent(window, "resize", AdMoveConfig.Resize);
addEvent(window, "scroll", AdMoveConfig.Scroll);
function AdMove(id) {
    if (!AdMoveConfig.IsInitialized) {
        AdMoveConfig.Resize();
        AdMoveConfig.IsInitialized = true;
    }
    var obj = document.getElementById(id);
    obj.style.position = "absolute";
    var W = AdMoveConfig.MoveWidth - obj.offsetWidth - $("#" + id).children("div").width() - 2;
    var H = AdMoveConfig.MoveHeight - obj.offsetHeight - $("#" + id).children("div").height() - 2;

    var x = W * Math.random(), y = H * Math.random();
    var rad = (Math.random() + 1) * Math.PI / 6;
    var kx = Math.sin(rad), ky = Math.cos(rad);
    var dirx = (Math.random() < 0.5 ? 1 : -1), diry = (Math.random() < 0.5 ? 1 : -1);
    var step = 1;
    var interval;
    this.SetLocation = function (vx, vy) { x = vx; y = vy; }
    this.SetDirection = function (vx, vy) { dirx = vx; diry = vy; }
    obj.CustomMethod = function () {
        obj.style.left = (x + AdMoveConfig.ScrollX) + "px";
        obj.style.top = (y + AdMoveConfig.ScrollY) + "px";
        rad = (Math.random() + 1) * Math.PI / 6;
        W = AdMoveConfig.MoveWidth - obj.offsetWidth - $("#" + id).children("div").width() - 2;
        H = AdMoveConfig.MoveHeight - obj.offsetHeight - $("#" + id).children("div").height() - 2;
        x = x + step * kx * dirx;
        if (x < 0) { dirx = 1; x = 0; kx = Math.sin(rad); ky = Math.cos(rad); }
        if (x > W) { dirx = -1; x = W; kx = Math.sin(rad); ky = Math.cos(rad); }
        y = y + step * ky * diry;
        if (y < 0) { diry = 1; y = 0; kx = Math.sin(rad); ky = Math.cos(rad); }
        if (y > H) { diry = -1; y = H; kx = Math.sin(rad); ky = Math.cos(rad); }
    }
    this.Run = function () {
        var delay = 10;
        interval = setInterval(obj.CustomMethod, delay);
        obj.onmouseover = function () { clearInterval(interval); }
        obj.onmouseout = function () { interval = setInterval(obj.CustomMethod, delay); }
        $("#" + id).children("div").find("div.float-win-title a").click(function () {
            $("#" + id).remove();
        });
    }
}
//END//

/////////////////////////////////按钮特效函数/////////////////////////////////////////////////////////////
function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}
function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}

function MM_findObj(n, d) { //v4.01
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2) ; i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}
//END//


















