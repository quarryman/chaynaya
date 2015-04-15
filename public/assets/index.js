$(function(){
    var parallaxConfig = [
        {x : '50%', pos : 1000, ratio: 0.2},
        {x : '-50%', pos : 500, ratio: 0.2},
        {x : 'center', pos : 2000, ratio: 0.25},
        {x : 'center', pos : 0, ratio: 0},
        {x : '50%', pos : 600, ratio: .8},
        {x : 'center', pos : 0, ratio: 0}
    ];

    function getParallaxPosition () {
        var result = [],
            dim = 'px',
            scrollPosition = $(window).scrollTop();

        for (var i in parallaxConfig) {
            result.push (parallaxConfig[i]['x'] + ' ' + (parallaxConfig[i]['pos'] + (scrollPosition * parallaxConfig[i]['ratio'])) + dim);
        }
        //console.log(result);
        return result.join(', ');
    }
    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    getParallaxPosition();

    function parallaxScroll(){
        getParallaxPosition();
        $('#layout').css({'background-position':
            getParallaxPosition()
        });
    }
    ; (function ($, undefined) {
        $.widget("chaynaya.menu", {
            _create: function () {
                var self = this,
                    activeClass="active";

                this.items = $(">li", this.element);
                this.items.click(function(){
                    self.items.removeClass(activeClass);
                    $(this).addClass(activeClass);
                })

            },
            destroy: function () {
                $.Widget.prototype.destroy.apply(this, arguments);
            }
        });
    })(jQuery);
    $('.menu-block').menu();
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
