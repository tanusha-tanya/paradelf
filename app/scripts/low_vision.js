$(document).ready(function(){
	var isBlind = $.cookie("CecutientCookie");

	/*��������� ������ ��� ������������*/
    $('#CecutientOn').click(function(){
		CecutientOn();
		//$.cookie("CecutientCookie", "on");
		$.removeCookie("fonts", null);
		$.removeCookie("style", null);
		$.removeCookie("image", null);
		return false;
	});

    /*alert($.cookie("fonts")+'&'+$.cookie("CecutientCookie"));*/

	if (isBlind === "on") {
        CecutientOn();
        if ($.cookie("fonts")=="small"){SmallFonts();}
        if ($.cookie("fonts")=="medium"){MediumFonts();}
        if ($.cookie("fonts")=="big"){BigFonts();}
        if ($.cookie("image")=="on"){ImageOn();}
        if ($.cookie("image")=="off"){ImageOff();}
        if ($.cookie("style")=="white"){WhiteStyle();}
        if ($.cookie("style")=="black"){BlackStyle();}
        if ($.cookie("style")=="blue"){BlueStyle();}
        if ($.cookie("style")=="green"){GreenStyle();}
    }

    /*��������� ���������� �����������*/
    $('#ImageOn').click(function(){ImageOn();});
    $('#ImageOff').click(function(){ImageOff();});
    /*������ ������*/
    $('#SmallFonts').click(function(){SmallFonts();});
    $('#MediumFonts').click(function(){MediumFonts();});
    $('#BigFonts').click(function(){BigFonts();});
    /*�������� �����*/
    $('#WhiteStyle').click(function(){WhiteStyle();});
    $('#BlackStyle').click(function(){BlackStyle();});
    $('#BlueStyle').click(function(){BlueStyle();});
    $('#GreenStyle').click(function(){GreenStyle();});
    /*������� ���������� ��������� ������*/
    function CecutientOn(){
		$('#CecutientWrapper').addClass('vision');
        $('#CecutientOn, .Carousel').css("display","none");
        $('#CecutientOff').css("display","inline-block");
		$('body, html, .all_wrapper').css("background","#fff");
		$('#all #header').css({"height":"auto"});
		$('#panel').css({"height":"40px","padding":"20px 0"});
        $('iframe').css("display","none");
        $('.all_wrapper, #footer, #all').css({"padding":"0px"}).addClass('low_vision');
		$('.all_wrapper, footer, .container *').css({"background":"#fff","color":"#000"});
		$('.all_wrapper, #CecutientTop, p, .all_wrapper a, .container').css("color","#000");
		$('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
		$('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});
        $('#all #header,#all #header #slogan, #all #menu, #all #header #line').css({"background":"none","color":"#000"});
        $('.appointments').html("����������");
		$('.all_wrapper, #footer').css({"padding":"0px"}).removeClass('whitestyle, blackstyle, bluestyle, greenstyle');
        $.cookie("CecutientCookie", "on", {
            expires: 365,
            path: '/'
        });
        return false;
    }
    /*������� ��������� ������� ������*/
    function SmallFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, #footer, #all, #CecutientWrapper').removeClass("MediumFonts BigFonts").addClass("SmallFonts");
            $.cookie("fonts", "small", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function MediumFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, #footer, #all, #CecutientWrapper').removeClass("SmallFonts BigFonts").addClass("MediumFonts");
            $.cookie("fonts", "medium", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BigFonts(){
        if ($.cookie("CecutientCookie")=="on"){
            $('.all_wrapper, .all_wrapper a, #footer, #all, #CecutientWrapper').removeClass("SmallFonts MediumFonts").addClass("BigFonts");
            $.cookie("fonts", "big", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    /*������� ���������� ����������� �����������*/
    function ImageOn(){
        if ($.cookie("CecutientCookie")=="on"){
            $('img').css("display","inline-block");
            $('#ImageOff, .ipriem').css("display","inline-block");
            $('#ImageOn').css("display","none");
            $.cookie("image", "on", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function ImageOff(){
        if ($.cookie("CecutientCookie")=="on"){
            $('img, .ipriem').css("display","none");
            $('#ImageOff').css("display","none");
            $('#ImageOn, #CecutientBtn img').css("display","inline-block");
            $('').css("display","inline-block");
            $.cookie("image", "off", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    /*������� ��������� �������� �����*/
    function WhiteStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle blackstyle greenstyle").addClass("whitestyle");
            $('body, html, #mainContainer').css("background","#fff");
            $('.container').css({"padding":"0px"});
            $('.all_wrapper, #footer, .container *').css({"background":"#fff","color":"#000"});
            $('.all_wrapper, #CecutientTop, p, .all_wrapper a, .container').css("color","#000");
            $('.TopMenu').css({"border":"1px solid #000","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#000"});
            $.cookie("style", "white", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlackStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("bluestyle whitestyle greenstyle").addClass("blackstyle");
            $('body, html, #mainContainer').css("background","#000");
            $('#container').css({"padding":"0px","color":"#fff"});
            $('.all_wrapper, #footer, .container *').css({"background":"#000","color":"#fff"});
            $('.all_wrapper, #CecutientTop, p, .all_wrapper a').css("color","#fff");
            $('.TopMenu').css({"border":"1px solid #fff","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","color":"#fff"});
            $.cookie("style", "black", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function BlueStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle greenstyle").addClass("bluestyle");
            $('body, html, #mainContainer').css("background","#9DD1FF");
            $('.container').css({"padding":"0px"});
            $('.all_wrapper, #footer, .container *').css({"background":"#9DD1FF","color":"#063462"});
            $('.all_wrapper, #CecutientTop, p, .all_wrapper a, .container').css("color","#063462");
            $('.TopMenu').css({"border":"1px solid #063462","paddingBottom":"10px","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#063462"});
            $.cookie("style", "blue", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }
    function GreenStyle(){
        if ($.cookie("CecutientCookie")=="on"){
			$('.all_wrapper, #footer, #all, #CecutientWrapper').removeClass("blackstyle whitestyle bluestyle").addClass("greenstyle");
            $('body, html, #mainContainer').css("background","#3B2716");
            $('.container').css({"padding":"0px"});
            $('.all_wrapper, #footer, .container *').css({"background":"#3B2716","color":"#A9E44D"});
            $('.all_wrapper, #CecutientTop, p, .all_wrapper a, .container').css("color","#A9E44D");
            $('.TopMenu').css({"border":"1px solid #A9E44D","paddingTop":"10px","paddingBottom":"10px","marginTop":"10px"});
            $('.TopMenu li a').css({"background":"none","paddingTop":"0px","color":"#A9E44D"});
            $.cookie("style", "green", {
                expires: 365,
                path: '/'
            });
            return false;
        }
    }


    /*���������� ������ ��� ������������*/
    $('#CecutientOff').click(function(){
		$.cookie('CecutientCookie', null, {path:'/'});
		//$.cookie("CecutientCookie", "off");
		// $.removeCookie('CecutientCookie');
		$("#CecutienWrapper").slideUp();
		$.removeCookie('style');
		$.removeCookie('image');
		$.removeCookie('fonts', null);
        window.location.reload();
        return false;
    });
});
