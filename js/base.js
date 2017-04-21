$(document).ready(function(){
 //  	$(".owl-carousel").owlCarousel({
	//     loop:false,
	//     margin:10,
	//     nav:true,
	//     responsive:{
	//         0:{
	//             items:1.2
	//         },
	//         767:{
	//             items:1.1
	//         },
	//         1000:{
	//             items:1.1
	//         },
	//         1200:{
	//             items:1.3
	//         },
	//         1400:{
	//             items:1.8
	//         },
	//         2500:{
	//             items:3
	//         }
	//     }
	// });
	$(".owl-hero").owlCarousel({
	    center: true,
	    items:1,
	    nav:false,
	    loop:true,
	    margin:0,
	    autoplay:true,
	    autoplayTimeout:5000,
	    autoplayHoverPause:false,
	    responsive:{
	        320:{
	            items:1
	        }
	    }
	});
	$(".owl-preorder").owlCarousel({
	    center: true,
	    items:3,
	    nav:true,
	    loop:false,
	    margin:0,
	    responsive:{
	        320:{
	            items:1.1
	        }
	    }
	});






	//滾動fix選單
	$(document).bind('scroll', function(){
    	var scrollTop=$(window).scrollTop();
    	if(scrollTop>20){
    		$('header').addClass('scroll');
    	}else{
    		$('header').removeClass('scroll');
    	}
	});

	//search-area開關
	$('.search-btn').click(function(){
		$('.search-area').addClass('active');
	}); 
	$('.search-close').click(function(){
		$('.search-area').removeClass('active');
	});


	//頁面最小高
	var windowHeight = $(window).height();
	$('section.content').css('min-height', windowHeight-114);
	$(window).resize(function(){
		var windowHeightResize = $(window).height();
		$('section.content').css('min-height', windowHeightResize-114);
	});

	//body scroll animately when input focus
	var windowWidth = $(window).width();
	$('div.input input').focus(function(){
		if(windowWidth < 767){
			// $("html, body").animate({ scrollTop: '370px' }, 600);
		}else if(windowWidth < 991){
			// $("html, body").animate({ scrollTop: '170px' }, 600);
		}else{

		}
		
	});



	//購物袋收合選單
	$('body[shopping-bag] section.content h2').click(function(){
		$(this).children('i').toggleClass('close-items');
		$(this).next().next().slideToggle();
	});
	//結帳收合
	$('body[checkout] section.content h3').click(function(){
		$(this).children('i').toggleClass('close-items');
		$(this).next().next().next().slideToggle();
	});

	//結帳下一步按鈕
	$('a.next-btn').click(function(){
		var dVal = $(this).attr('d');
		if(dVal == 'gostep2'){
			$('.breadcrumb>li:nth-of-type(2)').addClass('active');
		}else if(dVal == 'gostep3'){
			$('.breadcrumb>li:nth-of-type(3)').addClass('active');
		}
	});
	//結帳上一步按鈕
	$('div.step2 div.goback h4').click(function(){
		$('.breadcrumb>li:nth-of-type(2)').removeClass('active');
	});
	$('div.step3 div.goback h4').click(function(){
		$('.breadcrumb>li:nth-of-type(3)').removeClass('active');
	});




});