$(document).ready(function(){

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

	//product-application.html & pre-order-application.html
	var products_app = new Vue({
		el: "#product_app",
		data:{
			product: "",	//產品資料
			count: 1,		//購買數量
			active_page: "application", //記錄分頁現時位置
			//分頁描述，方便中英切換
			page_item: [{cht_name:"使用方式", eng_name:"application"},
									{cht_name:"成份", eng_name:"ingredients"},
									{cht_name:"功效", eng_name:"effect"}],
			promot_data: "", //同系列產品推介
			interface_data: {
				count: 1,		//購買數量
				active_page: "application", //記錄分頁現時位置
				//分頁描述，方便中英切換
				page_item: [{cht_name:"使用方式", eng_name:"application"},
										{cht_name:"成份", eng_name:"ingredients"},
										{cht_name:"功效", eng_name:"effect"}],
			}
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
			},
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
			changepage: function(event){
				this.active_page = event.target.getAttribute("data-id");
				console.log();
				$(".page_box").hide();
				$(".page_box."+this.active_page).show();
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
	//ingredients.html environment.html store.html 
	var about = new Vue({
		el: "#about",
		data:{
			about_data: "",
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
			bag_data: ""
		},
		created: function () {
			this.fetchData();
		},
		computed: {
			//折扣價格
			discount_for_price: function(){
				var bag = this.bag_data;
				if(this.bag_data.products){
					//購買項目 0:無項目，1:購買項目，2:訂製項目，3:全部項目
					if(bag.discount_for == 1){
						return bag.products.filter(function(obj){
							if(obj.pre_order == false)
								return true;
							else
								return false;
						}).reduce(function(sum, product){
							return sum + parseInt(product.item_price)* parseInt(product.quantity);
						},0)
					}else if(bag.discount_for == 2){
						return bag.products.filter(function(obj){
							if(obj.pre_order == true)
								return true;
							else
								return false;
						}).reduce(function(sum, product){
							return sum + parseInt(product.item_price)* parseInt(product.quantity);
						},0)
					}else if(bag.discount_for == 3){
						return this.sub_total_price;
					}else{
						return 0;
					}
				}else
					return 0;
			},
			//小計
			sub_total_price: function(){
				if(this.bag_data.products)
					return this.bag_data.products.reduce(function(sum, product){
						return sum + parseInt(product.item_price)* parseInt(product.quantity);
					},0)
					else
						return 0;
			},
			//運費
			trans_price: function(){
				return this.sub_total_price>=this.bag_data.trans_free?0:100;
			},
			//折扣量
			discount_price: function(){
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
			//取終價格
			total_price: function(){
				return this.sub_total_price+this.trans_price-this.discount_price;
			}
		},
		methods: {
			fetchData: function(){
				var _this = this;
				$.get("json/bag_data.json", function(data){
					_this.bag_data = data;
				});
				$.get("json/user_data.json", function(data){
					_this.user_data = data;
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

	})


