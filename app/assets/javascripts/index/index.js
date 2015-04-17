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
                    self.items.not(this).removeClass(activeClass);
                    $(this).hover();
                })

            },
            destroy: function () {
                $.Widget.prototype.destroy.apply(this, arguments);
            }
        });
    })(jQuery);
    //$('.menu-block').menu();
});