/*MINICART*/
var settings = {
	effect: 'overlay'
};

var cart = null;
var helper = {
	openCart : function(){
		var width = $(cart).width() * -1;

		if(settings.effect == "push"){
			$(settings.wrapper).animate({
				marginLeft:width
			});
		}

		$(cart).animate({
			right:0
		});

		$('.sta-cart-overlay').fadeIn();
		$('body').addClass('menuOpen');
	},
	closeCart : function(){
		var width = $(cart).width() * -1;

		if(settings.effect == "push"){
			$(settings.wrapper).animate({
				marginLeft:0
			});
		}

		$(cart).animate({
			right: '-600px'
		});

		$('.sta-cart-overlay').fadeOut();
		$('.sta-cart-comfirm').fadeOut();
		$('body').removeClass('menuOpen');
	},
	fillCart : function(){
		setTimeout(function() {
			vtexjs.checkout.getOrderForm().done(function(orderForm) {

				var items = orderForm.items;
				var itemsQtd = items.length
				var i;

				var totalItems;
				var totalShipping;
				var totalDiscount;

				var $_subtotalValue = $(cart).find('.sta-cart-sub strong');

				for (var i = 0; i < orderForm.totalizers.length; i++) {
					if(orderForm.totalizers[i].id == "Items") {
						totalItems = orderForm.totalizers[i].value;
					} else if (orderForm.totalizers[i].id == "Shipping") {
						totalShipping = orderForm.totalizers[i].value;
					} else if (orderForm.totalizers[i].id == "Discounts") {
						totalDiscount = orderForm.totalizers[i].value;
					}
				}

				if (totalItems != undefined) {
					$(cart).find('.sta-cart-sub strong').html('R$ ' + helper.toReal(totalItems));
					
					helper.barShipping();
					//helper.descontoCarrinho();
				} else {
					$(cart).find('.sta-cart-sub strong').html('R$ ' + helper.toReal("000"));
				}
				if (totalShipping != undefined){
					$(cart).find('.sta-cart-freight').css('display','none');
					$(cart).find('.sta-cart-freight strong').html('R$ ' + helper.toReal(totalShipping));

				}
				if (totalDiscount != undefined){
					$(cart).find('.sta-cart-discount').css('display','block');
					$(cart).find('.sta-cart-discount strong').html('R$ ' + helper.toReal(totalDiscount));
				}

				$(cart).find('.sta-cart-total strong').html('R$ ' + helper.toReal(orderForm.value));

				setTimeout(function(){
					if (orderForm.totalizers.length) {
						orderForm.totalizers.map(function (totalizer, index) {
							var valueTotalizer = 'R$ ' + _.formatCurrency(totalizer.value / 100, {absolute: true});

							// Soma valores Frete
							if (totalizer.id === 'Shipping') {
								valueTotalizer = totalizer.value > 0 ? valueTotalizer : 'Grátis';
								var cepUsado = orderForm.shippingData.address.postalCode;

								$('.totalizer-row.freight form').hide();
								$('.totalizer-row.freight .freight-query').text(cepUsado);
								$('.totalizer-row.freight .freight-value').text(valueTotalizer);
								$('.totalizer-row.freight .freight-result').css('display','flex');

								helper._refreshFreight();
							}

							// Soma valores Descontos
							if (totalizer.id === 'Discounts') {
								$_subtotalValue.append(
									$('<span>', {'class':'subtotal-discount', 'text':' - (' + valueTotalizer + ')'})
								)
							}
						})
					}
				},500);

				var btnOpenCart = '<i class="ico-cart"></i> <span class="count">'+itemsQtd+'</span>';

				//$('.sta-cart-title .count').text(itemsQtd);
				//$('.openCart').html(btnOpenCart);

				$(cart).find('.sta-cart-items > ul').html('');

				if(items.length > 0){

					$('.sta-cart-resume a').removeClass('disabled');

					for(i = 0; i < items.length; i++){
					//	console.log('items: ',items);

						var cartItem =   '<li isGift='+items[i].isGift+'>'
								cartItem +=  '<div class="sta-cart-pdt-image">';
									cartItem +=  '<img src="'+items[i].imageUrl.replace('80-80','90-140')+'" />';
								cartItem +=  '</div>';
								cartItem +=  '<div class="sta-cart-pdt-info">';
									cartItem +=  '<h4>'+items[i].name+'</h4> ';
									cartItem +=  '<button class="remove-item" data-index="'+i+'">';
										cartItem +=  '<i class="far fa-trash-alt"></i>';
									cartItem +=  '</button>';
									cartItem +=  '<div class="sta-cart-pdt-other-info">';
										cartItem +=  '<div class="sta-cart-pdt-qtd">';
											cartItem +=  '<ul class="list-count list-count-cart" data-index="' + i + '">';
												cartItem +=  '<li class="minus"><a href="#" class="qty-less"><span class="ico-minus">-</span></a></li>';
												cartItem +=  '<li class="result"><input type="text" value="' + items[i].quantity + '" name="quantity" class="qty-field field" min="1" max="100" step="1" /></li>';
												cartItem +=  '<li class="plus"><a href="#" class="qty-more"><span class="ico-plus">+</span></a></li>';
											cartItem +=  '</ul>';
										cartItem +=  '</div>';
										cartItem +=  '<p class="listPrice">R$ '+helper.toReal(items[i].listPrice)+'</p>';
										cartItem +=  '<p class="bestPrice">'+items[i].formattedPrice+'</p>';
									cartItem +=  '</div>';
								cartItem +=  '</div>';
							cartItem +=  '</li>';

						$(cart).find('.sta-cart-items > ul').append(cartItem);

						if($('.sta-cart-items > ul > li').eq(i).find('p.listPrice').text() == $('.sta-cart-items > ul > li').eq(i).find('p.bestPrice').text()) {
							$('.sta-cart-items > ul > li').eq(i).find('p.listPrice').remove();
						}else{
							$('.sta-cart-items > ul > li').eq(i).addClass('comDesconto');
							$('.sta-cart-items > ul > li').eq(i).attr('desconto',items[i].listPrice);
							$('.sta-cart-items > ul > li').eq(i).attr('preco',items[i].price);
						}

						if($('.sta-cart-container .sta-cart-resume .sta-cart-freight strong').text() == 'R$ 0,00'){
							$('.sta-cart-container .sta-cart-resume .sta-cart-freight').hide();
						}
					}

					$('h3 div.itens').html('( '+$('a.openCart ul li.amount-items em.amount-items-em').text()+' )'); 
					
					helper.barShipping();
					helper._couponController(orderForm);
					//helper.descontoCarrinho();
				} else{
					$('.sta-cart-resume a').addClass('disabled');
					helper.closeCart();
				}
			});
		}, 500);
	},
	renderCouponsOptions: function() {
		$('.sta-cart-coupons').append(
			$('<div>', {'class': 'sta-cart-coupons-content'}).append(
				// Cupom Form
				$('<div>',{'class':'totalizer-row coupon'}).append(
					$('<div>', {'class': 'totalizer-column prep'}).append(
						$('<span>', {'text': 'Cupom de desconto'})
					),
					$('<div>', {'class': 'totalizer-column value'}).append(
						$('<form>',{'id':'coupon-form'}).append(
							$('<input>',{'type':'text','class':'coupon-input','placeholder':'Adicione o cupom'})
						).append(
							$('<button>',{'class':'btn-coupon-simulate', 'text':'adicionar'})
						)
					).append(
						$('<div>',{'class':'result coupon-result'}).append(
							$('<div>',{'class':'content'}).append(
								$('<span>',{'class':'error coupon-error'})
							).append(
								$('<span>',{'class':'query coupon-code'})
							).append(
								$('<a>',{'class':'close coupon-close', 'html':'<i class="ico-close"></i>'})
							).append(
								$('<span>',{'class':'value coupon-value'})
							)
						)
					)
				),
				// Vendedor Form
				$('<div>',{'class':'totalizer-row seller'}).append(
					$('<div>', {'class': 'totalizer-column prep'}).append(
						$('<span>', {'text': 'Código de vendedor(a)'})
					)
				).append(
					$('<div>', {'class': 'totalizer-column value'}).append(
						$('<form>',{'id':'seller-form'}).append(
							$('<input>',{'type':'text','class':'seller-input','placeholder':'Adicione o código'})
						).append(
							$('<button>',{'class':'btn-seller-simulate', 'text':'Adicionar'})
						)
					).append(
						$('<div>',{'class':'result seller-result'}).append(
							$('<div>',{'class':'content'}).append(
								$('<span>',{'class':'error seller-error'})
							).append(
								$('<span>',{'class':'query seller-name'})
							).append(
								$('<a>',{'class':'close seller-close', 'html':'<i class="ico-close"></i>'})
							)
						)
					)
				),
				// Frete Form
				$('<div>',{'class':'totalizer-row freight'}).append(
					$('<div>', {'class': 'totalizer-column prep'}).append(
						$('<span>', {'text': 'Frete'})
					),
					$('<div>', {'class': 'totalizer-column value'}).append(
						$('<form>',{'id':'freight-form'}).append(
							$('<input>',{'type':'text','class':'freight-input','placeholder':'Digite o CEP'})
						).append(
							$('<button>',{'class':'btn-freight-simulate', 'text':'Calcular'})
						)
					).append(
						$('<div>',{'class':'result freight-result'}).append(
							$('<div>',{'class':'content'}).append(
								$('<span>',{'class':'error freight-error'})
							)
							.append(
								$('<div>',{'class':'freight-success'})
								.append(
									$('<span>',{'class':'query freight-query'})
								).append(
									$('<a>',{'class':'close freight-close'}).append('<i class="ico-close"></i>')
								).append(
										$('<span>',{'class':'freight-value'})
								)
							)
						)
					)
				)
			)
		)
	},
	_couponController: function (orderForm) {
		var $_couponCode 		= $('.sta-cart-coupons').find('.coupon-code');
		var $_couponValue 		= $('.sta-cart-coupons').find('.coupon-value');
		console.log('_couponController orderForm: ',orderForm);
		vtexjs.checkout.getOrderForm().then(function (orderForm) {
			if (orderForm.ratesAndBenefitsData) {
				if (orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers.length) {
					var cupomPreenchido, valorCupom;
					$(orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers).each(function (index, valor) {
						if (valor.matchedParameters['couponCode@Marketing']) {
							cupomPreenchido = valor.matchedParameters['couponCode@Marketing'];
							$_couponCode.html(cupomPreenchido);
							$_couponValue.html(valorCupom);

							$('.totalizer-row.coupon form').hide();
							$('.totalizer-row.coupon .result').css('display','flex');
						}
					})
					if (!cupomPreenchido) {
						$_couponCode.html('');
						$_couponValue.html('');
						$('input.coupon-input').val('');
						$('.totalizer-row.coupon form').show();
						$('.totalizer-row.coupon .result').hide();
					}
				} else {
					$_couponCode.html('');
					$_couponValue.html('');
					$('input.coupon-input').val('');
					$('.totalizer-row.coupon form').show();
					$('.totalizer-row.coupon .result').hide();
				}
			} else {
				$_couponCode.html('');
				$_couponValue.html('');
				$('input.coupon-input').val('');
				$('.totalizer-row.coupon form').show();
				$('.totalizer-row.coupon .result').hide();
			}
		});
	},
	_applyCoupon: function(code) {
		var settings = {
			'entityId': 'VD', 
		}

		$.ajax({
			url: '/api/dataentities/' + settings.entityId + '/search/?_fields=id,code,name,active&code=' + code,
			dataType: 'json',
			type: 'GET',
			headers: {
				'Accept': 'application/vnd.vtex.ds.v10+json',
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).done(function (data) {
			console.log('data: ',data);
			if (data.length && data[0].active) {
				alert('O código informado é de VENDEDORA. Insira no campo destinado a VENDEDORA.');
				$('form#coupon-form input.coupon-input').val('');
			} else {
				vtexjs.checkout.getOrderForm().then(function (orderForm) {
					return vtexjs.checkout.addDiscountCoupon(code);
				}).done(function (orderForm) {
					if (orderForm.items.length > 0) {
						if (orderForm.messages.length > 0 && orderForm.messages[0].code == 'couponNotFound') {
							alert(orderForm.messages[0].text);
						}else{
							helper._clearCoupon(orderForm.orderFormId);
							return false;
						}
						helper.fillCart();
						helper._couponController(orderForm);
					} else {
						alert("Por favor, coloque um item no carrinho.");
					}
				});
			}
		});
	},
	_addCoupon: function() {
		var $_couponInput = $('.sta-cart-coupons').find('.coupon-input');

		$('form#coupon-form').on('submit',function(e){
			e.preventDefault()
			var couponValue = $_couponInput.val();
			if(couponValue.length){
				helper._applyCoupon(couponValue);
			}else{
				alert("Por favor, insira um cupom válido.");
			}
		})
	},
	_removeCoupon: function () {
		$('.coupon-close').live('click', function(e) {
			e.preventDefault();
			var code = '';
			//helper._applyCoupon(couponValue);

			vtexjs.checkout.getOrderForm().then(function (orderForm) {
				return vtexjs.checkout.addDiscountCoupon(code);
			}).done(function (orderForm) {
				if (orderForm.items.length > 0) {
					if (orderForm.messages.length > 0 && orderForm.messages[0].code == 'couponNotFound') {
						alert(orderForm.messages[0].text);
					}else{
						helper._clearCoupon(orderForm.orderFormId);
						return false;
					}
					helper.fillCart();
					helper._couponController(orderForm);
				} else {
					alert("Por favor, coloque um item no carrinho.");
				}
			});
		})
	},
	_clearCoupon: function(orderFormId) {
		var urlClear = '/api/checkout/pub/orderForm/' + orderFormId + '/messages/clear';
		var data = { "": "" };
		$.ajax({
			'url': urlClear,
			'type': 'post',
			'data': data,
			success: function (data) {
				helper.fillCart();
				helper._couponController(orderFormId);
			}
		})
	},
	_ajaxFreight: function (id, channel, tax) {
		var orderFormId = vtexjs.checkout.orderForm.orderFormId;
		var address = vtexjs.checkout.orderForm.shippingData.address;
		var logisticsInfoArr = vtexjs.checkout.orderForm.shippingData.logisticsInfo;
		var infoSla = [];

		logisticsInfoArr.map(function (info, index) {
			infoSla.push({
				itemIndex: info.itemIndex,
				selectedSla: id,
				tax: tax,
				selectedDeliveryChannel: channel
			})
		})

		var logisticsInfo = {
			"address": address,
			"logisticsInfo": infoSla
		}

		var url = '/api/checkout/pub/orderForm/' + orderFormId + '/attachments/shippingData';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(logisticsInfo),
		}).done(function (orderForm) {
			helper.fillCart();
		}).fail(function (error) {
			alert("erro: ", error);
		})
	},
	_applyFreight: function(address) {
		if (vtexjs.checkout.orderForm.items.length > 0) {
			vtexjs.checkout.getOrderForm().then(function(orderForm) {
				return vtexjs.checkout.calculateShipping(address)
			}).done(function(orderForm) {
				var slas = orderForm.shippingData.logisticsInfo;
				var msg = true;

				$(slas).each(function (index, valor) {
					if (!valor.selectedSla) {
						msg = false
					}
				})
				if (!msg) {
					alert('Por favor, coloque um CEP válido.');
					helper._clearCoupon(vtexjs.checkout.orderForm.orderFormId);
				}
				helper.fillCart();
			});
		} else {
			alert('Por favor, coloque um item no carrinho.')
			return false;
		}
	},
	_addFreight: function() {
		var $_freightInput = $('#freight-form').find('.freight-input');

		$('form#freight-form').on('submit',function(e) {
			e.preventDefault();

			var freightValue = $_freightInput.val();

			if(freightValue.length) {
				var address = {
					"postalCode": freightValue,
					"country": 'BRA'
				};
				helper._applyFreight(address);
			}else{
				alert("Por favor, insira um CEP válido.")
			}
		})
	},
	_refreshFreight: function () {
		$(document).on('click', '.freight-close', function (e) {
			e.preventDefault();
			helper._resetFreight();
		});
	},
	_resetFreight: function() {
		var $_freightValue 		= $('.sta-cart-coupons').find('.freight-value');
		var $_freightInput 		= $('.sta-cart-coupons').find('.freight-input');

		vtexjs.checkout.getOrderForm().then(function(orderForm) {
			return vtexjs.checkout.calculateShipping()
		}).done(function(orderForm) {
			$_freightInput.val('');
			$_freightValue.text('');
			$('.totalizer-row.freight .freight-query').text('');

			$('.totalizer-row.freight .freight-result').hide();
			$('.totalizer-row.freight form').show();

			setTimeout(function(){
				helper.fillCart();
			},500);
		});
	},
	addSeller: function() {
		var $_sellerInput = $('.seller-input');

		$('#seller-form button').live('click',function(e){
			e.preventDefault()

			var sellerCode = $_sellerInput.val();

			if(sellerCode.length){
				helper.applySeller(sellerCode);
			}else{
				alert("Por favor, insira um código válido.");
			}
		})
	},
	applySeller: function(sellerCode) {
		var $_sellerInput = $('.seller-input');
		var settings = {
			'utmSource': '',
			/*'utmCampaign': '',
			'utmiCampaign': '',*/
			'entityId': 'VD', 
		}

		$.ajax({
			url: '/api/dataentities/' + settings.entityId + '/search/?_fields=id,code,name,active&code=' + sellerCode,
			dataType: 'json',
			type: 'GET',
			headers: {
				'Accept': 'application/vnd.vtex.ds.v10+json',
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).done(function (data) {
			if (data.length && data[0].active) {
				var sellerInfos = 'VENDEDOR: código: ' + data[0].code + ', nome: ' + data[0].name;
				console.log('data[0].code:',data[0].code);
				var settings = {
					'utmSource': data[0].code,
					/*'utmCampaign': data[0].code,
					'utmiCampaign': data[0].code,*/
					'entityId': 'VD', 
				}

				vtexjs.checkout.getOrderForm().then(function (orderForm) {
					var newMarketingData = orderForm.marketingData;

					if(newMarketingData == null) {
						newMarketingData = {
							'utmSource': settings.utmSource,
							/*'utmCampaign': settings.utmCampaign,
							'utmiCampaign': settings.utmiCampaign,*/
							'utmiPart': sellerInfos
						}
					} else {
						newMarketingData.utmSource = settings.utmSource;
						/*newMarketingData.utmCampaign = settings.utmCampaign;
						newMarketingData.utmiCampaign = settings.utmiCampaign;*/
						newMarketingData.utmiPart = sellerInfos;
					}

					var observacion = 'VENDEDOR: código: ' + data[0].code + ', nome: ' + data[0].name;
					vtexjs.checkout.sendAttachment('openTextField', {
									value: observacion
							});

					vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
						//localStorage.setItem('sellerInfo', JSON.stringify(data[0]));
						localStorage.setItem('vendedor', sellerCode);
						$.cookie('vendedor', sellerCode, { expires: 7, path: '/' });

						$('.seller-name').text(data[0].name);
						$_sellerInput.val('');
						$('#seller-form').hide();
						$('.seller-result').css('display','flex');
						helper.fillCart();
					});

					console.log('orderForm: ',orderForm);
				})
			} else {
				alert('O código informado é inválido ou inativo. Por favor, tente novamente.');
				$_sellerInput.val('');
			}
		})
	},

	addItem : function(el){
		var urlTest = ["javascript",":","alert('Por favor, selecione o modelo desejado.');"].join('');
		var urlFinal = $(el).attr('href');
		var guardaQty = $('section#area-a .right .wrapper.botao .qty').val();
		
		//console.log('guardaQty: ', guardaQty);
		
		var urlFinal = urlFinal.replace('true','false').replace('qty=1','qty='+guardaQty+'');

		//console.log('urlFinal: ',urlFinal);

		if(urlFinal == urlTest){
			$('section#area-a .right .wrapper.sku ul.topic.Tamanho li.specification').addClass('error');
			alert('Por favor, selecione o tamanho desejado.');

			return false;
		} else {
			$('#ajaxBusy').fadeIn();
			$('.btadicionar').html('Aguarde...');

			$.ajax({
				url: urlFinal
			}).success(function() {
				setTimeout(function() {
					$('#ajaxBusy').fadeOut();
					
					helper.fillCart();
					$('.btadicionar').html('Adicionar ao Carrinho');

					//window.location = '/checkout/#/cart';

					setTimeout(function(){
						helper.openCart();
						//$('.btadicionar').html('Adicionar ao Carrinho');
					},1000);

					setTimeout(function(){
						helper.closeCart();
					},9000);
				}, 1000);
			});

		}
	},
	changeItem: function(itemIndex, quantity) {
		//console.log('itemIndex: ',itemIndex);
		vtexjs.checkout.getOrderForm().then(function(orderForm) {
			var indiceIndex = itemIndex;
			var item = orderForm.items[indiceIndex];
			var updateItem = {
				index: indiceIndex,
				quantity: quantity
			};
			return vtexjs.checkout.updateItems([updateItem], null, false);
		}).done(function(orderForm) {
			//alert('Items atualizados!');
			//console.log(orderForm);
			helper.fillCart();
		});
	},
	removeItem : function(index,e){
		//if (confirm('Ei! Tem certeza que deseja tirar essa peça da sacola? Aproveite e leve sua peça agora!')) {
			vtexjs.checkout.getOrderForm().then(function (orderForm) {
				var item = orderForm.items[index];
				item.index = index;
				return vtexjs.checkout.removeItems([item]);
			}).done(function (orderForm) {
				helper.fillCart();
			});
		//}
	},
	toReal : function(val){
		val = val / 100;
		val = val.toFixed(2).toString().replace('.',',');
		return val;
	},
	barShipping: function(){
		setTimeout(function(){		
			$('.contentShippng').remove();

			var frete;
			if($('.sta-cart-coupons .freight-value').text() == 'Grátis'){
				var frete = '150';
			}else{
				var frete = $('label#fretePreco').text();
			}

			console.log('frete: ',frete);
			//var valor = $('.sta-cart-sub strong').html().split(' ')[1].replace(',','.');
			var valor = $('.sta-cart-total strong').html().split(' ')[1].replace(',','.');
			var shipping = $('.sta-cart-freight strong').html();
			//alert(shipping);

			if(shipping != 'R$ 0,00'){
				var shipping = $('.sta-cart-freight strong').html().split(' ')[1].replace(',','.');
				//alert(shipping);
				var valor = valor-shipping;
			}else{
				var valor = valor;
			}

			var percent;
			percent = ( 100 / frete ) * valor ;

			// var frete = 450, valor = $('.sta-cart-sub strong').html().split(' ')[1].replace(',','.'), percent;
			// percent = ( 100 / frete ) * valor ;

			if (percent > 100) {
				percent = 100;
			}

			var x = frete - valor;
			x = parseFloat( x )*100 ;
			if ( x <= 0) {
				x = 0.00;
			}
			
			if(helper.toReal(x) == "0,00"){
				var html = '<div class="contentShippng brinde">';
					html += '<div class="frete-bar"><div class="frete-bar-progress"></div></div>';
					html += '<div class="frase"><p>Você ganhou<br/><strong>Frete Grátis!</strong></p></div>';
				html += '</div>';
				$('.sta-cart-resume').prepend(html);
			}else{
				var html = '<div class="contentShippng">';
					html += '<div class="frete-bar"><div class="frete-bar-progress"></div></div>';
					html += '<div class="frase"><p><strong>Frete Grátis</strong><br/>Faltam <strong>R$ '+helper.toReal(x)+'</strong></p></div>';
				html += '</div>';
				$('.sta-cart-resume').prepend(html);
			}

			$('.frete-bar .frete-bar-progress').css('width', percent+'%');
		},1000);
	},

	descontoCarrinho: function(){
		//console.log('descontoCarrinho');
		window.thisEconomia = 0;
		$('.economizou').remove();

		var thisSizeDesconto = $('.sta-cart-container .sta-cart-items>ul>li.comDesconto').size();
		var sizeCountDesconto = 0;
		$('.sta-cart-container .sta-cart-items>ul>li.comDesconto').each(function(){
			var thisQuanty = $(this).find('input.qty-field').val();


			var thisTotal = $(this).attr('preco');
			var thisTotal = thisTotal*thisQuanty;

			var thisValorDE = $(this).attr('desconto');
			var thisValorDE = thisValorDE*thisQuanty;
			
			var thisDesconto = parseInt(thisValorDE)-parseInt(thisTotal);
			$(this).attr('desconto', thisDesconto);
			$(this).addClass('prontoDesconto');
			
			sizeCountDesconto++;
				
			if(sizeCountDesconto == thisSizeDesconto){
				var thisSizeDescontoPRONTO = $('.sta-cart-container .sta-cart-items>ul>li.comDesconto.prontoDesconto').size();
				var sizeCountDescontoPRONTO = 0;
				$('.sta-cart-container .sta-cart-items>ul>li.comDesconto.prontoDesconto').each(function(){
					
					var thisDescontoTR = $(this).attr('desconto');
					window.thisEconomia = parseInt(window.thisEconomia)+parseInt(thisDescontoTR);
					
					sizeCountDescontoPRONTO++;
						
					if(sizeCountDescontoPRONTO == thisSizeDescontoPRONTO){
						if($('.sta-cart-container .sta-cart-resume .sta-cart-discount strong').text() != 'R$ 0,00'){
							var thisMonetary = $('.sta-cart-container .sta-cart-resume .sta-cart-discount strong').text().split('R$ -');
							var thisMonetary = thisMonetary[1].replace('.', '').replace(',', '');
							window.thisEconomia = parseInt(window.thisEconomia)+parseInt(thisMonetary);
						}

						//console.log('COM CUPOM: ','R$ '+toReal(window.thisEconomia));
						$('.sta-cart-items').after('<div class="economizou"><strong>Você economizou <span>R$ '+helper.toReal(window.thisEconomia)+'</span></strong></div>');
						$('.economizou').fadeIn('fast');
					}
				});
			}
		});
	},
	modalComfirm : function () {
		$('.sta-cart-overlay').fadeIn();
		$('.sta-cart-comfirm').fadeIn();
		$('body').addClass('menuOpen');
	},
	checkIfSellerExists: function() {
		if ($.cookie('vendedor')) {
			var sellerCode = $.cookie('vendedor');
			helper.applySeller(sellerCode);
		}else if(localStorage.getItem('vendedor') !== null){
			var sellerCode = localStorage.getItem('vendedor');
			helper.applySeller(sellerCode);
		}
	}
};

$('.seller-close').live('click', function (e) {
	e.preventDefault();

	vtexjs.checkout.getOrderForm().then(function (orderForm) {
		var newMarketingData = orderForm.marketingData;
		var utmisInfo = 'Sem vendedor';

		newMarketingData.utmSource = utmisInfo;
		/*newMarketingData.utmCampaign = utmisInfo;
		newMarketingData.utmiCampaign = utmisInfo;*/
		newMarketingData.utmiPart = utmisInfo;

		var observacion = 'Sem vendedor';
		vtexjs.checkout.sendAttachment('openTextField', {
						value: observacion
				});

		vtexjs.checkout.sendAttachment('marketingData', newMarketingData).done(function () {
			$('.seller-name').text('');
			$('.seller-result').hide('');
			$('#seller-form').show('');
			localStorage.removeItem('sellerInfo');
			helper.fillCart();
			$.removeCookie('vendedor');
			localStorage.removeItem('vendedor');
		});
	});
});

(function($) {

	$.fn.vtexcart = function(parameters) {

		var el = this;

		settings = $.extend(settings, parameters);

		var cartHtml = '<div class="sta-cart-overlay"></div>';
			cartHtml += '<div class="sta-cart-container">';
				cartHtml += '<div class="sta-cart-title">';
					cartHtml += '<button class="sta-cart-close"><i class="fas fa-times"></i></button>';
					cartHtml += '<h3><i></i> Minha Sacola <div class="itens"></div></h3>';
				cartHtml += '</div>';
				cartHtml += '<div class="sta-cart-items">';
					cartHtml += '<ul></ul>'; // <-- carrega os itens do carrinho aqui
				cartHtml += '</div>';
				cartHtml += '<div class="sta-cart-resume">';
					cartHtml += '<div class="wrap sta-cart-coupons"></div>';
					cartHtml += '<div class="wrap">';
						cartHtml += '<span class="sta-cart-sub"><em>Subtotal</em> ';
							cartHtml += '<strong>R$ 0,00</strong>';
						cartHtml += '</span>';
						cartHtml += '<span class="sta-cart-freight"><em>Frete</em> ';
							cartHtml += '<strong>R$ 0,00</strong>';
						cartHtml += '</span>';
					cartHtml += '</div>';
					cartHtml += '<div class="wrap">';
						// cartHtml += '<span class="sta-cart-discount"><em>Desconto</em> ';
						// 	cartHtml += '<strong>R$ 0,00</strong>';
						// cartHtml += '</span>';
						cartHtml += '<span class="sta-cart-total"><em>Total</em> ';
							cartHtml += ' <strong> R$0,00</strong>';
						cartHtml += '</span> ';
					cartHtml += '</div>';
					// cartHtml += '<a class="cartLink" href="/checkout/#/cart">Ver Sacola</a> ';
					// cartHtml += '<a class="checkoutLink" href="/checkout/#/email">finalizar compra</a> ';
					cartHtml += '<a class="checkoutLink" href="/checkout/#/cart">finalizar compra</a> ';
				cartHtml += '</div>';
			cartHtml += '</div>';

		// var comfirmHtml = '<div class="sta-cart-comfirm">';
		// 		comfirmHtml += '<i class="ico-check"></i>';
		// 		comfirmHtml += '<p>PRODUTO ADICIONADO<br/>COM SUCESSO</p>';
		// 		comfirmHtml += '<div class="row">';
		// 			comfirmHtml += '<a href="#" class="sta-keepShop" title="Continue comprando">Continue comprando</a>';
		// 			comfirmHtml += '<a href="/checkout/#/cart" class="sta-finishShop" title="Finalizar compra">Finalizar compra</a>';
		// 		comfirmHtml += '</div>';
		// 	comfirmHtml += '</div>';

		var miniCartHtml = '<a href="#" class="openCart"><span></span></a>';

		$(el).append(cartHtml);

		if(settings.cartButton){
			$(settings.cartButton).append(miniCartHtml);
		}

		cart = $(el).find('.sta-cart-container');

		helper.fillCart();
		helper.renderCouponsOptions();

		vtexjs.checkout.getOrderForm().done(function (orderForm) {
			helper._couponController(orderForm);

			setTimeout(function() {
				helper._addFreight();
				helper._refreshFreight();
			}, 5000);
		});

		setTimeout(function() {
			helper._addCoupon();
			helper.addSeller();
			helper._removeCoupon();
			//helper.removeSeller();
			helper.checkIfSellerExists();
		}, 500);
		
		//DIRECTIVES
		$(settings.buyButton).on('click', function(event){
			event.preventDefault();
			helper.addItem($(this));
		});

		$(".sta-cart-container").on("click", ".list-count-cart a", function(event) {
			event.preventDefault();
			var btnAction = $(this),
				dataIndex = btnAction.closest(".list-count-cart").attr("data-index"),
				qtyField = btnAction.closest(".list-count-cart").find(".qty-field"),
				quantity = parseInt(qtyField.val(), 10) || 0,
				qtyMin = qtyField.attr("min"),
				qtyMax = qtyField.attr("max");
			btnAction.hasClass("qty-less") ? quantity != qtyMin && quantity -- : qtyMax > quantity && quantity++,
			helper.changeItem(dataIndex, quantity);
		}),

		$('.openCart').on('click', function(event){
			event.preventDefault();
			if (($('.sta-cart-items li').length)) {
				helper.openCart();
			} else {
				window.location = window.location = 'https://'+window.location.hostname+'/checkout/#/cart';
			}
		});

		$('.sta-cart-container').on('click','.remove-item', function(){
			var index = $(this).data('index');
			helper.removeItem(index);
		});

		$('.sta-cart-resume a').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				return true;
			}
		});

		$('.sta-cart-freight button').click(function(){
			$(this).hide();
			$('.sta-cart-freight input').show();
		});
	};
} (jQuery));
$(function() {
	$("body").vtexcart({
		buyButton: $(".buy-button.buy-button-ref"),
		wrapper: $(".wrapper"),
		effect: "overlay",
		cartButton: $(".sta-cart")
	})
	$(document).on('keypress' , '.list-count .qty-field', function(e){
		var tecla = ( window.event ) ? event.keyCode : e.which;
		if( ( tecla > 47 && tecla < 58 ) ){
			return true;
		}else{
			if ( tecla == 8 || tecla == 0 ){
				return true;
			}else{
				return false;
			}
		}
	});
});

$('.sta-cart-overlay, .sta-cart-container button.sta-cart-close').live('click',function(){
	helper.closeCart();
});

$('body.produto section#area-a .btadicionar').live('click',function(){
	if($('a.buy-button').attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');"){
		//alert('Por favor, selecione o tamanho desejado.');
		var thisImg = skuJson.skus[0].image;
		var skuTamanho = $('section#area-a .sku ul.Tamanho').html();
		$('#selecioneProduto ul').html(skuTamanho);
		$('#selecioneProduto .left').html('<img src="'+thisImg.replace('292-292','300-450')+'"/>');
		$('#selecioneProduto').fadeIn('fast');
		$('#selecioneProduto .content').addClass('ativo');

		return false;
	} else {    
		$('body.produto section#area-a .btadicionar').html('Aguarde...');
		$('#ajaxBusy').fadeIn();
		var guardaQty = 1;

		var idSku = $('section#area-a .wrapper.botao a.buy-button').attr('href').split('=')[1].split('&')[0];
		var guardaurl = '/checkout/cart/add?sku=' + idSku + '&qty=' + guardaQty + '&seller=1&redirect=false&sc=1';
		
		$.ajax({
			url: guardaurl
		}).done(function() {
			vtexjs.checkout.getOrderForm();
			$('#ajaxBusy').fadeOut();
			helper.fillCart();

			setTimeout(function() {
				helper.openCart();
				$('body.produto section#area-a .btadicionar').html('Comprar');

			},1000);
		});
	}       

	return false;   
});/*MINICART*/
