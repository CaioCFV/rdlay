function CopyTexto(){
    var r = document.createRange();
    r.selectNode(document.getElementById('cupomheader'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        $.toast({
            position: 'bottom-left',
            heading: 'Sucesso',
            text: 'Cupom <strong>'+r+'</strong> copiado com sucesso, utilize no seu carrinho de compras!',
            showHideTransition: 'fade',
            icon: 'success'
        });

        if($('body').hasClass('home2025')){
          $('header .topBar').remove();
        }

    } catch (err) {
        $.toast({
            position: 'bottom-left',
            heading: 'Erro!',
            text: 'Algo deu errado, entre em contato com o nosso atendimento.',
            showHideTransition: 'fade',
            icon: 'error'
        });
    }
}
$('body.home2025 header#header .topBar button.sta-cart-close').live('click',function(){
  if($('body').hasClass('home2025')){
    $('header .topBar').remove();
  }
});

function criaCookie(chave, value) {
	var expira = new Date();
	expira.setTime(expira.getTime() + 3285000000); //expira dentro de 24h
	document.cookie = chave + '=' + value + ';expires=' + expira.toUTCString();
}

function lerCookie(chave) {
	var ChaveValor = document.cookie.match('(^|;) ?' + chave + '=([^;]*)(;|$)');
	return ChaveValor ? ChaveValor[2] : null;
}

function checkCokie() {
	if (lerCookie('primeiraCompra')) {
		return false;
	} else {
		$('body.home2025 header#header .topBar').css('display', 'flex');
		criaCookie('primeiraCompra', 'true');
	}
}

checkCokie();

$('strong#cupomheader').live('click',function(){
    CopyTexto();
});

  var data = new Date();
  var dia = (data.getDate()).toString();
  var mes = (data.getMonth()+1).toString();
  var ano = data.getFullYear();
  var dataFinal = ano+"/"+mes+"/"+dia;
  var dataFinalReplace = dataFinal.replace(' ','').replace(' ','');

  var dataFinalContadorATACADO = $("div#dataFinalContadorATACADO").text();
  var dataFinalContadorVAREJO = $("div#dataFinalContadorVAREJO").text();
  //var dataFinalContador = '2024/05/03';
  //var dataFinalContadorReplace = dataFinalContador.replace(' ','').replace(' ','');

  //console.log('PROMOFRETE: ',dataFinal);
  //console.log('dia: ',dia);
  //console.log('mes: ',mes);
  //console.log('ano: ',ano);

//if(dia > 6 && mes == 1 && dia < 10 || window.location.href.indexOf('qa=promoFRETE') > -1){
if(dataFinalContadorATACADO.length > 0 && $('body').hasClass('b2b')){
  //console.log('PROMOFRETE: ',dataFinal);

  $("#countdown_dashboard").countdown(dataFinalContadorATACADO, function (event) {
    //var totalHours = event.offset.totalDays * 24 + event.offset.hours;
    var $this = $(this).html(event.strftime(''
      + '<div class="time dia"><p>%D</p><span>dias</span></div>'
      + '<div class="time hora"><p>%H</p><span>horas</span></div>'
      + '<div class="time minutos"><p>%M</p><span>minu.</span></div>'
      + '<div class="time segundos"><p>%S</p><span>segu.</span></div>'
    ));
  });

  $('#contador').show();
  $('body').addClass('contador');
  $('header#header').addClass('contador');

}

if(dataFinalContadorVAREJO.length > 0 && !$('body').hasClass('b2b')){
  //console.log('PROMOFRETE: ',dataFinal);

  $("#countdown_dashboard").countdown(dataFinalContadorVAREJO, function (event) {
    //var totalHours = event.offset.totalDays * 24 + event.offset.hours;
    var $this = $(this).html(event.strftime(''
      + '<div class="time dia"><p>%D</p><span>dias</span></div>'
      + '<div class="time hora"><p>%H</p><span>horas</span></div>'
      + '<div class="time minutos"><p>%M</p><span>minu.</span></div>'
      + '<div class="time segundos"><p>%S</p><span>segu.</span></div>'
    ));
  });

  $('#contador').show();
  $('body').addClass('contador');
  $('header#header').addClass('contador');

}/*CONTADOR PROMO FRETE*/

$('header#header .stpl-header .topBar2 .tpl-center div').not('.slick-initialized').slick({
  arrows: false,
  dots: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true
});

$('header#header .stpl-header .topBar2 .tpl-center').css('opacity', '1');
