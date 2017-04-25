$(document).ready(function(){
	
	var mobile_items = 1.5; //手機顯示欄位數
	
	$(".owl-pre-order-intro").owlCarousel({
		center: false,
		items: 5,
		nav: true,
		loop: true,
		dots: true,
		margin: 0,
		responsive:{
			0:{
				items: mobile_items
			},
			768:{
				items: 3
			},
			992:{
				items: 5
			}
		}
	});
	
	$(".owl-promot").owlCarousel({
		center: false,
		items: 2,
		nav: true,
		loop: false,
		dots: true,
		margin: 0,
		responsive:{
			0:{
				items: mobile_items
			},
			768:{
				items: 2
			},
			992:{
				items: 3
			}
		}
	});
	
	$(".owl-products").owlCarousel({
		center: true,
		items: 2,
		nav: true,
		loop: true,
		dots: true,
		margin: 0,
		responsive:{
			0:{
				items: 2
			},
			768:{
				items: 3
			},
			992:{
				items: 5
			}
		}
	});
	
	$(".owl-pages").owlCarousel({
	    center: true,
	    items: 1.1,
	    nav:false,
	    loop:false,
	    margin:0,
	    autoplay:false,
			dots: false,
	    responsive:{
				0:{
					items: 1.2
				},
				768:{
					items: 1.6
				}
	    }
	});
	
	//購買數量按鍵
	$(".count").keydown(function (e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl/cmd+A
			(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl/cmd+C
			(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl/cmd+X
			(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

	//播放影片
	$(".poster").click(function(){
		$(this).hide();
		$(this).next().get(0).play();
	})
	
})

// pre order Vue
var pre_order_app = new Vue({
	el: "#pre-order-app",
	data: {
		//頁面介面與介紹文字
		page_data: {
			title: "訂製新鮮保養品",
			discription: "我們在您訂製後，才開始採花，製作保養品。製成後在最短的時間內配送給您，給您的肌膚最新鮮的活性。",
			intro: [
				{title:"培育四年", content:"故事由一株瓶苗開始，經過小苗、中苗、大苗到開花，每一個步驟都細心呵護。如此經過了四年，才會長成今天我們看到的蘭花", img: "images/grey_block.png"},
				{title:"手工採花", content:"在有著絕佳純淨環境的阿里山上，孕育著LanVece享有世界品種權的蝴蝶蘭，四年的用心以手工採摘後延續下去", img: "images/grey_block.png"},
				{title:"定量萃取", content:"花朵採摘後，迅速以低溫、小量與短距的綠色萃取技術，將花朵的活性濃縮精淬，產出最高鮮活效的植萃原液", img: "images/grey_block.png"},
				{title:"微生物檢測", content:"完成了萃取製程，LanVece也在安全方面做足把關，我們的產品皆須通過SGS微生物檢測，層層機制來確保產品的穩定", img: "images/grey_block.png"},
				{title:"裝瓶", content:"通過檢測的萃取液，由符合保養品高規格標準的GMP廠，在無塵室進行裝瓶，一瓶瓶滿載養分的LanVece就此誕生", img: "images/grey_block.png"}
			],
			order_date: "訂製日"
		},
		//訂制產品1
		series_1: {	
			title: "逆齡時空肌系列",
			date: { //訂制日期
				from: "3/1",
				to: "3/14"
			},
			product: [
				{name:"逆齡時空肌蘭萃水菁華",price:"1500", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"逆齡時空肌蘭萃水肌皂",price:"2000", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"逆齡時空肌蘭萃水菁華",price:"2500", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"逆齡時空肌蘭萃美肌皂",price:"3000", image: "images/products/product-demo.png", url: "pre-order-application.html"}
			]
		},
		//訂制產品2
		series_2: {	
			title: "逆齡時空肌系列",
			date: {  //訂制日期
				from: "2/15",
				to: "2/28"
			},
			product: [
				{name:"逆齡時空肌蘭萃菁華液",price:"1500", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"男仕自由肌蘭萃水菁華",price:"2000", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"逆齡時空肌蘭萃水菁華",price:"2500", image: "images/products/product-demo.png", url: "pre-order-application.html"},
				{name:"逆齡時空肌蘭萃美肌皂",price:"3000", image: "images/products/product-demo.png", url: "pre-order-application.html"}
			]
		}
	}
})


//產品資料
var product_data = {
	name: "逆齡時空肌蘭萃菁華液",  
	discript: "高雅淡紫色的菁華液，為珍貴抗老、抗自由基成份",
	price: 3500,
	capacity: 30,
	image: "images/products/product-demo.png",
	//使用方式的影片縮圖、連結和步驟
	application: { 
		video:{
			img: "https://unsplash.it/1400/800?image=64",
			url: "https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
		},
		guide: ["取約一顆珍珠大小的菁華液","點在前額、臉頰及下巴位置","從中央向外慢慢推開至全臉"]
	},
	//產品成份和補充
	ingredients: {main:"Water、Caprylic / Capric Triglyceride、Glycerin、Propylheptyl Caprylate、Hydrogenated Polyisobutene、Anthemis Nobilis Water *、Stearyl Alcohol、Isododecane、Glyceryl Stearate、PEG-100 Stearate、PEG-4 Olivate、Undaria Pinnatifida Extract、Laminaria Digitata Extract、Dextrin、Phenoxyethanol、Ethylhexylglycerin",sub:"ingredient with “ * ” means its organic"},
	//產品功效
	effect: "產品的功效",
	pre_order_date: {
		from: "3／1",
		to: "3／14"
	},
	//使用者回饋和照片
	user_comment: [
		{name: "Ledia", comment: "“給了我一個很酷的彩虹色，液體閃光燈很緊，因為它順利進行。 非常童話喜歡.”", img: "https://unsplash.it/1400/?image=823"},
		{name: "Coco", comment: "“液體閃光燈很緊，因為它順利進行，給了我一個很酷的彩虹色。 非常童話喜歡.”", img: "https://unsplash.it/1400/800?image=64"},
		{name: "Cena", comment: "“液體閃光燈很緊，因為它順利進行，給了我一個很酷的彩虹色。 非常童話喜歡.”", img: "https://unsplash.it/1400/800?image=65"}
	],
	pre_order_procedure: [
		{event: "採花", date: "3／15"},
		{event: "萃取", date: "3／17"},
		{event: "檢測", date: "3／26"},
		{event: "裝瓶", date: "4／3"},
		{event: "出貨", date: "4／6"}
	]
};

// product_app Vue
var products_app = new Vue({
	el: "#product_app",
	data:{
		product: product_data,	//產品資料	
		count: 1,		//購買數量
		active_page: "application", //記錄分頁現時位置
		//分頁描述，方便中英切換
		page_item: [{cht_name:"使用方式", eng_name:"application"},
								{cht_name:"成份", eng_name:"ingredients"},
								{cht_name:"功效", eng_name:"effect"}],
		//同系列產品推介
		promot_data: {	
			series_title: "逆齡時空肌系列",
			product: [
				{name:"逆齡時空肌蘭萃水菁華",price:"1500", date: {from: "04／01", to: "04/15"}, image: "images/products/product-demo.png", url: "#"},
				{name:"逆齡時空肌蘭萃水肌皂",price:"2000", date: {from: "04／01", to: "04/15"}, image: "images/products/product-demo.png", url: "#"},
				{name:"逆齡時空肌蘭萃水菁華",price:"2500", date: {from: "04／01", to: "04/15"}, image: "images/products/product-demo.png", url: "#"},
				{name:"逆齡時空肌蘭萃美肌皂",price:"3000", date: {from: "04／01", to: "04/15"}, image: "images/products/product-demo.png", url: "#"}
			]
		}
	},
	methods:{
		sub: function(){
			if(this.count>1){this.count--;}
		},
		add: function(){
			if(this.count<100){this.count++;}
		},
		countLimit: function(){
			if(this.count>100){this.count=100;}
			if(this.count<1){this.count=1;}
		},
		changepage: function(e){
			this.active_page = e.target.getAttribute("data-id");
			console.log();
			$(".page_box").hide();
			$(".page_box."+this.active_page).show();
		}
	}
});

//產品與系列
var products = new Vue({
	el: "#products",
	data: {
		products:{
			title: "逆齡時空肌系列",
			discript: "緊緻肌膚細緻、明亮、彈潤，專為細紋、缺乏彈性或熟齡的女性肌膚所設計",
			img: "https://unsplash.it/1400/800?image=64",
			notice: ["洗臉後使用","搭配全系列使用效果更佳"],
			intro:{
				title: "全系列兩大成分",
				item: [
					{name: "高濃度蘭萃", content: "緊緻抗老、淨白透亮、抗敏保濕、營養"},
					{name: "新鮮的紫色花青素", content: "高濃度花青素、預防老化、緊緻彈潤肌膚防禦力"}
					]
			},
			products_data: [
				{name:"逆齡時空肌蘭萃水菁華", price:2000, img: "images/products/product-demo.png", url:"product-application.html"},
				{name:"逆齡時空肌蘭萃水菁華液", price:2000, img: "images/products/product-demo.png", url:"product-application.html"},
				{name:"逆齡時空肌蘭萃美肌皂", price:2000, img: "images/products/product-demo.png", url:"product-application.html"}
			]
		},
		//其他系列
		series:[
			{name:"舒敏平衡肌系列", img: "images/grey_block.png", color: "#f8e2e5"},
			{name:"晶透綻白肌系列", img: "images/grey_block.png", color: "#fce8cd"},
			{name:"導水瞬透肌系列", img: "images/grey_block.png", color: "#fdfacd"},
			{name:"全效系列 ", img: "images/grey_block.png", color: "#ecf4ce"}
		]
	}
})
//關於
var about = new Vue({
	el: "#about",
	data: about_data || ""
})
	