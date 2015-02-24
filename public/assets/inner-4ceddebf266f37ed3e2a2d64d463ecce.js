(function($) {
    var sR = {
        defaults: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        thisCallArgs: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        methods: {
            up: function (arg1,arg2,arg3) {
                if(typeof arg1 == 'object') {
                    for(p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                }else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                }else{
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }

                if(typeof arg2 == 'string'){
                    sR.thisCallArgs.easing = arg2;
                }else if(typeof arg2 == 'function'){
                    sR.thisCallArgs.callback = arg2;
                }else if(typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if(typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                }else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowUp" />');
                var currentPadding = $cells.css('padding');
                $cellContentWrappers = $(this).find('.slideRowUp');
                $cellContentWrappers.slideUp(sR.thisCallArgs.slideSpeed,sR.thisCallArgs.easing).parent().animate({
                    paddingTop: '0px',
                    paddingBottom: '0px'},{
                    complete: function () {
                        $(this).children('.slideRowUp').replaceWith($(this).children('.slideRowUp').contents());
                        $(this).parent().css({'display':'none'});
                        $(this).css({'padding': currentPadding});
                    }});
                var wait = setInterval(function () {
                    if($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if(typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            },
            down: function (arg1,arg2,arg3) {
                if(typeof arg1 == 'object') {
                    for(p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                }else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                }else{
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }

                if(typeof arg2 == 'string'){
                    sR.thisCallArgs.easing = arg2;
                }else if(typeof arg2 == 'function'){
                    sR.thisCallArgs.callback = arg2;
                }else if(typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if(typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                }else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowDown" style="display:none;" />');
                $cellContentWrappers = $cells.find('.slideRowDown');
                $(this).show();
                $cellContentWrappers.slideDown(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing, function() { $(this).replaceWith( $(this).contents()); });

                var wait = setInterval(function () {
                    if($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if(typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            }
        }
    };

    $.fn.slideRow = function(method,arg1,arg2,arg3) {
        if(typeof method != 'undefined') {
            if(sR.methods[method]) {
                return sR.methods[method].apply(this, Array.prototype.slice.call(arguments,1));
            }
        }
    };
})(jQuery);

; (function ($, undefined) {
    $.widget("chaynaya.cart", {
        _create: function () {
            var self = this;

            this.evenClass = 'even';

            this.removedClass = 'removed';

            this.activeTable = $("#active table", this.element).not('.summary');

            this.delayedTable = $("#delayed table", this.element);

            $('.amount .plus').unbind('click');
            $('.amount .minus').unbind('click');

            this.element.on("click", ".amount .plus", function () {
                var val = parseInt($(this).prev().attr("value")),
                    row = $(this).closest('tr'),
                    priceHolder = $('.price .value',row),
                    currentPrice = priceHolder.attr('attr-initial-value');

                $(this).prev().attr({"value" : val + 1});
                priceHolder.html((val+1) * currentPrice);

                $('.price_placeholder', this.activeTable).addClass('loading');
                $.getJSON('/index/cart_add.json').done( function (responce) {
                    if (responce.status == 'SUCCESS') {
                        $('.regular_price .ruble', this.activeTable).html(responce.prices.regular_price);
                        $('.discount_price .ruble', this.activeTable).html(responce.prices.discount_price);
                        $('.total_price .ruble', this.activeTable).html(responce.prices.total_price);
                        setTimeout(function () {$('.price_placeholder', this.activeTable).removeClass('loading')}, 800);
                    }
                });
            });

            this.element.on("click", ".amount .minus", function () {
                var val = parseInt($(this).prev().attr("value")),
                    row = $(this).closest('tr'),
                    priceHolder = $('.price .value',row),
                    currentPrice = priceHolder.attr('attr-initial-value');

                var val = $(this).next().attr("value");
                if (val <= 1)
                    $(this).next().attr({"value" : 1})
                else{
                    $(this).next().attr({"value" : val - 1});
                    priceHolder.html((val-1) * currentPrice);

                    $('.price_placeholder', this.activeTable).addClass('loading');
                    $.getJSON('/index/cart_add.json').done( function (responce) {
                        if (responce.status == 'SUCCESS') {
                            $('.regular_price .ruble', this.activeTable).html(responce.prices.regular_price);
                            $('.discount_price .ruble', this.activeTable).html(responce.prices.discount_price);
                            $('.total_price .ruble', this.activeTable).html(responce.prices.total_price);
                            setTimeout(function () {$('.price_placeholder', this.activeTable).removeClass('loading')}, 800);
                        }
                    });
                }
            });


            this.element.on("click", ".plate a", function () {
                var rowToBeRemoved = $(this).closest('tr'),
                    plate = $('.plate',rowToBeRemoved);

                    $('.price_placeholder', this.activeTable).addClass('loading');
                    $.getJSON($(this).prop('href')).done( function (responce) {
                        if (responce.status == 'SUCCESS') {
                            rowToBeRemoved.removeClass(self.removedClass);
                            plate.css({'opacity' : '0.2'});
                            $('.regular_price .ruble', this.activeTable).html(responce.prices.regular_price);
                            $('.discount_price .ruble', this.activeTable).html(responce.prices.discount_price);
                            $('.total_price .ruble', this.activeTable).html(responce.prices.total_price);
                            setTimeout(function () {$('.price_placeholder', this.activeTable).removeClass('loading')}, 800);
                        }
                    });
                return false;
            });

            this.element.on("click", ".remove", function () {
                var rowToBeRemoved = $(this).closest('tr'),
                    plate = $('.plate',rowToBeRemoved),
                    plateHeight  = rowToBeRemoved.height();

                    $('.price_placeholder', this.activeTable).addClass('loading');

                $.getJSON($(this).prop('href'))
                    .done( function (responce) {
                        //console.log(responce);
                        if (responce.status == 'SUCCESS') {
                            plate.css({'height' : plateHeight});
                            rowToBeRemoved.addClass(self.removedClass);
                            plate.animate({'opacity' : '0.8'}, 200);

                            $('.regular_price .ruble', this.activeTable).html(responce.prices.regular_price);
                            $('.discount_price .ruble', this.activeTable).html(responce.prices.discount_price);
                            $('.total_price .ruble', this.activeTable).html(responce.prices.total_price);
                            setTimeout(function () {$('.price_placeholder', this.activeTable).removeClass('loading')}, 800);
                        }
                    });
                /*rowToBeRemoved.slideRow('up', 200, function () {
                    rowToBeRemoved.remove();
                    self.stripeizeTable(self.activeTable);
                });*/
                return false;
            });
        },

        destroy: function () {

            $.Widget.prototype.destroy.apply(this, arguments);

        },

        stripeizeTable: function (table) {

            var rows = table.find('tr'),

                even_rows = table.find('tr:even');

            rows.removeClass(this.evenClass);

            even_rows.addClass(this.evenClass);

        }

    });

})(jQuery);

$(function () {
    $('.cart-page').cart();
})
;
; (function ($, undefined) {
    $.widget("chaynaya.news", {
        _create: function () {
            var self = this;
            this.news = $(".news-item", this.element);
            this.news.each(function () {
                var children = $(this).children('a');
                children.hover(
                    function () {
                        children.addClass('hovered')
                    },
                    function () {
                        children.removeClass('hovered')
                    }
                );
            });
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
})(jQuery);


$(function () {
    $(".news-list-page").news();
})
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


;
