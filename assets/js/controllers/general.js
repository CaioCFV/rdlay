import "../../scss/0-rdy-web-styles.scss";

/*HEADER FIXO*/
var previousScroll = 0;
$(window).bind("scroll", function () {
  //if($('body').width() > 900){
  if ($(this).scrollTop() >= 1) {
    if (!$("body").hasClass("ativoHeader")) {
      if ($("body").hasClass("home2025")) {
        $("header").addClass("ativo");
      }
    }
  } else {
    if ($("body").hasClass("home2025")) {
      $("header").removeClass("ativo");
    }
  }

  if ($(this).scrollTop() >= 60) {
    if (!$("body").hasClass("ativoHeader")) {
      $("body").addClass("ativoHeader");
    }
  } else {
    if ($("body").hasClass("ativoHeader")) {
      $("body").removeClass("ativoHeader");
    }
  }

  var headerHeight = $("header").height();

  if ($(window).scrollTop() >= headerHeight) {
    $("header .stpl-header .bottom").hide();
  }

  if ($(window).scrollTop() <= headerHeight) {
    $("header .stpl-header .bottom").show();
  }

  var currentScroll = $(this).scrollTop();
  if (currentScroll < previousScroll && $(window).scrollTop() >= headerHeight) {
    $("header .stpl-header .bottom").show();
  }

  previousScroll = currentScroll;
  //}
}); /*FIM HEADER FIXO*/

if ($("section#regua").size() > 0 && $(window).width() < 981) {
  $("section#regua .tpl-center div.divisao").remove();

  if ($("body").hasClass("b2b")) {
    $("section#regua .tpl-center div.varejo").remove();
  } else {
    $("section#regua .tpl-center div.atacado").remove();
  }

  $("section#regua .tpl-center").not(".slick-initialized").slick({
    arrows: false,
    dots: false,
    fade: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  });
}

if ($("section.seo p").size() < 1) {
  $("section.seo").hide();
} else {
  $("section.seo a.vermaisseo").on("click", function () {
    $("section.seo p.oculto").removeClass("oculto");
    $("section.seo a.vermaisseo").hide();

    return false;
  });
}

document.querySelectorAll(".js--banner").forEach(function (item) {
  const content = item.content;
  let html = "";
  if (!window.innerWidth > 992) {
    const desktop = content.querySelector(".desktop").innerHTML;
    html = desktop;
  } else {
    const mobile = content.querySelector(".mobile").innerHTML;
    html = mobile;
  }
  item.insertAdjacentHTML("beforebegin", html);
});
