var windowHeight = $(window).height(); var windowWidth = $(window).width();

//light_box
if($.fn.lightbox_me != undefined){
	//home light_box
	var home_light_box = $("#light_box");
	home_light_box.lightbox_me({
		apprearEffect: "fadeIn",
		disappearEffect: "fadeOut",
		overlaySpeed: 300,
		lightboxSpeed: 300,
		destroyOnClose: true,
		closeClick: true,
		centered: true,
		zIndex: 9999,
		overlayCSS: {
			background: 'black', 
			opacity: .6
		},
		onLoad: function(){
			var _this = $(this);
			var time = 5, t;
			home_light_box.trigger('reposition');
			$(".message").css("display","block").html(time);
			t = setInterval(function(){
				if(time>0)
					time--;
				if(time==0){
					clearInterval(t);
					closeLightbox(home_light_box);
				}
				$(".message").html(time);
			},1000);
		}
	});
	home_light_box.children(".light_box_close").click(function(){
		closeLightbox(home_light_box);
	})
}

//訂購頁條款視窗
$(".agree-policy h5").click(function(e){
	e.preventDefault();
	$("#policy_box").trigger('reposition');
	$("#policy_box").lightbox_me({
		appearEffect: "fadeIn",
		disappearEffect: "fadeOut",
		overlaySpeed: 300,
		lightboxSpeed: 300,
		closeClick: true,
		centered: true,
		zIndex: 9999,
		overlayCSS: {
			background: 'black', 
			opacity: .6
		},
		onLoad: function(){
			$("body").css("overflow","hidden");
		},
		onClose: function(){
			$("body").css("overflow","auto");
		}
	})
})

//註冊頁條款視窗
$(".terms h5").click(function(e){
	e.preventDefault();
	$("#policy_box").trigger('reposition');
	$("#policy_box").lightbox_me({
		appearEffect: "fadeIn",
		disappearEffect: "fadeOut",
		overlaySpeed: 300,
		lightboxSpeed: 300,
		closeClick: true,
		centered: true,
		zIndex: 9999,
		overlayCSS: {
			background: 'black', 
			opacity: .6
		},
		onLoad: function(){
			$("body").css("overflow","hidden");
		},
		onClose: function(){
			$("body").css("overflow","auto");
		}
	})
})
$("#policy_box").children("button").click(function(){
	closeLightbox($("#policy_box"));
})

//關閉light_box淡出效果
function closeLightbox(dom){
	var item = dom;
	dom.fadeOut(300);
	dom.closest(".lb_overlay").fadeOut(300);
	setTimeout(function(){
		dom.trigger("close");
	},300);
}

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
// $('.search-btn').click(function(){
// 	$('.search-area').addClass('active');
// }); 
// $('.search-close').click(function(){
// 	$('.search-area').removeClass('active');
// });


//頁面最小高
$('section.content').css('min-height', windowHeight-114);
$(window).resize(function(){
	var windowHeightResize = $(window).height();
	$('section.content').css('min-height', windowHeightResize-114);
});


//body scroll animately when input focus
$('div.input input').focus(function(){
	if(windowWidth < 767){
		// $("html, body").animate({ scrollTop: '370px' }, 600);
	}else if(windowWidth < 991){
		// $("html, body").animate({ scrollTop: '170px' }, 600);
	}else{

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
// $('.search-btn').click(function(){
// 	$('.search-area').addClass('active');
// }); 
// $('.search-close').click(function(){
// 	$('.search-area').removeClass('active');
// });


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
//歷史訂單收合
$('body[member-center] section.content #order h3').click(function(){
	$(this).children('i').toggleClass('close-items');
	$(this).parent().next().next().slideToggle();
});
$('body[member-center] section.content #past-order h3').click(function(){
	$(this).children('i').toggleClass('close-items');
	$(this).parent().next().next().slideToggle();
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

//變更密碼跳窗
$('button.change-password').click(function(e) {
	$('.change-password-area').lightbox_me({
		centered: true, 
		onLoad: function() { 
			$('.change-password-area').find('input:first').focus();
		}
	});
	e.preventDefault();
});
$('button.change-password-close').click(function(){
	$('.change-password-area').trigger('close');
});
$(window).resize(function(){
	$('.change-password-area').trigger('reposition');
});


//地址input
$('.input.address select').change(function() {
	var current = $(this).val();
	if (current != 'null') {
		$(this).css('color','#2e2f31');
	} else {
		$(this).css('color','#b6b6b8');
	}
}); 

function searchAreaToggle(e){
	if(e=='1'){
		$('.search-area').addClass('active');
		$('.search-area').find('input:first').focus();
	}else if(e=='0'){
		$('.search-area').removeClass('active');
	}
}


//search area 關閉
var blurcount;
function blurit(e,time){
	if(e == "0"){
//		console.log("blur");
		blurcount = setTimeout(function(){
			searchAreaToggle("0");
		},time);
	}else if(e == "1"){
//		console.log("focus");
		clearTimeout(blurcount);
	}
}

var iframe_link = 'unimartmap.php';
function show_cvs_map() {
	window.open(iframe_link,'CVS map',config='width=1024,height=600,status=no,scrollbars=yes,toolbar=no,location=no,menubar=no');
}
function set_store_info(CVSStoreID,CVSStoreName,CVSAddress,CVSTelephone) {
	$('.store-name>span').html(CVSStoreName);
	$('.store-address>span').html(CVSAddress);
	$('#store_id').val(CVSStoreID);
	$('#store_name').val(CVSStoreName);
	// $('.store-phone>span').html(CVSTelephone);
	// $('.store-info').show();
	// $('.ecpaylogistic-warning').hide();
	// $('.checkselectecpaylogistic').prop('value','selected');
}

$(window).load(function(){
	$(".loading-page").fadeOut(500);
})