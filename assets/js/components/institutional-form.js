if($('body').hasClass('fale-conosco')){
	$('.wrapperContent form input#cpf').mask('999.999.999-99', {reverse: true});
	$('.wrapperContent form input#telefone').mask("(99)99999-9999");

	$('form .wrapAssunto select').on('change', function(){
		var text = $('option:selected', this).text();
		var thisVal = $('option:selected', this).val();
		$('form .wrapAssunto button.selectFake span').html(text);
	});

	$('.wrapperContent form button#enviar-contato').live('click', function() {
		var nome = $('.wrapperContent form input#nome').val();
		var email = $('.wrapperContent form input#email').val();
		var cpf = $('.wrapperContent form input#cpf').val();
		var telefone = $('.wrapperContent form input#telefone').val();
		var assunto = $('.wrapperContent form .wrapAssunto button.selectFake span').text();
		var mensagem = $('.wrapperContent form textarea#mensagem').val();
		
		if (nome == "") {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'Por favor, preencha o seu nome no campo do formulário!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input#nome').addClass('error');
			$('.wrapperContent form input#nome').focus();
			return false;
		}
		if (email == "") {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'Por favor, preencha o seu e-mail no campo do formulário!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input').removeClass('error');
			$('.wrapperContent form textarea').removeClass('error');

			$('.wrapperContent form input#email').addClass('error');
			$('.wrapperContent form input#email').focus();
			return false;
		}
		var parte1 = email.indexOf("@");
		var parte3 = email.length;
		if (!(parte1 >= 3 && parte3 >= 9)) {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'O e-mail deve ser válido!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input').removeClass('error');
			$('.wrapperContent form textarea').removeClass('error');

			$('.wrapperContent form input#email').addClass('error');
			$('.wrapperContent form input#email').focus();
			return false;
		}
		if (telefone == "") {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'Por favor, preencha o seu telefone no campo do formulário!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input').removeClass('error');
			$('.wrapperContent form textarea').removeClass('error');

			$('.wrapperContent form input#telefone').addClass('error');
			$('.wrapperContent form input#telefone').focus();
			return false;
		}
		if (assunto == "Assunto") {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'Por favor, informe o assunto no campo do formulário!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input').removeClass('error');
			$('.wrapperContent form textarea').removeClass('error');

			$('.wrapperContent form .wrapAssunto button.selectFake').addClass('error');
			return false;
		}
		if (mensagem == "") {
			$.toast({
				position: 'bottom-left',
			    heading: 'Erro!',
			    text: 'Por favor, preencha a sua mensagem no campo do formulário!',
			    showHideTransition: 'fade',
			    icon: 'error'
			});

			$('.wrapperContent form input').removeClass('error');
			$('.wrapperContent form textarea').removeClass('error');
			$('.wrapperContent form .wrapAssunto button.selectFake').removeClass('error');

			$('.wrapperContent form textarea#mensagem').addClass('error');
			$('.wrapperContent form textarea#mensagem').focus();
			return false;
		}
		
		$.toast({
			position: 'bottom-left',
		    heading: 'Aguarde...',
		    text: 'Estamos cadastrando a sua mensagem.',
		    showHideTransition: 'fade',
		    icon: 'info'
		});

		$.ajax({
			url: '/api/dataentities/CF/documents',
			dataType: 'json',
			type: 'POST',
			crossDomain: true,
			data: '{"nome":"' + nome + '","email":"' + email + '","cpf":"' + cpf + '","telefone":"' + telefone + '","assunto":"' + assunto + '","mensagem":"' + mensagem + '"}',
			headers: {
				'Accept': 'application/vnd.vtex.ds.v10+json',
				'Content-Type': 'application/json; charset=utf-8'
			},
			success: function(data) {
				$('.wrapperContent form input').removeClass('error');
				$('.wrapperContent form textarea').removeClass('error');
				$('.wrapperContent form .wrapAssunto button.selectFake').removeClass('error');

				$.toast({
					position: 'bottom-left',
				    heading: 'Sucesso',
				    text: ''+nome+', seu contato foi registrado!',
				    showHideTransition: 'fade',
				    icon: 'success'
				});
				
				$('.wrapperContent form input').val("");
				$('.wrapperContent form textarea').val("");
				$('.wrapperContent form .wrapAssunto button.selectFake span').text('Assunto');
			}
		});
		return false;
	})
}