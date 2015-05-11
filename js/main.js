$(function(){
	/*Just for framework website*/
	$('nav a').click(function(e){
		var attr = $(this).attr('href');
		attr = attr.replace('#', '');
		if ( !(attr == 'navSelect' || attr == 'close')) {			
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $('#' + attr).offset().top - 50
			}, 300);
		}
		$('nav a').removeClass('active');
		$(this).addClass('active');
	});
	var sections = $('.nav-sec'), nava = $('#fwNav a');
	$(window).scroll(function(){
		for (var i = 0, item; item = sections[i++];) {
			if ($(item).offset().top < $(window).scrollTop() + ($(window).height() / 4)) {
				$('#fwNav a').removeClass('active');
				var attr = $(item).attr('id'), href = $(nava[i - 1]).attr('href');
				href = href.replace('#', '');
				if (attr == href) {
					$(nava[i - 1]).addClass('active');
				}
			}
		}
	});
	/*End of just for framework JS*/
	
	//Placeholder fallback for <=IE8
	function placeholdersupport() {
        var check = document.createElement('input');
        return ('placeholder' in check);
    }
    if (placeholdersupport() == false) {
        $('[placeholder]').each(function () {
            var placeholder = $(this).attr('placeholder');
            $(this).val(placeholder);
        });
        $('[placeholder]').focus(function () {
            var placeholder = $(this).val();
            $(this).val('');
        });
        $('[placeholder]').blur(function () {
            if ($(this).val() == '') {
                var placeholder = $(this).attr('placeholder');
                $(this).val(placeholder);
            }
        });
    }
    
    //JS for accordions
    $('.accord-title').on('click', function (e) {
        e.preventDefault();
        var content = $(this).next('.accord-content');
        $(content).show();
        var parent = $(this).parent('.accord-item'), itemHeight = $(parent).outerHeight(), titleheight = $(this).outerHeight();
        if ($('.open').length > 0) {
            var open = $('.open');
            $('.open').animate({
                height: $('.open').find('.accord-title').outerHeight()
            }, 150, function () {
                $(open).height('auto');
                $(open).find('.accord-content').hide();
                $(open).removeClass('open');
            });
        }
        $(parent).toggleClass('open');
        if ($(parent).hasClass('open')) {
            $(parent).height(titleheight);
            $(parent).animate({
                height: itemHeight
            }, 200);
        } else {
            $(parent).animate({
                height: titleheight
            }, 150, function () {
                $(parent).height('auto');
                $(content).hide();
            });
        }
    });
    
    //CSS animation detection
    $('.example-anim-box').on('click', function(){
        var $this = $(this);
        $this.removeClass('animate');
        setTimeout(function(){
            $this.addClass('animate');
        }, 100);
    });

    $(window).scroll(function () {
        var animationItem = $('.js-scroll'), scrollPos = $(window).scrollTop();
        for (var i = 0; i < animationItem.length; i++) {
            var docBottom = $(window).scrollTop() + $(window).height(), itemPosTop = $(animationItem[i]).offset().top, itemPosBottom = itemPosTop + $(animationItem[i]).height();
            if ((itemPosTop <= docBottom - 100) && (itemPosTop >= scrollPos)) {
                $(animationItem[i]).addClass('animate');
            }
        }
    }).scroll();
	
	//Smooth scroll
	//Animation types: 
	var scrollOpt = {
		'speed': 1000,
		'timing': 'linear',
		'animation': 'none'
	}
	
});