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