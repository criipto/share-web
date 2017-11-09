/* global document, window, $, jQuery */

var ifIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

/* On document ready */
$(document).ready(function () {
    initSteps();
});


function initSteps() {
    function adjustPadding() {
        if (bottom.filter(':visible').length > 0) {
            page.attr('data-bottom', +bottom.filter(':visible').outerHeight());
        } else {
            page.attr('data-bottom', 0);
        }
    }

    function showOverlay() {
        var self = $(this),
            current = self.closest('.block'),
            overlay = $(self.attr('href'));

        html.addClass('html-overlay');
        current.addClass('block-hidden');
        overlay.addClass('overlay-transparent').removeClass('overlay-hidden');
        setTimeout(function () {
            overlay.addClass('overlay-animated');
            setTimeout(function () {
                overlay.removeClass('overlay-animated').removeClass('overlay-transparent');
            }, 400);
        }, 20);
        return false;
    }

    function hideOverlay() {
        var self = $(this),
            overlay = $('.overlay:not(.overlay-hidden)');

        html.addClass('html-overlay');
        $('.block-hidden').removeClass('block-hidden');
        overlay.addClass('overlay-transparent');
        setTimeout(function () {
            overlay.removeClass('overlay-transparent').addClass('overlay-hidden');
            html.removeClass('html-overlay');
        }, 390);
        return false;
    }

    function animateFace(callback) {
        var that = this,
            self = $(that),
            icon = $(self.attr('data-animate')),
            src, dupe,
            bump = $('.icon-profile');

        scr = $('html,body').scrollTop();
        if (ifIOS) {
            scr = window.pageYOffset;
        }

        icon.clone().addClass('duplicate').css({
            top: icon.offset().top,
            left: icon.offset().left
        }).insertAfter(icon);

        dupe = icon.siblings('.duplicate');
        icon.addClass('transparent');

        setTimeout(function () {
            dupe.addClass('animation-step-1');
            setTimeout(function () {
                dupe.css('margin-top', scr).addClass('animation-step-2');
                setTimeout(function () {
                    //dupe.addClass('animation-step-3');
                    callback.call(that);
                    bump.addClass('bump');
                    setTimeout(function () {
                        dupe.remove();
                        icon.removeClass('transparent');
                    }, 400);
                }, 785);
            }, 400);
        }, 10);
    }

    var win = $(window), page = $('.page'), bottom = $('.bottom-nav'), html = $('html');
    if (bottom.length > 0) {
        win.on('resize', adjustPadding).trigger('resize');
    }

    $('.js-overlay').on('click', function () {
        if (this.hasAttribute('data-animate')) {
            animateFace.call(this, showOverlay);
        } else {
            showOverlay.call(this);
        }
        return false;
    });
    $('.js-overlay-close').on('click', hideOverlay);
}