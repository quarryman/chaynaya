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
                // function defined in production, basket component script.js
                recalculateBasket();
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
                    // function defined in production, basket component script.js
                    recalculateBasket();
                }
            });

            this.element.on("change", ".amount input[type=text]", function () {
                var val = parseInt($(this).prop("value")),
                    row = $(this).closest('tr'),
                    priceHolder = $('.price .value',row),
                    currentPrice = priceHolder.attr('attr-initial-value');
                if (val <= 0){
                    val = 1;
                    $(this).prop({"value": val})
                }

                priceHolder.html((val) * currentPrice);

                $('.price_placeholder', this.activeTable).addClass('loading');
                // function defined in production, basket component script.js
                recalculateBasket();
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
                            $('.price_placeholder', this.activeTable).removeClass('loading');
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
    $.widget("chaynaya.faq", {
        _create: function () {
            var self = this;
            this.class = "opened";
            this.questions = $(".faq-item-holder", this.element);
            this.questions.each(function () {
                $(">a", this).click(function (e) {
                    e.preventDefault();
                    $(this).parent().toggleClass(self.class);
                });
            });
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
})(jQuery);


$(function () {
    $(".faq-items").faq();
});
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
function priceSumArr(id, keyDown){
    tmpArr = new Array();
    newArr = new Array();
    goods[id] = 1;

    var i = 0;
    for (var key in goods) {

        sum = $("#p-"+key).text();

        price = $("#"+key).prop("value");
        tmp_price = price;

        if(id == key && keyDown == true){
            price = price + number;
        }

        if(eval(price) > 0 && price.length != 0){

            $("#t-"+key).css("background", "#eeccaa");
            newArr[i] = eval(sum)*eval(price);
            tmpArr[key] = 1;
        }
        else $("#t-"+key).css("background", "#FFFBF2");
        i++;
    }

    goods = new Array();
    goods = tmpArr;
    $("#curentPrice").empty().text((array_sum(newArr))?array_sum(newArr):"0.00");
    $("#curentPriceb").empty().text((array_sum(newArr))?array_sum(newArr):"0.00");
    $("#i-sum").attr("value",(array_sum(newArr))?array_sum(newArr):"0.00");
}

function array_sum( array ) {
    var key, sum=0;
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ) return null;
    for(var key in array) sum += array[key];
    return sum.toFixed(2);
}

$(function () {
    //$('.tabs-holder').addClass( "ui-tabs-vertical ui-helper-clearfix" );

    goods = new Array();
    number = '';

    $(".cnt_prt > input").change( function() {
        var idThisDiv = $(this).parents('div').attr("id");
        var id = idThisDiv.replace(/b-/gi, "");

        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}
        var price = $("#"+id).prop("value");
        var krat = eval(price) % eval(shag);
        if(eval( krat ) > 0) var finalSum = eval( shag ) - eval( krat ) + eval( price );
        else var finalSum =  eval(price);
        $("#"+idThisDiv+" > input").prop("value", finalSum);   //attr method was replaced with prop one
        priceSumArr(id);

    });

    $(".cnt_prt > input").keydown(function(event){
        var art = parseInt($(this).attr('class'));
        if(art >= 26687001 && art <= 26687100)
        {}
        else
        {
            switch (event.keyCode){
                case 48: number = 0;break;
                case 49: number = 1;break;
                case 50: number = 2;break;
                case 51: number = 3;break;
                case 52: number = 4;break;
                case 53: number = 5;break;
                case 54: number = 6;break;
                case 55: number = 7;break;
                case 56: number = 8;break;
                case 57: number = 9;break;
                default: number = "";
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8 ||
                event.keyCode == 27 || event.keyCode == 46 || event.keyCode == 116 || event.keyCode == 190) {

                var idThisDiv = $(this).parents('div').attr("id");
                var id = idThisDiv.replace(/b-/gi, "");

                priceSumArr(id, true);
                return true;
            }
            else if(event.keyCode == 13) return false;
            return false;
        }
    });

    $('.plus').click(function(){
        var idThisDiv  = $(this).parents('div').attr("id");
        var valueInput = $("#"+idThisDiv+" > input").prop("value");
        var id = idThisDiv.replace(/b-/gi, "");
        var price = eval($("#p-"+id).text());
        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}

        if(valueInput == "" || valueInput == 0){
            $("#"+idThisDiv+" > input").prop("value", shag);
        }
        else if (valueInput > 0){
            var finalSum =  eval(shag) + eval(valueInput);
            finalSum = Math.round(finalSum*100)/100;
            $("#"+idThisDiv+" > input").prop("value", finalSum);
        }

        priceSumArr(id);

        return true;
    });

    $('.minus').click(function(){
        var idThisDiv  = $(this).parents('div').attr("id");
        var valueInput = $("#"+idThisDiv+" > input").prop("value");

        var id = idThisDiv.replace(/b-/gi, "");
        var shag = $("#c-"+id).text();
        if (shag) {shag = shag.replace(/\/.+/gi, "")}

        if(valueInput == "" || valueInput <= eval(shag)){
            $("#"+idThisDiv+" > input").prop("value", "");
        }
        else if(valueInput > eval(shag)){
            var finalSum =  eval(valueInput) - eval(shag);
            finalSum = Math.round(finalSum*100)/100;
            $("#"+idThisDiv+" > input").prop("value", finalSum);
        }

        priceSumArr(id);

        return true;
    });

    $(".form-submit").click(function(){
        if (window.confirm ( "Вы все заполнили и хотите оформить заказ?" )){
            if (goods.length > 0) $(this.form).submit();
            else alert("Пустой заказ офирмить не возможно!!!");
        }
    });
});
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
