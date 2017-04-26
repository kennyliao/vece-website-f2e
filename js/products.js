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
			product: null,	//產品資料
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
			},
		},
		//建立後取得資料
		created: function () {
			this.fetchData();
		},
		methods:{
			fetchData: function(){
				var _this = this;
				$.getJSON("json/product_app_data.json", function(data){
					_this.product = data;
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
	
	var shopping_bag = new Vue({
		el: "#shopping_bag",
		data: {
			bag_data: {
				count: 0,
				trans_free: 15000,
				products : [
					{
						"name":"逆齡時空肌蘭萃菁華液",
						"image": "images/products/product-demo.png",
						"capacity": 30,
						"product_id": 1234567,
						"item_price": 3000, 
						"quantity": 1,
						"order_type": "now_order"
					},
					{
						"name":"逆齡時空肌蘭萃菁華皂",
						"image": "images/products/product-demo.png",
						"capacity": 40,
						"product_id": 7654321,
						"item_price": 5000, 
						"quantity": 1,
						"order_type": "now_order"
					},
					{
						"name":"逆齡時空肌蘭萃菁華皂",
						"image": "images/products/product-demo.png",
						"capacity": 40,
						"product_id": 7654321,
						"item_price": 2000, 
						"quantity": 1,
						"order_type": "pre_order"
					},
					{
						"name":"逆齡時空肌蘭萃菁華皂",
						"image": "images/products/product-demo.png",
						"capacity": 40,
						"product_id": 7654321,
						"item_price": 4000, 
						"quantity": 1,
						"order_type": "pre_order"
					}
				]
			}
		},
		computed: {
			sub_total_price: function(){
				return this.bag_data.products.reduce(function(sum, product){
					return sum + parseInt(product.item_price)* parseInt(product.quantity);
				},0)
			},
			trans_price: function(){
				return this.sub_total_price>=this.bag_data.trans_free?0:500;
			},
			total_price: function(){
				return this.sub_total_price+this.trans_price;
			}
		},
		methods: {
			delete_item: function(id){
				console.log(id);
				this.bag_data.products.splice(id,1);
			}
		}
	})
	
	
})


