<?php
//https://logistics-stage.ecpay.com.tw/Express/map
//https://logistics-stage.ecpay.com.tw/Express/map?MerchantID=1148140&LogisticsType=CVS&LogisticsSubType=UNIMARTC2C&IsCollection=N&ServerReplyURL=http://api.lanvece.com/


$cvsid = $_REQUEST['CVSStoreID'];
$cvsname = $_REQUEST['CVSStoreName'];
$cvsaddress = $_REQUEST['CVSAddress'];
$cvsphone = $_REQUEST['CVSTelephone'];
$MerchantID = '1148140';
$ServerReplyURL = 'http://www.lanvece.com.tw/unimartmap.php';

	
if(!$cvsid){
	header('Location: https://logistics.ecpay.com.tw/Express/map?MerchantID='.$MerchantID.'&LogisticsType=CVS&LogisticsSubType=UNIMARTC2C&IsCollection=N&ServerReplyURL='.$ServerReplyURL);
	exit;
}else{
	header("Content-Type:text/html; charset=utf-8");
	echo "<script type='text/javascript'>";
	echo "window.opener.set_store_info('" . $cvsid . "','" . $cvsname . "','". $cvsaddress ."','" . $cvsphone . "');";
	echo "window.close();";
	echo "</script>";
}


?>


