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