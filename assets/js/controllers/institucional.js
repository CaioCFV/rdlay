if($('body').hasClass('institucional')) {
	var thisClass = $('body').attr('class');
	var thisClass = thisClass.split(' ')[1];
	var tituloPag = $('#main .wrapperContent h2.titulo-da-pagina').text();

	if($('.bannerTopo img').size() < 1){
		$('.bannerTopo').html('<h2>'+tituloPag+'</h2>');
		$('#main .wrapperContent h2.titulo-da-pagina').hide();
	}

	$('#main .sidebar fieldset ul li.'+thisClass+' a').addClass('ativo');
	$('.bread-crumb ul ').append('<li class="last"><a>Institucional: <span>'+tituloPag+'</span></a></li>');
    
	/*FILTRO MOBILE*/
	$('#main button.selectFake').live('click', function(){
		$('.sidebar').slideToggle('fast');
	});/*FIM FILTRO MOBILE*/

	$('.sidebar fieldset h3').live('click',function(){
		if($('body').width() < 940){
			$(this).next('ul').slideToggle('ativo');

			$(this).toggleClass('ativo');
		}
	});

	if($('body').hasClass('fale-conosco')){
		$('.wrapperContent form input[name="cpf"]').mask('999.999.999-99', {reverse: true});
		$('.wrapperContent form input[name="telefone"]').mask("(99)99999-9999");

		$('.wrapperContent form button.enviar').live('click', function() {
			var nome = $('.wrapperContent form input[name="nome"]').val();
			var email = $('.wrapperContent form input[name="email"]').val();
			var cpf = $('.wrapperContent form input[name="cpf"]').val();
			var telefone = $('.wrapperContent form input[name="telefone"]').val();
			var mensagem = $('.wrapperContent form textarea[name="mensagem"]').val();
			
			if (nome == "") {
				$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: red'>O campo NOME deve ser preenchido!</span>");
				$('.wrapperContent form input[name="nome"]').addClass('error');
				$('.wrapperContent form input[name="nome"]').focus();
				return false;
			}
			if (email == "") {
				$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: red'>O campo EMAIL deve ser preenchido!</span>");
				$('.wrapperContent form input').removeClass('error');
				$('.wrapperContent form textarea').removeClass('error');

				$('.wrapperContent form input[name="email"]').addClass('error');
				$('.wrapperContent form input[name="email"]').focus();
				return false;
			}
			var parte1 = email.indexOf("@");
			var parte3 = email.length;
			if (!(parte1 >= 3 && parte3 >= 9)) {
				$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: red'>O campo EMAIL deve ser válido!</span>");
				$('.wrapperContent form input').removeClass('error');
				$('.wrapperContent form textarea').removeClass('error');

				$('.wrapperContent form input[name="email"]').addClass('error');
				$('.wrapperContent form input[name="email"]').focus();
				return false;
			}
			if (telefone == "") {
				$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: red'>O campo TELEFONE deve ser preenchido!</span>");
				$('.wrapperContent form input').removeClass('error');
				$('.wrapperContent form textarea').removeClass('error');

				$('.wrapperContent form input[name="telefone"]').addClass('error');
				$('.wrapperContent form input[name="telefone"]').focus();
				return false;
			}
			if (mensagem == "") {
				$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: red'>Sua MENSAGEM deve ser preenchida!</span>");
				$('.wrapperContent form input').removeClass('error');
				$('.wrapperContent form textarea').removeClass('error');

				$('.wrapperContent form textarea[name="mensagem"]').addClass('error');
				$('.wrapperContent form textarea[name="mensagem"]').focus();
				return false;
			}
			$('.wrapperContent .mensagem').addClass('text-focus-in').html("Aguarde...");
			$.ajax({
				url: '/api/dataentities/FC/documents',
				dataType: 'json',
				type: 'POST',
				crossDomain: true,
				data: '{"nome":"' + nome + '","email":"' + email + '","cpf":"' + cpf + '","telefone":"' + telefone + '","mensagem":"' + mensagem + '"}',
				headers: {
					'Accept': 'application/vnd.vtex.ds.v10+json',
					'Content-Type': 'application/json; charset=utf-8'
				},
				success: function(data) {
					$('.wrapperContent form input').removeClass('error');
					$('.wrapperContent form textarea').removeClass('error');
					$('.wrapperContent .mensagem').addClass('text-focus-in').html("<span style='color: green'>Enviado com sucesso!</span>");
					
					$('.wrapperContent form input').val("");
					$('.wrapperContent form textarea').val("");
				}
			});
			return false;
		})
	}

}/*FIM INSTITUCIONAL*/