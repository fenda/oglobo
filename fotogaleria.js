// array url crop original
urlOrig = [];

// top descrição da imagem
$.descriptionHeight = function() {
	setTimeout(function() {
		var detailsHeight = $('#photoGallery .gallery .details').height();
		$('#photoGallery .gallery ul li p').css('top', detailsHeight);
	}, 300);
};

// top descrição da imagem no ipad
$.detailsHeightIpad = function() {
	setTimeout(function() {
		var paragrHeight = $('#photoGallery .gallery ul li a.slideshowGallery .img').innerHeight();
		$('#photoGallery .gallery .caption.ipad, #photoGallery .sharing').css('top', paragrHeight + 35);
	}, 500);
};

// altura x altura fullscreen
$.screenLimit = function() {
	var screenHeight = $(window).height();
	var screenWidth = $(window).width();
	$('#photoGallery.fullScreen .gallery ul li .img').css({'max-height': screenHeight, 'max-width': screenWidth});
	$('#photoGallery.fullScreen .gallery ul li .img img').css({'max-height': screenHeight});
};

// fechar fullscreen
$.closeFullscreen = function(urlOrig){
	$('#photoGallery').removeClass('fullScreen');
	$('#photoGallery.fullScreen .gallery ul li .img').css({'height': 'auto', 'width': '100%'});
	$('#photoGallery.fullScreen .gallery ul li p, #photoGallery.fullScreen .gallery .details').show();

	for(var i = 0; i < urlOrig.length; i++){
		$('#photoGallery .gallery ul li.horizontal').eq(i).find('img').attr('src', urlOrig[i]);
	}

	var screenSize = $(window).width();
	if (screenSize < 1024) {
		$('#photoGallery .gallery .details').hide();
	}

	var imageHeight = $('#photoGallery .gallery ul li.horizontal .img img').height();
	$('#photoGallery .gallery ul li.vertical .img img').height(imageHeight);
};

// abrir fullscreen
$.fullScreen = function(urlOrig){
	$('#photoGallery .gallery ul li a.slideshowGallery').on('click', function(e){
		e.preventDefault();
		
		setTimeout(function() {
			$.imgVert();
			$.screenLimit();
		}, 100);

		$('#photoGallery').addClass('fullScreen');
		$('#photoGallery .gallery ul').hide();
		$('#photoGallery .gallery ul').fadeIn();

		var imageHeightFull = $('#photoGallery.fullScreen .gallery ul li.horizontal .img').height();
		$('#photoGallery.fullScreen .gallery ul li.vertical .img img').height(imageHeightFull);

		$('#photoGallery.fullScreen .gallery ul li a.slideshowGallery').on('click',function(){
			e.preventDefault();
			return false;
		});

		// movimento do mouse
		var movemnTime = null;
		$("#photoGallery").mousemove(function() {
			clearTimeout(movemnTime);
			$('#photoGallery.fullScreen .gallery ul li p, #photoGallery.fullScreen .gallery .details, #photoGallery.fullScreen .gallery > .nav a').fadeIn();
			movemnTime = setTimeout(function(){
				$('#photoGallery.fullScreen .gallery ul li p, #photoGallery.fullScreen .gallery .details, #photoGallery.fullScreen .gallery > .nav a').fadeOut('slow');
			}, 5000);
		}).mouseleave(function() {
			clearTimeout(movemnTime);
			$('#photoGallery.fullScreen .gallery ul li p, #photoGallery.fullScreen .gallery .details, #photoGallery.fullScreen .gallery > .nav a').fadeOut('slow');
		});

		$('#photoGallery .gallery ul li.horizontal').each(function(){
			urlOrig.push($(this).find('img').attr('src'));
			var padrao_regex= /FT\w*\//i;
			var src_img = $(this).find('img').attr('src');
			var newUrl = src_img.replace(padrao_regex, 'FT1500A/');

			$(this).find('img').attr('src', newUrl);
		});

		$('#photoGallery.fullScreen .contract').on('click', function(e){
			e.preventDefault();
			$.closeFullscreen(urlOrig);
		});
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				$.closeFullscreen(urlOrig);
			}
		});
		return false;
	});
};

// altura imagem vertical igual a horizontal
$.imgVert = function() {
	var imageHeight = $('#photoGallery .gallery ul li.horizontal .img img').height();
	$('#photoGallery .gallery ul li.vertical .img img').height(imageHeight);
};

// 
$.resizeGallery = function(urlOrig) {
	//$.fullScreen();
	$.descriptionHeight();
	var screenSize = $(window).width();
	
	if (screenSize > 1200) {
		$.fullScreen(urlOrig);

		$(document).on('cycle-post-initialize', '#lastFrom .carousel ul', function(){
			setTimeout(function() {
				var items = $('#lastFrom .cycle-carousel-wrap li.cycle-slide').length;
				console.log(items);
				if (items < 21) {
					$('#lastFrom .nav').hide();
					//$(this).css('width', '209px !important');
					$('#lastFrom .carousel ul').cycle('destroy');
					$('#lastFrom .carousel ul li').addClass('noCycle');
				}
			}, 700);
		});

		$('#lastFrom .carousel ul').cycle({
			fx: 'carousel',
			timeout: 0,
			next: '#lastFrom .next',
			prev: '#lastFrom .prev',
			carouselVisible: 6,
			carouselFluid: true,
			slides: '> li',
			autoHeight: 'calc',
			carouselGlide: true,
			log: false
		}); 


	} else if (screenSize > 1025 && screenSize < 1200) {
		$.descriptionHeight();
		$.fullScreen(urlOrig);
		$('#lastFrom .carousel ul').cycle('destroy');
		$(document).on('cycle-post-initialize', '#lastFrom .carousel ul', function(){
			setTimeout(function() {
				var items = $('#lastFrom .cycle-carousel-wrap li.cycle-slide').length;
				console.log(items);
				if (items < 15) {
					$('#lastFrom .nav').hide();
					$('#lastFrom .carousel ul').cycle('destroy');
					$('#lastFrom .carousel ul li').addClass('noCycle');
				}
			}, 700);
		});
		$('#lastFrom .carousel ul').cycle({
			fx: 'carousel',
			timeout: 0,
			next: '#lastFrom .next',
			prev: '#lastFrom .prev',
			carouselVisible: 4,
			carouselFluid: true,
			slides: '> li',
			autoHeight: 'calc',
			carouselGlide: true,
			log: false
		});


	} else if (screenSize < 1025) {
		$.detailsHeightIpad();
		$('#photoGallery .gallery ul li a.slideshowGallery').on('click', function(e){
			e.preventDefault();
		});
		$('#lastFrom .carousel ul').cycle('destroy');
		$('#lastFrom .carousel ul').cycle({
			fx: 'carousel',
			timeout: 0,
			next: '#lastFrom .next',
			prev: '#lastFrom .prev',
			carouselVisible: 3,
			carouselFluid: true,
			slides: '> li',
			autoHeight: 'calc',
			carouselGlide: true,
			log: false
		});

	}

};

$(document).ready(function(){
	$.resizeGallery(urlOrig);
	setTimeout(function() {
		$.imgVert();
	}, 500);

	var screenSize = $(window).width();
	if (screenSize < 1025) {
		$.detailsHeightIpad();
	}

});

$(window).on('resize', function() {
	$.resizeGallery(urlOrig);
	$.imgVert();
	$.screenLimit();
});
