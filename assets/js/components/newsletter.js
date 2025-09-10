/*Newsletter*/
$('form.newsletter input[type="submit"]').live('click',function(){
	var _this = $(this);
	
	var nome = _this.parents('form').find('input.nome').val();
	var email = _this.parents('form').find('input.email').val();

	if (nome == "") {
		$.toast({
			position: 'bottom-left',
		    heading: 'Erro!',
		    text: 'Por favor, preencha o seu nome no campo de newsletter!',
		    showHideTransition: 'fade',
		    icon: 'error'
		});
		_this.parents('form').find('input').removeClass('error');
		_this.parents('form').find('input.nome').addClass('error');
		_this.parents('form').find('input.nome').focus();

		return false;
	}
	if (email == "") {
		$.toast({
			position: 'bottom-left',
		    heading: 'Erro!',
		    text: 'Por favor, preencha seu e-mail.',
		    showHideTransition: 'fade',
		    icon: 'error'
		});
		_this.parents('form').find('input').removeClass('error');
		_this.parents('form').find('input.email').addClass('error');
		_this.parents('form').find('input.email').focus();

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
		_this.parents('form').find('input').removeClass('error');
		_this.parents('form').find('input.email').addClass('error');
		_this.parents('form').find('input.email').focus();

		return false;
	}
	
	$.toast({
		position: 'bottom-left',
	    heading: 'Aguarde...',
	    text: 'Estamos cadastrando seu e-mail',
	    showHideTransition: 'fade',
	    icon: 'info'
	});

	$.ajax({
		url: '/api/dataentities/NC/search',
		type: 'GET',
		dataType: 'json',
		data: {"_fields": "id,nome,email","_where": "email="+email},
		crossDomain: true,
		headers: {
			'Accept': 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
			'REST-Range': 'resources=0-2'
		},
		success: function(data) {
			//console.log('data: ',data);
			if(data.length > 0){
				$.toast({
					position: 'bottom-left',
				    heading: 'Erro!',
				    text: 'O e-mail '+email+' já é cadastrado em nossa base!',
				    showHideTransition: 'fade',
				    icon: 'error'
				});

				_this.parents('form').find('input').removeClass('error');
				_this.parents('form').find('input.email').addClass('error');
				_this.parents('form').find('input.email').focus();

				return false;
			}else{
				$.ajax({
					url: '/api/dataentities/NC/documents',
					dataType: 'json',
					type: 'POST',
					crossDomain: true,
					data: '{"nome":"' + nome + '","email":"' + email + '"}',
					headers: {
						'Accept': 'application/vnd.vtex.ds.v10+json',
						'Content-Type': 'application/json; charset=utf-8'
					},
					success: function(data) {
						$.toast({
							position: 'bottom-left',
						    heading: 'Sucesso',
						    text: 'E-mail '+email+' cadastrado em nossa base!',
						    showHideTransition: 'fade',
						    icon: 'success'
						});

						$('#newsModal .content').removeClass('ativo');
						$('#newsModal').fadeOut('fast');

						_this.parents('form').find('input[type="text"]').val("");
						_this.parents('form').find('input').removeClass('error');
					}
				});
				return false;
			}
		}
	});

	return false;
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
	if (lerCookie('acessadoNew')) {
		return false;
	} else {
		$('#newsModal').show();
		$('#newsModal .content').addClass('ativo');
		criaCookie('acessadoNew', 'true');
	}
}
if(!$('body').hasClass('b2b')){
	$(window).load(function(){
		checkCokie();
	});
}

$('#newsModal .content button.close, #newsModal .overlay').live('click',function(){
	$('#newsModal .content').removeClass('ativo');
	$('#newsModal').fadeOut('fast');
});/*FIM Newsletter*/
