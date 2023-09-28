jQuery(document).ready(function ($) {
    $('.question').last().find('.question__btn--next').addClass('js-next-section _last');
    $('.question').first().addClass('active');

    var progressSwiper = new Swiper ('.progress-bar__swiper', {
		slidesPerView: 8,
		allowTouchMove: false,
		pagination: {
			el: '.news-pagination',
			type: 'progressbar',
		},
		navigation: {
			nextEl: '.progress-bar__next',
			prevEl: '.progress-bar__prev',
		},
        breakpoints: {
            0: {
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 4,
			},
			768: {
				slidesPerView: 6,
			},
			900: {
				slidesPerView: 8,
			},
		}
    })
    
    $('.question__option input').on('change', function (e) {
        let el = $(this).parents('.question__option');
        if ($(el).hasClass('question__option--multiple')) {
            $(el).toggleClass('active');
        } else {
            $(el).parent('.question__choose').find('.question__option').removeClass('active');
            $(el).addClass('active');
        }
    })

    function checkAnimateCircle() {
        if ($('.creation').hasClass('active')) {
            let allText = $('.creation__text').length;
            let endAnimationSec = 12;
            let stopPercent = 100;
            let intervalSec = endAnimationSec / stopPercent;
            let intervalPercent = 0;

            const reinitAnim = setInterval(() => {
                intervalPercent += intervalSec;

                $('.fill-box__progress').html(Math.round(intervalPercent) + '%');
                if (intervalPercent >= stopPercent) {
                    clearInterval(reinitAnim);
                    $('.fill-box__line').css('stroke-dasharray', '765.48');
                    goTo($('.creation__content'), 'next', 'section')
                }

                const indexActiveText = Math.floor((intervalPercent / stopPercent) * allText);
                
                $('.creation__text').removeClass('active').eq(indexActiveText).addClass('active fade-animation');
            }, intervalSec * 100)
        }
    }

    function goTo(e, action, block) {
        let actionNumb = 1;
        if (action == 'prev') {
            actionNumb = -1;
        }
        let blockClass = '.app-tabs__item';
        if (block == 'stage') {
            blockClass = '.question';
        }
        let activeTab = $(e).parents(blockClass).index() + actionNumb;
        $(blockClass).removeClass('active');
        $(blockClass).eq(activeTab).addClass('active');

        let activeSlideBottom = activeTab;
        if (block == 'stage') {
            activeSlideBottom = activeSlideBottom + actionNumb;
            if (activeSlideBottom < 0) {
                activeSlideBottom = 0;
            }
            if (action == 'prev') {
                activeSlideBottom = activeTab + 1;
            }
        }
        $('.progress-bar__img').removeClass('active');
        
        if (!$(e).hasClass('_last')) {
            $('.progress-bar__swiper .swiper-slide').eq(activeSlideBottom).find('.progress-bar__img').addClass('active');
        } else {
            $('.progress-bar').hide()
        }

        $("html, body").animate({ scrollTop: $(blockClass + '.active').offset().top }, 300);
        
        checkAnimateCircle();
    }

    $('.js-next-section').on('click', function(e){
        goTo(this, 'next', 'section')
    })

    $('.js-prev-section').on('click', function (e) {
        goTo(this, 'prev', 'section')
    })
    $('.js-next-stage').on('click', function (e) {
        if ($(this).parents('.question').find('input:checked').length < 1) {
            $("html, body").animate({ scrollTop: $(this).parents('.question').offset().top }, 300);
        } else {
            goTo(this, 'next', 'stage')
        }
    })
    $('.js-prev-stage').on('click', function (e) {
        goTo(this, 'prev', 'stage')
    })

    let numbTemp = 0;
    $('.progress-bar__num').each(function () {
        numbTemp++;
        let nTxt = '0' + numbTemp;
        if (numbTemp > 9) {
            nTxt = numbTemp;
        }
        $(this).html(nTxt);
    });

    let percentTemp = 0;
    $('.question__percent').each(function () {
        percentTemp++;
        let all = $('.question__percent').length + 1;
        let percent = Math.round(100 / all * percentTemp);
        $(this).html(percent+'%');
    });
})