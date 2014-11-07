$(function(){
    var parallaxConfig = [
        {x : '50%', pos : 2000, ratio: 0},
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




    //slider
    ; (function ($, undefined) {
        $.widget("jaftea.slideshow", {
            _create: function () {
                var self = this;
                this.container = $(".banner-slide", this.element);
                this.parent = $("#slider");
                var children = this.container.children("li");
                this.elementWidth = children.width();
                this.elementsCount = children.length;
                this.container.css({ width: (children.length * this.elementWidth) + "px" });
                this.timer = null;

                $(".slider-nav-link", self.parent).eq(0).addClass("active");

                $.each($(".slider-nav-link", self.parent), function (index) {
                    $(this).data("index", index);
                });

                $.each(children, function (index) {
                    $(this).data("id", index);
                });

                this.animationIndex = 0;

                //this.autoSlide();

                this.element.on("mouseenter", ".banner", function () {
                    self.stop();
                });

                this.element.on("mouseleave", ".banner", function () {
                    self.autoSlide();
                });

                this.parent.on("click", ".slider-nav-link", function () {
                    self.animate($(this).data("index"));
                });
                this.parent.on("click", ".slider-nav-left", function () {
                    var slide = self.previous_slide(self.animationIndex);
                    self.animate(slide);
                    children.removeClass('active');
                    children.eq(slide).addClass('active');
                });
                this.parent.on("click", ".slider-nav-right", function () {
                    var slide = self.next_slide(self.animationIndex);
                    self.animate(slide);
                    children.removeClass('active');
                    children.eq(slide).addClass('active');
                });
            },

            destroy: function () {
                $.Widget.prototype.destroy.apply(this, arguments);
            },
            next_slide: function (index) {

                if (index == this.elementsCount -1)
                    return  0;
                else
                    return  index + 1;
            },
            previous_slide: function (index) {

                if (index == 0)
                    return  this.elementsCount -1;
                else
                    return  index - 1;
            },
            animate: function (index) {
                var self = this;
                self.animationIndex = index;
                this.stop();
                this.container.stop();

                var children = this.container.children("li");
                var i = 0;
                var el = this.container.children("li").filter(function (_index) {
                    if ($(this).data("id") == index) {
                        i = _index;
                        return true;
                    }
                    return false;
                });

                $(".slider-nav-link.active", self.parent).removeClass("active");
                $(".slider-nav-link", self.parent).eq(index).addClass("active");

                this.container.animate(
                    {
                        left: (-i * self.elementWidth) + "px"
                    },
                    {
                        duration: 500,
                        queue: false,
                        complete: function () {
                            var moveEls = self.container.children("li").filter(function (_index) {
                                return _index < i;
                            });

                            self.container.append(moveEls);

                            self.container.css({ left: "0px" });

                            self.autoSlide();
                        }
                    }
                );
            },

            autoSlide: function () {
                var self = this;
                clearInterval(this.timer);
                this.timer = setInterval(function () {
                    self.animationIndex = self.animationIndex > self.elementsCount - 2 ? 0 : self.animationIndex + 1;
                    self.animate(self.animationIndex);
                }, 6000);
            },

            stop: function () {
                var self = this;
                this.container.clearQueue();
                //this.container.stop();
                clearInterval(this.timer);
            }
        });
    })(jQuery);
    $('.banner-slide-wrapper').slideshow();
});