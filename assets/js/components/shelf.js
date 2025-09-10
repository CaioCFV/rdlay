$('.helperComplement').remove();

/*COMPRA RÁPIDA PRATELEIRA*/
$('.prateleira ul li').live("mouseover",function(){
	var _this = $(this);
	var _thisLink = _this.find('a').attr('href');
	//console.log('_thisLink >> ', _thisLink);

	if(!$('body').hasClass('b2b')){
		if($(window).width() > 940){	
			if(_this.find('.esgotado').size() == 0){
				var productId = _this.find('.productId').text();
				//console.log('productId: ',productId);
				
				if(!_this.hasClass('comSku')){
					$.ajax({
						url: '/api/catalog_system/pub/products/variations/'+productId+'',
						dataType: 'html',
						success: function(product) {
							var product = JSON.parse(product);
							console.log('Product >>>  ',product);

							_this.find('.skus strong').remove();
							

							if($('body').hasClass('home2025')){
								var cores = product.dimensionsMap.Cor;
								$.each(cores, function(index, cor) {
									_this.find('ul.cores').append(
										'<li class="thisCor" rel="' + cor + '" alt="' + cor + '" title="' + cor + '">' +
											'<label><img src="/arquivos/thumb-sr_' + cor + '.png" alt="' + cor + '" title="' + cor + '"/></label>' +
										'</li>'
									);
								});
							}
							
							var cor = product.dimensionsMap.Cor[0];
							_this.find('.skus .cor').append('<li class="thisCor select ativo" rel="'+cor+'"><label><img src="/arquivos/thumb-sr_'+cor+'.png" alt="'+cor+'"/></label></li>');
							if(product.dimensionsMap.Cor.length > 1){
								_this.find('.skus .cor').append('<li class="thisCor select mais"><a href="'+_thisLink+'"><label><img src="/arquivos/0-rdy-icone-maiscor.png" alt="+ Mais"/></label></a></li>');
							}
							
							for(var i = 0; i < product.skus.length; i++) {
								if(product.skus[i].available == true && !$('body').hasClass('home2025')){
									if(product.skus[i].dimensions.Cor == cor){//verifico se é igual a primeira cor
										if(product.skus.length == 1){
											if(product.skus[i].dimensions.Tamanho == 'Único'){
												_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select ativo" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>U</label></li>');
											}else{
												_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select ativo" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');
											}
										}else{
											_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');
										}
									}
								}else if($('body').hasClass('home2025')){
									if(product.skus[i].dimensions.Cor == cor){//verifico se é igual a primeira cor
										if(product.skus.length == 1){
											if(product.skus[i].dimensions.Tamanho == 'Único'){
												_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select ativo" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>U</label></li>');
											}else{
												if(product.skus[i].available == false){
													_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select ativo indisponivel" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');
												}else{
													_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select ativo indisponivel" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');	
												}
											}
										}else{
											if(product.skus[i].available == false){
												_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select indisponivel" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');
											}else{
												_this.find('.skus .tamanho').append('<li class="thisTamanho comSku select" rel="'+product.skus[i].sku+'" val="'+product.skus[i].dimensions.Tamanho+'"><label>'+product.skus[i].dimensions.Tamanho+'</label></li>');
											}
										}
									}
								}

								if(i+1 == product.skus.length){
									_this.find('.skus .cor, .skus .tamanho').css('display', 'flex');
									if(_this.find('.skus .tamanho li.thisTamanho').size() < 1){
										_this.find('.skus .tamanho').html('<a href="'+_thisLink+'" class="tamanhoindisponivel">Tamanhos indisponíveis | ver+</a>');
										_this.find('.bt-adicionar').hide();
									}
								}
							}
						}
					});
					_this.addClass('comSku');
				}
			}
		}
	}else{
		_this.find('.wrapperAmountInCart').hide();
	}
});
$('.prateleira ul li .skus li').live('click', function(){
	var _this = $(this);
	if(_this.hasClass('indisponivel')){
		$.toast({
			position: 'bottom-left',
		    heading: 'Erro!',
		    text: 'Por favor, selecione um tamanho disponível.',
		    showHideTransition: 'fade',
		    icon: 'error'
		});
	}else{
		$('.prateleira ul li .skus div.tamanho li').removeClass('ativo');
		$('.prateleira ul li .skus div.tamanho li').removeAttr('style');
		$(this).parents('.prateleira li').find('button.bt').removeClass('aguarde');
		$(this).addClass('ativo');
	}
});
$('.prateleira ul li button.bt').live('click', function(){
	var _thisbt = $(this);
	
	if(_thisbt.parents('li').find('.skus .tamanho li').hasClass('ativo')){
		_thisbt.addClass('aguarde');
		var idSku = _thisbt.parents('li').find('.skus .tamanho li.ativo').attr('rel');
		
		var urlFinal;

		if($('body').hasClass('b2b')){
			var urlFinal = '/checkout/cart/add?sku='+idSku+'&qty=1&seller=1&redirect=false&sc=4';
		}else{
			var urlFinal = '/checkout/cart/add?sku='+idSku+'&qty=1&seller=1&redirect=false&sc=1';
		}
		
		$.toast({
			position: 'bottom-left',
		    heading: 'Aguarde...',
		    text: 'Estamos adicionando seu produto na sacola!',
		    showHideTransition: 'fade',
		    icon: 'info'
		});
		
		$.ajax({
			url: urlFinal
		}).success(function() {
			setTimeout(function() {
				vtexjs.checkout.getOrderForm();
				
				window.helper.fillCart();
				
				$.toast({
					position: 'bottom-left',
				    heading: 'Sucesso',
				    text: 'Produto adicionado na sua sacola!',
				    showHideTransition: 'fade',
				    icon: 'success'
				});

				/*setTimeout(function(){
					window.helper.openCart();
				},500);*/
				
				_thisbt.removeClass('aguarde');
				
			},1000);
		});
	}else{
		$.toast({
			position: 'bottom-left',
		    heading: 'Erro!',
		    text: 'Por favor, selecione um tamanho disponível.',
		    showHideTransition: 'fade',
		    icon: 'error'
		});
		
		setTimeout(function(){
			_thisbt.removeClass('aguarde');
		},3000)
	}
});
/*FIM COMPRA RÁPIDA PRATELEIRA*/

$('section.wrapperPrateleira').each(function(){
	var _this = $(this);
	var thisQty;
	var vertical;

	_this.find('.prateleira > h2').addClass('titulo');

	if(_this.hasClass('quadruplo')){
		var thisQty = 4;
		var vertical = false;
	}

	if(_this.hasClass('triplo')){
		var thisQty = 3;
		var vertical = false;
	}

	if(_this.hasClass('duplo')){
		var thisQty = 2;
		var vertical = false;
	}

	if(_this.hasClass('vertical')){
		var thisQty = 4;
		var vertical = true;
	}

	_this.find('.prateleira > ul').not('.slick-initialized').slick({
		infinite: true,
		slidesToShow: thisQty,
		slidesToScroll: thisQty,
		vertical: vertical,
		verticalSwiping: vertical,
		dots: false,
		arrows: true,
		infinite: true,
		responsive: [
			{
				breakpoint: 920,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 340,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});

/*DECONTO PRATELEIRA*/
window.descontoPrateleira = function (){
	$('.prateleira li').each(function(){
		var _thisLi = $(this);

		if(!$(this).find('.descontoDePor div').length){
			var newPreco = $(this).find('.valor-por strong').text().split('R$ ');
			var oldPreco = $(this).find('.valor-de strong').text().split('R$ ');
			if ( $(this).find('.valor-de').length > 0 ) {
				var novoValor = newPreco[1].replace('.', '').replace(',', '.');
				var velhoValor = oldPreco[1].replace('.', '').replace(',', '.');
				var variacao = ((velhoValor - novoValor) / velhoValor) * 100;
				if(oldPreco.indexOf("99.999,00") == -1){
					$(this).find('.descontoDePor').html('<div><span class="porcent">-' + variacao.toFixed(0) + '%</span><strong>Off</strong></div>').css('display', 'flex');            
				}
			}
		}
	});
}
window.descontoPrateleira();/*FIM DECONTO PRATELEIRA*/
