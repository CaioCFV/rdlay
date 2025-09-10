if($('body').hasClass('busca-vazia')) {
	if(!$('body').hasClass('pag404')){
		var thisTermoDigitado = $('meta[name="Abstract"]').attr('content');
		$('section#desculpe').show();
		$('section#desculpe .tpl-center').html('<h2>não encontramos nada de <strong>"'+thisTermoDigitado+'"</strong></h2> <h3>confira nossas sugestões abaixo</h3>');

		$('.bread-crumb ul').append('<li class="last"><a>Busca por: <span>'+thisTermoDigitado+'</span></a></li>');
	}else if($('body').hasClass('pag404')){
		$('section#desculpe').show();
		$('section#desculpe .tpl-center').html('<h2>página <strong>404</strong></h2> <h3>confira nossas sugestões abaixo</h3>');

		$('.bread-crumb ul').append('<li class="last"><a>Página 404</a></li>');
	}
}//FIM BUSCA VAZIA