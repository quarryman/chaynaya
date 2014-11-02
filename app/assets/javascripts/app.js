$(function(){
    var parallaxConfig = [
        {pos : 2000, ratio: 0},
        {pos : 500, ratio: 0.2},
        {pos : 2000, ratio: 0.25},
        {pos : 0, ratio: 0},
        {pos : 600, ratio: .8},
        {pos : 0, ratio: 0}
    ];

    function getParallaxPosition () {
        var result = [],
            dim = 'px',
            scrollPosition = $(window).scrollTop();

        for (var i in parallaxConfig) {
            result.push ((parallaxConfig[i]['pos'] + (scrollPosition * parallaxConfig[i]['ratio'])) + dim);
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
        $('#layout').css({'backgroundPosition-y':
            getParallaxPosition()
        });
    }
});