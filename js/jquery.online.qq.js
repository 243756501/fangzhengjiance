$(function () {
    var onlineSP = 0;
	var _userAgent = window.navigator.userAgent.toLowerCase();
	if(_userAgent.indexOf('android')<0 && _userAgent.indexOf('iphone')<0 &&  _userAgent.indexOf('ipad')<0 )
	{ 
	    if (onlineSP == null || onlineSP == "0" || onlineSP == "")
		{
			$('.onlineService').hide();
			$('.floating-layer').show();		
		}
	    else if (onlineSP == "1")
		{
			$('.onlineService').show();
			$('.floating-layer').hide();		
		}
	}
	else{
		$('.onlineService').hide();
		$('.floating-layer').hide();
	}
	
	$('.onlineService').hover(function () {
	    $('.onlineService').hide();
	    $('.floating-layer').show();
	    onlineSP = 0;
	}, function () {
	    $('.floating-layer').hide();
	    $('.onlineService').show();
	    onlineSP = 1;
	}
	);
	$('.floating-layer').hover(function () {
	    $('.onlineService').hide();
	    $('.floating-layer').show();
	    onlineSP = 0;
	}, function () {
	    $('.floating-layer').hide();
	    $('.onlineService').show();
	    onlineSP = 1;
	}
	);
});