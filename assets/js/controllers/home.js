if($('body').hasClass('home')){
    $('section#bloco-a #slideHome .box-banner').each(function(){
        var _this = $(this);
        var imagemBanner = _this.find('img').attr('src');
        _this.attr('style', 'background-image: url('+imagemBanner+')');
    });

    $('section#bloco-a #slideHome .slide').not('.slick-initialized').slick({
        arrows: true,
        dots: false,
        fade: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true
    });

    $('section#bloco-a .box-banner a img').hide();
    
}
