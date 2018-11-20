var vStamp = '<img class="position-relative" src="../img/vote-cursor.png">';
var valid = false,
	agree = null,
	correct = false;
$(document).ready(function() {
	$('.vote-section').mouseenter(function(e) {
		$('.vote-stamp').show();
		$(this).click(function(e) {
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
				$('.validation').text('無法判斷');
				// alert('無法判斷');
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
						// alert('有效且正確');
					} else {
						$('.validation').text('有效不同意票').removeClass('text-danger').addClass('text-success');
						// alert('有效但投錯惹');
					}
					if (correct) {
						var thankyou = '謝謝您投下支持婚姻平權/性平教育的一票，期待台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。';
						$('.result-hint').text(thankyou);
					} else {
						var opps = '提醒您，本案為愛家三案之一，若您支持婚姻平權/性平教育，請您將本案改投「不同意票」，期許台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。';
						$('.result-hint').text(opps);
					}
				} else {
					$('.result-hint').empty();
					$('.validation').text('無法判斷').addClass('text-danger').removeClass('text-success');
					// alert('無法判斷');
				}
			}
		});
	});
	$('.vote-section').mouseleave(function(e) {
		$('.vote-stamp').hide();
		$(this).off('click');
	});
	$('.vote-section').mousemove(function(e) {
		// console.log(e);
		// if ($(e.target).parents(".vote-section").length != 0) {
		$('.vote-stamp').offset({
			left: e.pageX - 25,
			top: e.pageY - 25
		});
		// } else {
		// 	console.log('out');
		// 	$('.vote-stamp').hide();
		// }
	});
});