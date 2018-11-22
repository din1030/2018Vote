// var cStamp = '<img class="vote-stamp position-relative" src="../img/vote-cursor.png">';
var vStamp = '<img class="stamp position-absolute" src="../img/vote-cursor.png">';

var valid = false,
	agree = null,
	correct = false;

var logText1 = '附帶一提，我個人支持東奧正名，公投是民主的展現，若正名案通過中華奧會順應民意申請更名，';
var logText2 = '國際奧會所提出的憲章來說並不適用。目前的狀況在於豬隊友中華奧會本身的立場是不想正名，';
var logText3 = '所以認為公投是「政治力脅迫」。參見進擊的台灣隊-Team Taiwan 貼文';
var logText4 = 'https://www.facebook.com/TeamTaiwan.2020TokyoOlympics/photos/a.504547829741849/897627827100512/';
var logText5 = '不過怕在這裡模糊焦點， 原本網站有加入東奧正名的投票模擬被我抽掉了。 但還是鼓勵大家在公投第 13 案也蓋上同意。';

$(document).ready(function() {

	$('#share-bar').share({
		// page title
		pageTitle: '2018 公投模擬：平權兩好三壞',
		// page url
		pageUrl: window.location.href,
		// page description
		pageDesc: '模擬實際公投票格式，透過簡單操作，讓你 11/24 不投錯！！',
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

	if (!isMobile()) {
		// $(this).append(cStamp);
		// $('.vote-stamp').hide();

		$('.vote-section').mouseenter(function(e) {
			$('.vote-stamp').show();
		});
		// 離開投票區隱藏選舉章
		$('.vote-section').mouseleave(function(e) {
			$('.vote-stamp').hide();
			// $('.vote-stamp').remove();
			// $(this).off('click');
		});
		// 選舉章隨滑鼠移動
		$('.vote-section').mousemove(function(e) {
			$('.vote-stamp').show();
			$('.vote-stamp').offset({
				left: e.pageX - 25,
				top: e.pageY - 25
			});
		});
	}

	$('.vote-section').on('vclick', function(e) {
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
					$('.validation').text('有效同意票').removeClass('text-danger').addClass('text-primary');
				} else {
					$('.validation').text('有效不同意票').removeClass('text-danger').addClass('text-primary');
				}
				if (correct) {
					var thankyou = '<p class="text-success">謝謝您站在支持婚姻平權/性平同志教育的這一邊，期待台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
					$('.result-hint').html(thankyou);
				} else {
					var id = $('body').attr('id');
					var opps = '<h4 class="text-danger">Opps!你是萌萌嗎？</h4>';
					if (id == "vote14" || id == "vote15") {
						opps += '<p class="text-danger">提醒您，本案為同志平權兩案之一（兩好），若您支持婚姻平權/性平教育，請您將本案改投<strong>「同意票」</strong>，期許台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
					} else {
						opps += '<p class="text-danger">提醒您，本案為愛（礙）家三案之一（三壞），若您支持婚姻平權/性平教育，請您將本案改投<strong>「不同意票」</strong>，期許台灣能夠擁抱多元的性/別族群，也讓我們的孩子學會尊重每個不同的個體。</p>';
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

	$('.btn-reset').click(function(e) {
		valid = false;
		agree = null;
		correct = false;
		$('img.stamp').remove();
		$('.btn-reset').attr('disabled', '');
		$('.validation').text('（尚未投票）').removeClass('text-primary').removeClass('text-danger');
		$('.result-hint').empty();
	});

	console.warn(logText1);
	console.warn(logText2);
	console.warn(logText3);
	console.warn(logText4);
	console.warn(logText5);

});

function isMobile() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}