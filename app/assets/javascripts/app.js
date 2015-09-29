$(function(){
    if (window.location.hash == "#logged-in") {
        $('.login-block').addClass('logged-in');
        $('.town-select-block').hide();
    }
    if (window.location.hash == "#with-sidebar") {
        $('.banner').show();
    }
    //slider
    (function ($, undefined) {
        $.widget("chaynaya.slideshow", {
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
    var index_scope = "body.index",
        inner_scope = "body.inner";

    $('.banner-slide-wrapper').slideshow();

    $('.amount .plus').click(function () {
        var val = parseInt($(this).prev().attr("value"));
        $(this).prev().attr({"value" : val + 1});
    });
    $('.amount .minus').click(function () {
        var val = $(this).next().attr("value");
        if (val <= 1)
            $(this).next().attr({"value" : 1})
        else
            $(this).next().attr({"value" : val - 1})
    });

    $(".menu-wrapper.state-default .search-input", index_scope).click(function () {
        if ($("#menu-wrapper").hasClass("state-default"))
            $("#menu-wrapper").toggleClass("state-default state-search");
    });

    $(".button-close").click(function () {
        $("#menu-wrapper").removeClass("state-search").removeClass("state-filter").addClass("state-default");
    });

    $(".button-filter").click(function () {
        $("#menu-wrapper").removeClass("state-search").removeClass("state-default").addClass("state-filter");
    });

    $(".button-search").click(function () {
        $("#menu-wrapper").removeClass("state-filter").removeClass("state-default").addClass("state-search");
    });


    $(".filter-tab", "#state-filter").click(function () {
        var tab = "." + $(this).attr("attr-control");
        $(".filter-tab", "#state-filter").removeClass("active");
        $(this).addClass("active");
        $(".filter-shape", "#state-filter")

            .hide();
        $(tab , "#state-filter")

            .show();
    });

    //popups
    dialogify = function(dialog, cls, modal) {
        var cfg, resizeFn;

        cfg = {
            modal: modal !== undefined ? modal : true,
            autoOpen: false,
            width: 550,
            closeText: 'Закрыть',
            dialogClass: cls,
            close: function() {
                //dialog.remove();
                $(window).unbind('resize', resizeFn);
            },
            create: function() {
                $('select', dialog).select2();
            }
        };

        resizeFn = function() {
            if (dialog.dialog('isOpen')) {
                dialog.dialog(cfg);
            }
        };

        dialog.dialog(cfg);

        $(window).bind('resize', resizeFn);
    };

    dialogify($('#dialog'), '', true);
    dialogify($('#dialog2'), '', true);
    dialogify($('#dialog3'), '', true);
    dialogify($('#dialog4'), '', true);
    dialogify($('#dialog5'), '', true);
    dialogify($('#dialog6'), '', true);
    dialogify($('#dialog7'), '', true);
    dialogify($('#dialog8'), '', true);
    dialogify($('#dialog9'), '', true);
    dialogify($('#dialog10'), '', true);
    dialogify($('#dialog11'), '', true);
    dialogify($('#dialog12'), '', true);
    //fixed_on_scroll class scrolls popup along with page but produces bug in Safari/iOS

    /*$('#login').on('click', function() {
        $('#dialog6').dialog('open');
    });

    $('#register').on('click', function() {
        $('#dialog9').dialog('open');
    });*/

    $('.callback').on('click', function() {
        $('#dialog2').dialog('open');
    });

    $('.buy-button').on('click', function() {
        $('#dialog10').dialog('open');
    });

    $('.wishlist-count').on('click', function() {
        $('#dialog3').dialog('open');
    });

    $('.basket-icon').on('click', function() {
        $('#dialog4').dialog('open');
    });


    $('.header-select').select2();
    $('select', inner_scope).select2();

    $('.tabs-holder').tabs();

    $('.notification span').first().click(function () {
        $(this).parent().animate({'height' : 0}, 100, function(){
            $(this).hide();
        });
    });
});