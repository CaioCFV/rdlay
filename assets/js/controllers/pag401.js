if($('body').hasClass('pag401')){

  console.log('11/04/2024');
    
	$('form input[name="document"]').mask('999.999.999-99', {reverse: true});
	$('form input[name="phone"]').mask("(99)99999-9999");
	$('form input[name="homePhone"]').mask("(99)9999-9999");
	$('form input[name="businessPhone"]').mask("(99)9999-9999");
	$('form input[name="birthDate"]').mask("99/99/9999");
	$('form input[name=corporateDocument]').mask('99.999.999/9999-99', { reverse: true });
    $('form input[name=rg]').mask('99.999.999-9', { reverse: true });

	$("input[name=postalCode]").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("input[name=street]").val("...");
                $("input[name=neighborhood]").val("...");
                $("input[name=city]").val("...");
                $("input[name=state]").val("...");
                //$("#ibge").val("...");

                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("input[name=street]").val(dados.logradouro);
                        $("input[name=neighborhood]").val(dados.bairro);
                        $("input[name=city]").val(dados.localidade);
                        $("input[name=state]").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        swal("Erro!","CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                swal("Erro!","Formato de CEP inválido.");
            }
        }
    });//*BUSCA POR CEP PREENCHIMENTO DE CAMPOS*/

    $('#modal .content button, #modal .content .overlay').live('click',function(){
		$('#modal').fadeOut('fast');
    });

    $('.opcoes .opcao button.cadastro').live('click',function(){
		$('.queTipo').show();
		$('form.form').hide();

		$('html, body').animate({
		    scrollTop: $('.queTipo').offset().top-110
		}, 400);
    });

    $('.queTipo .opcoes button.bt').live('click',function(){
    	$('.queTipo').hide();

    	if($(this).hasClass('fisica')){
    		$('form.form.juridica').hide();
    		$('form.form.fisica').fadeIn('fast');

    		$('html, body').animate({
			    scrollTop: $('form.form.fisica').offset().top-0
			}, 400);
    	}else if($(this).hasClass('juridica')){
    		$('form.form.fisica').hide();
    		$('form.form.juridica').fadeIn('fast');

    		$('html, body').animate({
			    scrollTop: $('form.form.juridica').offset().top-0
			}, 400);
    	}
	});

	$('button.login').live('click',function(){
		vtexid.start({
            returnUrl: "/",
            locale: 'pt-BR',
            forceReload: true
        });
	});	

    /*$('#vtexIdContainer #sendAccessKeyBtn').live('click', function (e) {
        var _this = $(e.currentTarget);


        if (!_this.hasClass('user-exist')) {
            e.preventDefault();

            var email = _this.parents('form').find('input[type="email"]').val();

            $.ajax({
                url: '/api/dataentities/CL/search?_fields=email&_where=email=' + email,
                type: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/vnd.vtex.ds.v10+json',
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                if (data.length) {
                    _this.removeClass('checking-email');
                    _this.addClass('user-exist');
                    _this.click();
                } else {
                    _this.removeClass('user-exist');
                    _this.addClass('checking-email');
                    
                    $('#vtexIdContainer .vtexIdUI .modal-header button.close').click();
                    $('#modal .content h2').html('Você ainda não possui um cadastro.');
                    $('#modal .content p').html("Você deve se cadastrar para ter acesso ao site.");
                    $('#modal .content button.ok').addClass('cadastrar');

                    $('#modal').fadeIn('fast');

                    $('#modal .content button.ok.cadastrar').live('click',function(){
                        $('.bemVindo .tpl-center .opcoes .opcao button.cadastro').click();
                    });
                }
            }, function (error) {
                _this.options.$form.find('.' + _this2.options.classFormButtonSubmit).removeAttr('disabled');

                console.log('ERROR >>> ', error);
                throw new Error(error);
            });
        }

        $('body').on('focus', '.vtexIdUI-email-field input[type="email"]', function (e) {
            var _this = $(e.currentTarget);
            _this.parents('form').find('#sendAccessKeyBtn').removeClass('user-exist');
        });
    });*/

	/*BOTÃO INSCRIÇÃO ISENTO*/
	$('.stateRegistration button.isento').live('click',function(){
		$(this).toggleClass('ativo');

		if($(this).hasClass('ativo')){
			$('.stateRegistration input').val('Isento').attr('disabled', 'disabled');
		}else{
			$('.stateRegistration input').val('').removeAttr('disabled');
		}

		return false;
	});/*FIM BOTÃO INSCRIÇÃO ISENTO*/

    /*BOTÃO CHECK*/
    $('button.check').live('click',function(){
        $(this).toggleClass('ativo');

        return false;
    });/*FIM BOTÃO CHECK*/

	$('form.fisica button.enviar').live('click', function() {
        
        var email = $('form.fisica input[name="email"]').val();
        var firstName = $('form.fisica input[name="firstName"]').val();
        var lastName = $('form.fisica input[name="lastName"]').val();
        var birthDate = $('form.fisica input[name="birthDate"]').val();
        //var rg = $('form.fisica input[name="rg"]').val();
        var document = $('form.fisica input[name="document"]').val();
        var phone = $('form.fisica input[name="phone"]').val();
        var homePhone = $('form.fisica input[name="homePhone"]').val();
    	
        var postalCode = $('form.fisica input[name="postalCode"]').val();   
        var street = $('form.fisica input[name="street"]').val(); 
        var number = $('form.fisica input[name="number"]').val(); 
        var complement = $('form.fisica input[name="complement"]').val(); 
        var neighborhood = $('form.fisica input[name="neighborhood"]').val(); 
        var state = $('form.fisica input[name="state"]').val(); 
        var city = $('form.fisica input[name="city"]').val(); 
        var receiverName = $('form.fisica input[name="receiverName"]').val(); 

        window.isNewsletterOptIn = true;
        
        $('form.fisica input[type="text"]').removeClass('error');

        if (email == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu e-mail.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu e-mail.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input').removeClass('error');
            $('form.fisica input[name="email"]').addClass('error').focus();

            return false;
        }
        var parte1 = email.indexOf("@");
        var parte3 = email.length;
        if (!(parte1 >= 3 && parte3 >= 9)) {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Informe um e-mail válido!</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Informe um e-mail válido!',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input').removeClass('error');
            $('form.fisica input[name="email"]').addClass('error').focus();
            
            return false;
        }
        if (firstName == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu nome.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu nome.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="firstName"]').addClass('error').focus();
            
            return false;
        }
        if (lastName == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu sobrenome.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu sobrenome.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="lastName"]').addClass('error').focus();
            
            return false;
        }
        if (birthDate == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe sua data de aniversário.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe sua data de aniversário.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="birthDate"]').addClass('error').focus();
            
            return false;
        }
        if (document == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu CPF.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu CPF.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="document"]').addClass('error').focus();
            
            return false;
        }
        if (phone == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu celular.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu celular.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="phone"]').addClass('error').focus();
            
            return false;
        }

        if (postalCode == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o CEP corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o CEP.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="postalCode"]').addClass('error').focus();
            
            return false;
        }
        if (number == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o número do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o número do endereço.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="number"]').addClass('error').focus();
            
            return false;
        }
        if (street == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o endereço.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="street"]').addClass('error').focus();
            
            return false;
        }
        if (neighborhood == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o bairro do endereço corporativo.</span>");
                
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o bairro do endereço.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="neighborhood"]').addClass('error').focus();
           
            return false;
        }
        if (city == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe a cidade do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe a cidade do endereço.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="city"]').addClass('error').focus();
           
            return false;
        }
        if (state == "") {
            //$('form.fisica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o UF do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o UF do endereço.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.fisica input[name="state"]').addClass('error').focus();
           
            return false;
        }
        
        $('form.fisica .mensagem').addClass('text-focus-in').html("Aguarde...");

        var dateCadastro = new Date();
		dataCriacao = (dateCadastro.toLocaleString()); 

		var birthDate = birthDate.split('/');
		//console.log('birthDate: ',birthDate);
		var birthDate = birthDate[2]+"/"+birthDate[1]+"/"+birthDate[1];
		//console.log('birthDate: ',birthDate);

        var client = {
            isCorporate: false,
            email: email,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            //rg: rg,
            document: document,
            phone: phone,
            homePhone: homePhone,
            isNewsletterOptIn: window.isNewsletterOptIn,
            approved: true
        }

        console.log('client: ',JSON.stringify(client));

        $.ajax({
			    url: '/api/dataentities/CL/search',
			    type: 'GET',
			    dataType: 'json',
			    data: {"_fields": "id,nome,email,approved","_where": "email="+client.email},
			    crossDomain: true,
			    headers: {
			        'Accept': 'application/vnd.vtex.ds.v10+json',
			        'Content-Type': 'application/json',
			        'REST-Range': 'resources=0-2',
                    'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                    'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'

			    }
		}).done(function(emailExiste){
			console.log('emailExiste: ',emailExiste);

			if(emailExiste[0] == undefined){
				$.ajax({
	                url: '/api/dataentities/CL/documents',
	                dataType: 'json',
	                type: 'POST',
	                crossDomain: true,
	                data: JSON.stringify(client),
	                headers: {
	                    'Accept': 'application/vnd.vtex.ds.v10+json',
	                    'Content-Type': 'application/json; charset=utf-8',
                        'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                        'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'
	                }
	            }).done(function(dataClient){
	            	console.log('dataClient: ',dataClient);
	            	console.log('DocumentId: ',dataClient.DocumentId); 	

	            	var adress = {
		                userId: email,
		                postalCode: postalCode,
		                street: street,
		                number: number,
		                complement: complement,
		                neighborhood: neighborhood,
		                state: state,
		                city: city,
		                receiverName: receiverName,
		                addressName: dataClient.DocumentId
		            }        

		            //console.log('adress: ',JSON.stringify(adress));

					setTimeout(function(){
	                    $.ajax({
					        url: '/api/dataentities/AD/documents',
					        dataType: 'json',
					        type: 'POST',
					        crossDomain: true,
					        data: JSON.stringify(adress),
					        headers: {
					            'Accept': 'application/vnd.vtex.ds.v10+json',
					            'Content-Type': 'application/json; charset=utf-8',
                                'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                                'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'
					        },
					        success: function(dataAdress){
					        	//console.log('dataAdress: ',dataAdress);

					        	$('#modal .content h2').html('Seu cadastro foi efetuado com sucesso.');
					        	$('#modal .content p').html(""+firstName+", Em breve nossa equipe entrará em contato com você.");
		            			$('#modal').fadeIn('fast');
		            			$('form.fisica .mensagem').removeClass('text-focus-in')

								$('form.fisica input').val("").removeClass('error');	
					        }
					    })
	                },500);
	                return false;
	            });
			}else if(emailExiste[0].approved == null || emailExiste[0].approved == false){
			        $('#modal .content h2').html('Aguarde só um pouco mais.');
			        $('#modal .content p').html(""+firstName+", Ainda estamos analisando o seu cadastro.<br/>E responderemos em breve.");
			        $('#modal').fadeIn('fast');

                    $('form.form .tpl-center .wrap .unico .mensagem').html('').removeClass('text-focus-in');
		    }else if(emailExiste[0].approved == true){
		    	$('#modal .content h2').html('Você já tem um cadastro ativo.');
		    	$('#modal .content p').html(""+firstName+", Faça o login. Se tiver problemas entre em contato<br/>conosco pelo e-mail:<br/>contato@lfmaquinaseferramentas.com.br");
		        $('#modal').fadeIn('fast');

		        $('#modal .content button.ok').addClass('entrar');
		        $('#modal .content button.entrar').live('click',function(){
		        	vtexid.start({
		        		returnUrl: "/",
		        		locale: 'pt-BR',
		        		forceReload: true
		        	});
		        });
		    }
		});
		return false;
    });/*ENVIO DE PESSOA FÍSICA*/

	$('form.juridica button.enviar').live('click', function() {
        var email = $('form.juridica input[name="email"]').val();
        var corporateName = $('form.juridica input[name="corporateName"]').val();
        var tradeName = $('form.juridica input[name="tradeName"]').val();
        var businessPhone = $('form.juridica input[name="businessPhone"]').val();
        // var icms = $('form.juridica input[name="icms"]').val();
        var corporateDocument = $('form.juridica input[name="corporateDocument"]').val();
        var stateRegistration = $('form.juridica input[name="stateRegistration"]').val();

        var firstName = $('form.juridica input[name="firstName"]').val();
        var lastName = $('form.juridica input[name="lastName"]').val();
        var birthDate = $('form.juridica input[name="birthDate"]').val();
        //var rg = $('form.juridica input[name="rg"]').val();
        var document = $('form.juridica input[name="document"]').val();
        var phone = $('form.juridica input[name="phone"]').val();
        var homePhone = $('form.juridica input[name="homePhone"]').val();
    	
        var postalCode = $('form.juridica input[name="postalCode"]').val();   
        var street = $('form.juridica input[name="street"]').val(); 
        var number = $('form.juridica input[name="number"]').val(); 
        var complement = $('form.juridica input[name="complement"]').val(); 
        var neighborhood = $('form.juridica input[name="neighborhood"]').val(); 
        var state = $('form.juridica input[name="state"]').val(); 
        var city = $('form.juridica input[name="city"]').val(); 
        var receiverName = $('form.juridica input[name="receiverName"]').val(); 

        window.isNewsletterOptIn = true;
        
        $('form.juridica input[type="text"]').removeClass('error');

        if (email == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu e-mail.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu e-mail.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input').removeClass('error');
            $('form.juridica input[name="email"]').addClass('error').focus();

            return false;
        }
        var parte1 = email.indexOf("@");
        var parte3 = email.length;
        if (!(parte1 >= 3 && parte3 >= 9)) {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Informe um e-mail válido!</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Informe um e-mail válido!',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input').removeClass('error');
            $('form.juridica input[name="email"]').addClass('error').focus();
            
            return false;
        }
        if (corporateName == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe a razão social.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe a razão social.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="corporateName"]').addClass('error').focus();
            
            return false;
        }
        if (tradeName == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o nome fantasia.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o nome fantasia.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="tradeName"]').addClass('error').focus();
            
            return false;
        }
        if (businessPhone == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o telefone comercial.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o telefone comercial.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="businessPhone"]').addClass('error').focus();
            
            return false;
        }
        if (corporateDocument == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o CNPJ.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o CNPJ.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="corporateDocument"]').addClass('error').focus();
            
            return false;
        }
        if (stateRegistration == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe a inscrição estadual.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe a inscrição estadual.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="stateRegistration"]').addClass('error').focus();
            
            return false;
        }

        if (firstName == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu nome.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu nome.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="firstName"]').addClass('error').focus();
            
            return false;
        }
        if (lastName == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu sobrenome.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu sobrenome.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="lastName"]').addClass('error').focus();
            
            return false;
        }
        if (birthDate == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe sua data de aniversário.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe sua data de aniversário.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="birthDate"]').addClass('error').focus();
            
            return false;
        }
        if (document == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu CPF.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu CPF.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="document"]').addClass('error').focus();
            
            return false;
        }
        if (phone == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe seu celular.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe seu celular.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="phone"]').addClass('error').focus();
            
            return false;
        }

        if (postalCode == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o CEP corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o CEP corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="postalCode"]').addClass('error').focus();
            
            return false;
        }
        if (number == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o número do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o número do endereço corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="number"]').addClass('error').focus();
            
            return false;
        }
        if (street == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o endereço corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="street"]').addClass('error').focus();
            
            return false;
        }
        if (neighborhood == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o bairro do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o bairro do endereço corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="neighborhood"]').addClass('error').focus();
           
            return false;
        }
        if (city == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe a cidade do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe a cidade do endereço corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="city"]').addClass('error').focus();
           
            return false;
        }
        if (state == "") {
            //$('form.juridica .mensagem').addClass('text-focus-in').html("<span style='color: red'>Por favor, informe o UF do endereço corporativo.</span>");
            
            $.toast({
                position: 'bottom-left',
                heading: 'Erro!',
                text: 'Por favor, informe o UF do endereço corporativo.',
                showHideTransition: 'fade',
                icon: 'error'
            });

            $('form.juridica input[name="state"]').addClass('error').focus();
           
            return false;
        }

        $('form.juridica .mensagem').addClass('text-focus-in').html("Aguarde...");

        var dateCadastro = new Date();
		dataCriacao = (dateCadastro.toLocaleString()); 

        var birthDate = birthDate.split('/');
        //console.log('birthDate: ',birthDate);
        var birthDate = birthDate[2]+"/"+birthDate[1]+"/"+birthDate[1];
        //console.log('birthDate: ',birthDate);

        var client = {
            isCorporate: true,
            email: email,
            corporateName: corporateName,
            tradeName: tradeName,
            businessPhone: businessPhone,
            // icms: icms,
            corporateDocument: corporateDocument,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            //rg: rg,
            document: document,
            phone: phone,
            homePhone: homePhone,
            stateRegistration: stateRegistration,
            isNewsletterOptIn: window.isNewsletterOptIn,
            approved: true
        }

        console.log('client juridica >> ',JSON.stringify(client));

        $.ajax({
			    url: '/api/dataentities/CL/search',
			    type: 'GET',
			    dataType: 'json',
			    data: {"_fields": "id,nome,email,approved","_where": "email="+client.email},
			    crossDomain: true,
			    headers: {
			        'Accept': 'application/vnd.vtex.ds.v10+json',
			        'Content-Type': 'application/json',
			        'REST-Range': 'resources=0-2',
                    'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                    'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'
			    }
		}).done(function(emailExiste){
			//console.log('emailExiste: ',emailExiste);

			if(emailExiste[0] == undefined){
				$.ajax({
	                url: '/api/dataentities/CL/documents',
	                dataType: 'json',
	                type: 'POST',
	                crossDomain: true,
	                data: JSON.stringify(client),
	                headers: {
	                    'Accept': 'application/vnd.vtex.ds.v10+json',
	                    'Content-Type': 'application/json; charset=utf-8',
                        'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                        'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'
	                }
	            }).done(function(dataClient){
	            	//console.log('dataClient: ',dataClient);
	            	//console.log('DocumentId: ',dataClient.DocumentId); 	

	            	var adress = {
		                userId: email,
		                postalCode: postalCode,
		                street: street,
		                number: number,
		                complement: complement,
		                neighborhood: neighborhood,
		                state: state,
		                city: city,
		                receiverName: receiverName,
		                addressName: dataClient.DocumentId
		            }        

		            //console.log('adress: ',JSON.stringify(adress));

					setTimeout(function(){
	                    $.ajax({
					        url: '/api/dataentities/AD/documents',
					        dataType: 'json',
					        type: 'POST',
					        crossDomain: true,
					        data: JSON.stringify(adress),
					        headers: {
					            'Accept': 'application/vnd.vtex.ds.v10+json',
					            'Content-Type': 'application/json; charset=utf-8',
                                'x-vtex-api-AppKey': 'vtexappkey-rdlay-PTHZQZ',
                                'x-vtex-api-AppToken': 'HEYCVJVBNGWITFBPSDZQQTFDTDDEQXJWAQUOUGNJWHETAGZSFIHEVIITTIXDXOTFOQUNIFZUDZITCFWEGMUWFMGSCIIPLDHYFCRJEARJEQZEOEQKDXXHGLPMVTHPPKQR'
					        },
					        success: function(dataAdress){
					        	//console.log('dataAdress: ',dataAdress);

					        	$('#modal .content h2').html('Seu cadastro foi efetuado com sucesso.');
					        	$('#modal .content p').html(""+corporateName+", Em breve nossa equipe entrará em contato com você.");
		            			$('#modal').fadeIn('fast');
		            			$('form.juridica .mensagem').removeClass('text-focus-in')

								$('form.juridica input').val("").removeClass('error');	
					        }
					    })
	                },500);
	                return false;
	            });
			}else if(emailExiste[0].approved == null || emailExiste[0].approved == false){
			        $('#modal .content h2').html('Aguarde só um pouco mais.');
			        $('#modal .content p').html(""+corporateName+", Ainda estamos analisando o seu cadastro.<br/>E responderemos em breve.");
			        $('#modal').fadeIn('fast');

                    $('form.form .tpl-center .wrap .unico .mensagem').html('').removeClass('text-focus-in');
		    }else if(emailExiste[0].approved == true){
		    	$('#modal .content h2').html('Você já tem um cadastro ativo.');
		    	$('#modal .content p').html(""+corporateName+", Faça o login. Se tiver problemas entre em contato<br/>conosco pelo e-mail:<br/>contato@chiceelegante.com.br");
		        $('#modal').fadeIn('fast');

		        $('#modal .content button.ok').addClass('entrar');
		        $('#modal .content button.entrar').live('click',function(){
		        	vtexid.start();
		        });
		    }
		});
		return false;
    });/*ENVIO DE PESSOA JURÍDICA*/
};

if($('body').hasClass('pag403')){
    $('#modal .content h2').html('Você não tem cadastro!');
    $('#modal .content p').html("É preciso se cadastrar para ter acesso ao site do atacado.");
    $('#modal').fadeIn('fast');
    $('body.pag401 .bemVindo .tpl-center .opcoes .opcao button.cadastro').click();
}
