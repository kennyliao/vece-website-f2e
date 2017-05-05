
//購買數量按鍵限制
$(".count").keydown(function (e) {
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl/cmd+A(全選)
			(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl/cmd+C(複製)
			(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl/cmd+X(剪下)
			(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right(上下左右)
			(e.keyCode >= 35 && e.keyCode <= 39)) {
		// let it happen, don't do anything
		return;
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
});

var mobile_items = 1.5; //owl-carousel最小尺寸項目數

//home Vue.component
Vue.component("preorderblock",{
	template: "#preorder_block",
	props: [],
	computed: {
	},
	data: {
		count: 0
	},
	methods: {
	}
});

//home.html
var home_app = new Vue({
	el: "#home",
	data: {
		testdata: "",
		homepage_data: {
			icon_url: "images/illustration.svg",
			procedure: ["採花","萃取","檢測","裝瓶","出貨"]
		},
		hero_data:[
			{title:"逆齡時空肌系列1",content:"緊緻肌膚細緻、明亮、彈潤",img:"https://unsplash.it/1400/800?image=832"},
			{title:"逆齡時空肌系列2",content:"緊緻肌膚細緻、明亮、彈潤",img:"https://unsplash.it/1400/?image=823"},
			{title:"逆齡時空肌系列3",content:"緊緻肌膚細緻、明亮、彈潤",img:"https://unsplash.it/1400/800?image=64"},
			{title:"逆齡時空肌系列4",content:"緊緻肌膚細緻、明亮、彈潤",img:"https://unsplash.it/1400/800?image=65"},
			{title:"逆齡時空肌系列5",content:"緊緻肌膚細緻、明亮、彈潤",img:"https://api.fnkr.net/testimg/1440x567/bbccdd/FFF/?text=HERO5"}
		],
		preorder_data: [
			["3/1","3/4","3/14","3/24","4/1"],
			["3/14","3/20","4/14","4/24","4/30"],
			["3/31","4/4","4/14","4/24","5/1"]
		]
	},
	created: function(){
		this.fetchData();
	},
	methods: {
		fetchData: function(){
			var _this = this;
			$.getJSON("json/promot_data.json", function(data){
				_this.testdata = data;
				_this.$nextTick(function(){
					$(".owl-preorder").owlCarousel({
						center: true,
						items:3,
						nav:true,
						loop:false,
						dots: false,
						margin:0,
						responsive:{
							0:{
								items: 1.2
							},
							767:{
								items: 1.5
							},
							996:{
								items: 1.8
							}
						}
					});
					$(".owl-hero").owlCarousel({
						center: true,
						items:1,
						nav:false,
						loop:true,
						margin:0,
						dots: false,
						autoplay:true,
						autoplayTimeout:5000,
						autoplayHoverPause:false,
						responsive:{
							320:{
								items:1
							}
						}
					});
				})
			})
		}
	}
})

//product-application.html & pre-order-application.html
var products_app = new Vue({
	el: "#product_app",
	data:{
		product: "",
		promot_data: "", //同系列產品推介
		app_data: ""
	},
	//建立後取得資料
	created: function () {
		this.fetchData();
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.getJSON("json/promot_data.json", function(data){
				_this.promot_data = data;
				_this.$nextTick(function(){
					$(".owl-promot").owlCarousel({
						center: false,
						items: mobile_items,
						nav: true,
						loop: false,
						dots: false,
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

				},function(error){
					console.log(error);
				})
			})
			$.getJSON("json/product_app_data.json", function(data){
				_this.product = data;
			})
			$.getJSON("json/app_data.json", function(data){
				_this.app_data = data;
			})
		},
		sub: function(){
			if(this.product.quantity>1){this.product.quantity--;}
		},
		add: function(){
			if(this.product.quantity<100){this.product.quantity++;}
		},
		quantityLimit: function(){
			if(this.product.quantity>100){this.product.quantity=100;}
			if(this.product.quantity<1){this.product.quantity=1;}
		},
		changepage: function(event){
			this.app_data.active_page = event.target.getAttribute("data-id");
			console.log();
			$(".page_box").hide();
			$(".page_box."+this.app_data.active_page).show();
		},
		hide: function(event){
			$(".poster").hide();
			$(".video_block").get(0).play();
		}
	}
});

//products.html
var products = new Vue({
	el: "#products",
	data: {
		products_data: null
	},
	created: function () {
		this.fetchData();
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.getJSON("json/products_data.json", function(data){
				_this.products_data = data;
				_this.$nextTick(function(){
					$(".owl-products").owlCarousel({
						center: true,
						items: 2,
						nav: true,
						loop: true,
						dots: false,
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
				},function(error){
					console.log(error);
				})
			})
		}
	}
});

// pre-order.html
var pre_order = new Vue({
	el: "#pre-order",
	data: {
		pre_order_data: null
	},
	created: function () {
		this.fetchData();
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.getJSON("json/pre_order.json", function(data){
				_this.pre_order_data = data;
				_this.$nextTick(function(){
					$(".owl-promot").owlCarousel({
						center: false,
						items: 2,
						nav: true,
						loop: false,
						dots: false,
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
					$(".owl-pre-order-intro").owlCarousel({
						center: false,
						items: 5,
						nav: true,
						loop: false,
						dots: false,
						margin: 0,
						responsive:{
							0:{
								items: mobile_items
							},
							768:{
								items: 5
							}
						}
					});
				},function(error){
					console.log(error);
				})
			})
		}
	}
})

//aboutus.html
var aboutus = new Vue({
	el: "#aboutus",
	data: {
		aboutus_data: ""
	},
	created: function(){
		this.fetchData();
	},
	methods: {
		fetchData: function(){
			var _this = this;
			$.getJSON("json/aboutus_data.json", function(data){
				_this.aboutus_data = data;
				_this.$nextTick(function(){
					$(".owl-aboutus").owlCarousel({
						dotsContainer: "#owl-aboutus-dots",
						center: true,
						items: 1,
						nav:false,
						loop:false,
						margin:0,
						autoplay:false,
						dots: true,
						responsive:{
							0:{
								items: 1
							}
						}
					});
					$('.owl-dot').click(function () {
						$(".owl-aboutus").trigger('to.owl.carousel', [$(this).index(), 300]);
					});
				});

			}) 
		},
		play_video: function(event){
			$(".poster").hide();
			$(".video_block").get(0).play();
		},
		trans_dots: function(){
			if($(window).width()<=767){
				setTimeout(function(){
					var index_dot = $(".owl-dot.active").index();
					var distance = index_dot * -50 +50;
					$(".owl-dots").css({
						"transform": "translate("+distance+"%, 0)"
					});
				},100);
			}
		}
	}
})


//ingredients.html environment.html store.html 
var about = new Vue({
	el: "#about",
	data:{
		about_data: ""
	},
	created: function () {
		this.fetchData();
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.getJSON("json/about_data.json", function(data){
				_this.about_data = data;
				_this.$nextTick(function(){
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
				},function(error){
					console.log(error);
				})
			})
		}
	},
	computed:{
		telform : function(){
			return this.about_data[2].location.tel.slice(0,2)+" "+this.about_data[2].location.tel.slice(2,6)+" "+this.about_data[2].location.tel.slice(6);
		}
	}
});


//shoppimg-bag.html 購物車
Vue.component("bagitem",{
	template: "#bag_item",
	props: ["items_data","delete_item","id"],
	computed: {
		final_price: function(){
			return (this.items_data.item_price * this.items_data.quantity);
		}
	},
	data: {
		count: 0
	},
	methods: {
		sub: function(){
			if(this.items_data.quantity>1){this.items_data.quantity--;}
		},
		add: function(){
			if(this.items_data.quantity<100){this.items_data.quantity++;}
		},
		countLimit: function(){
			if(this.items_data.quantity>100){this.count=100;}
			if(this.items_data.quantity<1){this.count=1;}
		}
	}
});

//shopping_bag.html
var shopping_bag = new Vue({
	el: "#shopping_bag",
	data: {
		bag_data: ""
	},
	created: function () {
		this.fetchData();
	},
	computed: {
		sub_total_price: function(){
			if(this.bag_data.products)
				return this.bag_data.products.reduce(function(sum, product){
					return sum + parseInt(product.item_price)* parseInt(product.quantity);
				},0)
				else
					return 0;
		},
		trans_price: function(){
			return this.sub_total_price>=this.bag_data.trans_free?0:100;
		},
		total_price: function(){
			return this.sub_total_price+this.trans_price;
		}
	},
	methods: {
		fetchData: function(){
			var _this = this;
			$.get("json/bag_data.json", function(data){
				_this.bag_data = data;
			});
		},
		delete_item: function(id){
			console.log(id);
			this.bag_data.products.splice(id,1);
		}
	}
})

//check-out.html
var checkout = new Vue({
	el: "#checkout",
	data: {
		user_data: "",
		bag_data: "",
		buyer_data: {
			email: "",
			name: "",
			phone: "",
			county: "",
			district: "",
			street: "",
			trans_way: "1"
		},
		address_data: {
			county_data:[
				{name: "台北市", value: 0},
				{name: "新北市", value: 1},
				{name: "嘉義縣", value: 2}
			],
			district_data:[
				{name: "淡水區", value: 0},
				{name: "士林區", value: 1},
				{name: "大安區", value: 2}
			]
		}
	},
	created: function () {
		this.fetchData();
	},
	computed: {
		//合成地址
		final_address: function(){
			if(this.buyer_data.county !== "" && this.buyer_data.district !== "")
				return this.address_data.county_data[this.buyer_data.county].name+this.address_data.district_data[this.buyer_data.district].name+this.buyer_data.street;
			else
				return "";
		},
		//運送方式
		trans_way_word: function(){
			switch(this.buyer_data.trans_way){
				case "1":
					return "黑貓宅配";
					break;
				case "2":
					return "黑貓貨到付款";
					break;
				case "3":
					return "7-11 純取貨";
					break;
				default:
					return "";
					break;
			}
		},
		//運費
		trans_price: function(){
			return this.sub_total_price>=this.bag_data.trans_free?0:100;
		},
		//小計
		sub_total_price: function(){
			if(this.bag_data.products){
				return this.bag_data.products.reduce(function(sum, product){
					return sum + parseInt(product.item_price)* parseInt(product.quantity);
				},0)
			}else
				return 0;
		},
		//購買價格
		now_price: function(){
			if(this.bag_data.products){
				return this.bag_data.products.filter(function(obj){
					if(obj.pre_order == false)
						return true;
					else
						return false;
				}).reduce(function(sum, product){
					return sum + parseInt(product.item_price)* parseInt(product.quantity);
				},0);
			}else{
				return 0;
			}
		},
		//訂製價格
		pre_price: function(){
			if(this.bag_data.products){
				return this.bag_data.products.filter(function(obj){
					if(obj.pre_order == true)
						return true;
					else
						return false;
				}).reduce(function(sum, product){
					return sum + parseInt(product.item_price)* parseInt(product.quantity);
				},0);
			}else{
				return 0;
			}
		},
		//折扣價格
		discount_for_price: function(){
			var bag = this.bag_data;
			if(bag.products){
				//購買項目 0:無項目，1:購買項目，2:訂製項目，3:全部項目
				if(bag.discount_for == 1){
					return this.now_price;
				}else if(bag.discount_for == 2){
					return this.pre_price;
				}else if(bag.discount_for == 3){
					return this.sub_total_price;
				}else{
					return 0;
				}
			}else
				return 0;
		},
		//最大折抵額
		max_bonus: function(){
			return Math.floor(this.user_data.bonus_point/10);
		},
		//折扣量
		discount_price: function(){
			if(this.bag_data.discount_for && this.discount_for_price<=this.max_bonus){
				return this.discount_for_price;
			}else{
				return 0;
			}
		},
		//未來折扣量
		future_discount_price: function(){
			if(this.bag_data.discount_for){
				var max_bonus_money = Math.floor(this.user_data.bonus_point/10);
				if(this.discount_for_price>max_bonus_money)
					return max_bonus_money;
				else
					return this.discount_for_price;
			}else{
				return 0;
			}
		},
		//剩餘紅利點數
		left_bonus_point: function(){
			return this.user_data.bonus_point - this.discount_price*10;
		},
		//剩餘紅利可換額
		left_bonus_price: function(){
			return Math.floor(this.left_bonus_point/10);
		},
		//取終價格
		total_price: function(){
			return this.sub_total_price+this.trans_price-this.discount_price;
		}
	},
	//方法
	methods: {
		//從外部載入資訊
		fetchData: function(){
			var _this = this;
			$.get("json/user_data.json", function(data){
				_this.user_data = data;
			});
			$.get("json/bag_data.json", function(data){
				_this.bag_data = data;
			});
		},
		//判斷紅利折低項目
		discount: function(num){
			//0:無項目，1:購買項目，2:訂製項目，3:全部項目
			if(this.bag_data.discount_for == num){
				this.bag_data.discount_for = 0;
			}else if(this.bag_data.discount_for == 0){
				this.bag_data.discount_for = num;
			}else if(this.bag_data.discount_for == 3){
				this.bag_data.discount_for -= num;
			}else{
				this.bag_data.discount_for += num;
			}
			console.log(this.bag_data.discount_for);
		}
	}
})




//member Vue component
//shoppimg-bag.html 購物車
Vue.component("orderlist",{
	template: "#order_list",
	props: ["products"],
	computed: {
		final_price: function(){
			return (this.products.item_price * this.products.quantity);
		}
	},
	data: {
	},
	methods: {
	}
});

//member-center.html
var member_center = new Vue({
	el: "#member_center",
	data: {
		search_data: "",
		history_search_data: "",
		history_data: "",
		order_data: ""
	},
	created: function(){
		this.fetchData();
	},
	computed:{
		filter_data: function(){
			var _this = this;
			if(this.search_data == "" || Number(this.search_data) == NaN){
				return this.order_data;
			}else{
				return this.order_data.filter(function(obj){
					if(obj["order_id"].toString().indexOf(_this.search_data) == 0){
						return true;
					}else{
						return false;
					};
				})
			}
		},
		history_filter_data: function(){
			var _this = this;
			if(this.history_search_data == "" || Number(this.history_search_data) == NaN){
				return this.history_data;
			}else{
				return this.history_data.filter(function(obj){
					if(obj["order_id"].toString().indexOf(_this.history_search_data) == 0){
						return true;
					}else{
						return false;
					};
				})
			}
		}
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.get("json/history_data.json", function(data){
				_this.history_data = data;
			});
			$.get("json/order_data.json", function(data){
				_this.order_data = data;
			});
		}
	}
})


//FAQ.html
Vue.component("faquestion",{
	template: "#faquestion",
	props: ["question_data","id"],
	data: {
	},
	computed: {
		question_limit: function(){
			if(this.question_data.question.length > 22)
				return this.question_data.question.slice(0);
			else
				return this.question_data.question;
		}
	},
	methods:{
		show_ans: function(event){
			var ans = $(event.target).next();
			$(".faquestion h3").not(event.target).removeClass("active");
			$(".faqanswer").not(ans).slideUp(250);
			$(event.target).stop().toggleClass("active");
			ans.stop().slideToggle(250);
		}
	}
});

//FAQ.html
var faq = new Vue({
	el: "#faq",
	data: {
		question_data: [
			{
				type: "購買方式", 
				questions: [
					{question: "單件商品的計價上限是什麼？", content: "不同類別之成交商品，露天設有商品成交單價計費上限，自2,000 元到10,000元不等。"},
					{question: "已經下標成功和購買成功的紀錄在哪裡？", content: "您曾經下標的商品已經結標，如果您已經得標或是購買成功，商品會被紀錄在【買家專區】的表單中。"},
					{question: "賣家要具備什麼資格條件，才能開通使用PChomePay支付連信用卡功能？", content: "賣家只要完成PChomePay支付連帳戶四項認證，就可以至下列位置開通PChomePay支付連信用卡服務。"},
					{question: "如何連絡PChomePay支付連？", content: "您可以直接至以下連結提出問題，與PChomePay支付連的客服人員聯繫。"},
					{question: "賣家如何申請「露天拍賣˙7-ELEVEN交貨便」服務？", content: "登入露天拍賣後，您可於【我的拍賣】頁面左側點選「郵局/超商設定」，進入設定頁，必須填寫中文姓名與手機聯絡電話，並同意服務使用條款，完成後即申請服務成功。"}
				]
			},
			{
				type: "會員", 
				questions: [
					{question: "如何註冊成為會員?", content: "請選擇「加入會員」。詳細閱讀完露天會員使用條款後，如果同意請按「我同意遵守以上規定」，繼續填寫會員基本資料。"},
					{question: "如果我忘記密碼怎麼辦呢？", content: "如果您忘記密碼，請至以下連結輸入相關資料"},
					{question: "在台灣的外國人士如何註冊成為會員？", content: "若您不是台灣人，沒有中華民國身分證字號，可於【身分證字號】欄位改填入【統一證號】。若沒有【統一證號】跟【台灣地區手機門號】可進行身份認證，將無法註冊成為會員。"},
					{question: "我想要修改我的登入密碼/個人安全碼？", content: "請您登入後至我的拍賣點選會員資料旁的「修改」，輸入你的個人安全密碼之後會進入到「修改會員資料」頁面修改登入密碼。"},
					{question: "如何開啟兩步驟驗證服務？", content: "請您登入後到 露天拍賣> 我的拍賣 > 兩步驟驗證(個人安全電腦2.0) 點選「馬上啟用」。"},
					{question: "如何開啟兩步驟驗證服務？", content: "請您登入後到 露天拍賣> 我的拍賣 > 兩步驟驗證(個人安全電腦2.0) 點選「馬上啟用」。"}
				]
			},
			{
				type: "運送", 
				questions: [
					{question: "使用「黑貓宅急便貨到付款」需要什麼條件呢？", content: "只要您是露天的會員且具有賣家身份，您可於【我的拍賣】頁面左側點選「郵局/超商/宅急便設定」"},
					{question: "想使用「露天拍賣？全家、OK、萊爾富取貨付款」需要有什麼條件呢？", content: "只要您是露天的會員且具有賣家身份，您可於【我的拍賣】頁面左側點選「郵局/超商設定」"},
					{question: "賣家如何申請「露天拍賣˙7-ELEVEN交貨便」服務？", content: "登入露天拍賣後，您可於【我的拍賣】頁面左側點選「郵局/超商設定」，進入設定頁，必須填寫中文姓名與手機聯絡電話，並同意服務使用條款，完成後即申請服務成功。"},
					{question: "買家購買「黑貓宅急便貨到付款」的商品，需要申請嗎？", content: "只要賣家該商品賣場有提供「黑貓宅急便貨到付款」之結帳方式，買家將無須另外申請，於結帳時就可以選擇「黑貓宅急便貨到付款」服務"},
					{question: "我去寄貨，需要支付交寄費用嗎？", content: "賣家在超商門市交寄貨品時，無需先支付寄件費用，於寄件隔日運費將直接列入賣家的計費中心"}
				]
			},
		],
		search_data: ""
	},
	computed:{
		filter_data: function(){
			var _this = this;
			if(this.search_data == ""){ //沒有搜尋時
				return this.question_data;
			}else{
				return this.question_data.map(function(obj){
					var newObj = {};
					newObj["type"] = obj["type"];
					newObj["questions"] =  obj["questions"].filter(function(subobj){
						var tag = ["question","content"];
						var flag = false;
						tag.forEach(function(now_tag){
							if(subobj[now_tag].indexOf(_this.search_data) != -1){
								flag = true;
							}
						});
						return flag;
					});
//					if(obj.questions.indexOf(_this.search_data) != -1)
//						return true;
//					else
//						return false;
					return newObj;
				})
			}
		},
		have_filter: function(){
			var flag = false;
			var count = 0;
			for(var i=0;i<this.filter_data.length;i++){
				if(this.filter_data[i].questions.length != 0){
					flag = true;
				}
			}
			return flag;
		}
	},
	methods:{
	}
})

//search
var search_result = new Vue({
	el: "#search-result",
	data: {
		search_data: "",
		search_keyword: "逆齡"
	},
	created: function(){
		this.fetchData();
	},
	methods:{
		fetchData: function(){
			var _this = this;
			$.get("json/promot_data.json",function(data){
				_this.search_data = data;
			})
		}
	}
})


//$(".faquestion h3").click(function(){
//	console.log("hello!");
//	$(this.$el.myLink).next(".faqanswer").slideToggle();
//})


//播放影片
$(".cover").click(function(){
	console.log("clicked");
})


//aboutus 年份圖片
$("#aboutus .pages").bind("mouseup touchend",function(){
	if($(window).width()<=767){
		console.log("touched!");
		setTimeout(function(){
			var index_dot = $(".owl-dot.active").index();
			var distance = index_dot * -50 +50;
			$(".owl-dots").css({
				"transform": "translate("+distance+"%, 0)"
			});
		},100);
	}
})

//aboutus resize dots 定位
$(window).resize(function(){
	if($(window).width()>767){
		$(".owl-dots").css({
			"transform": "translate(0, 0)"
		});
	}
})