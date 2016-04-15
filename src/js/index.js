
$(function() {
	// 欢迎页面
	setTimeout(function() {
		$('.j-purchaser').find('img:first').slideUp().next().slideDown();
	}, 25000);
	// 登录页面
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(1).slideUp().next().slideDown();
	}, 35000);
	// 发布页面
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(2).fadeOut().next().fadeIn();
	}, 47000);
	// 发布页面2
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(3).fadeOut().next().fadeIn();
		$('.j-vendor').find('img:first').fadeOut().next().fadeIn();
	}, 60000);
	// 供应商发布页面
	setTimeout(function() {
		$('.j-vendor').find('img').eq(1).fadeOut().next().fadeIn();
	}, 80000);
	// 列表页面
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(4).fadeOut().next().fadeIn();
	}, 103000);
	// offer页面
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(5).fadeOut().next().fadeIn();
	}, 113000);
	// offer页面2
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(6).fadeOut().next().fadeIn();
	}, 125000);
	// 订单页面
	setTimeout(function() {
		$('.j-purchaser').find('img').eq(7).fadeOut().next().fadeIn();
		$('.j-vendor').find('img').eq(2).fadeOut().next().fadeIn();
	}, 135000);
});