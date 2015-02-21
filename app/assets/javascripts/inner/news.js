$(function () {
    var scope = ".news-list-page";
    $('.news-item >a', scope).hover(function () {

        $('a', $(this).parent()).addClass('hovered')
    },
        function () {
            $('a', $(this).parent()).removeClass('hovered')
        }
    )
})