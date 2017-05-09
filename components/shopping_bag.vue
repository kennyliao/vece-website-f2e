<template id="bag_item">
<div class="bag_item">
	<div class="product-item">
		<div class="item-photo"><img v-bind:src="items_data.image"></div>
		<div class="item-name">
			<h4>{{items_data.name}}</h4>
			<div class="capacity">{{items_data.capacity}} ml</div>
			<input type="hidden" v-bind:value="items_data.product_id" name="product_id">
	</div>
	</div>
	<ul class="item-price">
		<li class="currency">{{items_data.item_price}}</li>
		<li><div class="minus" v-on:click="sub()"></div><input type="text" name="quantity[]" v-model="items_data.quantity"><div class="add" v-on:click="add()"></div></li>
		<li class="currency">{{final_price}}</li>
	</ul>
	<div class="remove" v-on:click="delete_item(id)"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
	<ul class="preorder-time" v-if="items_data.pre_order">
		<li class="placeorder"><div>{{items_data.order_date[0]}} - {{items_data.order_date[1]}}</div><h5>下訂期</h5></li>
		<li class="flower"><div>{{items_data.order_date[2]}}</div><h5>手工採花</h5></li>
		<li class="extracting"><div>{{items_data.order_date[3]}}</div><h5>定量萃取</h5></li>
		<li class="detecting"><div>{{items_data.order_date[4]}}</div><h5>微生物檢測</h5></li>
		<li class="bottling"><div>{{items_data.order_date[5]}}</div><h5>裝瓶</h5></li>
		<li class="shipping"><div>{{items_data.order_date[6]}}</div><h5>運送</h5></li>
	</ul>
	</div>
</template>