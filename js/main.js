var vStamp = '<img class="stamp position-relative" src="../img/vote-cursor.png">';
var valid = false,
	agree = null,
	correct = false;
$(document).ready(function() {
	$('#share-bar').share({

		// page title
		pageTitle: '2018 公投模擬：平權兩好三壞',

		// page url
		pageUrl: window.location.href,

		// page description
		pageDesc: '透過簡單的操作，讓你 11/24 不投錯！！',

		// or 'right'
		position: 'left',

		// or 'square'
		theme: 'circle',

		// enable/disable animation
		animate: true,

		// popup width
		popupWidth: 640,

		// popup height
		popupHeight: 528,

		// an array of social networking services
		channels: ['facebook', 'twitter', 'linkedin'],

		// trigger class
		itemTriggerClass: 'js-share'

	});

	$('.vote-section').mouseenter(function(e) {
		$('.vote-stamp').show();
	});
	$('.vote-section').on('click tap', function(e) {
		var sLeft = e.pageX - 25,
			sTop = e.pageY - 25;
		$(vStamp).appendTo($(this)).offset({
			left: sLeft,
			top: sTop
		});

		var validArea = $(this).find('.valid');
		var leftColumn = $(this).find('.left-col').eq(0);
		var leftColRight = $(leftColumn).offset().left + $(leftColumn).outerWidth();
		if ((sLeft > leftColRight - 7) && (sLeft <= leftColRight)) {
			// 中間無法辨認地帶
			$('.validation').text('無效票').addClass('text-danger').removeClass('text-success');
			var invalid = '<p class="text-danger">您的選票將被視為無效票，請您務必閱讀<a target="_blank" href="assets/vote-validation.pdf">中選會公告之規定</a>。</p>';
			$('.result-hint').html(invalid);
			$('.btn-reset').removeAttr('disabled');
			return;
		} else {
			$.each(validArea, function(index, area) {
				var p = $(area).offset(),
					pLeft = p.left,
					pTop = p.top,
					pRight = p.left + $(area).outerWidth(),
					pBottom = p.top + $(area).outerHeight();

				if ((sTop < pBottom) && (sLeft < pRight) && (sTop > pTop - 28) && (sLeft > pLeft - 28)) {
					var newAgree = $(area).hasClass('agree');
					valid = (agree === null || agree === newAgree);
					console.log(agree);
					console.log(newAgree);
					console.log(valid);
					// agree = (agree !== null && agree !== newAgree)?'
					if (valid) {
						agree = newAgree;
						correct = $(area).hasClass('correct');
					} else {
						agree = -1;
						correct = false
					}
					return false;
				}
			});

			if (valid) {
				if (agree) {
					$('.validation').text('有效同意票').removeClass('text-danger').addClass('text-success');
				} else {
					$('.validation').text('有效不同意票').removeClass('text-danger').addClass('text-success');
				}
				if (correct) {
					var thankyou = '<p class="text-success">謝謝您站在支持婚姻平權/性平同志教育的這一邊，期待台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
					$('.result-hint').html(thankyou);
				} else {
					var id = $('body').attr('id');
					var opps = '';
					if (id == "vote14" || id == "vote15") {
						opps = '<p class="text-danger">提醒您，本案為同志平權兩案之一（兩好），若您支持婚姻平權/性平教育，請您將本案改投<strong>「同意票」</strong>，期許台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
					} else {
						opps = '<p class="text-danger">提醒您，本案為愛（礙）家三案之一（三壞），若您支持婚姻平權/性平教育，請您將本案改投<strong>「不同意票」</strong>，期許台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
					}
					$('.result-hint').html(opps);
				}
				$('.btn-reset').removeAttr('disabled');
			} else {
				$('.validation').text('無效票').addClass('text-danger').removeClass('text-success');
				var invalid = '<p class="text-danger">您的選票將被視為無效票，請您務必閱讀<a target="_blank" href="assets/vote-validation.pdf">中選會公告之規定</a>。</p>';
				$('.result-hint').html(invalid);
				$('.btn-reset').removeAttr('disabled');
			}
		}
	});
	// 離開投票區隱藏選舉章
	$('.vote-section').mouseleave(function(e) {
		$('.vote-stamp').hide();
		$(this).off('click');
	});
	// 選舉章隨滑鼠移動
	$('.vote-section').mousemove(function(e) {
		$('.vote-stamp').offset({
			left: e.pageX - 25,
			top: e.pageY - 25
		});
	});
	$('.btn-reset').click(function(e) {
		valid = false;
		agree = null;
		correct = false;
		$('img.stamp').remove();
		$('.btn-reset').attr('disabled', '');
		$('.validation').text('（尚未投票）').removeClass('text-danger').removeClass('text-success');
		$('.result-hint').empty();
	});
});